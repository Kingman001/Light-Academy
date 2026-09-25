import React, { useState } from 'react';
import { EnrolledStudent } from '../../types';

interface StaffRosterProps {
  students: EnrolledStudent[];
  setStudents: React.Dispatch<React.SetStateAction<EnrolledStudent[]>>;
}

export const StaffRoster: React.FC<StaffRosterProps> = ({ students, setStudents }) => {
  const [houseFilter, setHouseFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filtered = students.filter(s => {
    const matchesHouse = houseFilter === 'all' || s.house === houseFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'cleared' && s.feeCleared) ||
      (statusFilter === 'uncleared' && !s.feeCleared) ||
      (statusFilter === 'merit' && s.status === 'Merit Standing') ||
      (statusFilter === 'needs_improvement' && s.status === 'Needs Improvement');
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase());
    return matchesHouse && matchesStatus && matchesSearch;
  });

  const toggleFeeStatus = (id: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const next = !s.feeCleared;
        showToast(`Updated term fee clearance for ${s.name}`);
        return { ...s, feeCleared: next };
      }
      return s;
    }));
  };

  const incrementAttendance = (id: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const newRate = Math.min(100, s.attendanceRate + 1);
        showToast(`Marked ${s.name} present in morning roll-call (Attendance: ${newRate}%)`);
        return { 
          ...s, 
          attendanceRate: newRate,
        };
      }
      return s;
    }));
  };

  const updateCA = (id: string, caVal: number) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const clampedCA = Math.max(0, Math.min(30, caVal));
        const newTotal = clampedCA + s.examScore;
        return { 
          ...s, 
          continuousAssessment: clampedCA,
          totalScore: newTotal,
          status: newTotal >= 85 ? 'Merit Standing' : (newTotal < 65 ? 'Needs Improvement' : 'Active')
        };
      }
      return s;
    }));
  };

  const updateExam = (id: string, examVal: number) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const clampedExam = Math.max(0, Math.min(70, examVal));
        const newTotal = s.continuousAssessment + clampedExam;
        return { 
          ...s, 
          examScore: clampedExam,
          totalScore: newTotal,
          status: newTotal >= 85 ? 'Merit Standing' : (newTotal < 65 ? 'Needs Improvement' : 'Active')
        };
      }
      return s;
    }));
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Form 11A Pupil Gradebook & Terminal Records
          </h2>
          <p className="text-xs text-slate-500">
            Record Continuous Assessment (CA 30%), Terminal Examination (70%), House points, and conduct remarks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setStudents(prev => prev.map(s => ({
                ...s,
                attendanceRate: Math.min(100, s.attendanceRate + 1)
              })));
              showToast('Marked all Form 11A pupils present for morning assembly');
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            Mark All Present at Assembly
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search pupil by name or admission number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 w-full sm:w-64"
          />

          <select
            value={houseFilter}
            onChange={(e) => setHouseFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="all">All Houses (Orion, Phoenix, Pegasus, Falcon)</option>
            <option value="Orion House">Orion House (Blue)</option>
            <option value="Phoenix House">Phoenix House (Red/Gold)</option>
            <option value="Pegasus House">Pegasus House (Green)</option>
            <option value="Falcon House">Falcon House (Purple)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="all">All Academic Standing</option>
            <option value="merit">Merit Standing (≥ 85%)</option>
            <option value="needs_improvement">Needs Improvement (&lt; 65%)</option>
            <option value="cleared">Term Fee Cleared</option>
            <option value="uncleared">Term Fee Outstanding</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} of {students.length} pupils
        </div>
      </div>

      {/* Gradebook Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4">Pupil & House</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">C.A. (30)</th>
                <th className="p-4">Exam (70)</th>
                <th className="p-4">Total (100)</th>
                <th className="p-4">Term Fee Clearance</th>
                <th className="p-4">Form Tutor Remark</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="font-bold text-slate-900">{student.name}</p>
                      <p className="text-[11px] font-mono text-slate-400">
                        {student.studentId} · <span className="font-semibold text-amber-800">{student.house}</span>
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-14 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${
                            student.attendanceRate >= 90 ? 'bg-emerald-500' :
                            student.attendanceRate >= 80 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${student.attendanceRate}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-slate-700">{student.attendanceRate}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={student.continuousAssessment}
                      onChange={(e) => updateCA(student.id, parseInt(e.target.value) || 0)}
                      className="w-12 px-2 py-1 bg-slate-50 border border-slate-200 rounded font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      min="0"
                      max="70"
                      value={student.examScore}
                      onChange={(e) => updateExam(student.id, parseInt(e.target.value) || 0)}
                      className="w-12 px-2 py-1 bg-slate-50 border border-slate-200 rounded font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    />
                  </td>
                  <td className="p-4">
                    <span className={`font-black text-sm ${
                      student.totalScore >= 85 ? 'text-emerald-700' :
                      student.totalScore >= 70 ? 'text-indigo-700' : 'text-slate-800'
                    }`}>
                      {student.totalScore}%
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleFeeStatus(student.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        student.feeCleared
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                      }`}
                    >
                      {student.feeCleared ? '✓ Cleared' : '✕ Outstanding'}
                    </button>
                  </td>
                  <td className="p-4 text-slate-600 max-w-xs truncate text-[11px] italic">
                    "{student.conductRemark}"
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => incrementAttendance(student.id)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-[11px] transition-all"
                    >
                      + Roll Call
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
