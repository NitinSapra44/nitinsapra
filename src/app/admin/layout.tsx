'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUser, FaCog, FaProjectDiagram, FaStar, FaEnvelope } from 'react-icons/fa';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', icon: FaHome, label: 'Dashboard' },
    { href: '/admin/about', icon: FaUser, label: 'About' },
    { href: '/admin/skills', icon: FaCog, label: 'Skills' },
    { href: '/admin/projects', icon: FaProjectDiagram, label: 'Projects' },
    { href: '/admin/testimonials', icon: FaStar, label: 'Testimonials' },
    { href: '/admin/contact', icon: FaEnvelope, label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/10 p-6 flex flex-col">
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="font-mono font-bold text-2xl bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              NS.
            </div>
            <span className="text-sm text-gray-400">CMS</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-gray-400 hover:bg-white/5 hover:text-light'
                }`}
              >
                <Icon className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-light rounded-lg hover:bg-white/5 transition-all"
          >
            <span>← Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
