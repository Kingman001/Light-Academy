import { 
  UserRole, 
  User, 
  TimetableEntry, 
  Exam, 
  FeeRecord, 
  Subject, 
  AppNotification, 
  AcademicDepartment, 
  SecondaryClassLevel, 
  NewsArticle, 
  EnrolledStudent, 
  ReportCardGrade 
} from './types';

export const SCHOOL_INFO = {
  name: 'Lights Academy',
  subTitle: 'Premier Co-Educational Secondary School & College Prep',
  tagline: 'Moulding Character, Inspiring Scholarship, Leading Tomorrow',
  accreditation: 'Nationally Accredited Secondary School · Cambridge International & National Board Approved',
  founded: 1984,
  motto: 'Non Scholae Sed Vitae Discimus (We Learn Not For School, But For Life)',
  stats: [
    { value: '1,420', label: 'Junior & Senior Secondary Students' },
    { value: '100%', label: 'Secondary School Certificate Pass Rate' },
    { value: '1:10', label: 'Teacher-to-Student Mentorship Ratio' },
    { value: '4 Houses', label: 'Orion, Phoenix, Pegasus & Falcon' },
    { value: '32+', label: 'Co-Curricular Clubs & Sports Teams' },
  ],
  contacts: {
    address: '100 School Lane, Academy Hills, Metro District, LA 90210',
    phone: '+1 (800) 555-LIGHT / +1 (555) 234-8900',
    email: 'admissions@lightsacademy.edu',
    principal: 'principal@lightsacademy.edu',
    bursar: 'bursar@lightsacademy.edu',
    helpdesk: 'portal-support@lightsacademy.edu',
  },
  mission: 'To provide a disciplined, nurturing secondary school environment where young minds cultivate academic excellence, moral integrity, critical inquiry, and athletic teamwork.',
  vision: 'To be the preeminent secondary school benchmark renowned for holistic child education, scientific creativity, leadership, and global civic responsibility.',
  values: [
    { title: 'Moral Character', desc: 'Instilling honesty, humility, empathy, and personal responsibility in every pupil.' },
    { title: 'Academic Rigour', desc: 'Fostering intellectual curiosity, methodical study habits, and mastery across STEM and humanities.' },
    { title: 'House Brotherhood & Sisterhood', desc: 'Building lifelong friendships, sportsmanship, and teamwork through our four historic Houses.' },
    { title: 'Creativity & Discovery', desc: 'Encouraging self-expression in arts, drama, robotics, and scientific invention.' },
  ],
  leadership: [
    { name: 'Dr. Arthur Sterling, M.Ed.', role: 'Headmaster & Principal', bio: 'Distinguished secondary educator with 28 years heading international preparatory colleges.' },
    { name: 'Mrs. Henrietta Vance, B.Sc., PGCE', role: 'Vice Principal (Academics & Curriculum)', bio: 'Senior examiner specializing in secondary science education and cognitive pedagogy.' },
    { name: 'Mr. Kwesi Mensah, M.A.', role: 'Dean of Students & Pastoral Care', bio: 'Champion of student mental wellness, house mentorship, and co-curricular programs.' },
    { name: 'Mrs. Miriam Zhao, FCA', role: 'School Bursar & Financial Controller', bio: 'Oversees transparent school fee administration, scholarships, and campus facilities.' },
  ],
  houses: [
    { name: 'Orion House', color: 'bg-blue-600 text-white', motto: 'Aim High with Radiance', banner: 'Blue & Silver' },
    { name: 'Phoenix House', color: 'bg-amber-600 text-white', motto: 'Rising Above Adversity', banner: 'Crimson & Gold' },
    { name: 'Pegasus House', color: 'bg-emerald-600 text-white', motto: 'Strength with Integrity', banner: 'Emerald & White' },
    { name: 'Falcon House', color: 'bg-purple-600 text-white', motto: 'Swift in Honour', banner: 'Purple & Gold' },
  ]
};

// Demo Student & Teacher Profiles
export const DEMO_STUDENT: User = {
  id: 'std-4920',
  name: 'Alex Johnson',
  email: 'alex.j@lightsacademy.edu',
  role: UserRole.STUDENT,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  studentId: 'LA-2024-4920',
  department: 'Senior Secondary (Science Track)',
  title: 'Senior Secondary (Grade 11)',
  gradeLevel: 'Grade 11 (Senior Secondary 2)',
  house: 'Orion House',
  phone: '+1 (555) 012-3456',
  bio: 'Grade 11 Science Scholar and Academic Prefect. Captain of the Secondary Robotics Club and member of Orion House Track Team.',
  overallAverage: 91.4,
  attendancePercentage: 97,
  term: 'Term 1 (Michaelmas Term)',
  academicYear: '2026/2027 Academic Year',
};

export const DEMO_STUDENT_2: User = {
  id: 'std-5112',
  name: 'Sarah Chen',
  email: 'sarah.c@lightsacademy.edu',
  role: UserRole.STUDENT,
  avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  studentId: 'LA-2025-5112',
  department: 'Senior Secondary (STEM & Arts)',
  title: 'Senior Secondary (Grade 10)',
  gradeLevel: 'Grade 10 (Senior Secondary 1)',
  house: 'Phoenix House',
  phone: '+1 (555) 876-5432',
  bio: 'Grade 10 pupil passionate about biology, creative writing, and badminton. Member of Phoenix House.',
  overallAverage: 88.2,
  attendancePercentage: 95,
  term: 'Term 1 (Michaelmas Term)',
  academicYear: '2026/2027 Academic Year',
};

export const DEMO_STAFF: User = {
  id: 'tch-108',
  name: 'Mr. David Miller',
  email: 'd.miller@lightsacademy.edu',
  role: UserRole.STAFF,
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  staffId: 'LA-TCH-0108',
  department: 'Department of Mathematics & ICT',
  title: 'Senior Mathematics Master & Form 11A Tutor',
  phone: '+1 (555) 345-6789',
  bio: 'B.Sc. in Mathematics, PGCE. 14 years preparing secondary pupils for national and Cambridge IGCSE mathematics with top distinction distinctions.',
};

export const DEMO_STAFF_2: User = {
  id: 'tch-215',
  name: 'Mrs. Clara Higgins',
  email: 'c.higgins@lightsacademy.edu',
  role: UserRole.STAFF,
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  staffId: 'LA-TCH-0215',
  department: 'Department of Natural Sciences',
  title: 'Head of Sciences & Senior Biology Teacher',
  phone: '+1 (555) 432-1098',
  bio: 'M.Sc. in Biological Sciences. Passionate about hands-on dissection, microscopy, and cultivating future medical scholars in secondary school.',
};

export const MOCK_USER = DEMO_STUDENT;

// Secondary Academic Departments
export const ACADEMIC_DEPARTMENTS: AcademicDepartment[] = [
  {
    id: 'dept-sciences',
    name: 'Department of Natural Sciences',
    code: 'SCI',
    headOfDepartment: 'Mrs. Clara Higgins, M.Sc.',
    description: 'High school biology, chemistry, physics, and agricultural science taught with cutting-edge wet laboratories and digital probe equipment.',
    subjects: ['Physics', 'Chemistry', 'Biology', 'General Science', 'Agricultural Science'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dept-math',
    name: 'Department of Mathematics & Computing',
    code: 'MATH-ICT',
    headOfDepartment: 'Mr. David Miller, B.Sc., PGCE',
    description: 'Core secondary mathematics, additional mathematics, coding in Python/Scratch, and digital citizenship across all secondary forms.',
    subjects: ['General Mathematics', 'Additional / Further Mathematics', 'Computer Studies & ICT', 'Robotics & AI Basics'],
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dept-languages',
    name: 'Department of Languages & Literature',
    code: 'LANG',
    headOfDepartment: 'Mrs. Sarah Thornton, M.A.',
    description: 'Mastery of English language, creative writing, world literature, French, and speech rhetoric to foster eloquent communicators.',
    subjects: ['English Language', 'Literature in English', 'French Language', 'Spanish Language', 'Public Speaking'],
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dept-humanities',
    name: 'Department of Humanities & Social Sciences',
    code: 'HUM',
    headOfDepartment: 'Mr. Patrick O’Brian, M.Ed.',
    description: 'Instilling historical perspective, geographical awareness, civic governance, economics, and ethical philosophy.',
    subjects: ['World & National History', 'Geography', 'Economics', 'Civic Education & Government', 'Social Studies'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dept-arts',
    name: 'Department of Creative & Vocational Arts',
    code: 'CVA',
    headOfDepartment: 'Ms. Angela Rossi',
    description: 'Hands-on ceramics, painting, technical drawing, instrumental music, choral performance, and culinary design.',
    subjects: ['Fine Arts & Painting', 'Technical Drawing', 'Music & Orchestra', 'Home Economics & Food Studies'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dept-pe',
    name: 'Department of Physical & Health Education',
    code: 'PHE',
    headOfDepartment: 'Coach Marcus Vance',
    description: 'Physical conditioning, athletics, inter-house competitions, football, basketball, swimming, and mental wellness.',
    subjects: ['Physical Education', 'Health Sciences & First Aid', 'Competitive Athletics', 'Aquatics'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  }
];

// Secondary School Grade Divisions
export const SECONDARY_CLASS_LEVELS: SecondaryClassLevel[] = [
  {
    id: 'lvl-jss',
    name: 'Junior Secondary (Grades 7 – 9 / Forms 1 – 3)',
    division: 'Junior Secondary (Grades 7–9)',
    ageGroup: 'Ages 11 – 14',
    description: 'Foundational secondary curricula transitioning learners from primary basics into specialized scientific thinking, analytical writing, and character development.',
    keySubjects: ['Mathematics', 'Integrated Science', 'English Language', 'Social Studies', 'ICT', 'French', 'Introductory Technology'],
    track: 'Foundational Secondary Core'
  },
  {
    id: 'lvl-sss-sci',
    name: 'Senior Secondary - Science & Technology Track (Grades 10 – 12)',
    division: 'Senior Secondary (Grades 10–12)',
    ageGroup: 'Ages 14 – 18',
    description: 'Specialized pre-university track preparing aspiring doctors, software engineers, and physicists with rigorous laboratory coursework.',
    keySubjects: ['Physics', 'Chemistry', 'Biology', 'Further Mathematics', 'Computer Studies', 'English Language'],
    track: 'STEM Pre-University'
  },
  {
    id: 'lvl-sss-arts',
    name: 'Senior Secondary - Humanities & Arts Track (Grades 10 – 12)',
    division: 'Senior Secondary (Grades 10–12)',
    ageGroup: 'Ages 14 – 18',
    description: 'Rigorous track focusing on constitutional law, global history, literature, international diplomacy, and creative design.',
    keySubjects: ['Literature in English', 'Government & Politics', 'History', 'Economics', 'Fine Arts', 'French'],
    track: 'Humanities & Pre-Law'
  },
  {
    id: 'lvl-sss-comm',
    name: 'Senior Secondary - Business & Commercial Track (Grades 10 – 12)',
    division: 'Senior Secondary (Grades 10–12)',
    ageGroup: 'Ages 14 – 18',
    description: 'Foundational accounting, business management, microeconomics, and marketing for future entrepreneurs and financial analysts.',
    keySubjects: ['Financial Accounting', 'Commerce', 'Economics', 'Business Methods', 'Mathematics', 'Marketing'],
    track: 'Business & Finance'
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Lights Academy Wins National Secondary School Science & Robotics Olympiad',
    category: 'STEM & Arts',
    date: 'September 20, 2026',
    summary: 'Our Grade 11 secondary robotics team captured the 1st prize trophy with their solar-powered autonomous agriculture drone.',
    content: 'Led by Science Master Mrs. Higgins and Academic Prefect Alex Johnson, the team outperformed 84 competing high schools nationwide, qualifying for the International Youth STEM Showcase in Geneva.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    author: 'Department of Sciences & ICT'
  },
  {
    id: 'news-2',
    title: '42nd Annual Inter-House Athletics Championship: Orion House Clinches Golden Shield',
    category: 'Sports & Houses',
    date: 'September 12, 2026',
    summary: 'Spectacular sports day featuring 100m sprint records, 4x100m relay thrillers, and marching band fanfare.',
    content: 'Over 1,200 parents and pupils gathered at the Academy Sports Pavilion. Orion House narrowly edged Phoenix House by 4 points in a dramatic 4x400m Senior relay finish.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    author: 'House Sports Secretariat'
  },
  {
    id: 'news-3',
    title: 'Entrance Examination & Boarding Admissions for Grade 7 (Form 1) Announced',
    category: 'Admissions',
    date: 'August 30, 2026',
    summary: 'Registration is now live online for prospective primary 6 graduates seeking Grade 7 admission for the upcoming school year.',
    content: 'Lights Academy offers comprehensive academic scholarships covering tuition and boarding for top performers in the entrance examination. Day scholar and full boarding spaces available.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    author: 'Admissions Board'
  }
];

// Secondary School Timetable: Class Periods
export const TIMETABLE_DATA: TimetableEntry[] = [
  { 
    id: '1', 
    period: 'Period 1 (08:15 - 09:00)',
    subject: 'Senior Mathematics', 
    code: 'MTH-11', 
    teacher: 'Mr. David Miller', 
    startTime: '08:15', 
    endTime: '09:00', 
    day: 'Monday', 
    room: 'Classroom 11A', 
    color: 'bg-blue-50 text-blue-900 border-blue-200',
    type: 'Classroom'
  },
  { 
    id: '2', 
    period: 'Period 2 (09:00 - 09:45)',
    subject: 'Physics & Mechanics', 
    code: 'PHY-11', 
    teacher: 'Mr. Marcus Thorne', 
    startTime: '09:00', 
    endTime: '09:45', 
    day: 'Monday', 
    room: 'Senior Physics Lab', 
    color: 'bg-purple-50 text-purple-900 border-purple-200',
    type: 'Laboratory',
    virtualLink: 'https://classroom.lightsacademy.edu/phy11'
  },
  { 
    id: '3', 
    period: 'Period 3 (10:15 - 11:00)',
    subject: 'English Language & Essay', 
    code: 'ENG-11', 
    teacher: 'Mrs. Sarah Thornton', 
    startTime: '10:15', 
    endTime: '11:00', 
    day: 'Tuesday', 
    room: 'Classroom 11A', 
    color: 'bg-rose-50 text-rose-900 border-rose-200',
    type: 'Classroom'
  },
  { 
    id: '4', 
    period: 'Period 4 (11:00 - 11:45)',
    subject: 'Biology & Cell Lab', 
    code: 'BIO-11', 
    teacher: 'Mrs. Clara Higgins', 
    startTime: '11:00', 
    endTime: '11:45', 
    day: 'Tuesday', 
    room: 'Life Sciences Lab 2', 
    color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    type: 'Laboratory'
  },
  { 
    id: '5', 
    period: 'Period 5 (12:45 - 13:30)',
    subject: 'Computer Studies / Coding', 
    code: 'ICT-11', 
    teacher: 'Mr. Alex Vance', 
    startTime: '12:45', 
    endTime: '13:30', 
    day: 'Wednesday', 
    room: 'Turing ICT Computer Lab', 
    color: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    type: 'Workshop',
    virtualLink: 'https://classroom.lightsacademy.edu/ict11'
  },
  { 
    id: '6', 
    period: 'Period 6 (13:30 - 14:15)',
    subject: 'Chemistry Practical', 
    code: 'CHM-11', 
    teacher: 'Dr. Kwame Boateng', 
    startTime: '13:30', 
    endTime: '14:15', 
    day: 'Thursday', 
    room: 'Chemistry Lab A', 
    color: 'bg-amber-50 text-amber-900 border-amber-200',
    type: 'Laboratory'
  },
  { 
    id: '7', 
    period: 'Period 7 (14:30 - 15:30)',
    subject: 'Inter-House Sports & Clubs', 
    code: 'PE-ACT', 
    teacher: 'Coach Marcus Vance', 
    startTime: '14:30', 
    endTime: '15:30', 
    day: 'Friday', 
    room: 'Academy Main Athletics Oval', 
    color: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    type: 'Sports'
  },
];

// Secondary School Online Exams & Quizzes
export const MOCK_EXAMS: Exam[] = [
  {
    id: 'exam-1',
    title: 'Grade 11 Mathematics Term 1 Mid-Term Assessment',
    subject: 'General & Additional Mathematics',
    code: 'MTH-11',
    gradeLevel: 'Grade 11',
    duration: 30,
    totalMarks: 50,
    term: 'Term 1 Assessment',
    dueDate: '2026-10-04',
    status: 'ACTIVE',
    questions: [
      { 
        id: 'q1', 
        text: 'Solve for x in the quadratic equation: 2x² - 8x = 0', 
        options: ['x = 0 or x = 4', 'x = 2 or x = -2', 'x = 4 only', 'x = 0 only'], 
        correctOption: 0,
        explanation: 'Factoring gives 2x(x - 4) = 0. Therefore, 2x = 0 => x = 0, or x - 4 = 0 => x = 4.'
      },
      { 
        id: 'q2', 
        text: 'What is the gradient (slope) of the straight line passing through points (2, 3) and (6, 11)?', 
        options: ['2', '4', '8', '0.5'], 
        correctOption: 0,
        explanation: 'Slope m = (y2 - y1) / (x2 - x1) = (11 - 3) / (6 - 2) = 8 / 4 = 2.'
      },
      { 
        id: 'q3', 
        text: 'In a right-angled triangle, if the hypotenuse is 13 cm and one side is 5 cm, what is the length of the other side?', 
        options: ['12 cm', '10 cm', '8 cm', '18 cm'], 
        correctOption: 0,
        explanation: 'By the Pythagorean theorem: a² + 5² = 13² => a² + 25 = 169 => a² = 144 => a = 12 cm.'
      },
      { 
        id: 'q4', 
        text: 'Simplify the algebraic expression: 3(2a - 4) + 4(a + 2)', 
        options: ['10a - 4', '10a + 4', '6a - 12', '10a - 20'], 
        correctOption: 0,
        explanation: 'Expanding: 6a - 12 + 4a + 8 = (6a + 4a) + (-12 + 8) = 10a - 4.'
      },
      {
        id: 'q5',
        text: 'What is the sum of interior angles in a regular hexagon (6 sides)?',
        options: ['720°', '540°', '360°', '1080°'],
        correctOption: 0,
        explanation: 'Sum = (n - 2) * 180° = (6 - 2) * 180° = 4 * 180° = 720°.'
      }
    ]
  },
  {
    id: 'exam-2',
    title: 'Grade 11 Senior Biology & Physiology Quiz',
    subject: 'Biology',
    code: 'BIO-11',
    gradeLevel: 'Grade 11',
    duration: 25,
    totalMarks: 40,
    term: 'Term 1 Continuous Assessment',
    dueDate: '2026-10-08',
    status: 'ACTIVE',
    questions: [
      { 
        id: 'bio-q1', 
        text: 'Which organelle is recognized as the "powerhouse of the cell" where cellular respiration produces ATP?', 
        options: ['Mitochondria', 'Ribosome', 'Golgi Apparatus', 'Endoplasmic Reticulum'], 
        correctOption: 0,
        explanation: 'Mitochondria generate the majority of the chemical energy required by the cell through ATP synthesis.'
      },
      { 
        id: 'bio-q2', 
        text: 'What green pigment in chloroplasts is essential for absorbing sunlight during photosynthesis?', 
        options: ['Chlorophyll', 'Hemoglobin', 'Carotene', 'Melanin'], 
        correctOption: 0,
        explanation: 'Chlorophyll molecules absorb light in the blue and red wavelengths while reflecting green light.'
      },
      { 
        id: 'bio-q3', 
        text: 'In human circulatory physiology, which blood vessels carry oxygenated blood away from the heart to body tissues?', 
        options: ['Arteries (Systemic)', 'Veins', 'Vena Cava', 'Pulmonary Arteries'], 
        correctOption: 0,
        explanation: 'Systemic arteries carry pressurized oxygenated blood away from the left ventricle to the rest of the body.'
      },
      { 
        id: 'bio-q4', 
        text: 'Which blood type is commonly recognized as the "Universal Donor" for red blood cell transfusions?', 
        options: ['Type O Negative', 'Type AB Positive', 'Type A Positive', 'Type B Negative'], 
        correctOption: 0,
        explanation: 'Type O Negative red blood cells lack A, B, and Rh antigens, minimizing immune rejection risks.'
      }
    ]
  },
  {
    id: 'exam-3',
    title: 'Grade 11 Physics & Kinematics Term Test',
    subject: 'Physics',
    code: 'PHY-11',
    gradeLevel: 'Grade 11',
    duration: 40,
    totalMarks: 50,
    term: 'Term 1 Mock Test',
    dueDate: '2026-10-15',
    status: 'UPCOMING',
    questions: [
      { 
        id: 'phy-q1', 
        text: 'What is the acceleration due to gravity on the Earth’s surface to 2 significant figures?', 
        options: ['9.8 m/s²', '9.8 cm/s²', '10.5 m/s²', '8.9 m/s²'], 
        correctOption: 0,
        explanation: 'The standard gravitational acceleration near Earth’s surface is approximately 9.8 m/s².'
      },
      { 
        id: 'phy-q2', 
        text: 'According to Newton’s Second Law of Motion, Force equals:', 
        options: ['Mass × Acceleration', 'Mass ÷ Acceleration', 'Velocity × Time', 'Work ÷ Distance'], 
        correctOption: 0,
        explanation: 'Newton’s Second Law states that F = m * a.'
      }
    ]
  }
];

// Secondary School Fees & Billing
export const MOCK_FEES: FeeRecord[] = [
  { 
    id: 'f1', 
    description: 'Term 1 Tuition & Core Academic Fee (Grade 11)', 
    amount: 850, 
    dueDate: '2026-10-15', 
    status: 'PAID',
    category: 'TUITION',
    receiptNumber: 'LA-RCP-2026-4421',
    paidDate: '2026-09-02'
  },
  { 
    id: 'f2', 
    description: 'Science Laboratory Materials & Consumables Levy', 
    amount: 95, 
    dueDate: '2026-10-25', 
    status: 'PENDING',
    category: 'LAB'
  },
  { 
    id: 'f3', 
    description: 'Term Textbooks, Cambridge Workbooks & Stationery Pack', 
    amount: 120, 
    dueDate: '2026-09-30', 
    status: 'OVERDUE',
    category: 'UNIFORM'
  },
  { 
    id: 'f4', 
    description: 'Inter-House Sports, Athletics & Co-Curricular Club Levy', 
    amount: 60, 
    dueDate: '2026-11-05', 
    status: 'PENDING',
    category: 'BOARDING'
  },
];

// Enrolled Secondary School Subjects
export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 's1',
    name: 'General & Additional Mathematics',
    code: 'MTH-11',
    teacher: 'Mr. David Miller',
    gradeLevel: 'Grade 11A',
    term: 'Term 1',
    description: 'Quadratic equations, coordinate geometry, trigonometry, indices, and foundational calculus for secondary school scholars.',
    progress: 78,
    color: 'indigo',
    resources: [
      { id: 'r1', title: 'Grade 11 Mathematics Term 1 Syllabus & Workbook', type: 'PDF', url: '#', size: '3.4 MB' },
      { id: 'r2', title: 'Video Lesson: Solving Quadratics by Factoring', type: 'VIDEO', url: '#', size: '24 min' },
      { id: 'r3', title: 'Weekly Homework Problem Set 3', type: 'DOC', url: '#', size: '640 KB' },
    ],
    assignments: [
      { id: 'a1', title: 'Homework 2: Coordinate Geometry & Slopes', description: 'Complete Exercises 3.2 (Questions 1 to 15).', dueDate: '2026-09-22', totalPoints: 20, submitted: true, grade: '19/20', feedback: 'Neat working and excellent step clarity!' },
      { id: 'a2', title: 'Homework 3: Quadratic Factorization', description: 'Complete Practice Sheet 4.', dueDate: '2026-10-02', totalPoints: 20, submitted: false }
    ]
  },
  {
    id: 's2',
    name: 'Physics & Experimental Mechanics',
    code: 'PHY-11',
    teacher: 'Mr. Marcus Thorne',
    gradeLevel: 'Grade 11A',
    term: 'Term 1',
    description: 'Kinematics in one dimension, vectors, friction, Newton’s laws of motion, and laboratory measurement precision.',
    progress: 65,
    color: 'purple',
    resources: [
      { id: 'r4', title: 'Physics Laboratory Safety Guide & Logbook', type: 'PDF', url: '#', size: '2.1 MB' },
      { id: 'r5', title: 'Simulated Vernier Caliper & Micrometer Gauge Tool', type: 'LINK', url: 'https://phet.colorado.edu' },
    ],
    assignments: [
      { id: 'a3', title: 'Lab Practical Report 1: Measuring Density of Irregular Solids', description: 'Submit experimental writeup with error bounds.', dueDate: '2026-10-06', totalPoints: 30, submitted: false }
    ]
  },
  {
    id: 's3',
    name: 'English Language & Creative Writing',
    code: 'ENG-11',
    teacher: 'Mrs. Sarah Thornton',
    gradeLevel: 'Grade 11A',
    term: 'Term 1',
    description: 'Grammar mechanics, vocabulary development, argumentative essays, summary writing, and rhetorical comprehension.',
    progress: 85,
    color: 'rose',
    resources: [
      { id: 'r6', title: 'Guide to Formal Essays & Persuasive Writing', type: 'PDF', url: '#', size: '1.8 MB' },
      { id: 'r7', title: 'Term 1 Prescribed Poetry & Drama Schedule', type: 'DOC', url: '#', size: '780 KB' },
    ],
    assignments: [
      { id: 'a4', title: 'Persuasive Essay: Social Media & Teen Sleep Habits', description: '500-word formal essay with three body arguments.', dueDate: '2026-09-18', totalPoints: 25, submitted: true, grade: '24/25', feedback: 'Compelling thesis and sophisticated prose.' }
    ]
  },
  {
    id: 's4',
    name: 'Biology & Life Sciences',
    code: 'BIO-11',
    teacher: 'Mrs. Clara Higgins',
    gradeLevel: 'Grade 11A',
    term: 'Term 1',
    description: 'Cell structure, organ systems, plant photosynthesis, nutrition, enzymes, and microscopy laboratory experiments.',
    progress: 70,
    color: 'emerald',
    resources: [
      { id: 'r8', title: 'Cell Structure & Organelle Diagram Sheet', type: 'PDF', url: '#', size: '4.5 MB' },
      { id: 'r9', title: 'Video: Plant Cell vs Animal Cell Under 400x Microscope', type: 'VIDEO', url: '#', size: '18 min' },
    ],
    assignments: [
      { id: 'a5', title: 'Microscopy Drawing: Onion Epidermal Cells', description: 'Biological sketch with accurate magnification labels.', dueDate: '2026-10-09', totalPoints: 20, submitted: false }
    ]
  }
];

// Secondary School Notifications
export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'EXAM',
    title: 'Grade 11 Mathematics Mid-Term Assessment is Active',
    message: 'The online assessment is open on the school portal. Complete before Friday, 16:00.',
    date: 'Today, 08:30 AM',
    isUrgent: true,
    linkTab: 'exams'
  },
  {
    id: 'n2',
    type: 'FEE',
    title: 'Term Textbooks & Stationery Pack Levy Due',
    message: 'An outstanding balance of $120 for learning materials is due at the Bursar’s office.',
    date: 'Yesterday, 13:40 PM',
    isUrgent: true,
    linkTab: 'fees'
  },
  {
    id: 'n3',
    type: 'HOUSE',
    title: 'Inter-House Drama & Poetry Rehearsals',
    message: 'Orion House members report to the School Assembly Hall today at 15:45.',
    date: 'Sep 21, 2026',
    isUrgent: false,
    linkTab: 'dashboard'
  },
  {
    id: 'n4',
    type: 'GENERAL',
    title: 'Mid-Term Break Notice & PTA Open Day',
    message: 'School will observe mid-term break on Oct 23–26. Parent-Teacher consultations on Thursday.',
    date: 'Sep 19, 2026',
    isUrgent: false,
    linkTab: 'dashboard'
  }
];

// Secondary School Report Card Grades (Terminal Assessment)
export const MOCK_REPORT_CARD: ReportCardGrade[] = [
  { id: 'g1', subjectCode: 'MTH-11', subjectName: 'General & Additional Mathematics', classAverage: 76, caScore: 28, examScore: 66, totalScore: 94, letterGrade: 'A*', teacherRemark: 'Exemplary mathematical thinking. An outstanding scholar.', term: 'Term 1' },
  { id: 'g2', subjectCode: 'PHY-11', subjectName: 'Physics & Experimental Mechanics', classAverage: 71, caScore: 26, examScore: 61, totalScore: 87, letterGrade: 'A', teacherRemark: 'Very thorough understanding of kinematics and experimental logs.', term: 'Term 1' },
  { id: 'g3', subjectCode: 'CHM-11', subjectName: 'Chemistry', classAverage: 69, caScore: 27, examScore: 64, totalScore: 91, letterGrade: 'A*', teacherRemark: 'Exceptional lab technique and stoichiometric calculations.', term: 'Term 1' },
  { id: 'g4', subjectCode: 'BIO-11', subjectName: 'Biology & Life Sciences', classAverage: 74, caScore: 27, examScore: 62, totalScore: 89, letterGrade: 'A', teacherRemark: 'Demonstrates deep scientific curiosity and meticulous drawing.', term: 'Term 1' },
  { id: 'g5', subjectCode: 'ENG-11', subjectName: 'English Language & Composition', classAverage: 72, caScore: 28, examScore: 63, totalScore: 91, letterGrade: 'A*', teacherRemark: 'Elegant vocabulary and persuasive reasoning in debate essays.', term: 'Term 1' },
  { id: 'g6', subjectCode: 'LIT-11', subjectName: 'Literature in English', classAverage: 70, caScore: 25, examScore: 60, totalScore: 85, letterGrade: 'A', teacherRemark: 'Insightful thematic analysis of prescribed Shakespeare texts.', term: 'Term 1' },
  { id: 'g7', subjectCode: 'ICT-11', subjectName: 'Computer Studies & Programming', classAverage: 78, caScore: 30, examScore: 68, totalScore: 98, letterGrade: 'A*', teacherRemark: 'Top of class in Python algorithms and robotics projects.', term: 'Term 1' },
  { id: 'g8', subjectCode: 'CIV-11', subjectName: 'Civic Education & Ethics', classAverage: 75, caScore: 26, examScore: 62, totalScore: 88, letterGrade: 'A', teacherRemark: 'Model citizen with active participation in community service.', term: 'Term 1' },
];

// Secondary School Enrolled Students (Grade 11A Class Roster)
export const MOCK_ENROLLED_STUDENTS: EnrolledStudent[] = [
  { id: 'es-1', studentId: 'LA-2024-4920', name: 'Alex Johnson', email: 'alex.j@lightsacademy.edu', gradeLevel: 'Grade 11A', house: 'Orion House', attendanceRate: 97, continuousAssessment: 29, examScore: 66, totalScore: 95, conductRemark: 'Exemplary conduct and school academic prefect.', feeCleared: false, status: 'Merit Standing' },
  { id: 'es-2', studentId: 'LA-2024-4811', name: 'Liam Sterling', email: 'liam.s@lightsacademy.edu', gradeLevel: 'Grade 11A', house: 'Phoenix House', attendanceRate: 94, continuousAssessment: 26, examScore: 60, totalScore: 86, conductRemark: 'Very polite, punctual, and reliable class helper.', feeCleared: true, status: 'Active' },
  { id: 'es-3', studentId: 'LA-2024-4702', name: 'Maya Patel', email: 'maya.p@lightsacademy.edu', gradeLevel: 'Grade 11A', house: 'Pegasus House', attendanceRate: 98, continuousAssessment: 28, examScore: 65, totalScore: 93, conductRemark: 'Keen debater and outstanding house sports captain.', feeCleared: true, status: 'Merit Standing' },
  { id: 'es-4', studentId: 'LA-2024-4599', name: 'Devon Brooks', email: 'devon.b@lightsacademy.edu', gradeLevel: 'Grade 11A', house: 'Falcon House', attendanceRate: 76, continuousAssessment: 19, examScore: 42, totalScore: 61, conductRemark: 'Needs to submit homework on time and seek tutor help.', feeCleared: true, status: 'Needs Improvement' },
  { id: 'es-5', studentId: 'LA-2024-4410', name: 'Chloe Dubois', email: 'chloe.d@lightsacademy.edu', gradeLevel: 'Grade 11A', house: 'Orion House', attendanceRate: 91, continuousAssessment: 25, examScore: 58, totalScore: 83, conductRemark: 'Quiet, diligent, and talented in chemistry practicals.', feeCleared: false, status: 'Active' },
  { id: 'es-6', studentId: 'LA-2025-5112', name: 'Sarah Chen', email: 'sarah.c@lightsacademy.edu', gradeLevel: 'Grade 10B', house: 'Phoenix House', attendanceRate: 96, continuousAssessment: 27, examScore: 62, totalScore: 89, conductRemark: 'Enthusiastic and respectful young scholar.', feeCleared: true, status: 'Merit Standing' },
  { id: 'es-7', studentId: 'LA-2025-5201', name: 'Marcus Thorne Jr.', email: 'marcus.t@lightsacademy.edu', gradeLevel: 'Grade 11A', house: 'Falcon House', attendanceRate: 85, continuousAssessment: 22, examScore: 54, totalScore: 76, conductRemark: 'Active in athletics, needs greater focus in mathematics.', feeCleared: true, status: 'Active' },
  { id: 'es-8', studentId: 'LA-2025-5330', name: 'Amina Al-Hassan', email: 'amina.a@lightsacademy.edu', gradeLevel: 'Grade 11A', house: 'Pegasus House', attendanceRate: 99, continuousAssessment: 30, examScore: 68, totalScore: 98, conductRemark: 'Brilliant scholar, highly disciplined in all subjects.', feeCleared: true, status: 'Merit Standing' },
];
