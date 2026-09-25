import React, { useState } from 'react';
import { TimetableEntry } from '../../types';
import { TIMETABLE_DATA } from '../../constants';

export const StaffTimetable: React.FC = () => {
  const [entries, setEntries] = useState<TimetableEntry[]>(TIMETABLE_DATA);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    subject: 'Senior Mathematics (Form 11A)',
    code: 'MTH-11',
    period: 'Period 3 (10:15 - 11:00)',
    teacher: 'Mr. David Miller',
    startTime: '10:15',
    endTime: '11:00',
    day: 'Wednesday',
    room: 'Classroom 11A',
    type: 'Classroom' as 'Classroom' | 'Laboratory' | 'Workshop' | 'Assembly' | 'Sports',
    virtualLink: 'https://classroom.lightsacademy.edu/math11'
  });

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    const created: TimetableEntry = {
      id: `period-${Date.now()}`,
      period: newEntry.period,
      subject: newEntry.subject,
      code: newEntry.code,
      teacher: newEntry.teacher,
      startTime: newEntry.startTime,
      endTime: newEntry.endTime,
      day: newEntry.day,
      room: newEntry.room,
      color: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      type: newEntry.type,
      virtualLink: newEntry.virtualLink,
    };
    setEntries(prev => [...prev, created]);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Secondary School Period Schedule & Room Allocations
          </h2>
          <p className="text-xs text-slate-500">
            View allocated periods, science wet labs, assembly supervision, and book remedial tutorial rooms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Assign Teaching Period</span>
          </button>
        </div>
      </div>

      {/* Add Period Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Assign Secondary Class Period</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleAddSession} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject & Form/Class</label>
                <input
                  type="text"
                  required
                  value={newEntry.subject}
                  onChange={(e) => setNewEntry({ ...newEntry, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Day of Week</label>
                  <select
                    value={newEntry.day}
                    onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Period Format</label>
                  <select
                    value={newEntry.type}
                    onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Classroom">Classroom Lesson</option>
                    <option value="Laboratory">Science Laboratory</option>
                    <option value="Workshop">ICT / Coding Suite</option>
                    <option value="Sports">Inter-House Sports</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={newEntry.startTime}
                    onChange={(e) => setNewEntry({ ...newEntry, startTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={newEntry.endTime}
                    onChange={(e) => setNewEntry({ ...newEntry, endTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Classroom / Lab Location</label>
                <input
                  type="text"
                  required
                  value={newEntry.room}
                  onChange={(e) => setNewEntry({ ...newEntry, room: e.target.value })}
                  placeholder="e.g. Science Lab 1 or Classroom 11A"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold"
                >
                  Confirm Period Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {DAYS.map((day) => {
          const dayEntries = entries.filter(e => e.day === day);
          return (
            <div key={day} className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">{day}</h3>
                <span className="text-[10px] font-bold text-slate-400">{dayEntries.length} Periods</span>
              </div>

              {dayEntries.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs italic">
                  No teaching periods
                </div>
              ) : (
                <div className="space-y-2.5">
                  {dayEntries.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs space-y-1.5 hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                          {item.code || 'MTH-11'}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500">
                          {item.startTime} - {item.endTime}
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 leading-tight">{item.subject}</p>
                      <p className="text-[11px] text-slate-500">{item.room}</p>
                      {item.virtualLink && (
                        <a
                          href={item.virtualLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-indigo-600 font-bold hover:underline block pt-1"
                        >
                          Join Class Room →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
