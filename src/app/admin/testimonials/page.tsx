'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Testimonial, TestimonialFormData } from '@/lib/types';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaStar } from 'react-icons/fa';

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>({
    client_name: '',
    company: '',
    role: '',
    testimonial_text: '',
    rating: 5,
    avatar_url: '',
    display_order: 0,
    featured: false,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        client_name: testimonial.client_name,
        company: testimonial.company || '',
        role: testimonial.role || '',
        testimonial_text: testimonial.testimonial_text,
        rating: testimonial.rating || 5,
        avatar_url: testimonial.avatar_url || '',
        display_order: testimonial.display_order,
        featured: testimonial.featured,
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        client_name: '',
        company: '',
        role: '',
        testimonial_text: '',
        rating: 5,
        avatar_url: '',
        display_order: testimonials.length,
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        company: formData.company || null,
        role: formData.role || null,
        avatar_url: formData.avatar_url || null,
      };

      if (editingTestimonial) {
        const { error } = await supabase
          .from('testimonials')
          .update(payload)
          .eq('id', editingTestimonial.id);

        if (error) throw error;
        toast.success('Testimonial updated!');
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([payload]);

        if (error) throw error;
        toast.success('Testimonial added!');
      }

      fetchTestimonials();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save testimonial');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Testimonial deleted!');
      fetchTestimonials();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Testimonials</h1>
          <p className="text-gray-400">Manage client feedback and reviews</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-6 py-3 bg-gradient-to-r from-primary to-orange-500 rounded-lg font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center gap-2"
        >
          <FaPlus /> Add Testimonial
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-5xl text-primary/30">&quot;</div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openModal(testimonial)}
                  className="p-2 hover:bg-primary/20 rounded text-primary transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="p-2 hover:bg-red-500/20 rounded text-red-500 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-6 line-clamp-4">
              {testimonial.testimonial_text}
            </p>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-lg font-bold">
                {testimonial.client_name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-sm">{testimonial.client_name}</h4>
                <p className="text-xs text-gray-400">
                  {testimonial.role}{testimonial.company && `, ${testimonial.company}`}
                </p>
              </div>
            </div>

            {testimonial.rating && (
              <div className="text-yellow-500 flex gap-1 mb-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            )}

            {testimonial.featured && (
              <span className="inline-block px-2 py-1 bg-primary/20 text-primary rounded text-xs font-semibold">
                Featured
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Client Name *</label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="CEO, Product Manager, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Testimonial *</label>
                <textarea
                  value={formData.testimonial_text}
                  onChange={(e) => setFormData({ ...formData, testimonial_text: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none min-h-[150px]"
                  required
                  placeholder="What the client said about your work..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Rating: {formData.rating} stars
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <div className="text-yellow-500 flex gap-1">
                    {Array.from({ length: formData.rating || 0 }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Avatar URL</label>
                <input
                  type="url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="https://..."
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
                  {editingTestimonial ? 'Update' : 'Add'} Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
