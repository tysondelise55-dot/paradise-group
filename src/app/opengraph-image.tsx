import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/lib/data';

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Read at module scope (static files) so the card is prerendered at build time
const logo = readFile(join(process.cwd(), 'public/images/brand/palm-aqua.png')).then((b) => `data:image/png;base64,${b.toString('base64')}`);
const font = readFile(join(process.cwd(), 'src/assets/archivo-condensed-800.ttf'));
const photo = readFile(join(process.cwd(), 'public/images/events/laser-beams.jpg')).then((b) => `data:image/jpeg;base64,${b.toString('base64')}`);

export default async function OpengraphImage() {
  const [logoSrc, photoSrc, fontData] = await Promise.all([logo, photo, font]);
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#0d0d1a', fontFamily: 'Archivo' }}>
        <img src={photoSrc} width={1200} height={630} alt="" style={{ position: 'absolute', inset: 0, width: 1200, height: 630, objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', backgroundImage: 'linear-gradient(90deg, rgba(13,13,26,0.97), rgba(13,13,26,0.82) 55%, rgba(13,13,26,0.4))' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img src={logoSrc} width={72} height={72} alt="" />
            <div style={{ display: 'flex', fontSize: 44, fontWeight: 800, color: '#e8ecf2', letterSpacing: 1, textTransform: 'uppercase' }}>{site.name}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 116, fontWeight: 800, lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: -1 }}>
            <div style={{ display: 'flex', color: '#e8ecf2' }}>DJ, lights and sound</div>
            <div style={{ display: 'flex', color: '#80ddee' }}>in Carmel, IN</div>
          </div>
          <div style={{ display: 'flex', fontSize: 28, color: 'rgba(232,236,242,0.8)' }}>Bars · Venues · Birthdays · Graduations · School dances</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Archivo', data: fontData, weight: 800, style: 'normal' }] },
  );
}
