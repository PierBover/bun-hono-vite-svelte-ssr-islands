import {Hono} from 'hono';

const app = new Hono();

app.get('/', (c) => {
	return c.body('Hello hono');
})

export default app;