import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import devServer from '@hono/vite-dev-server';
import bunAdapter from '@hono/vite-dev-server/bun';

export default defineConfig(({ isSsrBuild }) => {
	return {
		plugins: [
			svelte({
				emitCss: true,
				compilerOptions: {
					css: 'injected'
				}
			}),
			devServer({
				entry: 'src/index.ts',
				adapter: bunAdapter
			})
		],
		build: {
			cssCodeSplit: false,
			rolldownOptions: {
				input: isSsrBuild ? 'src/index.ts' : 'src/client-entry.ts',
				external: ['bun'],
				output: {
					minify: isSsrBuild ? false : {
						compress: {
							dropConsole: true
						}
					}
				}
			},
			outDir: isSsrBuild ? 'dist/server' : 'dist/client',
			emptyOutDir: true,
			manifest: true,
			minify: isSsrBuild ? false : 'oxc'
		}
	}
});