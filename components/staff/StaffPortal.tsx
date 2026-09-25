import React, { useState } from 'react';
import { User, EnrolledStudent, Exam } from '../../types';
import { StaffDashboard } from './StaffDashboard';
import { StaffRoster } from './StaffRoster';
import { StaffExams } from './StaffExams';
import { StaffTimetable } from './StaffTimetable';
import { StaffAnnouncements } from './StaffAnnouncements';
import Settings from '../Settings';
import { SCHOOL_INFO } from '../../constants';

interface StaffPortalProps {
  currentUser: User;
  onLogout: () => void;
  onGoToPublic: () => void;
  onSwitchUser: (user: User) => void;
  students: EnrolledStudent[];
  setStudents: React.Dispatch<React.SetStateAction<EnrolledStudent[]>>;
  exams: Exam[];
  setExams: React.Dispatch<React.SetStateAction<Exam[]>>;
}

export const StaffPortal: React.FC<StaffPortalProps> = ({
  currentUser,
  onLogout,
  onGoToPublic,
  onSwitchUser,
  students,
  setStudents,
  exams,
  setExams,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'roster' | 'exams' | 'timetable' | 'announcements' | 'settings'>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Teacher Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'roster', label: 'Pupil Gradebook & Roll', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'exams', label: 'Quiz & Exam Creator', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { id: 'timetable', label: 'Period Timetable', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'announcements', label: 'Broadcast Notices', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    { id: 'settings', label: 'Teacher Profile', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-300 z-50 flex flex-col justify-between border-r border-slate-800">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center font-serif font-black text-slate-950 text-base shadow-sm">
                LA
              </div>
              <div>
                <h1 className="text-base font-bold text-white font-serif tracking-tight">{SCHOOL_INFO.name}</h1>
                <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">Teacher Portal</p>
              </div>
            </div>
          </div>

          {/* Quick Return to Public Site */}
          <div className="px-4 pt-4">
            <button
              onClick={onGoToPublic}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700/60 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to School Website</span>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-4 px-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Card & Sign Out */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-3 p-2 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border border-amber-400/40"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-amber-400 font-mono truncate">{currentUser.staffId || 'Staff ID: LA-TCH-0108'}</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full py-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-xl text-xs font-bold border border-rose-900/50 transition-all flex items-center justify-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 sm:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Navbar */}
          <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="font-bold text-slate-900 font-serif">{SCHOOL_INFO.name} Teacher CMS</span>
              <span>/</span>
              <span className="capitalize text-indigo-700 font-bold">{activeTab}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onGoToPublic}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold px-3 py-1.5 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                🌐 School Website
              </button>

              <button
                onClick={() => setActiveTab('announcements')}
                className="p-2 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl relative"
                title="Broadcast Notice"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="animate-in fade-in duration-300">
            {activeTab === 'dashboard' && (
              <StaffDashboard
                currentUser={currentUser}
                students={students}
                exams={exams}
                onNavigate={(t) => setActiveTab(t as any)}
              />
            )}
            {activeTab === 'roster' && (
              <StaffRoster students={students} setStudents={setStudents} />
            )}
            {activeTab === 'exams' && (
              <StaffExams exams={exams} setExams={setExams} />
            )}
            {activeTab === 'timetable' && (
              <StaffTimetable />
            )}
            {activeTab === 'announcements' && (
              <StaffAnnouncements />
            )}
            {activeTab === 'settings' && (
              <Settings />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
