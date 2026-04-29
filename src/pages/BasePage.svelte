<script lang="ts">
  import type {Component} from "svelte";

type Props = {
	pageComponent:Component;
};

const {pageComponent:PageComponent}:Props = $props();

</script>
<PageComponent/>