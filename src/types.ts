import 'hono';
import type {Component} from 'svelte';

declare module 'hono' {
	interface Context {
		renderSveltePage: (
			svelteComponent:Component
		) => Promise<Response>;
	}
}