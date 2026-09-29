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
      (subject.teacher || subject.lecturer).toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    const content = "Lights Academy Secondary School - Academic Session 2026/2027\nPrescribed Secondary Subjects & Term 1 Syllabus:\n" + 
      MOCK_SUBJECTS.map(s => `- ${s.name} (${s.code}) - Subject Master: ${s.teacher || s.lecturer}`).join('\n');
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

  const getResourceIcon = (type: SubjectResource['type']) => {
    const commonClasses = "w-5 h-5";
    switch (type) {
      case 'PDF':
        return (
          <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
            <svg className={commonClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </div>
        );
      case 'VIDEO':
        return (
          <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
            <svg className={commonClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        );
      case 'LINK':
        return (
          <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
            <svg className={commonClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
          </div>
        );
      case 'DOC':
        return (
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
            <svg className={commonClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">Enrolled Secondary Subjects</h2>
          <p className="text-slate-500 text-xs">Secondary syllabus, revision handouts, laboratory manuals, and term coursework.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Sorting */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full sm:w-auto px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white text-slate-700 outline-none hover:border-amber-400 transition-colors"
          >
            <option value="name">Sort by Subject Name</option>
            <option value="progress">Sort by Term Progress</option>
            <option value="code">Sort by Subject Code</option>
          </select>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search subjects or teachers..."
              className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={handleDownloadSyllabus}
            className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <span>Download Syllabus</span>
          </button>
        </div>
      </div>

      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSubjects.map((subject) => (
            <div 
              key={subject.id} 
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col"
            >
              <div className="h-2 w-full bg-slate-900"></div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase font-mono bg-slate-100 px-2 py-0.5 rounded">{subject.code}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold font-serif text-slate-900 mb-1 group-hover:text-amber-800 transition-colors">{subject.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Subject Master: {subject.teacher || subject.lecturer}
                  </p>
                  
                  <p className="text-xs text-slate-600 mb-5 line-clamp-2 leading-relaxed">{subject.description}</p>
                </div>

                <div>
                  <div className="space-y-1.5 mb-5">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-tight text-slate-500">
                      <span>Term Coverage</span>
                      <span className="text-amber-800 font-bold">{subject.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-1000" 
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => setSelectedSubject(subject)}
                      className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      <span>Syllabus & Details</span>
                    </button>
                    <button 
                      onClick={() => setSelectedSubject(subject)}
                      className="flex-1 py-2 bg-white border border-slate-200 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      <span>Handouts ({subject.resources.length})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200 animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No subjects found</h3>
          <p className="text-slate-500 text-xs max-w-xs mx-auto">No enrolled subjects match your keyword search.</p>
          <button 
            onClick={() => {setSearchQuery(''); setSortBy('name');}}
            className="mt-4 text-amber-700 font-bold hover:text-amber-800 underline text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Resource Modal Overlay */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setSelectedSubject(null)}></div>
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="h-2.5 w-full bg-slate-900"></div>
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold font-serif text-slate-900">{selectedSubject.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">Subject Master: {selectedSubject.teacher || selectedSubject.lecturer} • {selectedSubject.code}</p>
                </div>
                <button 
                  onClick={() => setSelectedSubject(null)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Prescribed Revision Handouts & Practical Guides</h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedSubject.resources.map((res) => (
                      <div 
                        key={res.id} 
                        className="flex items-center justify-between p-3.5 bg-slate-50/70 rounded-2xl border border-slate-200/80 hover:border-amber-400 hover:bg-white transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          {getResourceIcon(res.type)}
                          <div>
                            <p className="font-bold text-slate-900 text-xs">{res.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider bg-slate-100 text-slate-700">
                                {res.type}
                              </span>
                              <span className="text-[10px] text-slate-400">Term 1 Curriculum</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => alert(`Opening ${res.title}...`)}
                            className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
                            title="Download Material"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setSelectedSubject(null)}
                    className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
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
