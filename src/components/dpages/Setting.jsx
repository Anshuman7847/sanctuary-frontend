import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/axiosinstance';
import { toast } from 'react-toastify';
import { 
  User, Bell, Palette, ShieldCheck, 
  Camera, Moon, Smartphone, BarChart, 
  Search, AlertCircle, Trash2, X 
} from 'lucide-react';

const SettingsView = () => {
  const [activeCategory, setActiveCategory] = useState('Profile');
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(()=>{
    let mounted=true;
    axiosInstance.get('/profile/token').then(res=>{
      if(!mounted) return;
      setFullname(res.data.user.fullname || '');
      setEmail(res.data.user.email || '');
      setLoading(false);
    }).catch(()=>{ setLoading(false); navigate('/login') })
    return ()=> mounted=false;
  },[])

  const handleSave = async ()=>{
    try{
      await axiosInstance.put('/profile', { fullname, email });
      toast.success('Profile updated');
    }catch(err){
      toast.error(err?.response?.data?.message || 'Update failed');
    }
  }

  const handleLogout = async ()=>{
    try{
      await axiosInstance.post('/logout');
      toast.success('Logged out');
      navigate('/login');
    }catch(err){
      toast.error('Logout failed');
    }
  }

  const toggleTheme = ()=>{
    const toDark = !dark;
    setDark(toDark);
    if(toDark){ document.documentElement.classList.add('dark'); localStorage.setItem('theme','dark'); }
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme','light'); }
  }

  const categories = [
    { id: 'Profile', icon: <User size={18} />, label: 'Profile' },
    { id: 'Notifications', icon: <Bell size={18} />, label: 'Notifications' },
    { id: 'Appearance', icon: <Palette size={18} />, label: 'Appearance' },
    { id: 'Account', icon: <ShieldCheck size={18} />, label: 'Account' },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 p-5">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">Settings</h1>
          <p className="text-sm text-gray-400 font-medium mt-1">Customize your sanctuary experience</p>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-indigo-600 shadow-sm transition-all">
            <Search size={20} />
          </button>
          <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-indigo-600 shadow-sm relative transition-all">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* Left Sidebar: Categories */}
        <div className="col-span-12 lg:col-span-3 space-y-8">
          <div>
            <p className="text-[10px] font-black uppercase text-gray-300 tracking-[0.15em] mb-4">Preference Categories</p>
            <nav className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                    activeCategory === cat.id 
                    ? 'bg-white text-indigo-600 shadow-sm border border-gray-50' 
                    : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Pro Plan Card */}
          <div className="bg-[#FDF2ED] p-6 rounded-[32px] border border-orange-100/50 space-y-3 relative overflow-hidden">
            <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest">Pro Plan</p>
            <p className="text-xs text-orange-900/70 font-bold leading-relaxed">
              Unlock detailed mood analytics and cloud sync.
            </p>
            <button className="text-xs font-black text-orange-600 flex items-center gap-1 group">
              Upgrade Now 
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Right Content: Profile Editor */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          
          {/* Public Profile Section */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-10">
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="w-28 h-28 bg-gray-900 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img src="https://i.pravatar.cc/150?u=alex" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform">
                  <Camera size={14} />
                </button>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Public Profile</h3>
                <p className="text-xs text-gray-400 font-medium">This information will be displayed on your social streak cards.</p>
                <div className="flex gap-3">
                  <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">Change Photo</button>
                  <button className="px-6 py-2.5 bg-gray-50 text-gray-400 rounded-xl font-bold text-xs hover:bg-gray-100 transition-all">Remove</button>
                </div>
              </div>
            </div>

        <div className="grid grid-cols-2 gap-6">
          <InputField label="Display Name" value={fullname} onChange={(v)=>setFullname(v)} />
          <InputField label="Email Address" value={email} onChange={(v)=>setEmail(v)} />
              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase text-gray-300 tracking-widest mb-2 block">Short Bio</label>
                <textarea 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-indigo-100 h-24 resize-none"
                  defaultValue="Focusing on mindfulness and morning yoga. Journeying towards 100 days of consistency."
                />
              </div>
            </div>
          </div>

          {/* Application Preferences Section */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Application Preferences</h3>
            <div className="space-y-6">
              <ToggleRow 
                icon={<Moon size={18} />} 
                label="Dark Mode" 
                desc="Switch to a restful dark interface for night tracking." 
                bg="bg-indigo-50" 
                color="text-indigo-600" 
                active={dark}
                onToggle={toggleTheme}
              />
              <ToggleRow 
                icon={<Smartphone size={18} />} 
                label="Push Notifications" 
                desc="Receive gentle reminders for your scheduled habits." 
                bg="bg-orange-50" 
                color="text-orange-500" 
                active
              />
              <ToggleRow 
                icon={<BarChart size={18} />} 
                label="Weekly Performance Summary" 
                desc="Get a beautiful digest of your mood and habit stats every Monday." 
                bg="bg-orange-50" 
                color="text-orange-600" 
                active
              />
            </div>
          </div>

          {/* Danger Zone: Delete Account */}
          <div className="p-10 rounded-[40px] border-2 border-dashed border-red-100 flex items-center justify-between bg-white/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
                <AlertCircle size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">Delete Account</h4>
                <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                  Permanently delete your profile and all habit data. This action is irreversible.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-8 py-4 bg-[#FEF2F2] text-red-600 rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all">
                Deactivate Sanctuary
              </button>
              <button onClick={async ()=>{
                try{
                  await axiosInstance.post('/logout');
                  toast.success('Logged out');
                  navigate('/login');
                }catch(err){
                  toast.error(err?.response?.data?.message || 'Logout failed');
                }
              }} className="px-6 py-3 bg-gray-50 text-gray-700 rounded-2xl font-bold">Logout</button>
            </div>
          </div>

          {/* Form Footer */}
          <div className="flex justify-end gap-4 pt-4">
            <button onClick={()=>window.location.reload()} className="px-10 py-4 bg-gray-100 text-gray-500 rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-2">Cancel</button>
            <button onClick={handleSave} className="px-10 py-4 bg-indigo-600 text-white rounded-[20px] font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const InputField = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-gray-300 tracking-widest block">{label}</label>
    <input 
      type="text" 
  value={value}
  onChange={(e)=>onChange?.(e.target.value)}
      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-100"
    />
  </div>
);

const ToggleRow = ({ icon, label, desc, bg, color, active = false, onToggle }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-5">
      <div className={`w-12 h-12 ${bg} ${color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <p className="text-[11px] text-gray-400 font-medium">{desc}</p>
      </div>
    </div>
    <button onClick={onToggle} className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${active ? 'bg-indigo-600' : 'bg-gray-200'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${active ? 'left-7' : 'left-1 shadow-sm'}`} />
    </button>
  </div>
);

export default SettingsView;