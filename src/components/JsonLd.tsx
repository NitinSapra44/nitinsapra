import { siteConfig } from '@/lib/seo-config';
import { About, Project } from '@/lib/types';

interface JsonLdProps {
  about: About | null;
  projects: Project[];
}

export function JsonLd({ about, projects }: JsonLdProps) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: about?.name || siteConfig.name,
    jobTitle: about?.title || 'Full-Stack Developer',
    description: siteConfig.description,
    url: siteConfig.url,
    email: about?.email || undefined,
    address: about?.location
      ? {
          '@type': 'PostalAddress',
          addressLocality: about.location,
        }
      : undefined,
    sameAs: [about?.linkedin_url, about?.github_url].filter(Boolean),
    image: about?.profile_image_url || undefined,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: about?.name || siteConfig.name,
    },
  };

  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio',
    description: `Featured projects by ${about?.name || siteConfig.name}`,
    url: `${siteConfig.url}/#projects`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.subtitle || project.title,
          url: project.live_demo_url || undefined,
          image: project.image_url || undefined,
          author: {
            '@type': 'Person',
            name: about?.name || siteConfig.name,
          },
          keywords: project.tech_stack?.join(', '),
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {projects.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
        />
      )}
    </>
  );
}
