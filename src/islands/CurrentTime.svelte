<script lang="ts">
	import {onMount, untrack} from 'svelte';

	type Props = {serverTime:string};
	const {serverTime}:Props = $props();
	let time:string = $state(untrack(() => serverTime));

	function updateTime() {
		time = (new Date().toISOString());
	}

	onMount(() => {
		updateTime();
		const intervalId = setInterval(updateTime, 1000);

		return () => {
			clearInterval(intervalId);
		}
	});
</script>

<div class="CurrentTime">
	<h3>The time is: {time}</h3>
</div>