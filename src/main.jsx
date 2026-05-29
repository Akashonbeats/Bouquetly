import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const userAgent = navigator.userAgent || '';
const isIOS = /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isWebKit = userAgent.includes('WebKit') && !userAgent.includes('Chrome') && !userAgent.includes('Edg');

if (isIOS && isWebKit) {
  document.body.classList.add('no-pink-gradient');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
