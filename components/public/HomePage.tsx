import React from 'react';
import { SCHOOL_INFO, ACADEMIC_DEPARTMENTS, NEWS_ARTICLES } from '../../constants';

interface HomePageProps {
  setCurrentPublicPage: (page: string) => void;
  onOpenAuth: (role: 'STUDENT' | 'STAFF') => void;
  onOpenApply: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPublicPage,
  onOpenAuth,
  onOpenApply
}) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Secondary School Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] flex items-center">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80"
            alt="Secondary School Campus"
            className="w-full h-full object-cover opacity-25 filter brightness-75 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              {SCHOOL_INFO.accreditation}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight text-white leading-tight">
              Moulding Character,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                Inspiring Scholarship.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Welcome to {SCHOOL_INFO.name} — a leading co-educational secondary school providing exceptional academic discipline, moral guidance, laboratory science, and leadership development across Grades 7 through 12.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenApply}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2 text-sm"
              >
                <span>Register for Grade 7–12 Admission</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                onClick={() => setCurrentPublicPage('academics')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm border border-white/20 transition-all text-sm"
              >
                Explore Junior & Senior Curriculum
              </button>
            </div>

            {/* Secondary Academic Credentials Strip */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="font-semibold text-amber-400">Academic Highlights:</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Cambridge & National Secondary Approved
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                100% Certificate Pass Rate
              </span>
              <span className="text-slate-700">•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Four Historic Houses & Boarding
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary School Key Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SCHOOL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm text-center hover:border-slate-300 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-black font-serif text-slate-900">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Headmaster's Welcome Address */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-xl mb-4">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
                  alt="Headmaster"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold font-serif text-white">{SCHOOL_INFO.leadership[0].name}</h4>
              <p className="text-xs text-amber-400 font-medium">{SCHOOL_INFO.leadership[0].role}</p>
              <p className="text-[11px] text-slate-400 mt-1">28 Years in Secondary Education & Pastoral Care</p>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Welcome from the Headmaster
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
                "Nurturing Confident, Principled Young Scholars Prepared for Life"
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Secondary school represents the pivotal bridge between childhood and adult responsibility. At {SCHOOL_INFO.name}, we hold our young men and women to the highest standards of courtesy, intellectual curiosity, and moral integrity. Our students do not merely sit examinations; they learn to debate passionately, write cogently, solve mathematical puzzles, and compete with honor on the sports field.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => setCurrentPublicPage('about')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline"
                >
                  Read Headmaster’s Full Address & Ethos →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Historic House System */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Pastoral Care & Team Spirit
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 tracking-tight">
            The Historic House System
          </h2>
          <p className="text-sm text-slate-500">
            Every pupil belongs to one of four historic Houses, participating in inter-house sports, academic quizzes, debates, and musical competitions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCHOOL_INFO.houses.map((house, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className={`w-10 h-10 rounded-xl ${house.color} flex items-center justify-center font-serif font-black text-sm shadow-xs`}>
                {house.name.charAt(0)}
              </div>
              <h3 className="text-base font-bold font-serif text-slate-900">{house.name}</h3>
              <p className="text-xs text-amber-800 font-semibold italic">"{house.motto}"</p>
              <p className="text-xs text-slate-500">House Colours: {house.banner}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Departments Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Secondary Subject Departments
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 tracking-tight">
              Academic Excellence Across Junior & Senior School
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Science laboratories, computer studios, modern languages, and vocational arts taught by dedicated secondary subject specialists.
            </p>
          </div>
          <button
            onClick={() => setCurrentPublicPage('academics')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View All Secondary Subjects</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACADEMIC_DEPARTMENTS.slice(0, 3).map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded">
                  {dept.code}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {dept.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium truncate">Head: {dept.headOfDepartment}</span>
                  <button
                    onClick={() => setCurrentPublicPage('academics')}
                    className="font-bold text-slate-900 hover:text-indigo-600"
                  >
                    View Syllabi →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary School CMS Digital Portal Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-indigo-800/40">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Modern Secondary School Digital CMS
            </span>
            <h2 className="text-3xl font-bold font-serif tracking-tight">
              Integrated Pupil, Teacher & Parent Ecosystem
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Lights Academy features an end-to-end secondary school management system. Pupils take timed term tests, download homework worksheets, check daily period timetables, and monitor terminal report cards. Teachers record continuous assessments (30%) and exam marks (70%), enter conduct remarks, mark roll-call attendance, and verify school fee clearances.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onOpenAuth('STUDENT')}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <span>Access Pupil Portal</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={() => onOpenAuth('STAFF')}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center gap-2"
              >
                <span>Access Teacher & Staff Portal</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest School News & Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Campus Dispatches & News
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 tracking-tight">
              School Life, Sports & Achievements
            </h2>
          </div>
          <button
            onClick={() => setCurrentPublicPage('news')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            View All School News →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => setCurrentPublicPage('news')}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="text-amber-700 font-bold">{article.category}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 pt-2">
                  Read Article →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
