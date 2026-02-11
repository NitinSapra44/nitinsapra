import { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article
      className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:bg-white/10 hover:-translate-y-2 transition-all h-full"
      aria-label={`Testimonial from ${testimonial.client_name}`}
    >
      <div className="text-6xl text-primary/30 mb-4">&quot;</div>
      <blockquote>
        <p className="text-lg text-gray-400 mb-8 leading-relaxed">
          {testimonial.testimonial_text}
        </p>
      </blockquote>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-xl font-bold">
          {testimonial.client_name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold">{testimonial.client_name}</h3>
          <p className="text-sm text-gray-400">
            {testimonial.role}
            {testimonial.company && `, ${testimonial.company}`}
          </p>
        </div>
      </div>

      {testimonial.rating && (
        <div
          className="text-yellow-500 mt-4 text-xl"
          role="img"
          aria-label={`Rating: ${testimonial.rating} out of 5 stars`}
        >
          {'★'.repeat(testimonial.rating)}
          {'☆'.repeat(5 - testimonial.rating)}
        </div>
      )}
    </article>
  );
}
