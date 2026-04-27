<script>
	import Island from "./Island.svelte";
	import CurrentTime from "./islands/CurrentTime.svelte";

	const serverTime = (new Date().toISOString());
</script>

<h1>Hello Svelte SSR</h1>
<Island component={CurrentTime} islandProps={{serverTime}}/>