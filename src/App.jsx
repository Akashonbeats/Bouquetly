import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { BouquetProvider } from './context/BouquetContext';
import { TransitionProvider, useTransitionCtx } from './context/TransitionContext';
import { usePageReady } from './hooks/usePageReady';
import { GuardFlowers, GuardBouquet, GuardNote } from './components/FlowGuard/FlowGuard';
import Header from './components/Header/Header';
import FloatingPetals from './components/FloatingPetals/FloatingPetals';
import LandingPage from './pages/LandingPage/LandingPage';
import SelectFlowersPage from './pages/SelectFlowersPage/SelectFlowersPage';
import SelectBouquetPage from './pages/SelectBouquetPage/SelectBouquetPage';
import WriteNotePage from './pages/WriteNotePage/WriteNotePage';
import GiftPage from './pages/GiftPage/GiftPage';
import './App.css';

/**
 * Loader content — shown in-place (not as overlay).
 * Just the centered text + dots, no positioning.
 */
function LoaderContent() {
  return (
    <div className="loader-content">
      <div className="loader-content__dots">
        <span /><span /><span />
      </div>
    </div>
  );
}

/**
 * The transition shell:
 * Loader and Outlet share the SAME grid cell — whichever is visible
 * depends only on phase. No overlay, no z-index battles.
 */
function TransitionLayout() {
  const { phase } = useTransitionCtx();
  usePageReady();

  return (
    <div className="transition-wrapper">
      {/* Loader: fades in during 'loading', invisible otherwise */}
      <div className={`transition-loader transition-loader--${phase}`}>
        <LoaderContent />
      </div>

      {/* Page content: exits/enters with zoom+blur, hides during loading */}
      <div className={`page-content page-content--${phase}`}>
        <Outlet />
      </div>
    </div>
  );
}

function BuilderLayout() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </>
  );
}

function AppInner() {
  return (
    <>
      <FloatingPetals count={12} />

      <Routes>
        <Route element={<TransitionLayout />}>
          <Route path="/" element={<LandingPage />} />

          <Route path="/build" element={<BuilderLayout />}>
            <Route element={<GuardFlowers />}>
              <Route path="flowers" element={<SelectFlowersPage />} />
            </Route>
            <Route element={<GuardBouquet />}>
              <Route path="bouquet" element={<SelectBouquetPage />} />
            </Route>
            <Route element={<GuardNote />}>
              <Route path="note" element={<WriteNotePage />} />
            </Route>
          </Route>

          <Route path="/bouquet/:id" element={<GiftPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BouquetProvider>
        <TransitionProvider>
          <AppInner />
        </TransitionProvider>
      </BouquetProvider>
    </BrowserRouter>
  );
}
