import React, { useState } from 'react';
import { NEWS_ARTICLES } from '../../constants';
import { NewsArticle } from '../../types';

export const NewsPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Research', 'Academics', 'Campus Life', 'Admissions'];

  const filteredArticles = selectedCategory === 'All'
    ? NEWS_ARTICLES
    : NEWS_ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          The University Gazette
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-serif text-slate-950 tracking-tight">
          News & Research Dispatches
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Stay informed on breakthroughs, university milestones, symposium agendas, and scholarly achievements.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group"
          >
            <div className="h-52 overflow-hidden">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="text-amber-700 font-bold">{art.category}</span>
                  <span>·</span>
                  <span>{art.date}</span>
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 truncate">{art.author}</span>
                <span className="font-bold text-slate-900 group-hover:text-indigo-600">
                  Read Article →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Read Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="relative h-64">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-xs"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-amber-700 font-bold">{selectedArticle.category}</span>
                <span>·</span>
                <span>{selectedArticle.date}</span>
                <span>·</span>
                <span>By {selectedArticle.author}</span>
              </div>

              <h2 className="text-2xl font-bold font-serif text-slate-950">
                {selectedArticle.title}
              </h2>

              <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                {selectedArticle.summary}
              </p>

              <div className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 space-y-3">
                <p>{selectedArticle.content}</p>
                <p>
                  Lights Versity maintains active partnerships with over 120 global universities and industrial laboratories. For media inquiries or full research papers, contact the Press Secretariat at press@lightsversity.edu.
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
                >
                  Close Dispatch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
