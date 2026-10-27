export interface SchoolProgram {
  id: string;
  name: string;
  years: string;
  summary: string;
  image: string;
  curriculum: string;
}

export interface SchoolFacility {
  name: string;
  summary: string;
  image: string;
  alt: string;
  enabled: boolean;
}

export interface SchoolArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  image: string;
  body: string;
}

export interface SchoolEvent {
  slug: string;
  title: string;
  date: string;
  summary: string;
  location?: string;
}

export interface SchoolConfig {
  identity: {
    name: string;
    tagline: string;
    location: string;
    timezone: string;
    currency: string;
    language: string;
    canonicalUrl: string;
  };
  theme: {
    primary: string;
    primaryDark: string;
    secondary: string;
    background: string;
    surface: string;
    accent: string;
    text: string;
    muted: string;
    border: string;
  };
  announcement: { enabled: boolean; message: string };
  features: {
    admissions: boolean;
    newsletter: boolean;
    tourRequests: boolean;
    gallery: boolean;
    whatsapp: boolean;
    mapEmbed: boolean;
    portalLinks: boolean;
    feesEnquiry: boolean;
  };
  contacts: {
    address: string;
    phone: string;
    email: string;
    whatsappNumber: string;
    openingHours: string;
    mapEmbedUrl: string;
  };
  image: string;
  programs: SchoolProgram[];
  facilities: SchoolFacility[];
  articles: SchoolArticle[];
  events: SchoolEvent[];
  gallery: Array<{ image: string; alt: string; category: string }>;
  tourDates: string[];
  tourTimes: string[];
  faqs: Array<{ category: string; question: string; answer: string }>;
  policyPages: Array<{ slug: string; title: string; body: string }>;
}

const image = (id: string, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const tourDates = Array.from({ length: 10 }, (_, offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset + 1);
  while (date.getDay() === 0 || date.getDay() === 6) date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}).filter((date, index, dates) => dates.indexOf(date) === index).slice(0, 5);

export const schoolConfig: SchoolConfig = {
  identity: {
    name: 'Lights Academy',
    tagline: 'A place to grow, discover and find your purpose.',
    location: 'Nigeria',
    timezone: 'Africa/Lagos',
    currency: 'NGN',
    language: 'en',
    canonicalUrl: '',
  },
  theme: {
    primary: '#173d32',
    primaryDark: '#102b24',
    secondary: '#6f8d78',
    background: '#faf9f5',
    surface: '#ffffff',
    accent: '#d4b779',
    text: '#202923',
    muted: '#68716b',
    border: '#e5e8e2',
  },
  announcement: {
    enabled: true,
    message: 'A new school year begins with possibility. Talk with our admissions team.',
  },
  features: {
    admissions: true,
    newsletter: false,
    tourRequests: true,
    gallery: true,
    whatsapp: false,
    mapEmbed: false,
    portalLinks: false,
    feesEnquiry: true,
  },
  contacts: {
    address: 'Add your verified school address before launch',
    phone: '',
    email: '',
    whatsappNumber: '',
    openingHours: 'Add verified office hours before launch',
    mapEmbedUrl: '',
  },
  image: image('photo-1509062522246-3755977927d7', 1800),
  programs: [
    { id: 'early-years', name: 'Early Years', years: 'Early learning', summary: 'A joyful beginning built around curiosity, confidence and caring relationships.', image: image('photo-1503454537195-1dcabb73ffb9'), curriculum: 'Add your approved early-years curriculum and learning areas.' },
    { id: 'primary', name: 'Primary School', years: 'Primary education', summary: 'Strong foundations in literacy, numeracy, creativity and learning how to learn.', image: image('photo-1503676260728-1c00da094a0b'), curriculum: 'Add your approved primary curriculum and learning areas.' },
    { id: 'secondary', name: 'Secondary School', years: 'Junior and senior secondary', summary: 'Thoughtful teaching and growing independence, preparing learners for their next steps.', image: image('photo-1523240795612-9a054b0db644'), curriculum: 'Add your approved secondary curriculum and examination information.' },
  ],
  facilities: [
    { name: 'Learning spaces', summary: 'Flexible, welcoming rooms that support focused study and collaboration.', image: image('photo-1498243691581-b145c3f54a5a'), alt: 'Bright school learning space', enabled: true },
    { name: 'Library', summary: 'A calm place to read, research and follow a new idea.', image: image('photo-1507842217343-583bb7270b66'), alt: 'Bookshelves in a library', enabled: true },
    { name: 'Science and discovery', summary: 'Practical spaces for asking questions and learning through investigation.', image: image('photo-1532094349884-543bc11b234d'), alt: 'Laboratory equipment on a workbench', enabled: true },
    { name: 'Sports and play', summary: 'Room to move, participate and enjoy being part of a team.', image: image('photo-1526676037777-05a232554f77'), alt: 'Students taking part in a sports activity', enabled: true },
    { name: 'Creative arts', summary: 'Opportunities to express ideas through making, performance and design.', image: image('photo-1513364776144-60967b0f800f'), alt: 'Colourful art materials on a table', enabled: true },
    { name: 'Technology', summary: 'Digital tools to support thoughtful, responsible learning.', image: image('photo-1516321318423-f06f85e504b3'), alt: 'Learner using a laptop', enabled: true },
  ],
  articles: [
    { slug: 'welcome-to-a-new-school-year', title: 'A warm welcome to a new school year', category: 'School life', date: '2026-09-01', summary: 'A note for families as the school community comes together for a new term.', image: image('photo-1509062522246-3755977927d7'), body: 'Every new school year is an invitation to begin again: to meet new friends, ask better questions and discover what we can do together. This sample article is illustrative and should be replaced with a school-approved update.' },
    { slug: 'learning-through-curiosity', title: 'Making room for curiosity in every classroom', category: 'Learning', date: '2026-08-12', summary: 'How open questions and hands-on exploration can bring learning to life.', image: image('photo-1503676260728-1c00da094a0b'), body: 'Curiosity gives learners a reason to look more closely, test an idea and share what they notice. Replace this sample story with a verified school news item before publication.' },
    { slug: 'a-community-that-belongs', title: 'Building a school community where everyone belongs', category: 'Community', date: '2026-07-28', summary: 'Small moments of welcome help every learner feel part of school life.', image: image('photo-1529390079861-591de354faf5'), body: 'A sense of belonging is built over time, through care, respect and opportunities to take part. This illustrative article must be reviewed and replaced with approved school content.' },
  ],
  events: [],
  gallery: [
    { image: image('photo-1509062522246-3755977927d7'), alt: 'Exterior view of a school building', category: 'Campus' },
    { image: image('photo-1503676260728-1c00da094a0b'), alt: 'Students learning together in class', category: 'Learning' },
    { image: image('photo-1503454537195-1dcabb73ffb9'), alt: 'Young learner working at a table', category: 'Learning' },
    { image: image('photo-1529390079861-591de354faf5'), alt: 'Students collaborating outdoors', category: 'Community' },
    { image: image('photo-1513364776144-60967b0f800f'), alt: 'Art materials ready for a creative activity', category: 'Activities' },
    { image: image('photo-1526676037777-05a232554f77'), alt: 'Outdoor sports space', category: 'Campus' },
  ],
  tourDates,
  tourTimes: ['09:00', '10:30', '12:00', '14:00'],
  faqs: [
    { category: 'Admissions', question: 'How do I enquire about admission?', answer: 'Use the admissions enquiry form on this website. It is a demonstration until the school connects an email or admissions service; no application is submitted from this template.' },
    { category: 'Admissions', question: 'Can families visit the school?', answer: 'You can request a tour using the form on the admissions page. A selected date is a request only, not a confirmed booking.' },
    { category: 'Academics', question: 'Which curriculum does the school follow?', answer: 'Curriculum information should be added and verified by the school before launch. Please contact the school directly for current details.' },
    { category: 'Fees', question: 'Where can I find the current school fees?', answer: 'Fees are not published in this template. Contact the school office for an approved and current fee schedule.' },
    { category: 'School life', question: 'What activities are available to learners?', answer: 'Clubs, sports and activities vary by school and term. Add the current, verified programme before launch.' },
    { category: 'Transport', question: 'Does the school provide transport?', answer: 'Add verified information about routes, availability, safety procedures and transport contacts before publishing.' },
    { category: 'General', question: 'How can I contact the school?', answer: 'The contact details on this sample site must be replaced with verified school contact information before launch.' },
  ],
  policyPages: [
    { slug: 'privacy', title: 'Privacy notice', body: 'Starter template: explain what personal information the school collects, why it is collected, its lawful basis, who can access it, retention periods, security measures and how individuals can exercise their rights. Include additional safeguards for children’s data. Have this notice reviewed and completed by the school’s authorised representative before publication.' },
    { slug: 'terms', title: 'Terms of use', body: 'Starter template: describe permitted use of this website, ownership of published content, third-party links, accuracy and update practices, and how visitors can contact the school. Have this page reviewed before publication.' },
    { slug: 'safeguarding', title: 'Safeguarding', body: 'Starter template: publish the school’s approved safeguarding commitment, reporting routes, designated safeguarding contacts and response procedures. Do not publish until reviewed and approved by the school’s safeguarding lead.' },
    { slug: 'cookies', title: 'Cookie information', body: 'Starter template: list the cookies and similar technologies this website uses, their purposes and durations, and the choices available to visitors. Update this page to match the deployed site.' },
  ],
};
