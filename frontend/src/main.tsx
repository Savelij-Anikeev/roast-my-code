import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {init} from './core';

import App from './App';

(() => {
  Promise.resolve(init()).then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  });
})();
