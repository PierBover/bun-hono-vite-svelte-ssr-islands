<script lang="ts" generics="T extends import('svelte').Component<any, any, any>">
	import {untrack, type Component} from "svelte";
	import {getIslandComponentPath} from "./islands/utils";

	type RawProps = T extends Component<infer P, any, any> ? P : never;

	type Props = {
		component: T;
		clientOnly?: boolean;
	} & (keyof RawProps extends never
		? { islandProps?: never }
		: { islandProps: RawProps }
	);

	const {component: Islandcomponent, clientOnly = false, islandProps}:Props = $props();
	const islandPath = getIslandComponentPath(untrack(() => Islandcomponent));
	const staticProps = untrack(() => islandProps);
</script>

<div
	data-island-path={islandPath}
	data-island-props={staticProps ? JSON.stringify(staticProps) : undefined}
	data-island-client-only={clientOnly}
>{#if !clientOnly}<Islandcomponent {...staticProps}/>{/if}</div>