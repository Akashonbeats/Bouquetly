import { useTransitionCtx } from '../../context/TransitionContext';
import './PageLoader.css';

export default function PageLoader() {
  const { phase } = useTransitionCtx();
  const visible = phase === 'out' || phase === 'loading' || phase === 'in';

  return (
    <div className={`page-loader page-loader--${phase}`} aria-hidden={!visible}>
      <div className="page-loader__center">
        <span className="page-loader__logo">Bouquetly</span>
        <div className="page-loader__dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
