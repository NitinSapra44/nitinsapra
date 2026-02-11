import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-primary hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/20 transition-all group h-full">
      <div
        className="h-64 relative flex items-center justify-center text-7xl overflow-hidden"
        style={!project.image_url ? {
          background:
            index % 3 === 0
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : index % 3 === 1
              ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        } : undefined}
      >
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          project.project_type === 'web' ? '🌐' : '📱'
        )}
        <span className="absolute top-4 right-4 px-4 py-2 bg-black/80 rounded-full text-xs font-mono uppercase tracking-wider">
          {project.project_type}
        </span>
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        {project.subtitle && (
          <p className="text-primary font-semibold mb-4">{project.subtitle}</p>
        )}
        <div
          className="description-content text-white/80 mb-6 line-clamp-3 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack.map((tech, i) => (
            <span
              key={i}
              className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.live_demo_url && (
            <a
              href={project.live_demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-white/20 rounded-full text-sm hover:bg-white/5 hover:border-primary transition-all"
            >
              Live Demo
            </a>
          )}
          {project.code_url && (
            <a
              href={project.code_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-white/20 rounded-full text-sm hover:bg-white/5 hover:border-primary transition-all"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
