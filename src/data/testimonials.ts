/**
 * Testimonials, single source of truth.
 * Drop a new object in the array and it appears in the homepage marquee.
 */

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  organization?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t01",
    quote:
      "During the Covid pandemic, the trust provided food and essentials for our orphanage. Their kindness lifted us when we needed it most. I will always be grateful.",
    author: "Nanda Gokula Ashram",
    organization: "Muguluru",
  },
  {
    id: "t02",
    quote:
      "I was struggling to afford my cataract surgery until Sneha Sammilana Foundation stepped in. Today, I can see clearly and work without any issues. They gave me my vision and independence back.",
    author: "Beneficiary",
    organization: "Eye Camp",
  },
  {
    id: "t03",
    quote:
      "We sincerely thank Sneha Sammilana Foundation for their thoughtful contribution of notebooks, exam pads, pencils, and pens to the Girls' Primary School in our rural area. Thank you for your unwavering commitment to empowering education in rural areas.",
    author: "Smt. Kempamma",
    role: "Headmistress",
    organization: "Sarjapura Girls Primary School",
  },
  {
    id: "t04",
    quote:
      "We extend our heartfelt gratitude to Sneha Sammilana Foundation for their generous contribution of 50 pillows and nutritious food to Yashaswini Girls Hostel. Your support has brought comfort and warmth to the lives of our residents.",
    author: "Smt. Aswathamma",
    role: "Manager",
    organization: "Yashaswini Girls Hostel",
  },
  {
    id: "t05",
    quote:
      "We sincerely thank Sneha Sammilana Foundation for their generous contribution of two steel almirahs to our school library and staff room. This thoughtful donation has enhanced the organization and storage of books and materials.",
    author: "Headmaster",
    organization: "SVPHS School",
  },
  {
    id: "t06",
    quote:
      "We are writing to express our deepest thanks for the attires and fruits donated by your foundation to Sipani Seva Sadan for the use of home inmates. Generous donations from donors like you provide the financial and moral support needed to continue our mission.",
    author: "Santhosh C.X",
    organization: "Sipani Seva Sadan",
  },
];
