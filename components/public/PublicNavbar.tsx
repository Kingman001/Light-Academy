import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { SCHOOL_INFO } from '../../constants';

interface PublicNavbarProps {
  currentPublicPage: string;
  setCurrentPublicPage: (page: string) => void;
  currentUser: User | null;
  onOpenAuth: (role: 'STUDENT' | 'STAFF') => void;
  onGoToPortal: (role?: 'STUDENT' | 'STAFF') => void;
  onOpenApply: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentPublicPage,
  setCurrentPublicPage,
  currentUser,
  onOpenAuth,
  onGoToPortal,
  onOpenApply,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'academics', label: 'Academics & Curricula' },
    { id: 'admissions', label: 'Admissions & Fees' },
    { id: 'campus', label: 'Campus & Boarding' },
    { id: 'news', label: 'News & Sports' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPublicPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Top Academic Secondary School Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              2026/2027 Admissions Open · Grades 7 to 12 (Junior & Senior Secondary)
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400 text-[11px]">
              {SCHOOL_INFO.accreditation}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a href="tel:+18005555444" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 (800) 555-LIGHT</span>
            </a>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-amber-400 transition-colors"
            >
              School Bursary & Administration
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* School Crest & Identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-400/40 flex items-center justify-center shadow-md group-hover:border-amber-400 transition-colors">
              <div className="text-center">
                <span className="font-serif font-black text-amber-400 text-xl leading-none">LA</span>
                <div className="w-4 h-0.5 bg-amber-400/70 mx-auto mt-0.5"></div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-2xl tracking-tight text-slate-950 group-hover:text-slate-800 transition-colors">
                  {SCHOOL_INFO.name}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300/80">
                  Secondary School
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Junior & Senior Secondary College Preparatory
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPublicPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-slate-950 bg-slate-100 font-bold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Portal Links & Actions in Navigation Bar */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Pupil Portal Navbar Button */}
            <button
              onClick={() => onGoToPortal('STUDENT')}
              className="px-3.5 py-2 text-slate-800 hover:text-slate-950 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all border border-slate-300/80 flex items-center gap-1.5 shadow-2xs"
              title="Access Pupil Terminal Reports, Quizzes, Fees and Timetables"
            >
              <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span>Pupil Portal</span>
            </button>

            {/* Teacher Portal Navbar Button */}
            <button
              onClick={() => onGoToPortal('STAFF')}
              className="px-3.5 py-2 text-slate-800 hover:text-slate-950 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all border border-slate-300/80 flex items-center gap-1.5 shadow-2xs"
              title="Access Teacher Gradebook, Exam Authoring, and Roll Call"
            >
              <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Teacher Portal</span>
            </button>

            {/* Active User Badge / Switcher */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-slate-800 transition-all flex items-center gap-2 border border-slate-700"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-amber-400"
                  />
                  <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                  <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs space-y-1 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[10px] text-amber-700 font-semibold">{currentUser.role === UserRole.STUDENT ? 'Pupil (Grade 11)' : 'Senior Teacher'}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onGoToPortal();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-amber-50 rounded-lg font-bold text-amber-950 flex items-center gap-2"
                    >
                      <span>Enter My Active Portal</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onGoToPortal(currentUser.role === UserRole.STUDENT ? 'STAFF' : 'STUDENT');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-lg text-slate-700 flex items-center gap-2"
                    >
                      <span>Switch to {currentUser.role === UserRole.STUDENT ? 'Teacher' : 'Pupil'} Portal</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAuth('STUDENT');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-100 rounded-lg text-slate-700"
                    >
                      Sign In with Another ID
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Primary Action: Apply for Admission */}
            <button
              onClick={onOpenApply}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-extrabold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <span>Apply for Admission</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onGoToPortal('STUDENT')}
              className="px-2.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
            >
              Portals
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  currentPublicPage === link.id
                    ? 'bg-slate-100 text-slate-900 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Portals Bar */}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGoToPortal('STUDENT');
                }}
                className="py-2.5 px-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-center hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Pupil Portal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGoToPortal('STAFF');
                }}
                className="py-2.5 px-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-center hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                Teacher Portal
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-extrabold text-center transition-all"
            >
              Apply for Grade 7–12 Admission
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
