import { useTransitionCtx } from '../context/TransitionContext';

/**
 * Drop-in replacement for useNavigate() — triggers the page transition.
 */
export function useTransitionNavigate() {
  const { transitionTo } = useTransitionCtx();
  return transitionTo;
}
