import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BouquetProvider } from './context/BouquetContext';
import Header from './components/Header/Header';
import FloatingPetals from './components/FloatingPetals/FloatingPetals';
import LandingPage from './pages/LandingPage/LandingPage';
import SelectFlowersPage from './pages/SelectFlowersPage/SelectFlowersPage';
import SelectBouquetPage from './pages/SelectBouquetPage/SelectBouquetPage';
import WriteNotePage from './pages/WriteNotePage/WriteNotePage';
import GiftPage from './pages/GiftPage/GiftPage';

export default function App() {
  return (
    <BrowserRouter>
      <BouquetProvider>
        {/* Floating petals on every page */}
        <FloatingPetals count={10} />

        <Routes>
          {/* Gift page — standalone layout */}
          <Route path="/bouquet/:id" element={<GiftPage />} />

          {/* Landing — no header needed */}
          <Route path="/" element={<LandingPage />} />

          {/* Builder pages — floating logo header, no footer */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Routes>
                    <Route path="/build/flowers" element={<SelectFlowersPage />} />
                    <Route path="/build/bouquet" element={<SelectBouquetPage />} />
                    <Route path="/build/note" element={<WriteNotePage />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
      </BouquetProvider>
    </BrowserRouter>
  );
}
