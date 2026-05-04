import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { preloadAllImages } from '../utils/preloader';

const TransitionContext = createContext(null);

/**
 * Linear flow order — used to auto-detect navigation direction.
 * If the destination path is earlier in this list than the current path → 'back'.
 * Paths not in this list (e.g. /bouquet/:id) are treated as beyond the end → always 'forward'.
 */
const FLOW_ORDER = ['/', '/build/flowers', '/build/bouquet', '/build/note'];

function getFlowIdx(path) {
  const idx = FLOW_ORDER.indexOf(path);
  return idx === -1 ? FLOW_ORDER.length : idx;
}

export function TransitionProvider({ children }) {
  const [phase, setPhase] = useState('loading');
  const [direction, setDirection] = useState('forward');
  const rawNavigate = useNavigate();
  const location = useLocation();
  const busy = useRef(false);
  const isPopNav = useRef(false);

  // Preload all images on mount
  useEffect(() => {
    preloadAllImages().then(() => {
      setPhase('in');
      setTimeout(() => setPhase('idle'), 900);
    });
  }, []);

  /**
   * Programmatic navigation.
   * Direction is auto-detected from the flow order — no need to pass it manually.
   * You can still override with an explicit second argument if needed.
   *
   * @param {string} to - route path
   * @param {'forward'|'back'} [dir] - optional override
   */
  const transitionTo = useCallback((to, dir) => {
    if (busy.current) return;
    busy.current = true;

    // Auto-detect direction based on flow position
    const resolvedDir = dir ?? (
      getFlowIdx(to) < getFlowIdx(location.pathname) ? 'back' : 'forward'
    );

    setDirection(resolvedDir);
    setPhase('out');

    setTimeout(() => {
      rawNavigate(to);
      setPhase('loading');
    }, 550);
  }, [rawNavigate, location.pathname]);

  /**
   * Called by TransitionLayout when the browser's back/forward button fires a POP.
   */
  const handlePopNavigation = useCallback((dir) => {
    isPopNav.current = true;
    setDirection(dir);
    setPhase('loading');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase('in');
        isPopNav.current = false;
        setTimeout(() => setPhase('idle'), 900);
      });
    });
  }, []);

  const onPageReady = useCallback(() => {
    if (isPopNav.current) return;
    setPhase('in');
    setTimeout(() => {
      setPhase('idle');
      busy.current = false;
    }, 900);
  }, []);

  return (
    <TransitionContext.Provider value={{ phase, direction, transitionTo, onPageReady, handlePopNavigation }}>
      {children}
    </TransitionContext.Provider>
  );
}

export const useTransitionCtx = () => useContext(TransitionContext);
