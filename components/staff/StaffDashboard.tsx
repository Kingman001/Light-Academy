import React from 'react';
import { User, EnrolledStudent, Exam } from '../../types';
import { TIMETABLE_DATA, SCHOOL_INFO } from '../../constants';

interface StaffDashboardProps {
  currentUser: User;
  students: EnrolledStudent[];
  exams: Exam[];
  onNavigate: (tab: string) => void;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({
  currentUser,
  students,
  exams,
  onNavigate,
}) => {
  const needsAttention = students.filter(s => s.status === 'Needs Improvement');
  const unclearedFeesCount = students.filter(s => !s.feeCleared).length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/30">
              Secondary Staff & Teacher Portal
            </span>
            <span className="text-xs text-slate-400">ID: {currentUser.staffId || 'LA-TCH-0108'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
            Welcome back, {currentUser.name}
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            {currentUser.title || 'Senior Mathematics Master'} · {currentUser.department || 'Department of Sciences & Mathematics'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('exams')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Class Quiz / Exam</span>
          </button>
          <button
            onClick={() => onNavigate('roster')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all"
          >
            Mark Roll-Call Attendance
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Form 11A Pupils</span>
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-bold font-serif text-slate-900">{students.length} Pupils</div>
          <p className="text-[11px] text-slate-500">Grade 11A Science & Mathematics Roll</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Assessments</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-bold font-serif text-slate-900">{exams.length} Quizzes</div>
          <p className="text-[11px] text-emerald-600 font-medium">Automatic marking active</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Academic Intervention</span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-bold font-serif text-slate-900">{needsAttention.length} Pupils</div>
          <p className="text-[11px] text-rose-600 font-medium">Extra homework tutoring assigned</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bursary Clearance</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="text-2xl font-bold font-serif text-slate-900">{unclearedFeesCount} Pending</div>
          <p className="text-[11px] text-slate-500">Require term fee settlement</p>
        </div>
      </div>

      {/* Teaching Periods & Class Roster Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Class Periods */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-serif text-slate-900">Today’s Teaching Periods</h3>
              <p className="text-xs text-slate-400">Class periods, morning assembly & laboratory sessions</p>
            </div>
            <button
              onClick={() => onNavigate('timetable')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Full Periods Grid →
            </button>
          </div>

          <div className="space-y-3">
            {TIMETABLE_DATA.slice(0, 4).map((entry) => (
              <div
                key={entry.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4 hover:border-slate-200 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                      {entry.day} · {entry.period.split('(')[0]}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{entry.code}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">{entry.subject}</h4>
                  <p className="text-xs text-slate-500">{entry.room} · Form Master: {entry.teacher}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-bold text-slate-900 block font-mono">{entry.startTime} – {entry.endTime}</span>
                  {entry.virtualLink && (
                    <a
                      href={entry.virtualLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-indigo-600 hover:underline font-medium inline-block mt-1"
                    >
                      Classroom Link →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pupil Roster Quick View */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-serif text-slate-900">Pupils in Form 11A</h3>
              <p className="text-xs text-slate-400">Continuous Assessment & House placement</p>
            </div>
            <button
              onClick={() => onNavigate('roster')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Open Gradebook →
            </button>
          </div>

          <div className="space-y-2.5">
            {students.slice(0, 5).map((student) => (
              <div
                key={student.id}
                className="p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs hover:bg-slate-50/50"
              >
                <div>
                  <p className="font-bold text-slate-800">{student.name}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{student.studentId} · {student.house}</p>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-xs font-semibold text-slate-700">CA: {student.continuousAssessment}/30 · Total: {student.totalScore}%</span>
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      student.feeCleared ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {student.feeCleared ? 'Fee Cleared' : 'Fee Due'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
