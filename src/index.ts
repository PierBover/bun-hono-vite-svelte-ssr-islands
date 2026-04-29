import {Hono} from 'hono';
import { compress } from 'hono/compress';
import { serveStatic } from 'hono/bun';
import { renderSveltePage } from './middleware';
import Home from './pages/Home.svelte';
import About from './pages/About.svelte';
import type {RenderOptions} from './types';
import type {HomePageContext} from './pages/types';

const isProd = import.meta.env.PROD;
const app = new Hono();

app.use('*', renderSveltePage);

if (isProd) {
	app.use('*', compress());
	app.use('/assets/*', serveStatic({ root: './dist/client' }));
}

app.get('/', (c) => {
	const context:HomePageContext = {
		welcomeMessage: 'Hello page context'
	};

	return c.renderSveltePage(
		Home,
		{pageTitle: 'Home'},
		context
	);
});

app.get('/about', (c) => {
	return c.renderSveltePage(
		About,
		{pageTitle: 'About'}
	);
});

export default app;