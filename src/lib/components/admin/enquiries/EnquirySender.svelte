<script lang="ts">
	import type { EnquiryRow } from '$lib/server/db';

	let { enquiry }: { enquiry: EnquiryRow } = $props();
</script>

<span class="enquiry__who">
	<span class="enquiry__name">
		{enquiry.first_name}
		{enquiry.last_name}
		{#if enquiry.status === 'new'}<span class="pill pill--new">New</span>{/if}
	</span>
	<span class="enquiry__preview">{enquiry.message}</span>
</span>

<style>
	.enquiry__who {
		display: grid;
		gap: 0.1rem;
		min-width: 0;
		margin-right: auto;
	}

	.enquiry__name {
		font-weight: 600;
		color: var(--ink-900);
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.pill {
		font-size: 0.68rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		border-radius: 999px;
		padding: 0.12rem 0.55rem;
	}

	.pill--new {
		background: var(--orange-500);
		color: #fff;
	}

	.enquiry__preview {
		color: var(--ink-400);
		font-size: 0.9rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 34rem;
	}

	@media (max-width: 640px) {
		.enquiry__preview {
			display: none;
		}
	}
</style>
