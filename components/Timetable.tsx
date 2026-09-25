import React, { useState } from 'react';
import { TIMETABLE_DATA } from '../constants';
import { TimetableEntry } from '../types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const Timetable: React.FC = () => {
  const [entries, setEntries] = useState<TimetableEntry[]>(TIMETABLE_DATA);
  const [selectedDay, setSelectedDay] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<TimetableEntry | null>(null);

  const [newEvent, setNewEvent] = useState({
    subject: 'Personal Prep & Homework Review',
    teacher: 'Form Tutor Supervised',
    startTime: '15:30',
    endTime: '16:30',
    day: 'Monday',
    room: 'Secondary Library Study Pod 4',
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const created: TimetableEntry = {
      id: `custom-${Date.now()}`,
      period: 'Prep / Homework Period',
      subject: newEvent.subject,
      teacher: newEvent.teacher,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      day: newEvent.day,
      room: newEvent.room,
      color: 'bg-amber-50 text-amber-900 border-amber-200',
      type: 'Workshop',
    };
    setEntries(prev => [...prev, created]);
    setShowAddModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Secondary School Class Periods & Timetable
          </h2>
          <p className="text-xs text-slate-500">
            Term 1 weekly class periods, science laboratories, morning assemblies, and Inter-House sports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-xl shadow-xs hover:bg-slate-50 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print Timetable</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 text-xs font-bold bg-indigo-600 text-white rounded-xl shadow-xs hover:bg-indigo-700 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Prep Slot</span>
          </button>
        </div>
      </div>

      {/* Day Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <button
          onClick={() => setSelectedDay('ALL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedDay === 'ALL'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Full Week Overview
        </button>
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedDay === day
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Lecture Details Modal */}
      {selectedLecture && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {selectedLecture.code || 'COURSE'}
                </span>
                <h3 className="text-base font-bold font-serif text-slate-900 mt-1">{selectedLecture.subject}</h3>
              </div>
              <button onClick={() => setSelectedLecture(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p><strong>Lecturer / Instructor:</strong> {selectedLecture.teacher}</p>
              <p><strong>Scheduled Day:</strong> {selectedLecture.day}</p>
              <p><strong>Time Window:</strong> {selectedLecture.startTime} – {selectedLecture.endTime}</p>
              <p><strong>Location:</strong> {selectedLecture.room}</p>
              <p><strong>Format:</strong> {selectedLecture.type || 'Lecture'}</p>
            </div>

            {selectedLecture.virtualLink ? (
              <a
                href={selectedLecture.virtualLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Join Live Online Lecture Room</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <div className="text-center text-xs text-slate-400 italic">
                In-person lecture. Please proceed to {selectedLecture.room}.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Study Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 font-serif">Add Personal Study Block</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Study Focus / Course</label>
                <input
                  type="text"
                  required
                  value={newEvent.subject}
                  onChange={(e) => setNewEvent({ ...newEvent, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Day</label>
                  <select
                    value={newEvent.day}
                    onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Study Location</label>
                  <input
                    type="text"
                    required
                    value={newEvent.room}
                    onChange={(e) => setNewEvent({ ...newEvent, room: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
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
                  Add to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid Timetable Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
        {selectedDay === 'ALL' ? (
          <div>
            <div className="grid grid-cols-6 border-b border-slate-200 bg-slate-50">
              <div className="p-3.5 border-r border-slate-200 text-[11px] font-bold text-slate-400 uppercase text-center">
                Time
              </div>
              {DAYS.map(day => (
                <div key={day} className="p-3.5 text-center font-bold text-slate-700 uppercase text-xs tracking-wider border-r border-slate-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            <div className="relative">
              {TIMES.map(time => (
                <div key={time} className="grid grid-cols-6 border-b border-slate-100 last:border-b-0 min-h-[85px]">
                  <div className="p-3 text-[11px] font-mono text-slate-400 border-r border-slate-200 flex items-center justify-center bg-slate-50/40">
                    {time}
                  </div>
                  {DAYS.map(day => {
                    const entry = entries.find(e => e.day === day && e.startTime.startsWith(time.split(':')[0]));
                    return (
                      <div key={day} className="p-1.5 border-r border-slate-100 last:border-r-0 relative">
                        {entry && (
                          <div 
                            onClick={() => setSelectedLecture(entry)}
                            className={`${entry.color} p-2.5 rounded-xl border text-xs shadow-xs h-full flex flex-col justify-between hover:scale-[1.02] transition-transform cursor-pointer`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="font-mono text-[9px] uppercase font-bold px-1 rounded bg-black/5">
                                  {entry.code || 'COURSE'}
                                </span>
                              </div>
                              <p className="font-bold truncate text-[11px]">{entry.subject}</p>
                              <p className="opacity-75 text-[10px] truncate">{entry.room}</p>
                            </div>
                            <div className="pt-1 border-t border-black/5 flex items-center justify-between text-[10px]">
                              <span>{entry.startTime}</span>
                              <span className="font-bold underline">Details</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Single Day View */
          <div className="p-6 space-y-4">
            <h3 className="font-bold font-serif text-lg text-slate-900 border-b border-slate-100 pb-2">
              Lectures on {selectedDay}
            </h3>

            {entries.filter(e => e.day === selectedDay).length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs italic">
                No scheduled academic sessions on {selectedDay}.
              </div>
            ) : (
              <div className="space-y-3">
                {entries.filter(e => e.day === selectedDay).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedLecture(item)}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:border-indigo-300 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded font-mono">
                          {item.code || 'COURSE'}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">Instructor: {item.teacher}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{item.subject}</h4>
                      <p className="text-xs text-slate-500">{item.room}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-bold text-slate-900 block font-mono">{item.startTime} – {item.endTime}</span>
                      {item.virtualLink && (
                        <span className="text-xs text-indigo-600 font-bold hover:underline inline-block mt-1">
                          Join Live Room →
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timetable;
