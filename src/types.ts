import 'hono';
import type {Component} from 'svelte';

export type RenderOptions = {
	pageTitle:string;
}


declare module 'hono' {
	interface Context {
		renderSveltePage: (
			svelteComponent:Component,
			renderOptions:RenderOptions,
			pageContext?: any
		) => Promise<Response>;
	}
}