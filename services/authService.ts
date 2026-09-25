import { User, UserRole } from '../types';
import { DEMO_STUDENT, DEMO_STUDENT_2, DEMO_STAFF, DEMO_STAFF_2 } from '../constants';

const AUTH_STORAGE_KEY = 'lightsacademy_auth_user';

export const ALL_DEMO_USERS: User[] = [
  DEMO_STUDENT,
  DEMO_STUDENT_2,
  DEMO_STAFF,
  DEMO_STAFF_2
];

export const getStoredUser = (): User | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user: User | null): void => {
  try {
    if (!user) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Failed to update auth storage', e);
  }
};

export const authenticateUser = (
  identifier: string,
  password?: string,
  roleTarget?: 'STUDENT' | 'STAFF'
): { user: User | null; error?: string } => {
  const cleanId = identifier.trim().toLowerCase();

  // Find demo account
  const match = ALL_DEMO_USERS.find(u => {
    const emailMatch = u.email.toLowerCase() === cleanId;
    const studentIdMatch = u.studentId?.toLowerCase() === cleanId;
    const staffIdMatch = u.staffId?.toLowerCase() === cleanId;
    return emailMatch || studentIdMatch || staffIdMatch;
  });

  if (match) {
    if (roleTarget === 'STUDENT' && match.role !== UserRole.STUDENT) {
      return { user: null, error: 'This ID belongs to secondary teaching staff. Please use the Staff / Teacher Portal sign-in.' };
    }
    if (roleTarget === 'STAFF' && match.role === UserRole.STUDENT) {
      return { user: null, error: 'This ID belongs to a secondary school student. Please use the Student Portal sign-in.' };
    }
    setStoredUser(match);
    return { user: match };
  }

  // Fallback for custom logins
  if (roleTarget === 'STUDENT' || cleanId.includes('student') || cleanId.includes('std')) {
    const customStudent: User = {
      id: `std-${Date.now().toString().slice(-4)}`,
      name: identifier.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: cleanId.includes('@') ? cleanId : `${cleanId}@lightsacademy.edu`,
      role: UserRole.STUDENT,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      studentId: `LA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      department: 'Senior Secondary',
      title: 'Secondary Student (Grade 11)',
      gradeLevel: 'Grade 11 (Senior Secondary)',
      house: 'Orion House',
      overallAverage: 88.5,
      attendancePercentage: 96,
      term: 'Term 1',
    };
    setStoredUser(customStudent);
    return { user: customStudent };
  }

  if (roleTarget === 'STAFF' || cleanId.includes('staff') || cleanId.includes('tch') || cleanId.includes('mr') || cleanId.includes('mrs')) {
    const customStaff: User = {
      id: `tch-${Date.now().toString().slice(-4)}`,
      name: identifier.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: cleanId.includes('@') ? cleanId : `${cleanId}@lightsacademy.edu`,
      role: UserRole.STAFF,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      staffId: `LA-TCH-${Math.floor(100 + Math.random() * 900)}`,
      department: 'Department of Sciences & Mathematics',
      title: 'Subject Teacher & Form Tutor',
    };
    setStoredUser(customStaff);
    return { user: customStaff };
  }

  // Generic secondary student fallback
  const genericStudent: User = {
    id: `usr-${Date.now().toString().slice(-4)}`,
    name: identifier.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Secondary Pupil',
    email: cleanId.includes('@') ? cleanId : `${cleanId}@lightsacademy.edu`,
    role: UserRole.STUDENT,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    studentId: `LA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    department: 'Senior Secondary',
    gradeLevel: 'Grade 10',
    house: 'Phoenix House',
    overallAverage: 86.0,
    attendancePercentage: 94,
    term: 'Term 1'
  };
  setStoredUser(genericStudent);
  return { user: genericStudent };
};

export const logoutUser = (): void => {
  setStoredUser(null);
};
