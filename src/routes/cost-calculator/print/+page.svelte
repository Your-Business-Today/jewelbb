<script lang="ts">
	import EstimateSheet from '$lib/components/calculator/EstimateSheet.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Your project estimate | Jewel Bespoke Build</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<EstimateSheet estimate={data.estimate} settings={data.settings} />

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		background: var(--paper);
	}

	@page {
		size: A4;
		margin: 0;
	}
</style>
