import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { supabase } from '../supabase';
import Auth from './Auth';
import Header from './components/Header';
import Body from './components/Body';
import Modal from './components/Modal';
import ControlBtn from './components/ControlBtn';
import SectionBtn from './components/sectionBtn';

const App = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [viewCompleted, setViewCompleted] = useState(false);

  // ✅ Load authenticated session if available
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✅ Fetch user tasks from Supabase
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id);

    if (!error) {
      setContent(data.filter(t => !t.completed));
      setCompletedTasks(data.filter(t => t.completed));
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const clearCompletedTasks = () => {
    const ids = completedTasks.map(task => task.id);
    supabase.from('tasks').delete().in('id', ids);
    setCompletedTasks([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = Object.fromEntries(formData.entries());
    const colors = ["#BFDBFE", "#A7F3D0", "#FDE68A", "#FCA5A5"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newTask = {
      title: newItem.title,
      desc: newItem.desc,
      color: randomColor,
      completed: false,
      user_id: user.id,
      created_at: new Date().toISOString() 
    };

    const { data, error } = await supabase.from('tasks').insert([newTask]).select();
    if (!error && data) {
      setContent(prev => [...prev, data[0]]);
      e.target.reset();
      setIsModalOpen(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const markSelectedTasksCompleted = async () => {
    const updates = selectedIds.map(id => ({ id, completed: true }));
    await supabase.from('tasks').upsert(updates);

    const movedTasks = content.filter(task => selectedIds.includes(task.id));
    setCompletedTasks(prev => [...prev, ...movedTasks]);
    setContent(prev => prev.filter(task => !selectedIds.includes(task.id)));
    setSelectedIds([]);
  };

  const removeSelectedTasks = async () => {
    await supabase.from('tasks').delete().in('id', selectedIds);
    setContent(prev => prev.filter(task => !selectedIds.includes(task.id)));
    setSelectedIds([]);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // ✅ If not logged in, show Auth component
  if (!user) return <Auth onAuth={setUser} />;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      toast.success('You have been logged out.');
      setUser(null);
    } else {
      toast.error('Logout failed. Please try again.');
    }
  };
  

  if (!user) {
    return <Auth onAuth={(user) => setUser(user)} />;
  }

  return (
    <>
      <Header onLogout={logout} user={user} onLogOut={handleLogout} />
      <div className='grid grid-cols-1 lg:grid-cols-12 lg:pt-8'>
        <div className='col-span-3'>
          <SectionBtn setViewCompleted={setViewCompleted} viewCompleted={viewCompleted} />
        </div>
        <div className='col-span-9'>
          <Body
            addFunction={openModal}
            content={viewCompleted ? completedTasks : content}
            onCheckboxChange={handleCheckboxChange}
            selectedIds={selectedIds}
            viewCompleted={viewCompleted}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Add a task</h2>
        <form onSubmit={handleSubmit}>
          <label className='flex flex-col space-y-2'>
            <p className='font-semibold'>Task Title</p>
            <input name='title' type="text" className='border px-2' required />
          </label>
          <label className='flex flex-col space-y-2'>
            <p className='font-semibold'>Task Description</p>
            <textarea name="desc" className='border px-2' required />
          </label>
          <div className='mt-4 space-x-3 flex items-center justify-center'>
            <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">Add to Tasks</button>
            <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </form>
      </Modal>

      <ControlBtn
        disability={selectedIds.length === 0}
        removeTask={removeSelectedTasks}
        markTaskCompleted={markSelectedTasksCompleted}
      />

      {viewCompleted && completedTasks.length > 0 && (
        <div className="flex justify-center pt-4">
          <button onClick={clearCompletedTasks} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow">
            Clear Completed Tasks
          </button>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default App;
