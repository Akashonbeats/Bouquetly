import { Navigate, Outlet } from 'react-router-dom';
import { useBouquet } from '../../context/BouquetContext';

/**
 * Module-level flag — lives only in this tab's JS context.
 * Not shared between tabs (unlike sessionStorage).
 * Resets on page refresh (consistent: BouquetContext also resets).
 */
let _flowStarted = false;

/** Call this before navigating to /build/flowers. */
export function markFlowStarted() {
  _flowStarted = true;
}

/**
 * Guards /build/flowers — only reachable after clicking "begin" on the landing page.
 * Uses the module-level flag, so each tab is independent.
 */
export function GuardFlowers() {
  if (!_flowStarted) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

/**
 * Guards /build/bouquet — requires at least 4 flowers to be selected.
 */
export function GuardBouquet() {
  const { selectedFlowers } = useBouquet();
  if (selectedFlowers.length < 4) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

/**
 * Guards /build/note — requires flowers selected AND a bouquet type chosen.
 */
export function GuardNote() {
  const { selectedFlowers, bouquetType } = useBouquet();
  if (selectedFlowers.length < 4 || !bouquetType) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
