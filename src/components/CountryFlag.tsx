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

        {/* Default / Fallback: Gold sovereign crest */}
        {![
          'SG', 'MY', 'IN', 'AE', 'US', 'GB', 'UK', 'AU', 'CA', 'CH', 'EU', 'JP', 'HK',
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
