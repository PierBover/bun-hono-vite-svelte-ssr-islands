import type {Component} from "svelte";

// islands modules registry lookup table
const islands = new Map<Component<any>, string>();
const modules = import.meta.glob('/src/islands/**/*.svelte', { eager: true });

for (const entry of Object.entries(modules)) {
	const [path, module]:[string, any] = entry;
	// if the emtry has a module and a default export add it to the lookup table of modules
	// for some reason I don't understand Island.svelte doesnt export a module
	// but it's ok because we don't need it ¯\_(ツ)_/¯
	if (module?.default) islands.set(module.default, path);
}

// this return the path of the component that we use for hydration
export function getIslandComponentPath(component: Component<any>): string | undefined {
	return islands.get(component);
}