'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Skill, SkillFormData } from '@/lib/types';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    icon: '',
    icon_url: '',
    category: '',
    proficiency: 5,
    display_order: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setSkills(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        icon: skill.icon || '',
        icon_url: skill.icon_url || '',
        category: skill.category || '',
        proficiency: skill.proficiency || 5,
        display_order: skill.display_order,
      });
    } else {
      setEditingSkill(null);
      setFormData({
        name: '',
        icon: '',
        icon_url: '',
        category: '',
        proficiency: 5,
        display_order: skills.length,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        icon: formData.icon || null,
        icon_url: formData.icon_url || null,
        category: formData.category || null,
      };

      if (editingSkill) {
        const { error } = await supabase
          .from('skills')
          .update(payload)
          .eq('id', editingSkill.id);

        if (error) throw error;
        toast.success('Skill updated!');
      } else {
        const { error } = await supabase
          .from('skills')
          .insert([payload]);

        if (error) throw error;
        toast.success('Skill added!');
      }

      fetchSkills();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save skill');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Skill deleted!');
      fetchSkills();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete skill');
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Skills</h1>
          <p className="text-gray-400">Manage your technical skills</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-3 bg-gradient-to-r from-primary to-orange-500 rounded-lg font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center gap-2"
        >
          <FaPlus /> Add Skill
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl">{skill.icon || '💻'}</div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openModal(skill)}
                  className="p-2 hover:bg-primary/20 rounded text-primary transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="p-2 hover:bg-red-500/20 rounded text-red-500 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
            {skill.category && (
              <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-400">
                {skill.category}
              </span>
            )}
            {skill.proficiency && (
              <div className="mt-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded ${
                        i < skill.proficiency! ? 'bg-primary' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingSkill ? 'Edit Skill' : 'Add New Skill'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Icon (Emoji)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="⚛️"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use emoji or leave blank to use icon URL
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Icon URL (Optional)</label>
                <input
                  type="url"
                  value={formData.icon_url}
                  onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                >
                  <option value="">Select category</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="database">Database</option>
                  <option value="mobile">Mobile</option>
                  <option value="tools">Tools</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Proficiency (1-5): {formData.proficiency}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  min="0"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-orange-500 rounded-lg font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  {editingSkill ? 'Update' : 'Add'} Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
