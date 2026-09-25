import React, { useState } from 'react';
import { ACADEMIC_DEPARTMENTS, SECONDARY_CLASS_LEVELS } from '../../constants';

interface AcademicsPageProps {
  onOpenApply: () => void;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({ onOpenApply }) => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDepts = ACADEMIC_DEPARTMENTS.filter((dept) => {
    const matchesDept = selectedDept === 'all' || dept.id === selectedDept;
    const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Secondary School Curricula
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-serif text-slate-950 tracking-tight">
          Junior & Senior Secondary Academics
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Balancing foundational general education in the junior forms with specialized Science, Arts, and Business tracks in the senior forms.
        </p>
      </div>

      {/* Grade Divisions Strip */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Secondary School Grade Divisions
          </h2>
          <p className="text-xs text-slate-500">
            Structure of academic advancement from Form 1 through Form 6 (Grades 7 to 12).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SECONDARY_CLASS_LEVELS.map((lvl) => (
            <div key={lvl.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200/60">
                    {lvl.division}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{lvl.ageGroup}</span>
                </div>
                <h3 className="text-base font-bold font-serif text-slate-900">{lvl.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{lvl.description}</p>
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Key Subjects Taught:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {lvl.keySubjects.map((sub, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Track: {lvl.track}</span>
                <button
                  onClick={onOpenApply}
                  className="font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Enrollment Info →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Subject Departments */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              Secondary Subject Departments
            </h2>
            <p className="text-xs text-slate-500">
              Specialist faculty preparing students for national and international secondary school qualifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search subjects (e.g. Physics, French)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 w-56 sm:w-64"
            />
            {selectedDept !== 'all' && (
              <button
                onClick={() => setSelectedDept('all')}
                className="text-xs text-rose-600 hover:underline font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepts.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 font-mono">
                    {dept.code}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{dept.subjects.length} Subjects</span>
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900">{dept.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{dept.description}</p>
                
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Subjects Offered:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dept.subjects.map((sub, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 truncate">HOD: {dept.headOfDepartment}</span>
                <button
                  onClick={onOpenApply}
                  className="font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Apply →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary School Term Calendar 2026/2027 */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">School Calendar</span>
          <h2 className="text-2xl font-bold font-serif tracking-tight">Academic Year 2026/2027 Term Dates</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-1.5">
            <p className="text-amber-400 font-bold">Term 1 (Michaelmas Term)</p>
            <p className="text-white font-semibold text-sm">Sept 07 – Dec 12, 2026</p>
            <p className="text-slate-300">Resumption: Sept 7 · Mid-Term: Oct 23–26</p>
            <p className="text-slate-400 text-[11px]">Term Exams: Dec 01–09 · Carol Service: Dec 11</p>
          </div>
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-1.5">
            <p className="text-amber-400 font-bold">Term 2 (Lent Term)</p>
            <p className="text-white font-semibold text-sm">Jan 11 – Apr 03, 2027</p>
            <p className="text-slate-300">Resumption: Jan 11 · Mid-Term: Feb 19–22</p>
            <p className="text-slate-400 text-[11px]">Inter-House Sports: Feb 28 · Term Exams: Mar 22–30</p>
          </div>
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-1.5">
            <p className="text-amber-400 font-bold">Term 3 (Trinity Term)</p>
            <p className="text-white font-semibold text-sm">Apr 26 – Jul 17, 2027</p>
            <p className="text-slate-300">Resumption: Apr 26 · Mock Exams: May 17–25</p>
            <p className="text-slate-400 text-[11px]">Final Promotional Exams: Jun 28–Jul 08 · Speech Day: Jul 16</p>
          </div>
        </div>
      </div>
    </div>
  );
};
