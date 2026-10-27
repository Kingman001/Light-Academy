import React, { useState } from 'react';
import { NEWS_ARTICLES } from '../../constants';
import { NewsArticle } from '../../types';

export const NewsPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(NEWS_ARTICLES.map(article => article.category))];

  const filteredArticles = selectedCategory === 'All'
    ? NEWS_ARTICLES
    : NEWS_ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
          The Secondary School Gazette & Circular
        </span>
        <h1 className="text-4xl sm:text-5xl font-black font-serif text-slate-950 tracking-tight">
          School News, Sports & Term Events
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Stay informed on Inter-House competitions, Science Fair results, PTA circulars, academic achievements, and term schedules.
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
                : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-400'
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
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col group"
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
                  <span className="text-amber-800 font-bold">{art.category}</span>
                  <span>·</span>
                  <span>{art.date}</span>
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 truncate">{art.author}</span>
                <span className="font-bold text-slate-900 group-hover:text-amber-800">
                  Read Circular →
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
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {selectedArticle.category}
                </span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>Issued by {selectedArticle.author}</span>
              </div>

              <h2 className="text-2xl font-bold font-serif text-slate-900">
                {selectedArticle.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedArticle.content || selectedArticle.summary}
              </p>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                >
                  Close Bulletin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
