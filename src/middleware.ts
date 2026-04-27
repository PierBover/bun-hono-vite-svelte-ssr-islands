import { createMiddleware } from 'hono/factory';
import { html, raw } from 'hono/html';
import type {Component} from 'svelte';
import { render } from 'svelte/server';

export const renderSveltePage = createMiddleware(async (c, next) => {
	c.renderSveltePage = async (svelteComponent:Component) => {

		const {body, head} = render(svelteComponent);

		return c.html(html`
			<!DOCTYPE html>
			<html>
				<head>
					<script type="module" src="/src/islands/islands-entry.ts"></script>
					<script type="module" src="/@vite/client"></script>
					${raw(head)}
				</head>
				<body>
					${raw(body)}
				</body>
			</html>
		`);
	};

	await next();
});