
import React, { useState, useMemo } from 'react';
import { MOCK_SUBJECTS } from '../constants';
import { Subject, SubjectResource } from '../types';

const Subjects: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'code'>('name');

  const filteredSubjects = useMemo(() => {
    let result = MOCK_SUBJECTS.filter((subject) =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.lecturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'code') return a.code.localeCompare(b.code);
      if (sortBy === 'progress') return b.progress - a.progress;
      return 0;
    });

    return result;
  }, [searchQuery, sortBy]);

  const handleDownloadSyllabus = () => {
    // Simulated PDF Download
    const content = "Lights Academy Secondary School - Academic Session 2026/2027\nPrescribed Secondary Subjects & Term 1 Syllabus:\n" + 
      MOCK_SUBJECTS.map(s => `- ${s.name} (${s.code}) - Teacher: ${s.teacher || s.lecturer}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lights-academy-secondary-syllabus-2026.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getResourceIcon = (type: SubjectResource['type'], color: string) => {
    const commonClasses = "w-5 h-5";
    switch (type) {
      case 'PDF':
        return (
          <div className={`p-2 rounded-lg bg-red-100 text-red-600`}>
            <svg className={commonClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </div>
        );
      case 'VIDEO':
        return (
          <div className={`p-2 rounded-lg bg-blue-100 text-blue-600`}>
            <svg className={commonClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        );
      case 'LINK':
        return (
          <div className={`p-2 rounded-lg bg-emerald-100 text-emerald-600`}>
            <svg className={commonClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
          </div>
        );
      case 'DOC':
        return (
          <div className={`p-2 rounded-lg bg-amber-100 text-amber-600`}>
            <svg className={commonClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Enrolled Subjects</h2>
          <p className="text-slate-500 text-sm">Manage your courses, track progress, and access learning materials.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Sorting */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full sm:w-auto px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold bg-white text-slate-600 outline-none hover:border-indigo-300 transition-colors"
          >
            <option value="name">Sort by Name</option>
            <option value="progress">Sort by Progress</option>
            <option value="code">Sort by Course Code</option>
          </select>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Filter by name or lecturer..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={handleDownloadSyllabus}
            className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Download Syllabus
          </button>
        </div>
      </div>

      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSubjects.map((subject) => (
            <div 
              key={subject.id} 
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
            >
              <div className={`h-2 w-full bg-${subject.color}-500`}></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-${subject.color}-50 text-${subject.color}-600`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">{subject.code}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{subject.name}</h3>
                <p className="text-sm text-slate-500 font-medium mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  Subject Teacher: {subject.teacher || subject.lecturer}
                </p>
                
                <p className="text-sm text-slate-600 mb-6 flex-1">{subject.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tight text-slate-400">
                    <span>Term Progress</span>
                    <span className={`text-${subject.color}-600`}>{subject.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${subject.color}-500 transition-all duration-1000`} 
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-slate-50">
                  <button 
                    onClick={() => setSelectedSubject(subject)}
                    className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    Details
                  </button>
                  <button 
                    onClick={() => setSelectedSubject(subject)}
                    className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Resources ({subject.resources.length})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200 animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No subjects found</h3>
          <p className="text-slate-500 max-w-xs mx-auto">We couldn't find any subjects matching your current search or sort criteria. Try a different keyword.</p>
          <button 
            onClick={() => {setSearchQuery(''); setSortBy('name');}}
            className="mt-6 text-indigo-600 font-bold hover:text-indigo-700 underline underline-offset-4"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Resource Modal Overlay */}
      {selectedSubject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedSubject(null)}></div>
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl animate-in zoom-in duration-300">
            <div className={`h-3 w-full bg-${selectedSubject.color}-500`}></div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{selectedSubject.name}</h3>
                  <p className="text-slate-500 font-medium">Lecturer: {selectedSubject.lecturer} • {selectedSubject.code}</p>
                </div>
                <button 
                  onClick={() => setSelectedSubject(null)}
                  className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Course Learning Materials</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedSubject.resources.map((res) => (
                      <div 
                        key={res.id} 
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-md transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          {getResourceIcon(res.type, selectedSubject.color)}
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{res.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                                res.type === 'PDF' ? 'bg-red-50 text-red-500' :
                                res.type === 'VIDEO' ? 'bg-blue-50 text-blue-500' :
                                res.type === 'LINK' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
                              }`}>
                                {res.type}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">Added on Aug 12, 2023</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                          </button>
                          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setSelectedSubject(null)}
                    className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;
