import React, { useState } from 'react';
import { AppNotification } from '../../types';
import { MOCK_NOTIFICATIONS } from '../../constants';

export const StaffAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'EXAM' | 'FEE' | 'GENERAL' | 'ACADEMIC' | 'HOUSE'>('ACADEMIC');
  const [isUrgent, setIsUrgent] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newNotice: AppNotification = {
      id: `notice-${Date.now()}`,
      title,
      message,
      type,
      isUrgent,
      date: 'Just now',
    };

    setAnnouncements([newNotice, ...announcements]);
    setTitle('');
    setMessage('');
    setIsUrgent(false);
    setToast('Secondary notice broadcasted to all pupils and parents.');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toast}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold font-serif text-slate-900">
          Secondary School Notice Board & Circular Broadcaster
        </h2>
        <p className="text-xs text-slate-500">
          Broadcast daily announcements, PTA updates, Inter-House sports notices, and homework reminders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Creator Form */}
        <form onSubmit={handlePost} className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold font-serif text-slate-900">Publish Notice to Pupil Portal</h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Notice Headline *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Inter-House Football Fixtures for Friday"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Notice Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="ACADEMIC">Academic / Homework</option>
                <option value="EXAM">Examination & Quiz</option>
                <option value="HOUSE">House Activities & Sports</option>
                <option value="FEE">Bursar & Term Fee</option>
                <option value="GENERAL">General School Notice</option>
              </select>
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="text-xs font-bold text-rose-600">Urgent Notice</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Notice Content *</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide exact instructions, venue details, or kit requirements..."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Broadcast Notice
          </button>
        </form>

        {/* Live Bulletins */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold font-serif text-slate-900">Active School Circulars ({announcements.length})</h3>
            <span className="text-[11px] text-slate-400">Visible on Pupil Dashboards</span>
          </div>

          <div className="space-y-3">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.type === 'EXAM' ? 'bg-indigo-100 text-indigo-700' :
                      item.type === 'HOUSE' ? 'bg-amber-100 text-amber-800' :
                      item.type === 'FEE' ? 'bg-rose-100 text-rose-700' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {item.type}
                    </span>
                    {item.isUrgent && (
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold">
                        URGENT
                      </span>
                    )}
                  </div>
                  <span className="text-slate-400 text-[11px]">{item.date}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
