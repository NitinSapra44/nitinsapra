'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { FaProjectDiagram, FaCog, FaStar, FaEnvelope } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    testimonials: 0,
    contacts: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [
      { count: projectsCount },
      { count: skillsCount },
      { count: testimonialsCount },
      { count: contactsCount },
    ] = await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('skills').select('*', { count: 'exact', head: true }),
      supabase.from('testimonials').select('*', { count: 'exact', head: true }),
      supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    ]);

    setStats({
      projects: projectsCount || 0,
      skills: skillsCount || 0,
      testimonials: testimonialsCount || 0,
      contacts: contactsCount || 0,
    });
  };

  const statCards = [
    {
      label: 'Total Projects',
      value: stats.projects,
      icon: FaProjectDiagram,
      href: '/admin/projects',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      label: 'Skills',
      value: stats.skills,
      icon: FaCog,
      href: '/admin/skills',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      label: 'Testimonials',
      value: stats.testimonials,
      icon: FaStar,
      href: '/admin/testimonials',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      label: 'Contact Forms',
      value: stats.contacts,
      icon: FaEnvelope,
      href: '/admin/contact',
      gradient: 'from-pink-500 to-red-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Manage your portfolio content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                  <Icon className="text-2xl text-white" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-light transition-colors">
                  View →
                </span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/about"
            className="p-4 border border-white/10 rounded-lg hover:border-primary hover:bg-white/5 transition-all"
          >
            <h3 className="font-semibold mb-1">Edit About</h3>
            <p className="text-sm text-gray-400">Update your profile and bio</p>
          </Link>
          
          <Link
            href="/admin/projects"
            className="p-4 border border-white/10 rounded-lg hover:border-primary hover:bg-white/5 transition-all"
          >
            <h3 className="font-semibold mb-1">Add Project</h3>
            <p className="text-sm text-gray-400">Showcase your latest work</p>
          </Link>
          
          <Link
            href="/admin/skills"
            className="p-4 border border-white/10 rounded-lg hover:border-primary hover:bg-white/5 transition-all"
          >
            <h3 className="font-semibold mb-1">Manage Skills</h3>
            <p className="text-sm text-gray-400">Update your tech stack</p>
          </Link>
          
          <Link
            href="/admin/testimonials"
            className="p-4 border border-white/10 rounded-lg hover:border-primary hover:bg-white/5 transition-all"
          >
            <h3 className="font-semibold mb-1">Add Testimonial</h3>
            <p className="text-sm text-gray-400">Share client feedback</p>
          </Link>
          
          <Link
            href="/"
            target="_blank"
            className="p-4 border border-white/10 rounded-lg hover:border-secondary hover:bg-white/5 transition-all"
          >
            <h3 className="font-semibold mb-1">Preview Site</h3>
            <p className="text-sm text-gray-400">See your live portfolio</p>
          </Link>
          
          <Link
            href="/admin/contact"
            className="p-4 border border-white/10 rounded-lg hover:border-primary hover:bg-white/5 transition-all"
          >
            <h3 className="font-semibold mb-1">View Messages</h3>
            <p className="text-sm text-gray-400">Check contact submissions</p>
          </Link>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-2">💡 Getting Started</h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>• Start by updating your About section with your bio and profile image</li>
          <li>• Add your skills to showcase your technical expertise</li>
          <li>• Create project entries for both web and mobile applications</li>
          <li>• Enable featured projects and testimonials to display on homepage</li>
          <li>• Use the WYSIWYG editor to format descriptions with HTML</li>
        </ul>
      </div>
    </div>
  );
}
