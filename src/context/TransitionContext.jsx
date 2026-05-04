import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { preloadAllImages } from '../utils/preloader';

const TransitionContext = createContext(null);

/**
 * Phase flow (navigation):
 *   idle → out (550ms: overlay fades in, page zooms+blurs)
 *        → loading (navigate, await images, min 450ms)
 *        → in (900ms: overlay fades out, page zooms-out unblurs)
 *        → idle
 *
 * On first load:
 *   starts in 'loading' until preloadAllImages() resolves, then → 'in' → 'idle'
 */
export function TransitionProvider({ children }) {
  // Start in 'loading' so the loader shows immediately on any page load
  const [phase, setPhase] = useState('loading');
  const rawNavigate = useNavigate();
  const busy = useRef(false);

  // Preload all images the moment the app mounts.
  // If already cached → resolves ~instantly, loader never visibly appears.
  // If slow connection → loader shows naturally until done.
  useEffect(() => {
    preloadAllImages().then(() => {
      setPhase('in');
      setTimeout(() => setPhase('idle'), 900);
    });
  }, []);

  const transitionTo = useCallback((to) => {
    if (busy.current) return;
    busy.current = true;

    setPhase('out');

    setTimeout(() => {
      rawNavigate(to);
      setPhase('loading');
    }, 550);
  }, [rawNavigate]);

  // Called by usePageReady when the new page's images are loaded
  const onPageReady = useCallback(() => {
    setPhase('in');
    setTimeout(() => {
      setPhase('idle');
      busy.current = false;
    }, 900);
  }, []);

  return (
    <TransitionContext.Provider value={{ phase, transitionTo, onPageReady }}>
      {children}
    </TransitionContext.Provider>
  );
}

export const useTransitionCtx = () => useContext(TransitionContext);
