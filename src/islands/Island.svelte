<script lang="ts" generics="T extends import('svelte').Component<any, any, any>">
	import {untrack, type Component} from "svelte";
	import {getIslandComponentPath} from "./utils";

	// all this TS stuff is to get the types
	// of the props from the island component
	type RawProps = T extends Component<infer P, any, any> ? P : never;
	type IsPropsEmpty<P> = { [x: string]: never } extends P ? true : false;

	type HydrationOptions =
	| { hydrateOnVisible?: boolean; hydrateOnMedia?: never }
	| { hydrateOnMedia?: string; hydrateOnVisible?: never };

	type Props = {
		component: T;
		clientOnly?: boolean;
	} & HydrationOptions & (
		IsPropsEmpty<RawProps> extends true
			? { islandProps?: never }
			: { islandProps: RawProps }
	);

	const {
		component: Islandcomponent,
		clientOnly = false,
		islandProps,
		hydrateOnVisible,
		hydrateOnMedia
	}:Props = $props();
	const islandPath = getIslandComponentPath(untrack(() => Islandcomponent));
	const staticProps = untrack(() => islandProps);
</script>

<div
	data-island-path={islandPath}
	data-island-props={staticProps ? JSON.stringify(staticProps) : undefined}
	data-island-client-only={clientOnly}
	data-island-hydrate-on-visible={hydrateOnVisible}
	data-island-hydrate-on-media={hydrateOnMedia}
>{#if !clientOnly}<Islandcomponent {...staticProps}/>{/if}</div>