'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { About, Skill, Project, Testimonial } from '@/lib/types';
import Link from 'next/link';
import Carousel from '@/components/Carousel';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCard from '@/components/TestimonialCard';

export default function HomePage() {
  const [about, setAbout] = useState<About | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch about
      const { data: aboutData } = await supabase
        .from('about')
        .select('*')
        .single();
      
      // Fetch skills
      const { data: skillsData } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });
      
      // Fetch featured projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('display_order', { ascending: true });

      // Fetch featured testimonials
      const { data: testimonialsData } = await supabase
        .from('testimonials')
        .select('*')
        .eq('featured', true)
        .order('display_order', { ascending: true });

      setAbout(aboutData);
      setSkills(skillsData || []);
      setProjects(projectsData || []);
      setTestimonials(testimonialsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-mono text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-w-screen bg-dark text-light">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-16 py-8 flex justify-between items-center bg-dark/80 backdrop-blur-md border-b border-white/10">
        <div className="font-mono font-bold text-xl bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
          NS.
        </div>
        <ul className="flex gap-12 text-gray-400">
          <li><a href="#about" className="hover:text-light transition-colors">About</a></li>
          <li><a href="#skills" className="hover:text-light transition-colors">Skills</a></li>
          <li><a href="#projects" className="hover:text-light transition-colors">Projects</a></li>
          <li><a href="#testimonials" className="hover:text-light transition-colors">Testimonials</a></li>
          <li><a href="#contact" className="hover:text-light transition-colors">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="about" className="min-h-screen px-16 pt-32 pb-16 grid md:grid-cols-2 gap-16 items-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute top-1/4 right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10">
          <div className="font-mono text-sm text-secondary mb-4 uppercase tracking-wider">
            {about?.title || 'Full-Stack Developer'}
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-b from-light to-gray-400 bg-clip-text text-transparent leading-tight">
            {about?.name || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-400 mb-6 max-w-xl">
            Building scalable digital experiences with the MERN stack
          </p>
          {about?.bio && (
            <div 
              className="text-lg text-gray-400 mb-8 max-w-lg prose prose-invert"
              dangerouslySetInnerHTML={{ __html: about.bio }}
            />
          )}
          <div className="flex gap-6 flex-wrap">
            <a 
              href="#projects" 
              className="px-10 py-4 bg-gradient-to-r from-primary to-orange-500 rounded-full font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-10 py-4 border-2 border-gray-600 rounded-full font-semibold hover:border-light hover:bg-white/5 transition-all"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>

        <div className="relative z-10">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 rounded-3xl p-12 backdrop-blur-lg transform rotate-2 hover:rotate-0 transition-transform">
            {about?.profile_image_url ? (
              <img 
                src={about.profile_image_url} 
                alt={about.name}
                className="w-full aspect-square object-cover rounded-2xl mb-8 filter grayscale hover:grayscale-0 transition-all"
              />
            ) : (
              <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl mb-8 flex items-center justify-center text-6xl">
                👨‍💻
              </div>
            )}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold font-mono bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  {about?.total_projects || 50}+
                </div>
                <div className="text-sm text-gray-400 mt-2">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold font-mono bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  {about?.years_experience || 5}+
                </div>
                <div className="text-sm text-gray-400 mt-2">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold font-mono bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  {about?.total_clients || 30}+
                </div>
                <div className="text-sm text-gray-400 mt-2">Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-16 py-24 bg-gradient-to-b from-dark to-[#111]">
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-secondary mb-4 uppercase tracking-wider">
            What I Work With
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern web applications
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {skills.map((skill) => (
            <div 
              key={skill.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-primary hover:-translate-y-2 transition-all cursor-pointer group"
            >
              <div className="text-5xl mb-4 filter grayscale group-hover:grayscale-0 transition-all">
                {skill.icon || '💻'}
              </div>
              <div className="font-semibold">{skill.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-16 py-24 bg-dark">
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-secondary mb-4 uppercase tracking-wider">
            My Work
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A selection of web and mobile applications I&apos;ve built
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel
            slidesPerView={{ base: 1, md: 2, lg: 3 }}
            gap={32}
            loop={projects.length > 3}
            showArrows={projects.length > 3}
            showDots={projects.length > 3}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </Carousel>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-16 py-24 bg-gradient-to-b from-dark to-[#111]">
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-secondary mb-4 uppercase tracking-wider">
            Client Feedback
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
            What People Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Testimonials from clients and collaborators
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Carousel
            slidesPerView={{ base: 1, md: 2, lg: 3 }}
            gap={32}
            loop={testimonials.length > 3}
            autoplay={testimonials.length > 3}
            autoplayDelay={6000}
            showArrows={testimonials.length > 3}
            showDots={testimonials.length > 3}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="px-16 py-32 bg-dark text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Let&apos;s Build Something Amazing Together
          </h2>
          <p className="text-2xl text-gray-400 mb-12">
            Have a project in mind? I&apos;m always open to discussing new opportunities and innovative ideas.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            {about?.email && (
              <a 
                href={`mailto:${about.email}`}
                className="px-10 py-4 bg-gradient-to-r from-primary to-orange-500 rounded-full font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
              >
                Get In Touch
              </a>
            )}
            {about?.resume_url && (
              <a 
                href={about.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 border-2 border-gray-600 rounded-full font-semibold hover:border-light hover:bg-white/5 transition-all"
              >
                Download Resume
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-16 py-12 bg-[#0a0a0a] border-t border-white/10 text-center">
        <div className="flex justify-center gap-8 mb-8 text-gray-400">
          {about?.linkedin_url && (
            <a href={about.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-2xl">
              🔗 LinkedIn
            </a>
          )}
          {about?.github_url && (
            <a href={about.github_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-2xl">
              💻 GitHub
            </a>
          )}
          {about?.email && (
            <a href={`mailto:${about.email}`} className="hover:text-primary transition-colors text-2xl">
              📧 Email
            </a>
          )}
        </div>
        <p className="text-gray-400">&copy; {new Date().getFullYear()} {about?.name || 'Your Name'}. All rights reserved.</p>
        <p className="text-gray-500 text-sm mt-2">Built with Next.js & Supabase</p>
        <Link 
          href="/admin" 
          className="text-gray-600 hover:text-primary text-xs mt-4 inline-block transition-colors"
        >
          Admin
        </Link>
      </footer>
    </div>
  );
}
