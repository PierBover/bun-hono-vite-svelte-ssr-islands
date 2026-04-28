import { createMiddleware } from 'hono/factory';
import { html, raw } from 'hono/html';
import type {Component} from 'svelte';
import { render } from 'svelte/server';
import type { Manifest, ViteDevServer } from 'vite';

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

const viteManifest = isProd ? await Bun.file('dist/client/.vite/manifest.json').text() : null;
const viteManifestJson = viteManifest ? (JSON.parse(viteManifest) as Manifest) : null;

export const renderSveltePage = createMiddleware(async (c, next) => {
	c.renderSveltePage = async (svelteComponent:Component) => {

		const {body, head} = render(svelteComponent);
		const hasIslands = body.includes('data-island-path');
		let islandsEntry = '', stylesEntry = '';

		if (isDev) {
			islandsEntry = '<script type="module" src="/src/client-entry.ts"></script>';
		} else {
			islandsEntry = `<script type="module" src="${viteManifestJson!['src/client-entry.ts']!.file}"></script>`;
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
				</head>
				<body>
					${raw(body)}
					${hasIslands && raw(islandsEntry)}
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
