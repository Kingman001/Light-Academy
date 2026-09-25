import React, { useState } from 'react';
import { AdmissionApplication } from '../../types';

interface AdmissionsPageProps {
  onOpenAuth: (role: 'STUDENT' | 'STAFF') => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onOpenAuth }) => {
  const [formData, setFormData] = useState({
    candidateName: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    dateOfBirth: '',
    targetGrade: 'Grade 7 (Form 1 Entrance)',
    boardingPreference: 'Day Scholar' as 'Day Scholar' | 'Full Boarder',
    previousSchool: '',
    lastTermPercentage: '',
    statement: '',
  });

  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const appNumber = `LA-ADM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApp: AdmissionApplication = {
        id: `app-${Date.now()}`,
        applicationNumber: appNumber,
        candidateName: formData.candidateName,
        parentName: formData.parentName,
        parentEmail: formData.parentEmail,
        parentPhone: formData.parentPhone,
        dateOfBirth: formData.dateOfBirth,
        targetGrade: formData.targetGrade,
        boardingPreference: formData.boardingPreference,
        previousSchool: formData.previousSchool,
        lastTermPercentage: formData.lastTermPercentage,
        submissionDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Received',
      };

      setSubmittedApp(newApp);
      setIsSubmitting(false);
    }, 700);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;
    if (submittedApp && trackingCode.trim().toUpperCase() === submittedApp.applicationNumber) {
      setTrackingResult(`Status for ${submittedApp.applicationNumber}: Candidate ${submittedApp.candidateName} application ${submittedApp.status}. Entrance examination date notification dispatched to parent email: ${submittedApp.parentEmail}.`);
    } else {
      setTrackingResult(`Status for ${trackingCode.toUpperCase()}: Candidate Application verified by Admissions Board. Entrance testing slip & syllabus sent.`);
    }
  };

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Secondary School Admissions 2026/2027
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-serif text-slate-950 tracking-tight">
          Enroll at Lights Academy Secondary School
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Admitting pupils into Grade 7 (Form 1) and transfer placements for Grades 8–11. We seek curious, well-mannered young boys and girls eager to learn and lead.
        </p>
      </div>

      {/* Secondary School Admission Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { step: '01', title: 'Complete Online Registration', desc: 'Fill candidate details, primary school report, and select day/boarding preference.' },
          { step: '02', title: 'Entrance Examination', desc: 'Pupil sits assessment in Mathematics, English Comprehension, and Quantitative Reasoning.' },
          { step: '03', title: 'Headmaster Interview', desc: 'Interactive interview assessing character, hobbies, and reading habits with parents present.' },
          { step: '04', title: 'Offer Letter & House Allocation', desc: 'Admitted scholars are welcomed, assigned to a House, and issued student credentials.' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xl font-black font-serif text-amber-600">{item.step}</span>
            <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Application Form & Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form */}
        <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              Candidate Admission Application Form
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Please provide candidate details and parent/guardian contact. Early submissions receive priority examination dates.
            </p>
          </div>

          {submittedApp ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4 text-center">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 font-serif">Candidate Application Registered!</h3>
              <p className="text-sm text-emerald-700 max-w-md mx-auto">
                Thank you, <strong>{submittedApp.parentName}</strong>. The registration for candidate <strong>{submittedApp.candidateName}</strong> has been logged into the Academy Admissions Roll.
              </p>
              
              <div className="p-4 bg-white rounded-xl border border-emerald-200 inline-block text-left text-xs space-y-1">
                <p><strong>Candidate Application No:</strong> <span className="font-mono text-indigo-700 font-bold">{submittedApp.applicationNumber}</span></p>
                <p><strong>Applying For:</strong> {submittedApp.targetGrade} ({submittedApp.boardingPreference})</p>
                <p><strong>Submission Date:</strong> {submittedApp.submissionDate}</p>
                <p><strong>Status:</strong> <span className="text-emerald-700 font-bold">Entrance Exam Scheduled</span></p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSubmittedApp(null)}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                >
                  Register Another Pupil
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Candidate’s Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    placeholder="e.g. Samuel Adeyemi"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Dr. & Mrs. Adeyemi"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Parent Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    placeholder="parent@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Parent Telephone Line *</label>
                  <input
                    type="tel"
                    required
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Applying for Class / Grade *</label>
                  <select
                    value={formData.targetGrade}
                    onChange={(e) => setFormData({ ...formData, targetGrade: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  >
                    <option value="Grade 7 (Form 1 Entrance)">Grade 7 (Junior Secondary Form 1)</option>
                    <option value="Grade 8 (Form 2 Transfer)">Grade 8 (Junior Secondary Form 2)</option>
                    <option value="Grade 9 (Form 3 Transfer)">Grade 9 (Junior Secondary Form 3)</option>
                    <option value="Grade 10 (Form 4 Senior Entry)">Grade 10 (Senior Secondary Form 4)</option>
                    <option value="Grade 11 (Form 5 Senior Transfer)">Grade 11 (Senior Secondary Form 5)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Boarding Preference *</label>
                  <select
                    value={formData.boardingPreference}
                    onChange={(e) => setFormData({ ...formData, boardingPreference: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  >
                    <option value="Day Scholar">Day Scholar (Daily Transport)</option>
                    <option value="Full Boarder">Full Boarder (Hostel Resident)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Previous School / Primary School *</label>
                  <input
                    type="text"
                    required
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    placeholder="e.g. St. Jude’s Preparatory School"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Candidate Interests, Sports & Hobbies</label>
                <textarea
                  rows={3}
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  placeholder="Tell us about the candidate’s interests (e.g. football, chess, violin, science experiments)..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering Candidate with Admissions...' : 'Submit Application to Secondary Admissions'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar: Track Candidate & Fee Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-bold font-serif text-white">Track Candidate Status</h3>
            <p className="text-xs text-slate-300">
              Enter your reference number (e.g. <code>LA-ADM-2026-4421</code>) to verify testing schedule and admission letter.
            </p>
            <form onSubmit={handleTrack} className="space-y-2">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="LA-ADM-2026-..."
                className="w-full px-3.5 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-amber-300"
              >
                Query Candidate Status
              </button>
            </form>
            {trackingResult && (
              <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-xs text-slate-200 mt-2">
                {trackingResult}
              </div>
            )}
          </div>

          {/* School Fees Structure Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold font-serif text-slate-900">Termly School Fee Schedule</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Transparent termly fee schedule covering academics, science laboratories, ICT, and co-curricular programs.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Junior Secondary (Grades 7–9) / Term:</span>
                <span className="font-bold text-slate-900">$750.00</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Senior Secondary (Grades 10–12) / Term:</span>
                <span className="font-bold text-slate-900">$850.00</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Science Lab & ICT Consumables:</span>
                <span className="font-bold text-slate-900">$95.00</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600">Boarding & Dining (Optional):</span>
                <span className="font-bold text-slate-900">$480.00</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-emerald-700 font-medium">Entrance Exam Merit Bursary:</span>
                <span className="font-bold text-emerald-700">Up to 50% waiver</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              Parents can pay online via the integrated <strong className="text-slate-600">Student Portal Fee Payment</strong> gateway.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
