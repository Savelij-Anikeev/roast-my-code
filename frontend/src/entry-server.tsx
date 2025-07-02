import express from 'express';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';

import config from './core/config';

import App from './App'

const app = express()

app.use(express.static('dist/client'));

app.get('*', (req, res) => {
	const html = renderToString(
		<StaticRouter location={req.url}>
			<App />
		</StaticRouter>
	)

	res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>App</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="module" src="/src/entry-client.tsx"></script>
      </body>
    </html>
  `)
})

app.listen(config.port);