import {Hono} from 'hono';
import Page from './Page.svelte';
import { renderSveltePage } from './middleware';

const app = new Hono();

app.use('*', renderSveltePage);

app.get('/', (c) => {
	return c.renderSveltePage(Page);
});

export default app;