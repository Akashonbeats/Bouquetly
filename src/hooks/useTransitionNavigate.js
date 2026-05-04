import { useTransitionCtx } from '../context/TransitionContext';

/**
 * Drop-in replacement for useNavigate().
 * Usage: navigate('/path')           // forward (default)
 *        navigate('/path', 'back')   // backward
 */
export function useTransitionNavigate() {
  const { transitionTo } = useTransitionCtx();
  return transitionTo;
}
