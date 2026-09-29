import React, { useState, useEffect } from 'react';
import { User, UserRole, EnrolledStudent, Exam } from './types';
import { getStoredUser, logoutUser } from './services/authService';
import { MOCK_ENROLLED_STUDENTS, MOCK_EXAMS, DEMO_STUDENT, DEMO_STAFF } from './constants';

// Public Components
import { PublicNavbar } from './components/public/PublicNavbar';
import { PublicFooter } from './components/public/PublicFooter';
import { HomePage } from './components/public/HomePage';
import { AboutPage } from './components/public/AboutPage';
import { AcademicsPage } from './components/public/AcademicsPage';
import { AdmissionsPage } from './components/public/AdmissionsPage';
import { CampusLifePage } from './components/public/CampusLifePage';
import { NewsPage } from './components/public/NewsPage';
import { ContactPage } from './components/public/ContactPage';

// Auth Component
import { AuthModal } from './components/auth/AuthModal';

// Student Portal Components
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Timetable from './components/Timetable';
import ExamList from './components/ExamList';
import FeePayment from './components/FeePayment';
import Subjects from './components/Subjects';
import Settings from './components/Settings';
import { Transcript } from './components/Transcript';

// Staff Portal Component
import { StaffPortal } from './components/staff/StaffPortal';

export const App: React.FC = () => {
  // Current high-level view: 'public' | 'student-portal' | 'staff-portal'
  const [currentView, setCurrentView] = useState<'public' | 'student-portal' | 'staff-portal'>('public');
  const [currentPublicPage, setCurrentPublicPage] = useState<string>('home');
  const [activeStudentTab, setActiveStudentTab] = useState<string>('dashboard');
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(() => getStoredUser() || DEMO_STUDENT);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<'STUDENT' | 'STAFF'>('STUDENT');

  // Shared state between Staff and Student portals
  const [students, setStudents] = useState<EnrolledStudent[]>(MOCK_ENROLLED_STUDENTS);
  const [exams, setExams] = useState<Exam[]>(MOCK_EXAMS);

  // Notifications drawer state
  const [showNotifications, setShowNotifications] = useState(false);

  const handleOpenAuth = (role: 'STUDENT' | 'STAFF') => {
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === UserRole.STAFF || user.role === UserRole.TEACHER || user.role === UserRole.ADMIN) {
      setCurrentView('staff-portal');
    } else {
      setCurrentView('student-portal');
    }
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setCurrentView('public');
  };

  const handleGoToPortal = (targetRole?: 'STUDENT' | 'STAFF') => {
    if (targetRole === 'STUDENT') {
      if (!currentUser || currentUser.role !== UserRole.STUDENT) {
        setCurrentUser(DEMO_STUDENT);
      }
      setCurrentView('student-portal');
      return;
    }
    if (targetRole === 'STAFF') {
      if (!currentUser || (currentUser.role !== UserRole.STAFF && currentUser.role !== UserRole.TEACHER)) {
        setCurrentUser(DEMO_STAFF);
      }
      setCurrentView('staff-portal');
      return;
    }
    if (!currentUser) {
      handleOpenAuth('STUDENT');
      return;
    }
    if (currentUser.role === UserRole.STAFF || currentUser.role === UserRole.TEACHER) {
      setCurrentView('staff-portal');
    } else {
      setCurrentView('student-portal');
    }
  };

  // Quick switch between demo personas
  const handleQuickSwitchTo = (persona: 'STUDENT' | 'STAFF') => {
    if (persona === 'STUDENT') {
      setCurrentUser(DEMO_STUDENT);
      setCurrentView('student-portal');
    } else {
      setCurrentUser(DEMO_STAFF);
      setCurrentView('staff-portal');
    }
  };

  const renderStudentContent = () => {
    switch (activeStudentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'subjects':
        return <Subjects />;
      case 'timetable':
        return <Timetable />;
      case 'exams':
        return <ExamList exams={exams} />;
      case 'fees':
        return <FeePayment />;
      case 'transcript':
        return <Transcript currentUser={currentUser || DEMO_STUDENT} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const renderPublicContent = () => {
    switch (currentPublicPage) {
      case 'home':
        return (
          <HomePage
            setCurrentPublicPage={setCurrentPublicPage}
            onOpenAuth={handleOpenAuth}
            onOpenApply={() => {
              setCurrentPublicPage('admissions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'about':
        return (
          <AboutPage
            setCurrentPublicPage={setCurrentPublicPage}
            onOpenApply={() => {
              setCurrentPublicPage('admissions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'academics':
        return (
          <AcademicsPage
            onOpenApply={() => {
              setCurrentPublicPage('admissions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'admissions':
        return <AdmissionsPage onOpenAuth={handleOpenAuth} />;
      case 'campus':
        return (
          <CampusLifePage
            onOpenApply={() => {
              setCurrentPublicPage('admissions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'news':
        return <NewsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <HomePage
            setCurrentPublicPage={setCurrentPublicPage}
            onOpenAuth={handleOpenAuth}
            onOpenApply={() => {
              setCurrentPublicPage('admissions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* VIEW 1: PUBLIC CMS SCHOOL WEBSITE */}
      {currentView === 'public' && (
        <div className="flex flex-col min-h-screen">
          <PublicNavbar
            currentPublicPage={currentPublicPage}
            setCurrentPublicPage={setCurrentPublicPage}
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onGoToPortal={handleGoToPortal}
            onOpenApply={() => {
              setCurrentPublicPage('admissions');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <main className="flex-1">
            {renderPublicContent()}
          </main>

          <PublicFooter
            setCurrentPublicPage={setCurrentPublicPage}
            onOpenAuth={handleOpenAuth}
          />
        </div>
      )}

      {/* VIEW 2: STAFF & FACULTY PORTAL */}
      {currentView === 'staff-portal' && (
        <StaffPortal
          currentUser={currentUser || DEMO_STAFF}
          onLogout={handleLogout}
          onGoToPublic={() => setCurrentView('public')}
          onSwitchUser={(user) => setCurrentUser(user)}
          students={students}
          setStudents={setStudents}
          exams={exams}
          setExams={setExams}
        />
      )}

      {/* VIEW 3: STUDENT PORTAL */}
      {currentView === 'student-portal' && (
        <div className="min-h-screen bg-slate-100/70 flex">
          {/* Sidebar Navigation */}
          <Sidebar
            activeTab={activeStudentTab}
            setActiveTab={setActiveStudentTab}
            currentUser={currentUser || DEMO_STUDENT}
            onLogout={handleLogout}
            onGoToPublic={() => setCurrentView('public')}
          />

          {/* Main Content Area */}
          <main className="flex-1 ml-64 p-6 sm:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Top Navbar */}
              <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                {/* Search / Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-slate-900 font-serif">Lights Academy Pupil</span>
                  <span>/</span>
                  <span className="capitalize text-amber-800 font-bold">{activeStudentTab}</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Public Site Button */}
                  <button
                    onClick={() => setCurrentView('public')}
                    className="text-xs text-slate-700 hover:text-slate-950 font-semibold px-3 py-1.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    🌐 School Website
                  </button>

                  {/* Switch to Teacher Portal */}
                  <button
                    onClick={() => handleQuickSwitchTo('STAFF')}
                    className="text-[11px] text-slate-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 font-bold px-2.5 py-1.5 rounded-lg transition-colors hidden md:block"
                  >
                    Switch to Teacher Portal →
                  </button>

                  {/* Notifications */}
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="w-9 h-9 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 relative transition-all"
                      aria-label="Notifications"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
                    </button>

                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-xs space-y-3 animate-in fade-in zoom-in-95">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-900">Notifications & Alerts</span>
                          <span className="text-[10px] text-slate-400 font-bold">2 Urgent</span>
                        </div>
                        <div className="space-y-2">
                          <div 
                            onClick={() => {
                              setActiveStudentTab('exams');
                              setShowNotifications(false);
                            }}
                            className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 cursor-pointer hover:bg-amber-100/60 transition-colors"
                          >
                            <span className="font-bold text-amber-950 block">Mid-Term Mathematics Exam Live</span>
                            <span className="text-[11px] text-slate-600">Open for immediate submission. Click to take.</span>
                          </div>
                          <div 
                            onClick={() => {
                              setActiveStudentTab('fees');
                              setShowNotifications(false);
                            }}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
                          >
                            <span className="font-bold text-slate-900 block">Science Lab Fee Balance</span>
                            <span className="text-[11px] text-slate-600">$140 due for examination clearance.</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Profile Avatar */}
                  <div
                    onClick={() => setActiveStudentTab('settings')}
                    className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 cursor-pointer hover:ring-2 hover:ring-amber-400 transition-all"
                  >
                    <img
                      src={currentUser?.avatar || DEMO_STUDENT.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Content */}
              <div className="animate-in fade-in duration-300">
                {renderStudentContent()}
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authModalRole}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;
