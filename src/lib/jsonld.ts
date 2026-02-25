export function productSchema(args: { name: string; description: string; category: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: args.name,
    description: args.description,
    category: args.category
  };
}

export function articleSchema(args: { title: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.title,
    description: args.description,
    mainEntityOfPage: args.url
  };
}
