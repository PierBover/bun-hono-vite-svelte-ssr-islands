/// <reference lib='dom' />
import { hydrate, type Component } from 'svelte';

const modules = import.meta.glob('/src/islands/**/*.svelte');

async function hydrateIsland(element: HTMLElement) {

	const hydrated = element.getAttribute('data-hydrated');
	if (hydrated === 'true') return;

	const islandPath = element.getAttribute('data-island-path')!;
	const propsString = element.getAttribute('data-island-props');
	const props = propsString ? JSON.parse(propsString) : {};

	console.log('hydrating...', islandPath);

	const importFunction = modules[islandPath];

	if (importFunction) {
		const module = (await importFunction())as { default: Component<any> };
		const Component = module.default;

		hydrate(Component, {
			target: element,
			props
		});

		element.setAttribute('data-hydrated', 'true');
	}
}

const elements = document.querySelectorAll(
	'[data-island-path]',
) as NodeListOf<HTMLElement>;
for (const element of elements) hydrateIsland(element);