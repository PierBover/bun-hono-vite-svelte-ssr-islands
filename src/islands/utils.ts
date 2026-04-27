import type {Component} from "svelte";

// islands registry lookup table
// to get the full component path
const islandsPaths = new Map<Component<any>, string>();
const modules = import.meta.glob('/src/islands/**/*.svelte', { eager: true });

for (const [path, module] of Object.entries(modules)) {
	if ((module as any).default) {
		islandsPaths.set((module as any).default, path);
	}
}
// this return the path of the component
export function getIslandComponentPath(component: Component<any>): string | undefined {
	return islandsPaths.get(component);
}