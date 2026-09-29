import React, { useState, useEffect, useRef } from 'react';
import { MOCK_EXAMS } from '../constants';
import { Exam } from '../types';

interface ExamListProps {
  exams?: Exam[];
}

export const ExamList: React.FC<ExamListProps> = ({ exams = MOCK_EXAMS }) => {
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const timerRef = useRef<any>(null);

  const startExam = (exam: Exam) => {
    setActiveExam(exam);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsFinished(false);
    setShowReview(false);
    setTimeLeft(exam.duration * 60);
  };

  const submitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFinished(true);
  };

  useEffect(() => {
    if (activeExam && !isFinished && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeExam, isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (!activeExam) return;
    setAnswers({
      ...answers,
      [activeExam.questions[currentQuestionIndex].id]: optionIndex
    });
  };

  if (isFinished && activeExam) {
    const totalQuestions = activeExam.questions.length;
    let correctCount = 0;
    activeExam.questions.forEach((q) => {
      if (answers[q.id] === q.correctOption) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * activeExam.totalMarks);
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 50;

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-slate-200 text-center space-y-6 animate-in zoom-in-95">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
            passed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
          }`}>
            {passed ? (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Secondary Assessment Result</span>
            <h2 className="text-3xl font-bold font-serif text-slate-900">{activeExam.title}</h2>
            <p className="text-xs text-slate-500">Subject: {activeExam.subject} · {activeExam.code}</p>
          </div>

          <div className="py-4 border-y border-slate-100 grid grid-cols-3 gap-4">
            <div>
              <span className="text-slate-400 text-xs block font-medium">Final Score</span>
              <span className="text-2xl font-black font-serif text-slate-900">{score}/{activeExam.totalMarks}</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block font-medium">Percentage</span>
              <span className={`text-2xl font-black font-serif ${passed ? 'text-emerald-700' : 'text-rose-600'}`}>{percentage}%</span>
            </div>
            <div>
              <span className="text-slate-400 text-xs block font-medium">Academic Decision</span>
              <span className={`text-base font-bold font-serif ${passed ? 'text-emerald-700' : 'text-rose-600'}`}>
                {passed ? 'Passed (Credit)' : 'Resit Required'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button 
              onClick={() => setShowReview(!showReview)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-all"
            >
              {showReview ? 'Hide Answer Key' : 'Review Answer Key & Explanations'}
            </button>
            <button 
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-xl font-bold text-xs transition-all"
            >
              Print Result Slip
            </button>
            <button 
              onClick={() => setActiveExam(null)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-all shadow-xs"
            >
              Back to Assessment Center
            </button>
          </div>
        </div>

        {/* Answer Key Review */}
        {showReview && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 animate-in fade-in">
            <h3 className="text-base font-bold font-serif text-slate-900 border-b border-slate-100 pb-2">
              Assessment Breakdown & Feedback
            </h3>

            <div className="space-y-4">
              {activeExam.questions.map((q, idx) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.correctOption;

                return (
                  <div key={q.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Question {idx + 1}: {q.text}</span>
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? 'Correct (+10 pts)' : 'Incorrect (0 pts)'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-xl border ${
                            optIdx === q.correctOption
                              ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900'
                              : userAns === optIdx
                              ? 'bg-rose-50 border-rose-300 text-rose-900'
                              : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className="font-mono mr-1.5 font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                          {opt}
                          {optIdx === q.correctOption && ' (Correct Answer)'}
                          {userAns === optIdx && optIdx !== q.correctOption && ' (Your Choice)'}
                        </div>
                      ))}
                    </div>

                    {q.explanation && (
                      <p className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-100 mt-2">
                        <strong className="text-slate-700">Teacher's Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Active Exam Taking Mode
  if (activeExam) {
    const currentQuestion = activeExam.questions[currentQuestionIndex];
    const totalQuestions = activeExam.questions.length;
    const answeredCount = Object.keys(answers).length;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Sticky Header with Timer */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between sticky top-4 z-20">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              {activeExam.code || 'EXAM'}
            </span>
            <h3 className="text-base font-bold font-serif text-slate-900 mt-1">{activeExam.title}</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Time Remaining</span>
              <span className={`text-xl font-mono font-bold ${
                timeLeft < 180 ? 'text-rose-600 animate-pulse' : 'text-slate-900'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <button
              onClick={submitExam}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-all shadow-xs"
            >
              Finish & Submit
            </button>
          </div>
        </div>

        {/* Question Area */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Completed: {answeredCount} / {totalQuestions}
            </span>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold font-serif text-slate-900">
              {currentQuestion.text}
            </h4>

            <div className="space-y-2.5">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestion.id] === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full p-4 rounded-2xl text-left text-xs font-medium border transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/80 text-slate-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold ${
                      isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 disabled:opacity-40"
            >
              ← Previous Question
            </button>

            <div className="flex items-center gap-1.5 flex-wrap">
              {activeExam.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestionIndex(i)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                    currentQuestionIndex === i
                      ? 'bg-slate-900 text-white'
                      : answers[activeExam.questions[i].id] !== undefined
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Next Question →
              </button>
            ) : (
              <button
                onClick={submitExam}
                className="px-5 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold hover:bg-amber-600 shadow-xs"
              >
                Submit Exam Now
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Exams Dashboard List
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Secondary School Assessment Center
          </h2>
          <p className="text-xs text-slate-500">
            Access timed continuous assessments, weekly subject quizzes, and terminal examinations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-700">Exam Proctoring Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-400 hover:shadow-md transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {exam.code || 'EXAM'}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {exam.status || 'ACTIVE'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold font-serif text-slate-900 group-hover:text-amber-800 transition-colors">
                  {exam.title}
                </h3>
                <p className="text-xs text-slate-500">{exam.subject}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Duration</span>
                  <span className="font-bold text-slate-800">{exam.duration} Minutes</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Total Marks</span>
                  <span className="font-bold text-slate-800">{exam.totalMarks} Points</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">{exam.questions.length} Questions</span>
              <button
                onClick={() => startExam(exam)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>Take Exam Now</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamList;
