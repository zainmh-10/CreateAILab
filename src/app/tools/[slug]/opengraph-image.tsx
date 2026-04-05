import { ImageResponse } from 'next/og';

import { safeGetToolBySlug } from '@/lib/content';

export const runtime = 'edge';
export const alt = 'CreatorAILab Tool Review';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = { params: Promise<{ slug: string }> };

export default async function ToolOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const tool = await safeGetToolBySlug(slug);

  if (!tool) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1e293b',
            color: 'white',
            fontSize: 48
          }}
        >
          Tool not found
        </div>
      ),
      { ...size }
    );
  }

  const description = tool.description.length > 120 ? `${tool.description.slice(0, 117)}...` : tool.description;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 48,
          background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 50%, #7c3aed 100%)',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 12
          }}
        >
          CreatorAILab · {tool.category}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 56,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-0.02em',
            marginBottom: 16
          }}
        >
          {tool.name} Review
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.4,
            maxWidth: 900
          }}
        >
          {description}
        </div>
      </div>
    ),
    { ...size }
  );
}
