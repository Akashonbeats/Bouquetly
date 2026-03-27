import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BouquetProvider } from './context/BouquetContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import SelectFlowersPage from './pages/SelectFlowersPage/SelectFlowersPage';
import SelectBouquetPage from './pages/SelectBouquetPage/SelectBouquetPage';
import WriteNotePage from './pages/WriteNotePage/WriteNotePage';
import GiftPage from './pages/GiftPage/GiftPage';

export default function App() {
  return (
    <BrowserRouter>
      <BouquetProvider>
        <Routes>
          {/* Gift page has its own layout */}
          <Route path="/bouquet/:id" element={<GiftPage />} />

          {/* Main layout with header/footer */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <main style={{ flex: 1 }}>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/build/flowers" element={<SelectFlowersPage />} />
                    <Route path="/build/bouquet" element={<SelectBouquetPage />} />
                    <Route path="/build/note" element={<WriteNotePage />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </BouquetProvider>
    </BrowserRouter>
  );
}
