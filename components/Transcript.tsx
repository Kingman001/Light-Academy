import React from 'react';
import { MOCK_REPORT_CARD, SCHOOL_INFO } from '../constants';
import { User } from '../types';

interface TranscriptProps {
  currentUser: User;
}

export const Transcript: React.FC<TranscriptProps> = ({ currentUser }) => {
  const totalSubjects = MOCK_REPORT_CARD.length;
  const grandTotal = MOCK_REPORT_CARD.reduce((sum, g) => sum + g.totalScore, 0);
  const averagePercentage = (grandTotal / totalSubjects).toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Terminal Academic Report Card
          </h2>
          <p className="text-xs text-slate-500">
            Certified secondary school evaluation combining Continuous Assessment (CA 30%) and Terminal Examination (70%).
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Print Official Terminal Report Card</span>
        </button>
      </div>

      {/* Pupil Biodata Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center font-serif font-black text-amber-400 text-lg border border-amber-400/30">
              LA
            </div>
            <div>
              <h3 className="font-bold text-base font-serif text-slate-900">{SCHOOL_INFO.name} Secondary School</h3>
              <p className="text-xs text-slate-500">Academic Session: 2026/2027 · Term 1 Examination Report</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Promotion Standing: Excellent
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Pupil Name</span>
            <span className="font-bold text-slate-800 text-sm">{currentUser.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Admission Number</span>
            <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{currentUser.studentId || 'LA-2024-4920'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Class / Form</span>
            <span className="font-bold text-slate-800">{currentUser.gradeLevel || 'Grade 11A (Senior Secondary)'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">House Affiliation</span>
            <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{currentUser.house || 'Orion House'}</span>
          </div>
        </div>
      </div>

      {/* Summary Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Average</span>
          <div className="text-3xl font-black font-serif text-slate-900 mt-1">{averagePercentage}%</div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Distinction (Grade A*)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Position in Class</span>
          <div className="text-3xl font-black font-serif text-slate-900 mt-1">2nd <span className="text-sm font-normal text-slate-400">/ 38</span></div>
          <p className="text-[11px] text-slate-500 mt-1">Grade 11A Senior Science</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">School Attendance</span>
          <div className="text-3xl font-black font-serif text-emerald-700 mt-1">{currentUser.attendancePercentage || 97}%</div>
          <p className="text-[11px] text-slate-500 mt-1">68 / 70 School Days Present</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conduct & Character</span>
          <div className="text-2xl font-black font-serif text-amber-800 mt-1">Exemplary</div>
          <p className="text-[11px] text-slate-500 mt-1">Academic Prefect & Role Model</p>
        </div>
      </div>

      {/* Subject Grades Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Subject Breakdown & Continuous Assessment</h3>
          <span className="text-xs text-slate-500 font-medium">CA (30%) + Terminal Exam (70%)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold border-b border-slate-100">
              <tr>
                <th className="p-4">Subject</th>
                <th className="p-4">Code</th>
                <th className="p-4">Class Avg</th>
                <th className="p-4">C.A. (30)</th>
                <th className="p-4">Exam (70)</th>
                <th className="p-4">Total (100)</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Subject Teacher Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_REPORT_CARD.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{item.subjectName}</td>
                  <td className="p-4 font-mono font-bold text-slate-700">{item.subjectCode}</td>
                  <td className="p-4 text-slate-500">{item.classAverage}%</td>
                  <td className="p-4 font-semibold text-slate-700">{item.caScore}</td>
                  <td className="p-4 font-semibold text-slate-700">{item.examScore}</td>
                  <td className="p-4 font-bold text-slate-900 text-sm">{item.totalScore}%</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-xs ${
                      item.letterGrade === 'A*' ? 'bg-emerald-100 text-emerald-800' :
                      item.letterGrade === 'A' ? 'bg-amber-100 text-amber-900' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {item.letterGrade}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 italic text-[11px]">{item.teacherRemark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Remarks Section */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-500">Form Master’s General Remark (Mr. David Miller):</span>
            <p className="font-medium text-slate-800 leading-relaxed">
              "Alex has demonstrated exceptional maturity, academic focus, and leadership as Academic Prefect. His mathematics and science performance is outstanding. Keep up the high standard!"
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-500">Principal’s Endorsement (Dr. Arthur Sterling):</span>
            <p className="font-medium text-slate-800 leading-relaxed">
              "A truly commendable terminal result. Alex is a credit to Lights Academy and Orion House. Promoted with High Academic Honors."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transcript;
