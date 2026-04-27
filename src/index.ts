import {Hono} from 'hono';
import { render } from 'svelte/server';
import Page from './Page.svelte';

const app = new Hono();

app.get('/', (c) => {
	const result = render(Page);
	return c.html(result.body);
})

export default app;