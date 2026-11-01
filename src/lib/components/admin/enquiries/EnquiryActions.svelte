<script lang="ts">
	import { enhance } from '$app/forms';
	import type { EnquiryRow } from '$lib/server/db';

	type Props = { enquiry: EnquiryRow; pageBase: string };
	let { enquiry, pageBase }: Props = $props();
</script>

<div class="enquiry__actions">
	{#if enquiry.status === 'archived'}
		<form method="POST" action="{pageBase}/restore" use:enhance>
			<input type="hidden" name="id" value={enquiry.id} />
			<button class="action" type="submit">Move to inbox</button>
		</form>
	{:else}
		{#if enquiry.status === 'new'}
			<form method="POST" action="{pageBase}/markRead" use:enhance>
				<input type="hidden" name="id" value={enquiry.id} />
				<button class="action" type="submit">Mark as read</button>
			</form>
		{:else}
			<form method="POST" action="{pageBase}/markUnread" use:enhance>
				<input type="hidden" name="id" value={enquiry.id} />
				<button class="action" type="submit">Mark as new</button>
			</form>
		{/if}
		<form method="POST" action="{pageBase}/archive" use:enhance>
			<input type="hidden" name="id" value={enquiry.id} />
			<button class="action" type="submit">Archive</button>
		</form>
	{/if}
	<form
		method="POST"
		action="{pageBase}/remove"
		use:enhance
		onsubmit={(e) => {
			if (!confirm('Delete this enquiry permanently?')) e.preventDefault();
		}}
	>
		<input type="hidden" name="id" value={enquiry.id} />
		<button class="action action--danger" type="submit">Delete</button>
	</form>
</div>

<style>
	.enquiry__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.action {
		font: inherit;
		font-size: 0.85rem;
		font-weight: 600;
		padding: 0.4rem 1rem;
		border-radius: 999px;
		border: 1px solid var(--line);
		background: #fff;
		color: var(--ink-600);
		cursor: pointer;
	}

	.action:hover {
		border-color: var(--ink-900);
		color: var(--ink-900);
	}

	.action--danger:hover {
		border-color: #a33a2a;
		color: #a33a2a;
	}
</style>
