import React, { useState, useRef } from 'react';
import { DEMO_STUDENT } from '../constants';

const Settings: React.FC = () => {
  const [user, setUser] = useState({
    ...DEMO_STUDENT,
    phoneNumber: DEMO_STUDENT.phone || '',
    address: '14 St. Jude Way, Academy District',
    bio: DEMO_STUDENT.bio || '',
    email: DEMO_STUDENT.email || '',
    parentName: 'Mr. & Mrs. Robert Johnson',
    parentPhone: '+1 (555) 901-2345',
    house: DEMO_STUDENT.house || 'Orion House',
    gradeLevel: DEMO_STUDENT.gradeLevel || 'Grade 11A (Senior Science)',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass = "w-full border border-slate-200 p-3 rounded-xl text-slate-800 text-xs font-medium bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all";
  const disabledInputClass = "w-full bg-slate-100 border border-slate-200 p-3 rounded-xl text-slate-500 text-xs font-medium cursor-not-allowed opacity-80";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl font-bold font-serif text-slate-900 tracking-tight">Pupil Profile & Preferences</h2>
        <p className="text-slate-500 text-xs mt-1">Secondary school biodata, parent/guardian contact, and house records.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Header */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-sm bg-slate-100 relative">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover transition-opacity group-hover:opacity-75" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1.5 rounded-lg shadow-sm border border-white">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h3 className="text-xl font-bold font-serif text-slate-900">{user.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {user.house}
                </span>
              </div>
              <p className="text-slate-600 text-xs font-mono font-semibold">Admission No: {user.studentId || 'LA-2024-4920'}</p>
              <p className="text-slate-500 text-xs font-medium">{user.gradeLevel} · Academic Prefect</p>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-900 font-serif flex items-center gap-2 border-b border-slate-100 pb-3 text-sm">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Pupil Academic Biodata
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Full Registered Name</label>
                <input 
                  type="text" 
                  disabled 
                  value={user.name} 
                  className={disabledInputClass}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Secondary Form / Class</label>
                <input 
                  type="text" 
                  disabled 
                  value={user.gradeLevel} 
                  className={disabledInputClass}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Assigned House</label>
                <input 
                  type="text" 
                  disabled 
                  value={user.house} 
                  className={disabledInputClass}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Academic Interests & Clubs</label>
                <textarea 
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  rows={3}
                  className={inputClass}
                  placeholder="Secondary robotics, debate team, athletics..."
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-900 font-serif flex items-center gap-2 border-b border-slate-100 pb-3 text-sm">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Parent & Guardian Contacts
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Parent / Guardian Name</label>
                <input 
                  type="text" 
                  value={user.parentName}
                  onChange={(e) => setUser({ ...user, parentName: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Parent Contact Phone</label>
                <input 
                  type="tel" 
                  value={user.parentPhone}
                  onChange={(e) => setUser({ ...user, parentPhone: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Official Pupil School Email</label>
                <input 
                  type="email" 
                  disabled
                  value={user.email}
                  className={disabledInputClass}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Residential Address</label>
                <input 
                  type="text" 
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-900 p-5 rounded-2xl shadow-md border border-slate-800">
          <p className="text-slate-400 text-xs mb-3 sm:mb-0">
            {saveSuccess ? (
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Profile changes saved to school registry!
              </span>
            ) : "Last updated for 2026/2027 Academic Session"}
          </p>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-8 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {isSaving ? "Saving to Registry..." : "Save Profile Details"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
