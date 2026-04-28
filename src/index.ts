import {Hono} from 'hono';
import { compress } from 'hono/compress';
import { serveStatic } from 'hono/bun';
import Page from './Page.svelte';
import { renderSveltePage } from './middleware';

const isProd = import.meta.env.PROD;
const app = new Hono();

app.use('*', renderSveltePage);

if (isProd) {
	app.use('*', compress());
	app.use('/assets/*', serveStatic({ root: './dist/client' }));
}

app.get('/', (c) => {
	return c.renderSveltePage(Page);
});

export default app;