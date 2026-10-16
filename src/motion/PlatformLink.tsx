import React from 'react';
import { useCurrentFrame } from 'remotion';
import { OFFICIAL_PLATFORM_URL } from '../config/platform';

/** Only active scenes expose links: premounted/fading-in content must not steal focus. */
export const PlatformLink = ({ children, className = '', style, label, from = 0 }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  label: string;
  from?: number;
}) => {
  const frame = useCurrentFrame();
  const active = frame >= from;
  return (
    <a
      href={active ? OFFICIAL_PLATFORM_URL : undefined}
      className={`motion-platform-link ${className}`}
      data-platform-link="true"
      aria-label={label}
      aria-hidden={!active || undefined}
      tabIndex={active ? 0 : -1}
      style={{ ...style, pointerEvents: active ? 'auto' : 'none' }}
    >
      {children}
    </a>
  );
};
