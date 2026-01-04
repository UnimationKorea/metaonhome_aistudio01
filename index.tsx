
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const loader = document.getElementById('initial-loader');

const hideLoader = () => {
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }
};

if (!container) {
  console.error("Critical: Root container not found.");
} else {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    // Remove loader after React has had a moment to paint the initial frame
    requestAnimationFrame(() => {
      setTimeout(hideLoader, 500);
    });
    console.log("MetaOn Global: System Online.");
  } catch (err: any) {
    console.error("React Boot Error:", err);
    if (container) {
      container.innerHTML = `
        <div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: #0B0B0F; color: white; font-family: sans-serif;">
          <div style="text-align: center; max-width: 400px; padding: 40px; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; background: rgba(255,255,255,0.02);">
            <h2 style="color: #7C3AED; margin-bottom: 16px;">Boot Sequence Interrupted</h2>
            <p style="color: #9CA3AF; line-height: 1.6; font-size: 14px;">The engine failed to start. This is usually due to a module conflict. Please refresh to try again.</p>
            <button onclick="window.location.reload()" style="margin-top: 24px; padding: 12px 24px; background: #7C3AED; color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer;">Reset Engine</button>
          </div>
        </div>
      `;
    }
  }
}
