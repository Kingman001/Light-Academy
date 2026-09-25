import React from 'react';
import { SCHOOL_INFO } from '../../constants';

interface AboutPageProps {
  onOpenApply: () => void;
  setCurrentPublicPage: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenApply }) => {
  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Secondary School Heritage Since 1984
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-serif text-slate-950 tracking-tight">
          About {SCHOOL_INFO.name}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Over four decades of nurturing adolescent scholars with disciplined academic excellence, character education, inter-house brotherhood, and athletic achievement.
        </p>
      </div>

      {/* Hero Image */}
      <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative h-72 sm:h-96">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80"
          alt="Lights Academy Secondary School Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-8">
          <div className="text-white max-w-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-300">The Memorial Assembly Quadrangle</p>
            <h2 className="text-2xl font-bold font-serif">A Disciplined Sanctuary for Secondary School Learning</h2>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl space-y-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-serif font-black text-amber-300">
            M
          </div>
          <h2 className="text-2xl font-bold font-serif tracking-tight">Our School Mission</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {SCHOOL_INFO.mission}
          </p>
        </div>

        <div className="bg-indigo-950 text-white p-8 sm:p-10 rounded-3xl space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center font-serif font-black text-indigo-300">
            V
          </div>
          <h2 className="text-2xl font-bold font-serif tracking-tight">Our Vision for Pupils</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            {SCHOOL_INFO.vision}
          </p>
        </div>
      </div>

      {/* Core Secondary Values */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Pillars of Character</span>
          <h2 className="text-2xl font-bold font-serif text-slate-950">Core Values of the Academy</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCHOOL_INFO.values.map((v, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Tenable Pillar 0{i + 1}</span>
              <h3 className="text-base font-bold text-slate-900 font-serif">{v.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary School Leadership & House Masters */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">School Administration</span>
          <h2 className="text-2xl font-bold font-serif text-slate-950">Senior Leadership Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCHOOL_INFO.leadership.map((leader, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${1534528741775 + i * 2000}?auto=format&fit=crop&w=200&q=80`}
                  alt={leader.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">{leader.name}</h3>
                <p className="text-xs text-amber-700 font-medium">{leader.role}</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{leader.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accreditations & Board Recognition */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Accreditations & Examination Boards</span>
            <h2 className="text-2xl font-bold font-serif text-slate-900">Recognized Secondary Standards</h2>
          </div>
          <button
            onClick={onOpenApply}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
          >
            Apply for Admission
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <strong className="block text-slate-900 font-bold mb-1">Cambridge International School</strong>
            Accredited centre for Cambridge Lower Secondary, IGCSE, and Cambridge International AS & A Level.
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <strong className="block text-slate-900 font-bold mb-1">National Secondary Education Council</strong>
            Full chartered approval with 100% distinction pass record in national secondary examinations.
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <strong className="block text-slate-900 font-bold mb-1">Independent Schools Association</strong>
            Recognized for pastoral care excellence, boarding hygiene standards, and ethical child safeguarding.
          </div>
        </div>
      </div>
    </div>
  );
};
