const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

let merged = { published: [], local: [], effective: [], counts: {} };
let selectedId = null;
let upcomingDraft = [];

function toast(msg, isError = false) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.toggle("error", isError);
  el.classList.remove("hidden");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.add("hidden"), 2800);
}

async function api(path, opts = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", ...opts.headers },
    ...opts,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}

function sourceBadge(source) {
  const cls =
    source === "local" ? "badge-local" : source === "manual" ? "badge-manual" : "badge-manifest";
  const label = source === "local" ? "local" : source === "manual" ? "manual" : "cdn";
  return `<span class="badge ${cls}">${label}</span>`;
}

function renderStats() {
  $("#event-stats").innerHTML = `
    <div class="stat"><strong>${merged.counts.effective ?? 0}</strong> on site (dev)</div>
    <div class="stat"><strong>${merged.counts.local ?? 0}</strong> local drafts</div>
    <div class="stat"><strong>${merged.counts.published ?? 0}</strong> from repo/CDN</div>
  `;
}

function getEffectiveEvent(id) {
  return merged.effective.find((e) => e.id === id);
}

function renderEventList(filter = "") {
  const q = filter.toLowerCase();
  const list = $("#event-list");
  const items = merged.effective.filter(
    (e) =>
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q) ||
      (e.date ?? "").toLowerCase().includes(q)
  );

  list.innerHTML = items
    .map((e) => {
      const local = merged.local.some((l) => l.id === e.id);
      const source = local ? "local" : e.source ?? "manifest";
      return `<li>
        <button type="button" data-id="${e.id}" class="${selectedId === e.id ? "active" : ""}">
          ${sourceBadge(source)}<strong>${e.id}</strong> ${escapeHtml(e.title)}
          <span class="meta">${escapeHtml(e.date ?? "No date")} · ${e.galleryImages?.length ?? 0} photos</span>
        </button>
      </li>`;
    })
    .join("");

  $$("#event-list button").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedId = btn.dataset.id;
      renderEventList($("#event-search").value);
      renderEditor();
    });
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEditor() {
  const panel = $("#event-editor");
  if (!selectedId) {
    panel.innerHTML = `<p class="empty">Select an event or create a new local draft.</p>`;
    return;
  }

  const event = getEffectiveEvent(selectedId);
  if (!event) {
    panel.innerHTML = `<p class="empty">Event not found.</p>`;
    return;
  }

  const isLocal = merged.local.some((e) => e.id === event.id);
  const desc = (event.description ?? []).join("\n\n");

  if (!isLocal) {
    panel.innerHTML = `
      <div class="readonly-banner">
        ${sourceBadge(event.source ?? "manifest")}
        This event comes from the repo/CDN and is read-only here.
        <strong>Duplicate as local draft</strong> to edit it without touching GitHub.
      </div>
      <div class="form-grid">
        <div class="form-row two">
          <div><label>ID</label><div>${escapeHtml(event.id)}</div></div>
          <div><label>Date</label><div>${escapeHtml(event.date ?? "-")}</div></div>
        </div>
        <div><label>Title</label><div>${escapeHtml(event.title)}</div></div>
        ${desc ? `<div><label>Description</label><div style="white-space:pre-wrap">${escapeHtml(desc)}</div></div>` : ""}
        ${
          event.coverImage
            ? `<div><label>Cover</label><img src="${escapeHtml(event.coverImage)}" alt="" style="max-width:240px;border-radius:8px" /></div>`
            : ""
        }
      </div>
      <div class="actions">
        <button type="button" class="btn btn-primary" id="btn-duplicate">Duplicate as local draft</button>
      </div>
    `;
    $("#btn-duplicate").addEventListener("click", () => duplicateAsLocal(event));
    return;
  }

  const localEvent = merged.local.find((e) => e.id === event.id) ?? event;

  panel.innerHTML = `
    <div class="readonly-banner local">
      ${sourceBadge("local")} Local draft, saved to <code>.local/events.json</code>. Overrides this event in <code>npm run dev</code> only.
    </div>
    <form id="event-form" class="form-grid">
      <div class="form-row two">
        <div>
          <label for="f-number">Event #</label>
          <input class="input" id="f-number" type="number" min="1" value="${localEvent.eventNumber}" required />
        </div>
        <div>
          <label for="f-date">Date</label>
          <input class="input" id="f-date" type="text" value="${escapeHtml(localEvent.date ?? "")}" placeholder="e.g. 18-Jul-2017" />
        </div>
      </div>
      <div>
        <label for="f-title">Title</label>
        <input class="input" id="f-title" type="text" value="${escapeHtml(localEvent.title)}" required />
      </div>
      <div>
        <label for="f-desc">Description</label>
        <textarea class="textarea" id="f-desc" placeholder="One paragraph per blank line…">${escapeHtml(desc)}</textarea>
      </div>
      <div>
        <label>Photos</label>
        <p class="hint">Images stored in <code>.local/images/${localEvent.id}/</code></p>
        <input type="file" id="f-images" accept="image/*" multiple />
        <div class="gallery" id="gallery"></div>
      </div>
    </form>
    <div class="actions">
      <button type="button" class="btn btn-primary" id="btn-save">Save event</button>
      <button type="button" class="btn btn-danger" id="btn-delete">Delete local draft</button>
    </div>
  `;

  renderGallery(localEvent);
  $("#btn-save").addEventListener("click", saveLocalEvent);
  $("#btn-delete").addEventListener("click", deleteLocalEvent);
  $("#f-images").addEventListener("change", uploadImages);
}

function renderGallery(event) {
  const gallery = $("#gallery");
  if (!gallery) return;
  const images = event.galleryImages ?? [];
  gallery.innerHTML = images
    .map((url, i) => {
      const filename = decodeURIComponent(url.split("/").pop() ?? "");
      const preview = `/media/${encodeURIComponent(event.id)}/${encodeURIComponent(filename)}`;
      return `<div class="gallery-item">
        <img src="${escapeHtml(preview)}" alt="Photo ${i + 1}" loading="lazy" />
        <button type="button" data-file="${escapeHtml(filename)}" title="Remove">×</button>
      </div>`;
    })
    .join("");

  $$(".gallery-item button", gallery).forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await api(`/api/local/events/${encodeURIComponent(event.id)}/images/${encodeURIComponent(btn.dataset.file)}`, {
          method: "DELETE",
        });
        toast("Image removed");
        await loadEvents();
        renderEditor();
      } catch (err) {
        toast(err.message, true);
      }
    });
  });
}

async function duplicateAsLocal(event) {
  try {
    await api("/api/local/events", {
      method: "POST",
      body: JSON.stringify({
        eventNumber: event.eventNumber,
        title: event.title,
        date: event.date,
        description: event.description,
      }),
    });
    toast(`Local draft ${event.id} created, upload photos below`);
    await loadEvents();
    selectedId = event.id;
    renderEventList($("#event-search").value);
    renderEditor();
  } catch (err) {
    toast(err.message, true);
  }
}

async function saveLocalEvent() {
  try {
    const body = {
      eventNumber: Number($("#f-number").value),
      title: $("#f-title").value,
      date: $("#f-date").value,
      description: $("#f-desc").value,
    };
    const { event } = await api("/api/local/events", { method: "POST", body: JSON.stringify(body) });
    toast(`Saved ${event.id}`);
    selectedId = event.id;
    await loadEvents();
    renderEventList($("#event-search").value);
    renderEditor();
  } catch (err) {
    toast(err.message, true);
  }
}

async function deleteLocalEvent() {
  const event = getEffectiveEvent(selectedId);
  if (!event || !confirm(`Delete local draft ${event.id}? Images in .local/ will be removed.`)) return;
  try {
    await api(`/api/local/events/${encodeURIComponent(event.id)}`, { method: "DELETE" });
    toast(`Deleted ${event.id}`);
    selectedId = null;
    await loadEvents();
    renderEventList($("#event-search").value);
    renderEditor();
  } catch (err) {
    toast(err.message, true);
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadImages(e) {
  const files = [...e.target.files];
  if (!files.length || !selectedId) return;
  try {
    for (const file of files) {
      const data = await fileToBase64(file);
      await api(`/api/local/events/${encodeURIComponent(selectedId)}/images`, {
        method: "POST",
        body: JSON.stringify({ filename: file.name, data }),
      });
    }
    toast(`Uploaded ${files.length} image(s)`);
    e.target.value = "";
    await loadEvents();
    renderEditor();
  } catch (err) {
    toast(err.message, true);
  }
}

async function loadEvents() {
  merged = await api("/api/events");
  renderStats();
  renderEventList($("#event-search").value);
}

function newLocalEvent() {
  selectedId = null;
  const nextNum =
    merged.effective.reduce((max, e) => Math.max(max, e.eventNumber), 0) + 1;
  $("#event-editor").innerHTML = `
    <div class="readonly-banner local">New local draft, nothing is written until you save.</div>
    <form class="form-grid">
      <div class="form-row two">
        <div>
          <label for="f-number">Event #</label>
          <input class="input" id="f-number" type="number" min="1" value="${nextNum}" />
        </div>
        <div>
          <label for="f-date">Date</label>
          <input class="input" id="f-date" type="text" placeholder="e.g. 15-Aug-2026" />
        </div>
      </div>
      <div>
        <label for="f-title">Title</label>
        <input class="input" id="f-title" type="text" placeholder="Event title" />
      </div>
      <div>
        <label for="f-desc">Description</label>
        <textarea class="textarea" id="f-desc" placeholder="One paragraph per blank line…"></textarea>
      </div>
    </form>
    <div class="actions">
      <button type="button" class="btn btn-primary" id="btn-save-new">Create local draft</button>
    </div>
  `;
  $("#btn-save-new").addEventListener("click", async () => {
    try {
      const { event } = await api("/api/local/events", {
        method: "POST",
        body: JSON.stringify({
          eventNumber: Number($("#f-number").value),
          title: $("#f-title").value,
          date: $("#f-date").value,
          description: $("#f-desc").value,
        }),
      });
      toast(`Created ${event.id}`);
      selectedId = event.id;
      await loadEvents();
      renderEditor();
    } catch (err) {
      toast(err.message, true);
    }
  });
}

// Upcoming events
function renderUpcoming() {
  const root = $("#upcoming-list");
  root.innerHTML = upcomingDraft
    .map(
      (u, i) => `
    <div class="upcoming-card" data-idx="${i}">
      <div class="form-grid">
        <div class="form-row two">
          <div><label>ID</label><input class="input u-id" value="${escapeHtml(u.id)}" /></div>
          <div><label>Date</label><input class="input u-date" value="${escapeHtml(u.date)}" /></div>
        </div>
        <div><label>Title</label><input class="input u-title" value="${escapeHtml(u.title)}" /></div>
        <div><label>Location</label><input class="input u-location" value="${escapeHtml(u.location ?? "")}" /></div>
        <div><label>Description</label><textarea class="textarea u-desc">${escapeHtml(u.description ?? "")}</textarea></div>
      </div>
      <div class="actions">
        <button type="button" class="btn btn-danger u-remove">Remove</button>
      </div>
    </div>`
    )
    .join("");

  $$(".u-remove", root).forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.closest(".upcoming-card").dataset.idx);
      upcomingDraft.splice(idx, 1);
      renderUpcoming();
    });
  });
}

async function loadUpcoming() {
  const data = await api("/api/upcoming");
  upcomingDraft = data.local ?? [];
  renderUpcoming();
}

async function saveUpcoming() {
  $$(".upcoming-card").forEach((card, i) => {
    upcomingDraft[i] = {
      id: $(".u-id", card).value.trim() || `U${String(i + 1).padStart(2, "0")}`,
      title: $(".u-title", card).value.trim(),
      date: $(".u-date", card).value.trim(),
      location: $(".u-location", card).value.trim() || undefined,
      description: $(".u-desc", card).value.trim() || undefined,
    };
  });
  upcomingDraft = upcomingDraft.filter((u) => u.title && u.date);
  try {
    await api("/api/upcoming", { method: "POST", body: JSON.stringify({ events: upcomingDraft }) });
    toast("Upcoming events saved locally");
    await loadUpcoming();
  } catch (err) {
    toast(err.message, true);
  }
}

async function resetUpcoming() {
  if (!confirm("Remove .local/upcoming.json and use repo defaults in dev?")) return;
  try {
    await api("/api/upcoming", { method: "DELETE" });
    upcomingDraft = [];
    renderUpcoming();
    toast("Using repo upcoming events");
  } catch (err) {
    toast(err.message, true);
  }
}

// Tabs
$$(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    $$(".tab").forEach((t) => t.classList.remove("active"));
    $$(".panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    $(`#panel-${tab.dataset.tab}`).classList.add("active");
    if (tab.dataset.tab === "upcoming") loadUpcoming();
  });
});

$("#event-search").addEventListener("input", (e) => renderEventList(e.target.value));
$("#btn-new-event").addEventListener("click", newLocalEvent);
$("#btn-add-upcoming").addEventListener("click", () => {
  upcomingDraft.push({ id: `U${String(upcomingDraft.length + 1).padStart(2, "0")}`, title: "", date: "" });
  renderUpcoming();
});
$("#btn-save-upcoming").addEventListener("click", saveUpcoming);
$("#btn-reset-upcoming").addEventListener("click", resetUpcoming);

loadEvents().catch((err) => toast(err.message, true));
