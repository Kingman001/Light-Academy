import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAIPerformanceInsight } from '../services/geminiService';
import { MOCK_NOTIFICATIONS, DEMO_STUDENT } from '../constants';

const termPerformanceData = [
  { name: 'Week 2 Quiz', score: 86 },
  { name: 'Week 4 HW', score: 92 },
  { name: 'Mid-Term Test', score: 94 },
  { name: 'Lab Practical', score: 90 },
  { name: 'Mock Exam', score: 95 },
];

export const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const fetchInsight = async () => {
    setLoadingInsight(true);
    const res = await getAIPerformanceInsight(termPerformanceData);
    setInsight(res);
    setLoadingInsight(false);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white">
              Grade 11A · Senior Secondary
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300/80">
              {DEMO_STUDENT.house}
            </span>
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Welcome back, {DEMO_STUDENT.name}!
          </h2>
          <p className="text-xs text-slate-500">
            Term 1 (Michaelmas) Continuous Assessment & Academic Performance Overview
          </p>
        </div>

        <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Term Standing</span>
          <span className="text-sm font-bold text-slate-900 font-serif">Academic Prefect · Merit Standing</span>
        </div>
      </header>

      {/* Stats Grid with Uniform Palette */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Term Attendance', value: '97%', sub: '68 of 70 days present', bg: 'bg-slate-900', badgeColor: 'text-emerald-700' },
          { label: 'Cumulative Average', value: '91.4%', sub: 'Top 5% in Form 11A', bg: 'bg-amber-500', badgeColor: 'text-amber-800' },
          { label: 'Weekly Homework', value: '3 Active', sub: 'Maths HW due Friday', bg: 'bg-slate-800', badgeColor: 'text-slate-700' },
          { label: 'Library Textbooks', value: '2 Borrowed', sub: 'Cambridge Physics & Bio', bg: 'bg-amber-600', badgeColor: 'text-amber-800' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80">
            <div className={`w-9 h-9 ${stat.bg} rounded-xl mb-3 flex items-center justify-center text-white`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-slate-400 text-xs font-medium">{stat.label}</p>
            <h3 className="text-2xl font-black font-serif text-slate-900 mt-0.5">{stat.value}</h3>
            <p className="text-[11px] text-slate-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart with Uniform Navy & Gold theme */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold font-serif text-slate-900">Term 1 Continuous Assessment Trend</h3>
              <p className="text-xs text-slate-400">Weekly quizzes, laboratory practicals, and mid-term evaluations</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl px-3 py-1.5 outline-none text-slate-700">
              <option>Term 1 (Current)</option>
              <option>Past Academic Year</option>
            </select>
          </div>

          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={termPerformanceData}>
                <defs>
                  <linearGradient id="colorScoreSec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} domain={[60, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
                />
                <Area type="monotone" dataKey="score" stroke="#d97706" strokeWidth={2.5} fillOpacity={1} fill="url(#colorScoreSec)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Secondary Study Tutor */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg flex flex-col justify-between space-y-4 border border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center font-bold text-slate-950 shadow-sm font-serif">
                AI
              </div>
              <div>
                <h3 className="font-bold text-sm font-serif text-white">Secondary Study Mentor</h3>
                <p className="text-slate-400 text-[11px]">Personalized revision guidance</p>
              </div>
            </div>
            
            <div className="overflow-y-auto bg-slate-800/70 rounded-xl p-3.5 text-xs leading-relaxed max-h-48 border border-slate-700/60">
              {loadingInsight ? (
                <div className="flex flex-col items-center justify-center py-6 gap-2">
                  <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-400 text-xs">Analyzing homework & test trends...</p>
                </div>
              ) : insight ? (
                <p className="whitespace-pre-line text-slate-200">{insight}</p>
              ) : (
                <p className="text-slate-400 italic">
                  Click below to generate personalized homework recommendations, revision strategies, and secondary examination tips.
                </p>
              )}
            </div>
          </div>

          <button 
            onClick={fetchInsight}
            disabled={loadingInsight}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {insight ? 'Refresh Study Guidance' : 'Generate Study Guidance'}
          </button>
        </div>
      </div>

      {/* Secondary Notifications & School Bulletins */}
      <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 font-serif text-base flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Secondary School Notices & Circulars
          </h3>
          <span className="text-[10px] font-bold text-slate-900 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase border border-amber-300">
            {MOCK_NOTIFICATIONS.length} Active Circulars
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_NOTIFICATIONS.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-2xl border flex gap-3 transition-all ${
                notif.isUrgent ? 'bg-rose-50/40 border-rose-200' : 'bg-slate-50/60 border-slate-200/80'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                notif.type === 'EXAM' ? 'bg-amber-100 text-amber-800' : 
                notif.type === 'FEE' ? 'bg-slate-200 text-slate-800' :
                notif.type === 'HOUSE' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-slate-200 text-slate-700'
              }`}>
                {notif.type === 'EXAM' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                {notif.type === 'FEE' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                {notif.type === 'HOUSE' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                {notif.type === 'GENERAL' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-bold text-xs ${notif.isUrgent ? 'text-rose-700' : 'text-slate-800'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400">{notif.date}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{notif.message}</p>
                {notif.isUrgent && (
                  <span className="inline-block text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                    Action Required by Form Tutor
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
