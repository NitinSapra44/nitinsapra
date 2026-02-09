'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { ContactSubmission } from '@/lib/types';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

export default function ContactAdmin() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast.success('Status updated!');
      fetchSubmissions();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Contact Submissions</h1>
        <p className="text-gray-400">
          {submissions.length} total message{submissions.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-gray-400 text-lg">No contact submissions yet</p>
          </div>
        ) : (
          submissions.map((submission) => (
            <div
              key={submission.id}
              className={`bg-white/5 border rounded-2xl p-6 transition-all ${
                submission.status === 'new'
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-white/10'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{submission.name}</h3>
                  <a
                    href={`mailto:${submission.email}`}
                    className="text-secondary hover:underline"
                  >
                    {submission.email}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    {formatDistanceToNow(new Date(submission.created_at), { addSuffix: true })}
                  </span>
                  
                  <select
                    value={submission.status}
                    onChange={(e) => updateStatus(submission.id, e.target.value as any)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                      submission.status === 'new'
                        ? 'bg-primary/20 border-primary/30 text-primary'
                        : submission.status === 'read'
                        ? 'bg-secondary/20 border-secondary/30 text-secondary'
                        : 'bg-green-500/20 border-green-500/30 text-green-500'
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-gray-300 whitespace-pre-wrap">{submission.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
