<script lang="ts">
	let count = $state(0);

	function onClick () {
		count ++;
	}
</script>

<div class="Counter">
	<h4>{count}</h4>
	<button onclick={onClick}>Add</button>
</div>

<style>
	.Counter {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin: 60rem auto 4rem;

		h4 {
			font-size: 8rem;
			margin-bottom: 1rem;
		}
	}
</style>