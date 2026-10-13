import React from 'react';

export type SupportedCountryCode =
  | 'SG'
  | 'MY'
  | 'IN'
  | 'AE'
  | 'US'
  | 'GB'
  | 'UK'
  | 'AU'
  | 'CA'
  | 'CH'
  | 'LK'
  | 'NZ'
  | 'EU'
  | 'HK'
  | 'JP'
  | string;

interface CountryFlagProps {
  code: SupportedCountryCode;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  title?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  code,
  className = '',
  size = 'sm',
  title,
}) => {
  const normalized = (code || '').toUpperCase().trim();

  // Normalize currency codes to country codes if passed
  const countryCode =
    normalized === 'SGD' ? 'SG'
    : normalized === 'MYR' ? 'MY'
    : normalized === 'INR' ? 'IN'
    : normalized === 'AED' ? 'AE'
    : normalized === 'USD' ? 'US'
    : normalized === 'GBP' || normalized === 'UK' ? 'GB'
    : normalized === 'AUD' ? 'AU'
    : normalized === 'CAD' ? 'CA'
    : normalized === 'EUR' ? 'EU'
    : normalized === 'CHF' ? 'CH'
    : normalized === 'LKR' ? 'LK'
    : normalized === 'NZD' ? 'NZ'
    : normalized === 'HKD' ? 'HK'
    : normalized === 'JPY' ? 'JP'
    : normalized;

  // Size map: standard 3:2 aspect ratio
  const sizeClasses = {
    xs: 'w-3.5 h-2.5',
    sm: 'w-5 h-3.5',
    md: 'w-6 h-4',
    lg: 'w-8 h-5.5',
    xl: 'w-10 h-7',
  }[size] || 'w-5 h-3.5';

  const defaultTitle =
    countryCode === 'SG' ? 'Singapore Flag'
    : countryCode === 'MY' ? 'Malaysia Flag'
    : countryCode === 'IN' ? 'India Flag'
    : countryCode === 'AE' ? 'United Arab Emirates Flag'
    : countryCode === 'US' ? 'United States Flag'
    : countryCode === 'GB' ? 'United Kingdom Flag'
    : countryCode === 'AU' ? 'Australia Flag'
    : countryCode === 'CA' ? 'Canada Flag'
    : countryCode === 'CH' ? 'Switzerland Flag'
    : countryCode === 'LK' ? 'Sri Lanka Flag'
    : countryCode === 'NZ' ? 'New Zealand Flag'
    : countryCode === 'EU' ? 'European Union Flag'
    : countryCode === 'HK' ? 'Hong Kong Flag'
    : countryCode === 'JP' ? 'Japan Flag'
    : `${countryCode} Flag`;

  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 align-middle ${className}`}
      title={title || defaultTitle}
      aria-label={title || defaultTitle}
      role="img"
    >
      <svg
        viewBox="0 0 640 480"
        className={`${sizeClasses} rounded-[2px] shadow-sm border border-white/20 overflow-hidden`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Singapore (SG) */}
        {countryCode === 'SG' && (
          <g>
            <rect width="640" height="240" fill="#ED2939" />
            <rect y="240" width="640" height="240" fill="#FFFFFF" />
            {/* White Crescent */}
            <path
              d="M175,120 A80,80 0 1,0 75,190 A68,68 0 1,1 175,120 Z"
              fill="#FFFFFF"
            />
            {/* 5 Stars arranged in pentagon */}
            {[
              [165, 75],
              [195, 98],
              [183, 138],
              [147, 138],
              [135, 98],
            ].map(([cx, cy], i) => (
              <polygon
                key={i}
                fill="#FFFFFF"
                points={`${cx},${cy - 14} ${cx + 4},${cy - 4} ${cx + 15},${cy - 4} ${cx + 7},${cy + 3} ${cx + 10},${cy + 13} ${cx},${cy + 7} ${cx - 10},${cy + 13} ${cx - 7},${cy + 3} ${cx - 15},${cy - 4} ${cx - 4},${cy - 4}`}
              />
            ))}
          </g>
        )}

        {/* Malaysia (MY) */}
        {countryCode === 'MY' && (
          <g>
            {/* 14 Stripes */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
              <rect
                key={i}
                y={i * (480 / 14)}
                width="640"
                height={480 / 14 + 1}
                fill={i % 2 === 0 ? '#CC0001' : '#FFFFFF'}
              />
            ))}
            {/* Blue Canton */}
            <rect width="320" height="274" fill="#010066" />
            {/* Yellow Crescent */}
            <path
              d="M175,137 A75,75 0 1,0 90,205 A66,66 0 1,1 175,137 Z"
              fill="#FFCC00"
            />
            {/* 14-Point Star */}
            <g transform="translate(195, 137)">
              {[...Array(14)].map((_, i) => (
                <polygon
                  key={i}
                  points="0,-52 8,-20 0,0 -8,-20"
                  fill="#FFCC00"
                  transform={`rotate(${i * (360 / 14)})`}
                />
              ))}
            </g>
          </g>
        )}

        {/* India (IN) */}
        {countryCode === 'IN' && (
          <g>
            <rect width="640" height="160" fill="#FF9933" />
            <rect y="160" width="640" height="160" fill="#FFFFFF" />
            <rect y="320" width="640" height="160" fill="#128807" />
            {/* Ashoka Chakra */}
            <circle cx="320" cy="240" r="54" fill="none" stroke="#000080" strokeWidth="8" />
            <circle cx="320" cy="240" r="10" fill="#000080" />
            {[...Array(24)].map((_, i) => (
              <line
                key={i}
                x1="320"
                y1="240"
                x2={320 + 50 * Math.cos((i * 15 * Math.PI) / 180)}
                y2={240 + 50 * Math.sin((i * 15 * Math.PI) / 180)}
                stroke="#000080"
                strokeWidth="3.5"
              />
            ))}
          </g>
        )}

        {/* UAE / Dubai (AE) */}
        {countryCode === 'AE' && (
          <g>
            <rect width="640" height="160" fill="#00732F" />
            <rect y="160" width="640" height="160" fill="#FFFFFF" />
            <rect y="320" width="640" height="160" fill="#000000" />
            <rect width="160" height="480" fill="#FF0000" />
          </g>
        )}

        {/* United States (US) */}
        {countryCode === 'US' && (
          <g>
            {[...Array(13)].map((_, i) => (
              <rect
                key={i}
                y={i * (480 / 13)}
                width="640"
                height={480 / 13 + 1}
                fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
              />
            ))}
            {/* Blue Canton */}
            <rect width="260" height="258" fill="#3C3B6E" />
            {/* Subtle Star grid matrix */}
            {[
              [35, 30], [80, 30], [125, 30], [170, 30], [215, 30],
              [57, 58], [102, 58], [147, 58], [192, 58],
              [35, 86], [80, 86], [125, 86], [170, 86], [215, 86],
              [57, 114], [102, 114], [147, 114], [192, 114],
              [35, 142], [80, 142], [125, 142], [170, 142], [215, 142],
              [57, 170], [102, 170], [147, 170], [192, 170],
              [35, 198], [80, 198], [125, 198], [170, 198], [215, 198],
              [57, 226], [102, 226], [147, 226], [192, 226],
            ].map(([x, y], idx) => (
              <circle key={idx} cx={x} cy={y} r="5" fill="#FFFFFF" />
            ))}
          </g>
        )}

        {/* United Kingdom (GB / UK) */}
        {(countryCode === 'GB' || countryCode === 'UK') && (
          <g>
            <rect width="640" height="480" fill="#012169" />
            {/* Diagonal White Cross */}
            <line x1="0" y1="0" x2="640" y2="480" stroke="#FFFFFF" strokeWidth="80" />
            <line x1="640" y1="0" x2="0" y2="480" stroke="#FFFFFF" strokeWidth="80" />
            {/* Diagonal Red Cross */}
            <line x1="0" y1="0" x2="640" y2="480" stroke="#C8102E" strokeWidth="48" />
            <line x1="640" y1="0" x2="0" y2="480" stroke="#C8102E" strokeWidth="48" />
            {/* Central White Cross */}
            <rect x="256" width="128" height="480" fill="#FFFFFF" />
            <rect y="176" width="640" height="128" fill="#FFFFFF" />
            {/* Central Red Cross */}
            <rect x="272" width="96" height="480" fill="#C8102E" />
            <rect y="192" width="640" height="96" fill="#C8102E" />
          </g>
        )}

        {/* Australia (AU) */}
        {countryCode === 'AU' && (
          <g>
            <rect width="640" height="480" fill="#00008B" />
            {/* Mini Union Jack in upper hoist quadrant */}
            <g transform="scale(0.5)">
              <rect width="640" height="480" fill="#012169" />
              <line x1="0" y1="0" x2="640" y2="480" stroke="#FFFFFF" strokeWidth="80" />
              <line x1="640" y1="0" x2="0" y2="480" stroke="#FFFFFF" strokeWidth="80" />
              <line x1="0" y1="0" x2="640" y2="480" stroke="#C8102E" strokeWidth="48" />
              <line x1="640" y1="0" x2="0" y2="480" stroke="#C8102E" strokeWidth="48" />
              <rect x="256" width="128" height="480" fill="#FFFFFF" />
              <rect y="176" width="640" height="128" fill="#FFFFFF" />
              <rect x="272" width="96" height="480" fill="#C8102E" />
              <rect y="192" width="640" height="96" fill="#C8102E" />
            </g>
            {/* Large Commonwealth 7-point star */}
            <polygon
              fill="#FFFFFF"
              points="160,300 172,336 210,336 179,358 191,394 160,372 129,394 141,358 110,336 148,336"
            />
            {/* Southern Cross constellation */}
            {[
              [480, 80, 10],
              [540, 170, 9],
              [480, 390, 11],
              [420, 220, 9],
              [500, 260, 6],
            ].map(([cx, cy, r], idx) => (
              <circle key={idx} cx={cx} cy={cy} r={r} fill="#FFFFFF" />
            ))}
          </g>
        )}

        {/* Canada (CA) */}
        {countryCode === 'CA' && (
          <g>
            <rect width="160" height="480" fill="#FF0000" />
            <rect x="160" width="320" height="480" fill="#FFFFFF" />
            <rect x="480" width="160" height="480" fill="#FF0000" />
            {/* Maple Leaf */}
            <path
              d="M320,110 L335,170 L385,155 L375,190 L415,210 L385,240 L395,270 L345,255 L340,340 L320,350 L300,340 L295,255 L245,270 L255,240 L225,210 L265,190 L255,155 L305,170 Z"
              fill="#FF0000"
            />
          </g>
        )}

        {/* Switzerland (CH) */}
        {countryCode === 'CH' && (
          <g>
            <rect width="640" height="480" fill="#D52B1E" />
            <rect x="270" y="120" width="100" height="240" fill="#FFFFFF" rx="4" />
            <rect x="200" y="190" width="240" height="100" fill="#FFFFFF" rx="4" />
          </g>
        )}

        {/* European Union (EU) */}
        {countryCode === 'EU' && (
          <g>
            <rect width="640" height="480" fill="#003399" />
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const cx = 320 + 130 * Math.cos(angle);
              const cy = 240 + 130 * Math.sin(angle);
              return <circle key={i} cx={cx} cy={cy} r="10" fill="#FFCC00" />;
            })}
          </g>
        )}

        {/* Japan (JP) */}
        {countryCode === 'JP' && (
          <g>
            <rect width="640" height="480" fill="#FFFFFF" />
            <circle cx="320" cy="240" r="120" fill="#BC002D" />
          </g>
        )}

        {/* Hong Kong (HK) */}
        {countryCode === 'HK' && (
          <g>
            <rect width="640" height="480" fill="#DE2910" />
            {/* Stylised flower center circle */}
            <circle cx="320" cy="240" r="70" fill="#FFFFFF" opacity="0.9" />
            <circle cx="320" cy="240" r="45" fill="#DE2910" />
            {[...Array(5)].map((_, i) => {
              const angle = (i * 72 * Math.PI) / 180;
              const cx = 320 + 80 * Math.cos(angle);
              const cy = 240 + 80 * Math.sin(angle);
              return <circle key={i} cx={cx} cy={cy} r="25" fill="#FFFFFF" />;
            })}
          </g>
        )}

        {/* Sri Lanka (LK) */}
        {countryCode === 'LK' && (
          <g>
            {/* Outer Gold Border */}
            <rect width="640" height="480" fill="#FFBE29" />
            {/* Teal Green Vertical Stripe (Muslim minority) */}
            <rect x="30" y="30" width="70" height="420" fill="#005F41" />
            {/* Saffron Orange Vertical Stripe (Tamil minority) */}
            <rect x="106" y="30" width="70" height="420" fill="#EB7400" />
            {/* Gold separator between stripes and maroon field */}
            <rect x="182" y="30" width="12" height="420" fill="#FFBE29" />
            {/* Crimson/Maroon Field */}
            <rect x="200" y="30" width="410" height="420" fill="#8D153A" />
            {/* 4 Bo Leaves (Pip) in corners of maroon field */}
            <path d="M225,55 C240,65 240,85 225,95 C215,85 215,65 225,55 Z" fill="#FFBE29" />
            <path d="M585,55 C600,65 600,85 585,95 C575,85 575,65 585,55 Z" fill="#FFBE29" />
            <path d="M225,415 C240,405 240,385 225,375 C215,385 215,405 225,415 Z" fill="#FFBE29" />
            <path d="M585,415 C600,405 600,385 585,375 C575,385 575,405 585,415 Z" fill="#FFBE29" />
            {/* Golden Royal Lion (Sinha) holding Kastane Sword */}
            <g transform="translate(370, 210) scale(1.1)">
              {/* Lion body */}
              <ellipse cx="25" cy="40" rx="42" ry="26" fill="#FFBE29" />
              {/* Lion head & mane */}
              <circle cx="65" cy="22" r="24" fill="#FFBE29" />
              <path d="M75,8 C85,15 88,32 78,40 C68,36 68,18 75,8 Z" fill="#FFBE29" />
              {/* Eye */}
              <circle cx="72" cy="18" r="3" fill="#8D153A" />
              {/* Open roaring mouth & nose */}
              <path d="M80,24 L90,26 L82,32 Z" fill="#FFBE29" />
              {/* Forepaws */}
              <rect x="42" y="55" width="10" height="35" rx="5" fill="#FFBE29" />
              <rect x="58" y="52" width="10" height="38" rx="5" fill="#FFBE29" />
              {/* Hind legs */}
              <rect x="-8" y="52" width="12" height="38" rx="6" fill="#FFBE29" />
              <rect x="10" y="55" width="11" height="35" rx="5" fill="#FFBE29" />
              {/* Curved Tail holding aloft */}
              <path d="M-15,40 C-35,30 -35,-10 -5,-5 C-12,5 -18,20 -15,40 Z" fill="#FFBE29" />
              <circle cx="-5" cy="-8" r="8" fill="#FFBE29" />
              {/* Raised Right Forepaw holding upright Sword (Kastane) */}
              <path d="M68,30 L78,10 L86,14 L75,34 Z" fill="#FFBE29" />
              {/* Sword blade & hilt */}
              <rect x="80" y="-30" width="6" height="52" fill="#FFBE29" rx="2" />
              <polygon points="83,-38 79,-30 87,-30" fill="#FFBE29" />
              <rect x="74" y="14" width="18" height="5" fill="#FFBE29" rx="1.5" />
            </g>
          </g>
        )}

        {/* New Zealand (NZ) */}
        {countryCode === 'NZ' && (
          <g>
            {/* Royal Navy Blue Field */}
            <rect width="640" height="480" fill="#00247D" />
            {/* Mini Union Jack in upper hoist quadrant */}
            <g transform="scale(0.5)">
              <rect width="640" height="480" fill="#012169" />
              <line x1="0" y1="0" x2="640" y2="480" stroke="#FFFFFF" strokeWidth="80" />
              <line x1="640" y1="0" x2="0" y2="480" stroke="#FFFFFF" strokeWidth="80" />
              <line x1="0" y1="0" x2="640" y2="480" stroke="#C8102E" strokeWidth="48" />
              <line x1="640" y1="0" x2="0" y2="480" stroke="#C8102E" strokeWidth="48" />
              <rect x="256" width="128" height="480" fill="#FFFFFF" />
              <rect y="176" width="640" height="128" fill="#FFFFFF" />
              <rect x="272" width="96" height="480" fill="#C8102E" />
              <rect y="192" width="640" height="96" fill="#C8102E" />
            </g>
            {/* Southern Cross constellation (4 Red 5-Pointed Stars with White Outlines) */}
            {/* Gacrux (Top) */}
            <g transform="translate(480, 95)">
              <polygon
                points="0,-26 8,-8 26,-8 12,4 17,22 0,11 -17,22 -12,4 -26,-8 -8,-8"
                fill="#CC142B"
                stroke="#FFFFFF"
                strokeWidth="4.5"
              />
            </g>
            {/* Acrux (Bottom) */}
            <g transform="translate(480, 385)">
              <polygon
                points="0,-30 9,-9 30,-9 14,5 19,25 0,13 -19,25 -14,5 -30,-9 -9,-9"
                fill="#CC142B"
                stroke="#FFFFFF"
                strokeWidth="5"
              />
            </g>
            {/* Becrux / Mimosa (Left) */}
            <g transform="translate(405, 220)">
              <polygon
                points="0,-26 8,-8 26,-8 12,4 17,22 0,11 -17,22 -12,4 -26,-8 -8,-8"
                fill="#CC142B"
                stroke="#FFFFFF"
                strokeWidth="4.5"
              />
            </g>
            {/* Delta Crucis (Right) */}
            <g transform="translate(555, 185)">
              <polygon
                points="0,-22 7,-7 22,-7 10,3 14,18 0,9 -14,18 -10,3 -22,-7 -7,-7"
                fill="#CC142B"
                stroke="#FFFFFF"
                strokeWidth="4"
              />
            </g>
          </g>
        )}

        {/* Default / Fallback: Gold sovereign crest */}
        {![
          'SG', 'MY', 'IN', 'AE', 'US', 'GB', 'UK', 'AU', 'CA', 'CH', 'LK', 'NZ', 'EU', 'JP', 'HK',
        ].includes(countryCode) && (
          <g>
            <rect width="640" height="480" fill="#211A19" />
            <circle cx="320" cy="240" r="90" fill="#8C5E3C" />
            <text
              x="320"
              y="260"
              fontSize="96"
              fontWeight="bold"
              fill="#FAF7F2"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {countryCode.slice(0, 2)}
            </text>
          </g>
        )}
      </svg>
    </span>
  );
};
