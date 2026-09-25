import React, { useState } from 'react';
import { SCHOOL_INFO } from '../../constants';

interface PublicFooterProps {
  setCurrentPublicPage: (page: string) => void;
  onOpenAuth: (role: 'STUDENT' | 'STAFF') => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  setCurrentPublicPage,
  onOpenAuth
}) => {
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubSuccess(true);
      setEmailSub('');
      setTimeout(() => setSubSuccess(false), 4000);
    }
  };

  const navigateTo = (page: string) => {
    setCurrentPublicPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Secondary School Newsletter */}
      <div className="border-b border-slate-900 bg-slate-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-white font-serif tracking-tight">
              {SCHOOL_INFO.name} Weekly School Gazette & Parent Circular
            </h4>
            <p className="text-xs text-slate-400">
              Receive term calendars, Inter-House sports results, PTA meeting dates, and academic announcements.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              value={emailSub}
              onChange={(e) => setEmailSub(e.target.value)}
              placeholder="Enter parent or guardian email"
              className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-80"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all whitespace-nowrap"
            >
              {subSuccess ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Secondary Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-serif font-black text-amber-400 text-lg">
                LA
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-white">{SCHOOL_INFO.name}</h3>
                <p className="text-xs text-amber-400 font-medium">Motto: {SCHOOL_INFO.motto}</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A premier co-educational secondary boarding and day school founded in 1984. Dedicated to academic rigour, moral upbringing, leadership, and athletic excellence from Grade 7 through Grade 12.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p><strong className="text-slate-300">Campus:</strong> {SCHOOL_INFO.contacts.address}</p>
              <p><strong className="text-slate-300">School Telephone:</strong> {SCHOOL_INFO.contacts.phone}</p>
              <p><strong className="text-slate-300">Admissions Email:</strong> {SCHOOL_INFO.contacts.email}</p>
            </div>
          </div>

          {/* Academics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Curricula</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('academics')} className="hover:text-white transition-colors">
                  Junior Secondary (Grades 7–9)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('academics')} className="hover:text-white transition-colors">
                  Senior Science Track (Grades 10–12)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('academics')} className="hover:text-white transition-colors">
                  Senior Arts & Humanities Track
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('academics')} className="hover:text-white transition-colors">
                  Senior Commercial / Business Track
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('academics')} className="hover:text-white transition-colors">
                  Secondary Term Calendar 2026/27
                </button>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">School Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onOpenAuth('STUDENT')} className="hover:text-white transition-colors font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  Pupil Portal Login
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuth('STAFF')} className="hover:text-white transition-colors font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Teacher & Staff Portal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admissions')} className="hover:text-white transition-colors">
                  Term Fee Schedule
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('campus')} className="hover:text-white transition-colors">
                  Boarding Dormitories & Matron
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('campus')} className="hover:text-white transition-colors">
                  Science Laboratories
                </button>
              </li>
            </ul>
          </div>

          {/* School Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">School Life</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  School Ethos & History
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Headmaster & Leadership
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('campus')} className="hover:text-white transition-colors">
                  The Four Houses
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('news')} className="hover:text-white transition-colors">
                  Inter-House Sports & News
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact & Parent Consultations
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {SCHOOL_INFO.name}. All Rights Reserved. Accredited Secondary Education Institution.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Pupil Code of Conduct</span>
            <span className="text-slate-400">Parent Handbook</span>
            <span className="text-slate-400">Child Safeguarding Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
