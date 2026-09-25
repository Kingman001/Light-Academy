import React from 'react';
import { SCHOOL_INFO } from '../../constants';

interface CampusLifePageProps {
  onOpenApply: () => void;
}

export const CampusLifePage: React.FC<CampusLifePageProps> = ({ onOpenApply }) => {
  const facilities = [
    {
      title: 'Science Laboratories (Physics, Chemistry, Biology)',
      desc: 'Three specialized secondary wet laboratories with fume hoods, digital microscopes, gas reticulation, and safety showers.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      badge: 'STEM Science Labs'
    },
    {
      title: 'The Secondary Library & Multimedia Centre',
      desc: '25,000 fiction and reference books, Cambridge past paper archives, quiet reading rooms, and 40 supervised internet terminals.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      badge: 'Academic Library'
    },
    {
      title: 'Academy Sports Complex & Athletics Track',
      desc: 'Full-sized FIFA regulation grass pitch, 400m running track, 25m swimming pool, and basketball/volleyball courts.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      badge: 'Inter-House Sports'
    },
    {
      title: 'Boarding Houses & Student Dormitories',
      desc: 'Comfortable, well-ventilated dormitories for boys and girls with resident House Parents, study halls, and 24/7 medical infirmary.',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      badge: 'Boarding & Pastoral'
    },
    {
      title: 'Computer & Coding Technology Suite',
      desc: 'State-of-the-art workstations with Scratch, Python, HTML5, and robotics hardware kits for hands-on secondary computing.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      badge: 'ICT & Robotics'
    },
    {
      title: 'School Dining Hall & Healthy Kitchen',
      desc: 'Nutritious, hot balanced three-course meals prepared daily by certified chefs, accommodating all dietary needs.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      badge: 'Nutrition'
    }
  ];

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Secondary School Community
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-serif text-slate-950 tracking-tight">
          Campus Life & Boarding
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          A disciplined, lively secondary boarding and day school community where character is honed in the classroom, on the playing field, and in the boarding house.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((fac, idx) => (
          <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col group">
            <div className="h-52 overflow-hidden relative">
              <img
                src={fac.image}
                alt={fac.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                {fac.badge}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-base font-bold font-serif text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {fac.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-2">
                  {fac.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Clubs & Activities */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Co-Curricular Education</span>
          <h2 className="text-3xl font-bold font-serif tracking-tight">30+ Secondary School Clubs & Societies</h2>
          <p className="text-sm text-slate-300">
            Pupils are encouraged to join at least two co-curricular societies to develop poise, leadership, and diverse talents.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
          {[
            'Debating & Public Speaking',
            'Junior Engineers & Technicians (JETS)',
            'Secondary Chess & Scrabble Guild',
            'Academy Marching Brass Band',
            'School Press & Journalism Club',
            'Red Cross & First Aid Society',
            'Drama & Theatrical Society',
            'Young Farmers & Eco Club',
          ].map((club, idx) => (
            <div key={idx} className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 font-medium text-slate-200 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>{club}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-between items-center border-t border-slate-800">
          <span className="text-xs text-slate-400">Pastoral Care: 24/7 Resident House Masters & Matrons</span>
          <button
            onClick={onOpenApply}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl"
          >
            Apply for Boarding or Day Admission
          </button>
        </div>
      </div>
    </div>
  );
};
