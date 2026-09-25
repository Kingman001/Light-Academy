
import React, { useState, useRef } from 'react';
import { MOCK_USER } from '../constants';

const Settings: React.FC = () => {
  const [user, setUser] = useState({
    ...MOCK_USER,
    phoneNumber: MOCK_USER.phone || '',
    address: MOCK_USER.address || '',
    bio: MOCK_USER.bio || '',
    email: MOCK_USER.email || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1200);
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

  const inputClass = "w-full border border-slate-200 p-3 rounded-xl text-slate-700 font-medium bg-slate-50/50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all";
  const disabledInputClass = "w-full bg-slate-100 border border-slate-100 p-3 rounded-xl text-slate-500 font-medium cursor-not-allowed opacity-75";

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h2>
        <p className="text-slate-500 mt-2">Manage your student profile, contact information and preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Header */}
        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-indigo-50 shadow-inner bg-slate-100 relative">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover transition-opacity group-hover:opacity-75" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-1">
              <h3 className="text-2xl font-bold text-slate-800">{user.name}</h3>
              <p className="text-indigo-600 font-bold text-sm tracking-widest uppercase">Student • ID: {user.id}</p>
              <p className="text-slate-400 text-sm italic mt-2">Personalize your public profile that other students and lecturers see.</p>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-4">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Personal Details
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Full Name</label>
                <input 
                  type="text" 
                  disabled 
                  value={user.name} 
                  className={disabledInputClass}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Student ID</label>
                <input 
                  type="text" 
                  disabled 
                  value={user.id} 
                  className={disabledInputClass}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Bio / Summary</label>
                <textarea 
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  rows={4}
                  className={inputClass}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-4">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Contact Information
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Institutional Email</label>
                <div className="relative group">
                  <input 
                    type="email" 
                    disabled
                    value={user.email}
                    className={disabledInputClass}
                  />
                  <div className="absolute right-3 top-3 text-slate-400" title="Institutional emails cannot be changed">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-medium italic">Contact the registrar to update your official email.</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Phone Number</label>
                <input 
                  type="tel" 
                  value={user.phoneNumber}
                  onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                  className={inputClass}
                  placeholder="+1 (000) 000-0000"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Primary Address</label>
                <input 
                  type="text" 
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  className={inputClass}
                  placeholder="Enter your residence address"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-900 p-6 rounded-3xl shadow-xl">
          <p className="text-slate-400 text-sm mb-4 sm:mb-0">
            {saveSuccess ? (
              <span className="text-emerald-400 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Changes saved successfully!
              </span>
            ) : "Last updated on August 15, 2023"}
          </p>
          <div className="flex gap-4 w-full sm:w-auto">
            <button 
              type="button"
              className="flex-1 sm:flex-none px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSaving}
              className="flex-1 sm:flex-none px-12 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
