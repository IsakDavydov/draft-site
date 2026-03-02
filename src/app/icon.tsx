import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import path from 'path';

export const size = { width: 48, height: 48 };
export const contentType = 'image/png';

export default function Icon() {
  const logoPath = path.join(process.cwd(), 'public', 'TransparentLogo.png');
  const logoBuffer = readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={logoBase64} width={48} height={48} style={{ objectFit: 'contain' }} alt="" />
      </div>
    ),
    { ...size }
  );
}
