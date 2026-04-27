/// <reference lib='dom' />
import { hydrate, mount, type Component } from 'svelte';

const modules = import.meta.glob('/src/islands/**/*.svelte');

async function hydrateIsland(element: HTMLElement) {

	const hydrated = element.getAttribute('data-hydrated');
	if (hydrated === 'true') return;

	const islandPath = element.getAttribute('data-island-path')!;
	const propsString = element.getAttribute('data-island-props');
	const clientOnly = element.getAttribute('data-island-client-only') === 'true';
	const props = propsString ? JSON.parse(propsString) : {};

	const importFunction = modules[islandPath];

	if (importFunction) {
		const module = (await importFunction())as { default: Component<any> };
		const Component = module.default;

		if (clientOnly) {
			console.log('mounting...', islandPath);
			mount(Component, {
				target: element,
				props
			});
		} else {
			console.log('hydrating...', islandPath);
			hydrate(Component, {
				target: element,
				props
			});
		}


		element.setAttribute('data-hydrated', 'true');
	}
}

const elements = document.querySelectorAll(
	'[data-island-path]',
) as NodeListOf<HTMLElement>;
for (const element of elements) hydrateIsland(element);