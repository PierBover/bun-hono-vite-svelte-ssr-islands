<script>
	import Island from "./Island.svelte";
  import Counter from "./islands/Counter.svelte";
	import CurrentTime from "./islands/CurrentTime.svelte";
	import Desktop from "./islands/Desktop.svelte";
	import Mobile from "./islands/Mobile.svelte";

	const serverTime = (new Date().toISOString());
</script>

<div class="Page">
	<h1>Hello Svelte</h1>
	<Island component={CurrentTime} islandProps={{serverTime}}/>
	<Island component={Desktop} hydrateOnMedia="(min-width: 1000px)"/>
	<Island component={Mobile} hydrateOnMedia="(max-width: 999px)"/>
	<p>Scroll down to hydrate a component when it becomes visible</p>
	<Island component={Counter} hydrateOnVisible/>
</div>

<style>
	.Page {
		max-width: 30rem;
		margin: 0 auto;
	}
</style>