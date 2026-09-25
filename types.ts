export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department?: string;
  studentId?: string; // Admission / Roll Number
  staffId?: string;
  title?: string;
  gradeLevel?: string; // e.g. "Grade 11 (Senior Secondary 2)"
  house?: string; // e.g. "Phoenix House", "Orion House"
  phone?: string;
  bio?: string;
  overallAverage?: number; // e.g. 88.5%
  attendancePercentage?: number;
  term?: string;
  academicYear?: string;
}

export interface TimetableEntry {
  id: string;
  period: string; // e.g. "Period 1 (08:15 - 09:00)"
  subject: string;
  code?: string;
  teacher: string;
  startTime: string;
  endTime: string;
  day: string;
  room: string;
  color: string;
  type?: 'Classroom' | 'Laboratory' | 'Workshop' | 'Assembly' | 'Sports';
  virtualLink?: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  code?: string;
  gradeLevel: string; // e.g. "Grade 11"
  duration: number; // in minutes
  totalMarks: number;
  dueDate?: string;
  term?: string; // e.g. "Term 1 Mid-Term Assessment"
  status?: 'UPCOMING' | 'ACTIVE' | 'COMPLETED';
  questions: Question[];
}

export interface ExamSubmission {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  submittedAt: string;
  answers: Record<string, number>;
}

export interface FeeRecord {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  category?: 'TUITION' | 'LAB' | 'BOARDING' | 'UNIFORM' | 'EXAM_BOARD';
  receiptNumber?: string;
  paidDate?: string;
}

export interface SubjectResource {
  id: string;
  title: string;
  type: 'PDF' | 'VIDEO' | 'LINK' | 'DOC';
  url: string;
  size?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  submitted?: boolean;
  submissionDate?: string;
  grade?: string;
  feedback?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  gradeLevel: string;
  description: string;
  credits?: number;
  term?: string;
  progress: number;
  resources: SubjectResource[];
  assignments?: Assignment[];
  color: string;
}

export interface AppNotification {
  id: string;
  type: 'EXAM' | 'FEE' | 'GENERAL' | 'ACADEMIC' | 'HOUSE';
  title: string;
  message: string;
  date: string;
  isUrgent?: boolean;
  linkTab?: string;
}

export interface AcademicDepartment {
  id: string;
  name: string;
  code: string;
  headOfDepartment: string;
  description: string;
  subjects: string[];
  image: string;
}

export interface SecondaryClassLevel {
  id: string;
  name: string;
  division: 'Junior Secondary (Grades 7–9)' | 'Senior Secondary (Grades 10–12)';
  ageGroup: string;
  description: string;
  keySubjects: string[];
  track?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Academics' | 'Sports & Houses' | 'STEM & Arts' | 'Admissions' | 'PTA & Events';
  date: string;
  summary: string;
  content: string;
  image: string;
  author: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNumber: string;
  candidateName: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  dateOfBirth: string;
  targetGrade: string;
  boardingPreference: 'Day Scholar' | 'Full Boarder';
  previousSchool: string;
  lastTermPercentage: string;
  submissionDate: string;
  status: 'Received' | 'Entrance Exam Scheduled' | 'Offered Admission' | 'Waitlisted';
}

export interface EnrolledStudent {
  id: string;
  studentId: string;
  name: string;
  email: string;
  gradeLevel: string;
  house: string;
  attendanceRate: number;
  continuousAssessment: number; // out of 30
  examScore: number; // out of 70
  totalScore: number; // out of 100
  conductRemark: string;
  feeCleared: boolean;
  status: 'Active' | 'Merit Standing' | 'Needs Improvement';
}

export interface ReportCardGrade {
  id: string;
  subjectCode: string;
  subjectName: string;
  classAverage: number;
  caScore: number; // out of 30
  examScore: number; // out of 70
  totalScore: number; // out of 100
  letterGrade: 'A*' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  teacherRemark: string;
  term: string;
}
