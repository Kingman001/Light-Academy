import React, { useState } from 'react';
import { Exam, Question } from '../../types';

interface StaffExamsProps {
  exams: Exam[];
  setExams: React.Dispatch<React.SetStateAction<Exam[]>>;
}

export const StaffExams: React.FC<StaffExamsProps> = ({ exams, setExams }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Senior Mathematics');
  const [newCode, setNewCode] = useState('MTH-11');
  const [newGradeLevel, setNewGradeLevel] = useState('Grade 11');
  const [newDuration, setNewDuration] = useState(30);
  const [newTotalMarks, setNewTotalMarks] = useState(50);
  const [newTerm, setNewTerm] = useState('Term 1 Continuous Assessment');
  const [newQuestions, setNewQuestions] = useState<Question[]>([
    {
      id: 'q-custom-sec-1',
      text: 'What is the sum of angles on a straight line in degrees?',
      options: ['180°', '360°', '90°', '270°'],
      correctOption: 0,
      explanation: 'Angles that form a linear pair on a straight line always sum to 180°.'
    }
  ]);

  const [currentQText, setCurrentQText] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctOpt, setCorrectOpt] = useState(0);

  const addQuestionToNewExam = () => {
    if (!currentQText.trim() || !opt0.trim() || !opt1.trim()) return;
    const q: Question = {
      id: `q-${Date.now()}`,
      text: currentQText,
      options: [opt0, opt1, opt2 || 'None of the above', opt3 || 'All of the above'],
      correctOption: correctOpt,
    };
    setNewQuestions(prev => [...prev, q]);
    setCurrentQText('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setCorrectOpt(0);
  };

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Exam = {
      id: `exam-${Date.now()}`,
      title: newTitle,
      subject: newSubject,
      code: newCode,
      gradeLevel: newGradeLevel,
      duration: newDuration,
      totalMarks: newTotalMarks,
      term: newTerm,
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'ACTIVE',
      questions: newQuestions,
    };

    setExams(prev => [created, ...prev]);
    setIsCreating(false);
    setNewTitle('');
    alert(`Secondary School Assessment "${created.title}" successfully published to pupils!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Secondary School Assessment & Quiz Creator
          </h2>
          <p className="text-xs text-slate-500">
            Author weekly quizzes, mid-term continuous assessments, and terminal examinations with automated marking.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>{isCreating ? 'Cancel Authoring' : 'Create Class Assessment'}</span>
        </button>
      </div>

      {/* Authoring Form Modal/Panel */}
      {isCreating && (
        <form onSubmit={handleSaveExam} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-md space-y-6 animate-in slide-in-from-top-2">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold font-serif text-slate-900">
              Author Class Quiz or Term Test
            </h3>
            <p className="text-xs text-slate-500">
              This assessment will appear immediately on the Pupil Portal for the specified secondary grade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Assessment Title *</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Grade 11 Chemistry Periodic Table Test"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="Senior Mathematics">Senior Mathematics</option>
                <option value="Physics">Physics & Mechanics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology & Life Sciences</option>
                <option value="English Language">English Language</option>
                <option value="Computer Studies">Computer Studies & ICT</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Class / Grade *</label>
              <select
                value={newGradeLevel}
                onChange={(e) => setNewGradeLevel(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="Grade 11">Grade 11 (Form 5)</option>
                <option value="Grade 10">Grade 10 (Form 4)</option>
                <option value="Grade 9">Grade 9 (Form 3)</option>
                <option value="Grade 8">Grade 8 (Form 2)</option>
                <option value="Grade 7">Grade 7 (Form 1)</option>
                <option value="Grade 12">Grade 12 (Form 6)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Minutes) *</label>
              <input
                type="number"
                min="5"
                max="120"
                value={newDuration}
                onChange={(e) => setNewDuration(parseInt(e.target.value) || 30)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Total Marks *</label>
              <input
                type="number"
                min="10"
                max="100"
                value={newTotalMarks}
                onChange={(e) => setNewTotalMarks(parseInt(e.target.value) || 50)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Assessment Term</label>
              <input
                type="text"
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Question authoring */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Questions Configured ({newQuestions.length})
            </h4>

            <div className="space-y-2">
              {newQuestions.map((q, idx) => (
                <div key={q.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Q{idx + 1}: {q.text}</span>
                    <button
                      type="button"
                      onClick={() => setNewQuestions(newQuestions.filter(x => x.id !== q.id))}
                      className="text-rose-600 hover:text-rose-800"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Correct Answer: {q.options[q.correctOption]}
                  </p>
                </div>
              ))}
            </div>

            {/* Add question */}
            <div className="p-4 bg-slate-50/80 rounded-xl border border-dashed border-slate-300 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">Add Multiple-Choice Question</span>
              <input
                type="text"
                placeholder="Question prompt (e.g. Which of the following is a primary consumer in an ecosystem?)"
                value={currentQText}
                onChange={(e) => setCurrentQText(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Option A"
                  value={opt0}
                  onChange={(e) => setOpt0(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Option B"
                  value={opt1}
                  onChange={(e) => setOpt1(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Option C"
                  value={opt2}
                  onChange={(e) => setOpt2(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Option D"
                  value={opt3}
                  onChange={(e) => setOpt3(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-600 font-medium">Correct Option:</span>
                {[0, 1, 2, 3].map((optNum) => (
                  <label key={optNum} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctOpt === optNum}
                      onChange={() => setCorrectOpt(optNum)}
                    />
                    <span>Option {String.fromCharCode(65 + optNum)}</span>
                  </label>
                ))}
                <button
                  type="button"
                  onClick={addQuestionToNewExam}
                  className="ml-auto px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
                >
                  + Add Question
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              Publish to Class Portal
            </button>
          </div>
        </form>
      )}

      {/* Existing Class Assessments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-400 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {exam.gradeLevel || 'Grade 11'}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {exam.status || 'ACTIVE'}
                </span>
              </div>

              <h3 className="text-base font-bold font-serif text-slate-900">{exam.title}</h3>
              <p className="text-xs text-slate-500">{exam.subject} · {exam.term || 'Term 1 Assessment'}</p>

              <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Time Limit</span>
                  <span className="font-bold">{exam.duration} mins</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Total Marks</span>
                  <span className="font-bold">{exam.totalMarks} pts</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">{exam.questions.length} Questions</span>
              <button
                onClick={() => alert(`Assessment "${exam.title}" has ${exam.questions.length} questions. Automated scoring active.`)}
                className="font-bold text-slate-900 hover:text-amber-800"
              >
                Inspect Quiz →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffExams;
