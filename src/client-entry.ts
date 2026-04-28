/// <reference lib='dom' />
import './css/index.css';
import { hydrate, mount, type Component } from 'svelte';

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

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
	'[data-island-path]:not([data-island-hydrate-on-visible]):not([data-island-hydrate-on-media])',
) as NodeListOf<HTMLElement>;
for (const element of elements) hydrateIsland(element);

// hydrate on visible
const elementsToHydrateOnVisible = document.querySelectorAll(
	'[data-island-path][data-island-hydrate-on-visible]',
) as NodeListOf<HTMLElement>;

if (elementsToHydrateOnVisible.length > 0) {
	function onObserve(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				// stop observing the element once hydrated
				observer.unobserve(entry.target);
				hydrateIsland(entry.target as HTMLElement);
			}
		});
	}

	const observer = new IntersectionObserver(onObserve);
	for (const element of elementsToHydrateOnVisible) observer.observe(element);
}

// hydrate on media query
const elementsToHydrateOnMedia = document.querySelectorAll(
	'[data-island-path][data-island-hydrate-on-media]',
) as NodeListOf<HTMLElement>;

for (const element of elementsToHydrateOnMedia) {
	const query = element.getAttribute('data-island-hydrate-on-media')!;
	const mediaQueryList = window.matchMedia(query);

	function handler(event: MediaQueryListEvent | MediaQueryList) {
		if (event.matches) {
			// remove the listener after the match
			mediaQueryList.removeEventListener('change', handler);
			hydrateIsland(element);
		}
	}

	// hydrate immeditaly if the media query matches already
	if (mediaQueryList.matches) {
		hydrateIsland(element);
	} else {
		mediaQueryList.addEventListener('change', handler);
	}
}