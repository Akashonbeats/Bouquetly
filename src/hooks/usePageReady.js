import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTransitionCtx } from '../context/TransitionContext';

/**
 * Placed in TransitionLayout (wraps all routes).
 * After a navigation while phase='loading', resolves the loader as follows:
 *
 *  - All images already cached → onPageReady() fires immediately (no delay).
 *    This is the normal case after the homepage preload — no loader visible.
 *
 *  - Some images still loading → wait for them, then onPageReady() fires.
 *    This handles the edge case where the user navigates before preload finishes.
 *
 * Ignores the very first mount — initial preload is handled by TransitionContext.
 */
export function usePageReady() {
  const { phase, onPageReady } = useTransitionCtx();
  const location = useLocation();
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip first mount — preloadAllImages in TransitionContext handles it
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (phase !== 'loading') return;

    const imgs = Array.from(document.querySelectorAll('img'));
    const pending = imgs.filter(img => !img.complete);

    if (pending.length === 0) {
      // All cached — resolve immediately, no loader needed
      onPageReady();
      return;
    }

    // Images still fetching — wait for all of them
    let done = 0;
    const check = () => { if (++done >= pending.length) onPageReady(); };
    pending.forEach(img => {
      img.addEventListener('load', check, { once: true });
      img.addEventListener('error', check, { once: true });
    });

    return () => {
      pending.forEach(img => {
        img.removeEventListener('load', check);
        img.removeEventListener('error', check);
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key, phase]);
}
