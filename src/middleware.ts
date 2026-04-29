import { createMiddleware } from 'hono/factory';
import { html, raw } from 'hono/html';
import type {Component} from 'svelte';
import { render } from 'svelte/server';
import type { Manifest, ViteDevServer } from 'vite';
import type {RenderOptions} from './types';
import {type RequestContext, REQUEST_CONTEXT, PAGE_CONTEXT} from './pages/types';

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

const viteManifest = isProd ? await Bun.file('dist/client/.vite/manifest.json').text() : null;
const viteManifestJson = viteManifest ? (JSON.parse(viteManifest) as Manifest) : null;

export const renderSveltePage = createMiddleware(async (c, next) => {
	c.renderSveltePage = async (svelteComponent:Component, renderOptions:RenderOptions, pageContext?:any) => {

		const {pageTitle} = renderOptions;

		const contexts = new Map();
		const requestContext:RequestContext = {
			path: c.req.path
		};

		contexts.set(REQUEST_CONTEXT, requestContext);
		if (pageContext) contexts.set(PAGE_CONTEXT, pageContext);

		const {body, head} = render(
			svelteComponent,
			{context:contexts}
		);

		let clientEntry = '', stylesEntry = '';

		if (isDev) {
			clientEntry = '<script type="module" src="/src/client-entry.ts"></script>';
		} else {
			clientEntry = `<script type="module" src="${viteManifestJson!['src/client-entry.ts']!.file}"></script>`;
			stylesEntry = `<link href="${viteManifestJson!['style.css']!.file}" rel="stylesheet"/>`;
		}

		return c.html(html`
			<!DOCTYPE html>
			<html>
				<head>
					${raw(stylesEntry)}
					${raw(head)}
					${isDev && raw('<script type="module" src="/@vite/client"></script>')}
					${isProd && raw(getJsPreloadTagsFromManifest())}
					<title>${pageTitle}</title>
				</head>
				<body>
					${raw(body)}
					${raw(clientEntry)}
				</body>
			</html>
		`);
	};

	await next();
});

function getJsPreloadTagsFromManifest() {
	if (!viteManifestJson) throw 'No vite manifest!';
	const allFiles = Object.keys(viteManifestJson)
		.map((key) => viteManifestJson[key]!.file)
		.filter((file) => file.endsWith('.js'));
	const uniqueFiles = Array.from(new Set(allFiles));
	return uniqueFiles.map((file) => `<link rel="modulepreload" href="/${file}" fetchpriority="low">`).join('');
}