<script lang="ts">
	let { view }: { view: string } = $props();
</script>

<div class="empty card">
	{#if view === 'archived'}
		<h2>No archived enquiries</h2>
		<p>When you archive an enquiry from the inbox it will move here.</p>
	{:else}
		<h2>No enquiries yet</h2>
		<p>
			When someone sends the “Request a free quote” form on the
			<a href="/contact" target="_blank" rel="noopener">contact page</a>, it will appear here
			instantly.
		</p>
	{/if}
</div>

<style>
	.empty {
		padding: 2.4rem 2.2rem;
		max-width: 34rem;
		text-align: center;
		margin-inline: 0;
	}

	.empty h2 {
		font-size: 1.2rem;
		margin-bottom: 0.3rem;
	}

	.empty p {
		color: var(--ink-600);
		margin: 0;
	}
</style>
