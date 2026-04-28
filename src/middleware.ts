import { createMiddleware } from 'hono/factory';
import { html, raw } from 'hono/html';
import type {Component} from 'svelte';
import { render } from 'svelte/server';
import type {ViteDevServer} from 'vite';

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

export const renderSveltePage = createMiddleware(async (c, next) => {
	c.renderSveltePage = async (svelteComponent:Component) => {

		const {body, head} = render(svelteComponent);

		return c.html(html`
			<!DOCTYPE html>
			<html>
				<head>
					${raw(head)}
					<script type="module" src="/src/css/styles-entry.ts"></script>
				</head>
				<body>
					${raw(body)}
					<script type="module" src="/@vite/client"></script>
					<script type="module" src="/src/islands/islands-entry.ts"></script>
				</body>
			</html>
		`);
	};

	await next();
});