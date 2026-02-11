import { createServerClient } from '@/lib/supabase/server';
import HomePageClient from '@/components/HomePageClient';
import { JsonLd } from '@/components/JsonLd';

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = createServerClient();

  const [
    { data: about },
    { data: skills },
    { data: projects },
    { data: testimonials },
  ] = await Promise.all([
    supabase.from('about').select('*').single(),
    supabase.from('skills').select('*').order('display_order', { ascending: true }),
    supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('display_order', { ascending: true }),
    supabase
      .from('testimonials')
      .select('*')
      .eq('featured', true)
      .order('display_order', { ascending: true }),
  ]);

  return (
    <>
      <JsonLd about={about} projects={projects || []} />
      <HomePageClient
        about={about}
        skills={skills || []}
        projects={projects || []}
        testimonials={testimonials || []}
      />
    </>
  );
}
