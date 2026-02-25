import type { Metadata } from 'next';

const siteName = 'CreatorAILab';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export function createMetadata(title: string, description: string, path = '/'): Metadata {
  const url = new URL(path, siteUrl).toString();
  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title,
      description,
      siteName,
      url,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}
