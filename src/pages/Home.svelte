<script lang="ts">
	import Island from "../islands/Island.svelte";
	import Counter from "../islands/Counter.svelte";
	import CurrentTime from "../islands/CurrentTime.svelte";
	import Desktop from "../islands/Desktop.svelte";
	import Mobile from "../islands/Mobile.svelte";
	import Nav from "../components/Nav.svelte";
	import {getHomeContext} from "./page-contexts";

	const serverTime = (new Date().toISOString());
	const {welcomeMessage} = getHomeContext();
</script>

<div class="Home">
	<Nav/>
	<h1>Hello Svelte</h1>
	<h2>{welcomeMessage}</h2>
	<Island component={CurrentTime} islandProps={{serverTime}}/>
	<Island component={Desktop} hydrateOnMedia="(min-width: 1000px)"/>
	<Island component={Mobile} hydrateOnMedia="(max-width: 999px)"/>
	<p>Scroll down to hydrate a component when it becomes visible</p>
	<Island component={Counter} hydrateOnVisible/>
</div>

<style>
	.Home {
		max-width: 30rem;
		margin: 0 auto;
	}
</style>