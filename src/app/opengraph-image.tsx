import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'CreatorAILab - AI tools discovery and workflow platform for creators';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 50%, #7c3aed 100%)',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.02em',
            marginBottom: 16
          }}
        >
          CreatorAILab
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: 'rgba(255,255,255,0.9)',
            maxWidth: 800,
            textAlign: 'center',
            lineHeight: 1.4
          }}
        >
          AI tools discovery and workflow platform for creators
        </div>
      </div>
    ),
    { ...size }
  );
}
