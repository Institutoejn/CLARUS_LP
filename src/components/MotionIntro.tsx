import React, { useEffect, useRef, useState } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import { ArrowDown, Pause, Play } from 'lucide-react';
import { Movie } from '../motion/Movie';

export default function MotionIntro() {
  const player = useRef<PlayerRef>(null);
  const section = useRef<HTMLElement>(null);
  const interacted = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [portrait, setPortrait] = useState(() => matchMedia('(max-aspect-ratio: 4/5)').matches);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [failed, setFailed] = useState(false);

  const continueToSite = () => {
    interacted.current = true;
    player.current?.pause();
    const content = document.getElementById('landing-content');
    content?.focus({ preventScroll: true });
    content?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
  };

  useEffect(() => {
    const orientation = matchMedia('(max-aspect-ratio: 4/5)');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const resize = () => setPortrait(orientation.matches);
    const preference = () => { setReduced(motion.matches); if (motion.matches) player.current?.pause(); };
    orientation.addEventListener('change', resize);
    motion.addEventListener('change', preference);
    return () => { orientation.removeEventListener('change', resize); motion.removeEventListener('change', preference); };
  }, []);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    const cancelAuto = () => { interacted.current = true; };
    const scroll = () => {
      if (window.scrollY > 8) cancelAuto();
      if (window.scrollY >= node.offsetHeight - 1) player.current?.pause();
    };
    const cancelKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Tab'].includes(e.key)) cancelAuto();
    };
    // Restored scroll positions and deep links should never be pulled back to the hero.
    if (window.scrollY > 8 || window.location.hash) cancelAuto();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('wheel', cancelAuto, { passive: true });
    window.addEventListener('touchstart', cancelAuto, { passive: true });
    window.addEventListener('keydown', cancelKey);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) player.current?.pause();
    });
    observer.observe(node);
    const visibility = () => { if (document.hidden) player.current?.pause(); };
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('wheel', cancelAuto);
      window.removeEventListener('touchstart', cancelAuto);
      window.removeEventListener('keydown', cancelKey);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    const p = player.current;
    if (!p) return;
    if (reduced) { p.pause(); p.seekTo(90); }
    setPlaying(p.isPlaying());
    const play = () => setPlaying(true);
    const pause = () => setPlaying(false);
    const error = () => setFailed(true);
    const end = () => {
      setPlaying(false);
      if (!interacted.current && !reduced && !document.hidden && window.scrollY < 8) continueToSite();
    };
    p.addEventListener('error', error);
    p.addEventListener('play', play);
    p.addEventListener('pause', pause);
    p.addEventListener('ended', end);
    return () => { p.removeEventListener('error', error); p.removeEventListener('play', play); p.removeEventListener('pause', pause); p.removeEventListener('ended', end); };
  }, [reduced, portrait, failed]);

  return (
    <section ref={section} className={`motion-intro ${portrait ? 'motion-portrait' : ''}`} aria-label="Conheça a Clarus em 30 segundos">
      <div className="motion-stage">
        {failed ? <p className="motion-fallback">Seu dinheiro, finalmente claro.</p> : (
          <Player ref={player} component={Movie} durationInFrames={900} fps={30}
            compositionWidth={portrait ? 720 : 1920} compositionHeight={portrait ? 1280 : 1080}
            autoPlay={!reduced} loop={false} controls={false} clickToPlay={false} doubleClickToFullscreen={false}
            spaceKeyToPlayOrPause={false} initiallyMuted numberOfSharedAudioTags={0}
            errorFallback={() => <p className="motion-fallback">Seu dinheiro, finalmente claro.</p>}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
      <div className="motion-actions">
        {!failed && <button type="button" onClick={() => {
          interacted.current = true;
          if (playing) player.current?.pause();
          else { if (player.current?.getCurrentFrame() === 899) player.current.seekTo(0); player.current?.play(); }
        }} aria-label={playing ? 'Pausar animação' : 'Reproduzir animação'}>
          {playing ? <Pause size={16} /> : <Play size={16} />}<span>{playing ? 'Pausar' : 'Reproduzir'}</span>
        </button>}
        <a href="#landing-content" onClick={(e) => { e.preventDefault(); continueToSite(); }}>
          <span>Role para conhecer a Clarus</span><ArrowDown className="motion-scroll-arrow" size={18} />
        </a>
        <button type="button" onClick={continueToSite}>Pular introdução</button>
      </div>
    </section>
  );
}
