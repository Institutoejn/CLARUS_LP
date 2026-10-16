import React, { createContext, useContext } from 'react';
import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

export const colors = { ink: '#14121C', purple: '#2A1458', violet: '#7E3BED', lime: '#D7F744', paper: '#F4F3FA' };
export const ease = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1) } as const;
export const MotionViewport = createContext({ portrait: false, bottomInset: 0 });
export const Brand = () => <Img src="/brand/01-logos-svg/clarus-horizontal-monocromatico-branco.svg" style={{ width: 250, height: 75, objectFit: 'contain' }} />;

export const Base = ({ children, step = '' }: { children: React.ReactNode; step?: string }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const { portrait, bottomInset } = useContext(MotionViewport);
  const designWidth = portrait ? 720 : 1920;
  const designHeight = portrait ? 1280 : 1080;
  // The scene fills the viewport; only the artwork scales into a safe area.
  // This avoids both letterboxing and cropping text on unusually wide/tall screens.
  const availableHeight = Math.max(1, height - bottomInset);
  const scale = Math.min(width / designWidth, availableHeight / designHeight);
  const glowSize = Math.max(width, height);

  return (
    <AbsoluteFill className="motion-scene" style={{ background: colors.ink, color: 'white', fontFamily: 'Arial, sans-serif', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: glowSize * 1.1, height: glowSize * 1.1, borderRadius: '50%', background: 'radial-gradient(circle,#632caa66 0%,transparent 68%)', top: -glowSize * .4, right: -glowSize * .25, translate: `${Math.sin(frame / 90) * 50}px 0px` }} />
      <div style={{ position: 'absolute', width: glowSize * .8, height: glowSize * .8, borderRadius: '50%', background: 'radial-gradient(circle,#D7F74412 0%,transparent 68%)', bottom: -glowSize * .5, left: -glowSize * .25 }} />
      <div className="motion-layout" style={{ position: 'absolute', width: designWidth, height: designHeight, left: (width - designWidth * scale) / 2, top: (availableHeight - designHeight * scale) / 2, scale, transformOrigin: 'top left' }}>
        <div className="motion-brand-row" style={{ position: 'absolute', inset: 72, bottom: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Brand /><span style={{ fontSize: 22, letterSpacing: 4, color: '#b9b2c9' }}>{step}</span>
        </div>
        {children}
        <div className="motion-footer" style={{ position: 'absolute', bottom: 46, left: 80, right: 80, display: 'flex', justifyContent: 'space-between', color: '#8f879e', fontSize: 20 }}>
          <span>CLAREZA PARA CADA ESCOLHA</span><span>clarusfinancas.com.br</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Reveal = ({ children, delay = 0, style = {}, className }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) => {
  const frame = useCurrentFrame();
  return <div className={className} style={{ opacity: interpolate(frame, [delay, delay + 24], [0, 1], ease), translate: `0 ${interpolate(frame, [delay, delay + 30], [48, 0], ease)}px`, ...style }}>{children}</div>;
};
export const Eyebrow = ({ children }: { children: React.ReactNode }) => <div style={{ fontSize: 24, letterSpacing: 4, color: colors.lime, marginBottom: 30, fontWeight: 600 }}>{children}</div>;
export const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => <div style={{ background: colors.paper, color: colors.ink, borderRadius: 32, padding: 40, boxShadow: '0 35px 90px #0005', ...style }}>{children}</div>;
