'use client';

import { useState } from 'react';
import { About, Skill, Project, Testimonial } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '@/components/Carousel';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCard from '@/components/TestimonialCard';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { SiUpwork, SiFiverr } from 'react-icons/si';

interface HomePageClientProps {
  about: About | null;
  skills: Skill[];
  projects: Project[];
  testimonials: Testimonial[];
}

export default function HomePageClient({
  about,
  skills,
  projects,
  testimonials,
}: HomePageClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-w-screen bg-dark text-light">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-light focus:rounded"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <header>
        <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-16 py-4 md:py-8 flex justify-between items-center bg-dark/80 backdrop-blur-md border-b border-white/10">
          <div className="font-mono font-bold text-xl bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            NS.
          </div>

          {/* Desktop nav links */}
          <ul className="hidden md:flex gap-8 lg:gap-12 text-gray-400">
            <li><a href="#about" className="hover:text-light transition-colors">About</a></li>
            <li><a href="#skills" className="hover:text-light transition-colors">Skills</a></li>
            <li><a href="#projects" className="hover:text-light transition-colors">Projects</a></li>
            <li><a href="#testimonials" className="hover:text-light transition-colors">Testimonials</a></li>
            <li><a href="#contact" className="hover:text-light transition-colors">Contact</a></li>
          </ul>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-light transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-light transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-light transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-md pt-20 px-6 md:hidden">
          <ul className="flex flex-col gap-6 text-xl text-gray-400">
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-light transition-colors border-b border-white/10">About</a></li>
            <li><a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-light transition-colors border-b border-white/10">Skills</a></li>
            <li><a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-light transition-colors border-b border-white/10">Projects</a></li>
            <li><a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-light transition-colors border-b border-white/10">Testimonials</a></li>
            <li><a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-light transition-colors">Contact</a></li>
          </ul>
        </div>
      )}

      <main id="main-content">
        {/* Hero Section */}
        <section id="about" aria-label="About Nitin Sapra" className="min-h-screen px-4 sm:px-8 md:px-16 pt-24 md:pt-32 pb-12 md:pb-16 grid md:grid-cols-2 gap-8 md:gap-16 items-center relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute top-1/4 right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" />

          <div className="relative z-10">
            <div className="font-mono text-sm text-secondary mb-4 uppercase tracking-wider">
              {about?.title || 'Full-Stack Developer'}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold mb-4 md:mb-6 bg-gradient-to-b from-light to-gray-400 bg-clip-text text-transparent leading-tight">
              {about?.name || 'Your Name'}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-4 md:mb-6 max-w-xl">
              Building scalable digital experiences with the MERN stack
            </p>
            {about?.bio && (
              <div
                className="description-content text-base md:text-lg text-gray-400 mb-6 md:mb-8 max-w-lg"
                dangerouslySetInnerHTML={{ __html: about.bio }}
              />
            )}
            <div className="flex gap-4 md:gap-6 flex-wrap">
              <a
                href="#projects"
                className="px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-primary to-orange-500 rounded-full font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1 text-sm md:text-base"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 md:px-10 py-3 md:py-4 border-2 border-gray-600 rounded-full font-semibold hover:border-light hover:bg-white/5 transition-all text-sm md:text-base"
              >
                Let&apos;s Talk
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              {about?.linkedin_url && (
                <a
                  href={about.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all hover:-translate-y-1"
                >
                  <FaLinkedinIn className="text-lg" />
                </a>
              )}
              {about?.github_url && (
                <a
                  href={about.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all hover:-translate-y-1"
                >
                  <FaGithub className="text-lg" />
                </a>
              )}
              {about?.upwork_url && (
                <a
                  href={about.upwork_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Upwork"
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-[#14A800] hover:bg-[#14A800]/10 transition-all hover:-translate-y-1"
                >
                  <SiUpwork className="text-lg" />
                </a>
              )}
              {about?.fiverr_url && (
                <a
                  href={about.fiverr_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fiverr"
                  className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-[#1DBF73] hover:bg-[#1DBF73]/10 transition-all hover:-translate-y-1"
                >
                  <SiFiverr className="text-lg" />
                </a>
              )}
            </div>
          </div>

          <div className="relative z-10">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 backdrop-blur-lg transform rotate-2 hover:rotate-0 transition-transform">
              {about?.profile_image_url ? (
                <Image
                  src={about.profile_image_url}
                  alt={`Portrait of ${about.name}, ${about.title || 'Full-Stack Developer'}`}
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover rounded-2xl mb-6 md:mb-8 filter grayscale hover:grayscale-0 transition-all"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl mb-6 md:mb-8 flex items-center justify-center text-4xl md:text-6xl">
                  👨‍💻
                </div>
              )}
              <div className="grid grid-cols-3 gap-3 md:gap-6">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold font-mono bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                    {about?.total_projects || 50}+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold font-mono bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                    {about?.years_experience || 5}+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold font-mono bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                    {about?.total_clients || 30}+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">Clients</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" aria-label="Skills and Technologies" className="px-4 sm:px-8 md:px-16 py-16 md:py-24 bg-gradient-to-b from-dark to-[#111]">
          <div className="text-center mb-10 md:mb-16">
            <div className="font-mono text-sm text-secondary mb-4 uppercase tracking-wider">
              What I Work With
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              Skills & Technologies
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern web and mobile applications
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white/50 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 text-center hover:bg-white/10 hover:border-primary hover:-translate-y-2 transition-all cursor-pointer group"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4 filter transition-all flex items-center justify-center">
                  {skill.icon_url ? (
                    <Image
                      src={skill.icon_url}
                      alt={`${skill.name} icon`}
                      width={48}
                      height={48}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
                      sizes="48px"
                    />
                  ) : (
                    skill.icon || '💻'
                  )}
                </div>
                <div className="font-semibold text-sm md:text-base">{skill.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" aria-label="Featured Projects" className="px-4 sm:px-8 md:px-16 py-16 md:py-24 bg-dark">
          <div className="text-center mb-10 md:mb-16">
            <div className="font-mono text-sm text-secondary mb-4 uppercase tracking-wider">
              My Work
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              Featured Projects
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
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
        <section id="testimonials" aria-label="Client Testimonials" className="px-4 sm:px-8 md:px-16 py-16 md:py-24 bg-gradient-to-b from-dark to-[#111]">
          <div className="text-center mb-10 md:mb-16">
            <div className="font-mono text-sm text-secondary mb-4 uppercase tracking-wider">
              Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              What People Say
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
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
        <section id="contact" aria-label="Contact Information" className="px-4 sm:px-8 md:px-16 py-16 md:py-32 bg-dark text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
              Let&apos;s Build Something Amazing Together
            </h2>
            <p className="text-lg md:text-2xl text-gray-400 mb-8 md:mb-12">
              Have a project in mind? I&apos;m always open to discussing new opportunities and innovative ideas.
            </p>
            <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
              {about?.email && (
                <a
                  href={`mailto:${about.email}`}
                  className="px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-primary to-orange-500 rounded-full font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1 text-sm md:text-base"
                >
                  Get In Touch
                </a>
              )}
              {about?.resume_url && (
                <a
                  href={about.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 md:px-10 py-3 md:py-4 border-2 border-gray-600 rounded-full font-semibold hover:border-light hover:bg-white/5 transition-all text-sm md:text-base"
                >
                  Download Resume
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer aria-label="Site footer" className="px-4 sm:px-8 md:px-16 py-8 md:py-12 bg-[#0a0a0a] border-t border-white/10 text-center">
        <div className="flex justify-center gap-5 sm:gap-6 mb-6 md:mb-8">
          {about?.linkedin_url && (
            <a
              href={about.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all"
            >
              <FaLinkedinIn className="text-xl" />
            </a>
          )}
          {about?.github_url && (
            <a
              href={about.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all"
            >
              <FaGithub className="text-xl" />
            </a>
          )}
          {about?.upwork_url && (
            <a
              href={about.upwork_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Upwork"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-[#14A800] hover:bg-[#14A800]/10 transition-all"
            >
              <SiUpwork className="text-xl" />
            </a>
          )}
          {about?.fiverr_url && (
            <a
              href={about.fiverr_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fiverr"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-[#1DBF73] hover:bg-[#1DBF73]/10 transition-all"
            >
              <SiFiverr className="text-xl" />
            </a>
          )}
        </div>
        <p className="text-gray-400 text-sm md:text-base">&copy; {new Date().getFullYear()} {about?.name || 'Your Name'}. All rights reserved.</p>
        <p className="text-gray-500 text-xs md:text-sm mt-2">Built with Next.js & Supabase</p>
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
