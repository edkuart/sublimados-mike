export type ToneName = "purple" | "teal" | "coral" | "gold" | "ink";

export interface ToneConfig {
  from: string;
  to: string;
  surface: string;
  ink: string;
}

export const SM_TONES: Record<ToneName, ToneConfig> = {
  purple: { from: "#9B72C8", to: "#6A4C93", surface: "#EDE4F5", ink: "#55387A" },
  teal:   { from: "#B5E05A", to: "#8AC926", surface: "#EDFAD0", ink: "#5A8216" },
  coral:  { from: "#FF8589", to: "#FF595E", surface: "#FFE8E9", ink: "#CC2F34" },
  gold:   { from: "#FFD870", to: "#FFCA3A", surface: "#FFF6D0", ink: "#C49000" },
  ink:    { from: "#5B7A9D", to: "#1982C4", surface: "#D6EBFA", ink: "#1266A0" },
};

export type ProductKind = "mug" | "shirt" | "thermos" | "pillow" | "keychain" | "gift";

interface MockupProps {
  kind: ProductKind;
  palette: [string, string, string];
  className?: string;
}

export function ProductMockup({ kind, palette, className = "" }: MockupProps) {
  const [c1, c2, c3] = palette;
  switch (kind) {
    case "mug":
      return (
        <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
          <ellipse cx="155" cy="80" rx="22" ry="34" fill="none" stroke={c1} strokeWidth="11" />
          <rect x="36" y="34" width="110" height="100" rx="10" fill={c1} />
          <rect x="48" y="46" width="86" height="76" rx="6" fill={c3} />
          <circle cx="74" cy="76" r="9" fill={c2} opacity={0.85} />
          <rect x="62" y="92" width="60" height="6" rx="3" fill={c2} opacity={0.55} />
          <rect x="68" y="104" width="48" height="4" rx="2" fill={c2} opacity={0.35} />
          <ellipse cx="91" cy="142" rx="58" ry="4" fill={c2} opacity={0.18} />
        </svg>
      );
    case "shirt":
      return (
        <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
          <path d="M30 38 L62 22 L70 52 L40 70 Z" fill={c1} />
          <path d="M170 38 L138 22 L130 52 L160 70 Z" fill={c1} />
          <path d="M62 22 L80 32 Q100 42 120 32 L138 22 L138 140 L62 140 Z" fill={c1} />
          <path d="M80 32 Q100 50 120 32 L120 22 Q100 30 80 22 Z" fill={c2} opacity={0.85} />
          <rect x="74" y="60" width="52" height="50" rx="4" fill={c3} opacity={0.95} />
          <circle cx="100" cy="78" r="6" fill={c2} />
          <rect x="80" y="90" width="40" height="4" rx="2" fill={c2} opacity={0.6} />
          <rect x="86" y="100" width="28" height="3" rx="1.5" fill={c2} opacity={0.45} />
        </svg>
      );
    case "thermos":
      return (
        <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
          <rect x="78" y="10" width="44" height="14" rx="4" fill={c2} />
          <rect x="68" y="22" width="64" height="120" rx="14" fill={c1} />
          <rect x="78" y="44" width="44" height="84" rx="4" fill={c3} />
          <rect x="86" y="58" width="28" height="5" rx="2.5" fill={c2} opacity={0.65} />
          <rect x="90" y="70" width="20" height="3" rx="1.5" fill={c2} opacity={0.5} />
          <circle cx="100" cy="102" r="8" fill={c2} opacity={0.85} />
          <rect x="74" y="28" width="6" height="100" rx="3" fill="white" opacity={0.15} />
        </svg>
      );
    case "pillow":
      return (
        <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
          <path
            d="M28 36 Q26 30 34 28 L166 22 Q174 22 174 30 L172 134 Q172 142 162 142 L40 138 Q30 138 30 130 Z"
            fill={c1}
          />
          <rect x="52" y="50" width="96" height="76" rx="6" fill={c3} />
          <circle cx="86" cy="80" r="14" fill={c2} opacity={0.85} />
          <rect x="68" y="100" width="68" height="6" rx="3" fill={c2} opacity={0.55} />
          <rect x="78" y="112" width="48" height="4" rx="2" fill={c2} opacity={0.35} />
          <circle cx="40" cy="40" r="4" fill={c2} opacity={0.5} />
          <circle cx="160" cy="36" r="4" fill={c2} opacity={0.5} />
        </svg>
      );
    case "keychain":
      return (
        <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
          <circle cx="100" cy="32" r="14" fill="none" stroke={c2} strokeWidth="6" />
          <rect x="96" y="42" width="8" height="14" fill={c2} />
          <rect x="58" y="52" width="84" height="92" rx="10" fill={c1} />
          <rect x="70" y="64" width="60" height="68" rx="6" fill={c3} />
          <circle cx="86" cy="86" r="8" fill={c2} opacity={0.85} />
          <rect x="78" y="104" width="44" height="5" rx="2.5" fill={c2} opacity={0.55} />
        </svg>
      );
    case "gift":
      return (
        <svg viewBox="0 0 200 160" className={className} aria-hidden="true">
          <rect x="30" y="54" width="140" height="86" rx="6" fill={c1} />
          <rect x="22" y="44" width="156" height="22" rx="6" fill={c2} />
          <rect x="92" y="44" width="16" height="96" fill={c3} />
          <rect x="22" y="74" width="156" height="12" fill={c3} />
          <path d="M82 44 Q70 26 92 30 L100 40 L108 30 Q130 26 118 44 Z" fill={c3} />
          <circle cx="100" cy="42" r="5" fill={c2} />
        </svg>
      );
  }
}

export function BlobShape({
  className = "",
  color = "currentColor",
  opacity = 0.4,
}: {
  className?: string;
  color?: string;
  opacity?: number;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        d="M40,-60 C56,-50 70,-36 73,-20 C76,-4 68,16 56,33 C44,50 28,65 8,71 C-12,77 -34,75 -50,63 C-66,51 -76,29 -76,7 C-76,-15 -66,-37 -49,-50 C-32,-63 -8,-67 12,-71 C32,-75 24,-70 40,-60 Z"
        transform="translate(100 100)"
        fill={color}
        opacity={opacity}
      />
    </svg>
  );
}

export function HeroWave({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,30 C240,80 480,80 720,50 C960,20 1200,20 1440,50 L1440,90 L0,90 Z"
        fill="var(--background)"
      />
    </svg>
  );
}
