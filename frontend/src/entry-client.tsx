import {hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {init} from './core';

import App from './App';

(() => {
	Promise.resolve(init()).then(() => {
		hydrateRoot(
			document.getElementById('root')!,
			<BrowserRouter>
				<App />
			</BrowserRouter>
		)
	})
})();
