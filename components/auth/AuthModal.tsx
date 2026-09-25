import React, { useState } from 'react';
import { User } from '../../types';
import { authenticateUser } from '../../services/authService';
import { DEMO_STUDENT, DEMO_STUDENT_2, DEMO_STAFF, DEMO_STAFF_2, SCHOOL_INFO } from '../../constants';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'STUDENT' | 'STAFF';
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'STUDENT',
  onLoginSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'STUDENT' | 'STAFF'>(initialRole);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleQuickDemoLogin = (user: User) => {
    setIsLoading(true);
    setTimeout(() => {
      const res = authenticateUser(user.email, 'demo123', activeTab);
      setIsLoading(false);
      if (res.user) {
        onLoginSuccess(res.user);
        onClose();
      }
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!identifier.trim()) {
      setErrorMessage('Please enter your Admission Number, Staff ID, or School Email');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = authenticateUser(identifier, password, activeTab);
      setIsLoading(false);
      if (res.error) {
        setErrorMessage(res.error);
      } else if (res.user) {
        onLoginSuccess(res.user);
        onClose();
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-serif font-black text-amber-300 text-lg">
              LA
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif tracking-tight">{SCHOOL_INFO.name} Portal</h3>
              <p className="text-xs text-amber-400 font-medium">Secondary School Management System</p>
            </div>
          </div>
          
          <p className="text-xs text-slate-300 mt-2">
            Access pupil terminal report cards, online class quizzes, period timetables, and school fees billing.
          </p>

          {/* Role Switcher Tabs */}
          <div className="mt-5 grid grid-cols-2 p-1 bg-slate-800/80 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => {
                setActiveTab('STUDENT');
                setErrorMessage('');
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'STUDENT'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Pupil / Student Portal
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('STAFF');
                setErrorMessage('');
              }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'STAFF'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Teacher & Staff Portal
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Demo Login Cards */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                1-Click Instant Demo Profiles
              </span>
              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                No password required
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {activeTab === 'STUDENT' ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin(DEMO_STUDENT)}
                    className="p-2.5 text-left border border-slate-200 rounded-xl hover:border-amber-500 hover:bg-amber-50/40 transition-all flex items-center gap-2 group"
                  >
                    <img src={DEMO_STUDENT.avatar} alt="Alex" className="w-8 h-8 rounded-lg object-cover" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 truncate group-hover:text-amber-900">{DEMO_STUDENT.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">Grade 11 · Orion House</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin(DEMO_STUDENT_2)}
                    className="p-2.5 text-left border border-slate-200 rounded-xl hover:border-amber-500 hover:bg-amber-50/40 transition-all flex items-center gap-2 group"
                  >
                    <img src={DEMO_STUDENT_2.avatar} alt="Sarah" className="w-8 h-8 rounded-lg object-cover" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 truncate group-hover:text-amber-900">{DEMO_STUDENT_2.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">Grade 10 · Phoenix House</p>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin(DEMO_STAFF)}
                    className="p-2.5 text-left border border-slate-200 rounded-xl hover:border-amber-500 hover:bg-amber-50/40 transition-all flex items-center gap-2 group"
                  >
                    <img src={DEMO_STAFF.avatar} alt="Mr. Miller" className="w-8 h-8 rounded-lg object-cover" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 truncate group-hover:text-amber-900">{DEMO_STAFF.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">Senior Mathematics Master</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin(DEMO_STAFF_2)}
                    className="p-2.5 text-left border border-slate-200 rounded-xl hover:border-amber-500 hover:bg-amber-50/40 transition-all flex items-center gap-2 group"
                  >
                    <img src={DEMO_STAFF_2.avatar} alt="Mrs. Higgins" className="w-8 h-8 rounded-lg object-cover" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 truncate group-hover:text-amber-900">{DEMO_STAFF_2.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">Head of Science Dept</p>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Or sign in with school ID
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {activeTab === 'STUDENT' ? 'Student Admission No. or School Email' : 'Teacher Staff ID or School Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={activeTab === 'STUDENT' ? 'e.g. LA-2024-4920 or alex.j@lightsacademy.edu' : 'e.g. LA-TCH-0108 or d.miller@lightsacademy.edu'}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">Account Password</label>
                <button
                  type="button"
                  onClick={() => alert('For this demo secondary school system, you can use any password or click a 1-click demo button above.')}
                  className="text-[11px] text-amber-700 hover:text-amber-800 font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span className="text-xs text-slate-600 font-medium">Keep me signed in on this computer</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Secondary Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to {activeTab === 'STUDENT' ? 'Student' : 'Staff / Teacher'} Portal</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer Assistance */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            Parents & Guardians inquiries: Contact{' '}
            <a href="mailto:portal-support@lightsacademy.edu" className="text-slate-800 font-medium underline">
              portal-support@lightsacademy.edu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
