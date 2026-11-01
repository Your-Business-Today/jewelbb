<script lang="ts">
	import type { EnquiryRow } from '$lib/server/db';
	import EnquiryActions from './EnquiryActions.svelte';

	type Props = { enquiry: EnquiryRow; pageBase: string };
	let { enquiry, pageBase }: Props = $props();
	const dialablePhone = $derived(enquiry.phone.replace(/\s+/g, ''));
</script>

<div class="enquiry__detail">
	<div class="enquiry__contact">
		<a href="mailto:{enquiry.email}" title="Reply by email">✉ {enquiry.email}</a>
		{#if enquiry.phone}
			<a href="tel:{dialablePhone}" title="Call">✆ {enquiry.phone}</a>
		{/if}
	</div>
	<p class="enquiry__message">{enquiry.message}</p>
	<EnquiryActions {enquiry} {pageBase} />
</div>

<style>
	.enquiry__detail {
		border-top: 1px solid var(--line);
		padding: 1.1rem 1.2rem 1.2rem;
		display: grid;
		gap: 0.9rem;
	}

	.enquiry__contact {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem 1.4rem;
		font-size: 0.93rem;
	}

	.enquiry__contact a {
		color: var(--gold-600);
		font-weight: 600;
		text-decoration: none;
	}

	.enquiry__contact a:hover {
		text-decoration: underline;
	}

	.enquiry__message {
		margin: 0;
		white-space: pre-wrap;
		color: var(--ink-900);
		background: var(--tint);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 0.9rem 1.1rem;
	}
</style>
