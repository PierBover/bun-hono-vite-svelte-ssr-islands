import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import devServer from '@hono/vite-dev-server';
import bunAdapter from '@hono/vite-dev-server/bun';

export default defineConfig({
	plugins: [
		svelte({
			emitCss: true
		}),
		devServer({
			entry: 'src/index.ts',
			adapter: bunAdapter
		})
	]
});