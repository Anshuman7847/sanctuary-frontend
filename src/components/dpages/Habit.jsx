import React, { useEffect, useState } from 'react';
import { MoreVertical, Plus, Flame } from 'lucide-react';
import { Fab, Divider, IconButton } from '@mui/material';
import { axiosInstance } from '../../api/axiosinstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * REUSABLE COMPONENT: HabitItem
 * Renders individual habit cards with optional streak visualization.
 */
const HabitItem = ({ id, icon, color, title, time, glasses, streakData, dayType, onDelete, onEdit }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`relative bg-white p-6 rounded-[32px] border border-gray-100 flex items-center justify-between gap-4 transition-all hover:shadow-xl hover:scale-[1.01] ${streakData ? 'py-8' : 'py-5'}`}>
      <div className="flex items-center gap-5">
        <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center text-3xl shadow-sm`}>
          {icon}
        </div>

        <div>
          <h4 className="text-xl font-bold tracking-tight text-gray-900">{title}</h4>
          <div className="flex gap-2 mt-1.5 text-[10px] text-gray-400 font-black uppercase tracking-widest">
            {time && <span className="bg-gray-100 px-2.5 py-1 rounded-full">{time}</span>}
            {glasses && <span className="bg-gray-100 px-2.5 py-1 rounded-full">{glasses} Glasses</span>}
            <span className="bg-gray-100 px-2.5 py-1 rounded-full">{dayType}</span>
          </div>
        </div>
      </div>

      {streakData && (
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Last 7 Days</span>
          <div className="flex items-center gap-1.5 h-10">
            {streakData.map((d, i) => (
              <div key={i} className={`w-2 rounded-full transition-all ${d.completed ? 'bg-indigo-600' : 'bg-indigo-100'}`} style={{ height: `${(d.value / 10) * 100}%` }} />
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <IconButton size="small" sx={{ color: '#9CA3AF' }} onClick={() => setMenuOpen(v => !v)}>
          <MoreVertical size={20} />
        </IconButton>
        {menuOpen && (
          <div className="absolute top-8 right-0 bg-white border rounded shadow-md w-36 z-20">
            <button className="w-full text-left px-3 py-2 hover:bg-gray-100" onClick={() => { setMenuOpen(false); onEdit && onEdit(id); }}>Update</button>
            <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100" onClick={() => { setMenuOpen(false); onDelete && onDelete(id); }}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * MAIN PAGE: HabitRitualsPage
 */
const HabitRitualsPage = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openChoose, setOpenChoose] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null); // habit object when editing
  const [form, setForm] = useState({ title: '', icon: '', color: '', schedule: 'Daily' });
  const navigate = useNavigate();

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/habits');
      setHabits(res.data.habits || []);
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(()=>{ fetchHabits() },[])

  const openCreateFor = (category) => {
    // preset form by category
    if (category === 'morning') setForm({ title: '', icon: '🧘', color: 'bg-orange-100', schedule: 'Daily' });
    if (category === 'nutrition') setForm({ title: '', icon: '🍎', color: 'bg-red-100', schedule: 'MON-FRI' });
    setOpenChoose(false);
    setEditing(null);
    setOpenForm(true);
  }

  const handleSubmit = async () => {
    try {
      let res;
      if (editing) {
        res = await axiosInstance.patch(`/habits/${editing._id}`, form);
      } else {
        res = await axiosInstance.post('/habits', form);
      }
  setOpenForm(false); setEditing(null); fetchHabits();
  toast.success(res.data?.message || (editing ? 'Habit updated' : 'Habit created'));
    } catch (err) {
      console.error(err);
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err.message;
  if (status === 401) return navigate('/login');
  toast.error('Failed to save: ' + msg);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this habit?')) return;
    try {
      const res = await axiosInstance.delete(`/habits/${id}`);
      fetchHabits();
      toast.success(res.data?.message || 'Habit deleted');
    } catch(e){
      console.error(e);
      const status = e?.response?.status;
      const msg = e?.response?.data?.message || e.message;
      if (status === 401) return navigate('/login');
      toast.error('Failed to delete: ' + msg);
    }
  }

  const handleEdit = (id) => {
    const habit = habits.find(h => h._id === id);
    if (!habit) return;
    setEditing(habit); setForm({ title: habit.title || '', icon: habit.icon || '', color: habit.color || '', schedule: habit.schedule || 'Daily' }); setOpenForm(true);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-10 font-sans text-gray-900">
      {/* Header */}
      <div className="flex justify-between items-baseline mb-12">
        <div>
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Wellness Management</p>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">Habit Rituals</h2>
          <p className="text-base text-gray-500 mt-2 max-w-sm">Curate your daily journey to mindful living.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100 text-sm font-bold text-gray-700">
          <Flame size={18} className="text-orange-500" /> 12 Day Streak
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-8 space-y-12">
          <section>
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Morning Rituals</h3>
              <button className="text-sm font-bold text-indigo-600 hover:underline transition-all">View Progress</button>
            </div>
            <div className="space-y-6">
              {loading ? <p>Loading...</p> : (
                habits.filter(h => h.schedule === 'Daily').map(h => (
                  <HabitItem key={h._id} id={h._id} title={h.title} icon={h.icon} color={h.color} dayType={h.schedule} onDelete={handleDelete} onEdit={handleEdit} />
                ))
              )}
            </div>
          </section>

          <Divider sx={{ my: 6, opacity: 0.6 }} />

          <section>
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Nutrition & Health</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? <p>Loading...</p> : (
                habits.filter(h => h.schedule !== 'Daily').map(h => (
                  <HabitItem key={h._id} id={h._id} title={h.title} icon={h.icon} color={h.color} dayType={h.schedule} onDelete={handleDelete} onEdit={handleEdit} />
                ))
              )}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-10 bg-[#1E1B33] p-10 rounded-[48px] text-white flex flex-col justify-between shadow-2xl shadow-indigo-200/50 h-[380px] overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold tracking-tight mb-4">Monthly Serenity</h3>
              <p className="text-base text-indigo-100/70 leading-relaxed">You have completed <strong className="font-bold text-white">88%</strong> of your scheduled rituals this month.</p>
            </div>
            <div className="relative z-10">
              <p className="text-9xl font-black text-white tracking-tighter opacity-90">88%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 right-10">
        <Fab aria-label="add" size="large" onClick={()=> setOpenChoose(true)} sx={{ bgcolor: '#4F46E5', color: 'white', boxShadow: '0 20px 25px -5px rgba(79, 70, 229, 0.2)', '&:hover': { bgcolor: '#4338CA' } }}>
          <Plus size={28} />
        </Fab>
      </div>

      {openChoose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-bold mb-3">Add Habit</h3>
            <div className="flex flex-col gap-3">
              <button className="p-3 rounded border" onClick={()=> openCreateFor('morning')}>Morning Rituals</button>
              <button className="p-3 rounded border" onClick={()=> openCreateFor('nutrition')}>Nutrition & Health</button>
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-3 py-2" onClick={()=> setOpenChoose(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {openForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-3">{editing ? 'Update Habit' : 'Create Habit'}</h3>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Title</label>
              <input value={form.title} onChange={(e)=> setForm({...form, title: e.target.value})} className="w-full p-2 border rounded" />

              <label className="text-sm font-bold">Icon (emoji)</label>
              <input value={form.icon} onChange={(e)=> setForm({...form, icon: e.target.value})} className="w-full p-2 border rounded" />

              <label className="text-sm font-bold">Color (tailwind bg-*)</label>
              <input value={form.color} onChange={(e)=> setForm({...form, color: e.target.value})} className="w-full p-2 border rounded" />

              <label className="text-sm font-bold">Schedule</label>
              <input value={form.schedule} onChange={(e)=> setForm({...form, schedule: e.target.value})} className="w-full p-2 border rounded" />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button className="px-3 py-2 rounded bg-gray-200" onClick={()=> { setOpenForm(false); setEditing(null); }}>Cancel</button>
              <button className="px-3 py-2 rounded bg-indigo-600 text-white" onClick={handleSubmit}>{editing ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitRitualsPage;