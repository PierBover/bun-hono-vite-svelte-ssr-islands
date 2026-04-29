<script lang="ts">
  import {getRequestContext} from "../pages/page-contexts";

	const {path} = getRequestContext();

	function isActive (linkPath:string):boolean {
		return linkPath === path;
	}
</script>

<nav>
	{#if isActive('/')}<span>Home</span>{:else}<a href="/" data-prefetch>Home</a>{/if}
	{#if isActive('/about')}<span>About</span>{:else}<a href="/about" data-prefetch>About</a>{/if}
</nav>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	span {
		font-weight: bold;
	}
</style>