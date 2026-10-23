<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Print routes are captured by the PDF generator and must be
	// bare documents — no site chrome around the A4 pages.
	const printPaths = ['/brochure/print', '/cost-calculator/print'];
	const bare = $derived(printPaths.some((path) => page.url.pathname.startsWith(path)));
</script>

{#if bare}
	{@render children()}
{:else}
	<div class="shell">
		<Header />
		<main>
			{@render children()}
		</main>
		<Footer />
	</div>
{/if}

<style>
	.shell {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
	}
</style>
