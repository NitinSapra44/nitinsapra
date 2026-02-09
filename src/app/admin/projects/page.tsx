'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Project, ProjectFormData } from '@/lib/types';
import RichTextEditor from '@/components/RichTextEditor';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [techInput, setTechInput] = useState('');
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    subtitle: '',
    description: '',
    project_type: 'web',
    tech_stack: [],
    live_demo_url: '',
    code_url: '',
    image_url: '',
    featured: false,
    display_order: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        subtitle: project.subtitle || '',
        description: project.description,
        project_type: project.project_type,
        tech_stack: project.tech_stack,
        live_demo_url: project.live_demo_url || '',
        code_url: project.code_url || '',
        image_url: project.image_url || '',
        featured: project.featured,
        display_order: project.display_order,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        project_type: 'web',
        tech_stack: [],
        live_demo_url: '',
        code_url: '',
        image_url: '',
        featured: false,
        display_order: projects.length,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setTechInput('');
  };

  const addTechTag = () => {
    if (techInput.trim() && !formData.tech_stack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        tech_stack: [...formData.tech_stack, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechTag = (tag: string) => {
    setFormData({
      ...formData,
      tech_stack: formData.tech_stack.filter((t) => t !== tag),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        subtitle: formData.subtitle || null,
        live_demo_url: formData.live_demo_url || null,
        code_url: formData.code_url || null,
        image_url: formData.image_url || null,
      };

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast.success('Project updated!');
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([payload]);

        if (error) throw error;
        toast.success('Project added!');
      }

      fetchProjects();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Project deleted!');
      fetchProjects();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete project');
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-3 bg-gradient-to-r from-primary to-orange-500 rounded-lg font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center gap-2"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary transition-all group"
          >
            <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative">
              <span className="absolute top-4 right-4 px-3 py-1 bg-black/80 rounded-full text-xs font-mono uppercase">
                {project.project_type}
              </span>
              {project.featured && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary rounded-full text-xs font-semibold">
                  Featured
                </span>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              {project.subtitle && (
                <p className="text-primary text-sm mb-3">{project.subtitle}</p>
              )}
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech_stack.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech_stack.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{project.tech_stack.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openModal(project)}
                  className="flex-1 px-4 py-2 border border-primary/30 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 px-4 py-2 border border-red-500/30 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-4xl w-full my-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="Company/Project name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <RichTextEditor
                  content={formData.description}
                  onChange={(html) => setFormData({ ...formData, description: html })}
                  placeholder="Describe your project..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Type *</label>
                  <select
                    value={formData.project_type}
                    onChange={(e) => setFormData({ ...formData, project_type: e.target.value as 'web' | 'mobile' })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                    required
                  >
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                  </select>
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
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tech Stack</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechTag())}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="Add technology..."
                  />
                  <button
                    type="button"
                    onClick={addTechTag}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tech_stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-sm flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechTag(tech)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.live_demo_url}
                    onChange={(e) => setFormData({ ...formData, live_demo_url: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Code URL</label>
                  <input
                    type="url"
                    value={formData.code_url}
                    onChange={(e) => setFormData({ ...formData, code_url: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Project Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 rounded border-white/10"
                />
                <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                  Featured (Show on homepage)
                </label>
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
                  {editingProject ? 'Update' : 'Add'} Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
