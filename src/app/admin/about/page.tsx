'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { About, AboutFormData } from '@/lib/types';
import RichTextEditor from '@/components/RichTextEditor';
import toast from 'react-hot-toast';

export default function AboutAdmin() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<AboutFormData>({
    name: '',
    title: '',
    bio: '',
    profile_image_url: '',
    location: '',
    email: '',
    linkedin_url: '',
    github_url: '',
    resume_url: '',
    years_experience: 0,
    total_projects: 0,
    total_clients: 0,
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        setAbout(data);
        setFormData({
          name: data.name,
          title: data.title,
          bio: data.bio,
          profile_image_url: data.profile_image_url || '',
          location: data.location || '',
          email: data.email || '',
          linkedin_url: data.linkedin_url || '',
          github_url: data.github_url || '',
          resume_url: data.resume_url || '',
          years_experience: data.years_experience,
          total_projects: data.total_projects,
          total_clients: data.total_clients,
        });
      }
    } catch (error) {
      console.error('Error fetching about:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Convert empty strings to null for optional fields
      const payload = {
        ...formData,
        profile_image_url: formData.profile_image_url || null,
        location: formData.location || null,
        email: formData.email || null,
        linkedin_url: formData.linkedin_url || null,
        github_url: formData.github_url || null,
        resume_url: formData.resume_url || null,
      };

      if (about) {
        // Update existing
        const { error } = await supabase
          .from('about')
          .update(payload)
          .eq('id', about.id);

        if (error) throw error;
        toast.success('Updated successfully!');
      } else {
        // Create new
        const { error } = await supabase
          .from('about')
          .insert([payload]);

        if (error) throw error;
        toast.success('Created successfully!');
      }

      fetchAbout();
    } catch (error) {
      console.error('Error saving about:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">About Section</h1>
        <p className="text-gray-400">Manage your profile and bio information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="e.g., Full-Stack Developer"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bio with WYSIWYG */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-2">Bio *</h2>
          <p className="text-sm text-gray-400 mb-4">
            Write a compelling introduction about yourself. Use the editor to format your text.
          </p>
          <RichTextEditor
            content={formData.bio}
            onChange={(html) => setFormData({ ...formData, bio: html })}
            placeholder="Tell visitors about yourself..."
          />
        </div>

        {/* URLs */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Links & Media</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Profile Image URL</label>
              <input
                type="url"
                value={formData.profile_image_url}
                onChange={(e) => setFormData({ ...formData, profile_image_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload to Supabase Storage or use external URL
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">GitHub URL</label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="https://github.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Resume URL</label>
              <input
                type="url"
                value={formData.resume_url}
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Years of Experience</label>
              <input
                type="number"
                value={formData.years_experience}
                onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total Projects</label>
              <input
                type="number"
                value={formData.total_projects}
                onChange={(e) => setFormData({ ...formData, total_projects: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total Clients</label>
              <input
                type="number"
                value={formData.total_clients}
                onChange={(e) => setFormData({ ...formData, total_clients: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={fetchAbout}
            className="px-8 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-all"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-gradient-to-r from-primary to-orange-500 rounded-lg font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
