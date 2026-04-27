<script lang="ts" generics="T extends import('svelte').Component<any, any, any>">
	import type {Component} from "svelte";
  import {getIslandComponentPath} from "./islands/utils";

	type RawProps = T extends Component<infer P, any, any> ? P : never;

	type Props = {
		component: T;
	} & (keyof RawProps extends never
		? { islandProps?: never }
		: { islandProps: RawProps }
	);

	const {component, islandProps}:Props = $props();

	const staticProps = islandProps ? islandProps : undefined;
	const jsonProps = islandProps ? JSON.stringify(islandProps) : undefined;
	const Islandcomponent = component;
	const islandPath = getIslandComponentPath(Islandcomponent);
</script>

<div
	data-island-path={islandPath}
	data-island-props={jsonProps}
><Islandcomponent {...staticProps}/></div>