<script lang="ts">
	import type { EnquiryRow } from '$lib/server/db';
	import { initials, whenReceived } from '$lib/enquiries/enquiryDisplay';
	import EnquirySender from './EnquirySender.svelte';

	type Props = { enquiry: EnquiryRow; isExpanded: boolean; ontoggle: () => void };
	let { enquiry, isExpanded, ontoggle }: Props = $props();
</script>

<button type="button" class="enquiry__summary" onclick={ontoggle} aria-expanded={isExpanded}>
	<span class="enquiry__avatar" aria-hidden="true">{initials(enquiry.first_name, enquiry.last_name)}</span>
	<EnquirySender {enquiry} />
	<span class="enquiry__meta">
		<span class="enquiry__date">{whenReceived(enquiry.created_at)}</span>
		<span class="enquiry__chevron" class:enquiry__chevron--open={isExpanded}>▾</span>
	</span>
</button>

<style>
	.enquiry__summary {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		padding: 0.95rem 1.2rem;
		background: none;
		border: none;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.enquiry__summary:hover {
		background: var(--tint);
	}

	.enquiry__avatar {
		flex-shrink: 0;
		width: 42px;
		height: 42px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--gold-300);
		color: var(--ink-900);
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.92rem;
	}

	:global(.enquiry--new) .enquiry__avatar {
		background: var(--orange-100);
		color: var(--orange-600);
	}

	.enquiry__meta {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 0.7rem;
	}

	.enquiry__date {
		color: var(--ink-400);
		font-size: 0.85rem;
		white-space: nowrap;
	}

	.enquiry__chevron {
		color: var(--ink-400);
		transition: transform 0.15s ease;
	}

	.enquiry__chevron--open {
		transform: rotate(180deg);
	}
</style>
