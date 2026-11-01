<script lang="ts">
	type Props = { view: string; newCount: number; archivedCount: number };
	let { view, newCount, archivedCount }: Props = $props();
</script>

<nav class="tabs" aria-label="Enquiry views">
	<a href="/admin/enquiries" class="tab" aria-current={view === 'inbox' ? 'page' : undefined}>
		Inbox
		{#if newCount > 0}<span class="tab__badge">{newCount}</span>{/if}
	</a>
	<a href="/admin/enquiries?view=archived" class="tab" aria-current={view === 'archived' ? 'page' : undefined}>
		Archived
		{#if archivedCount > 0}<span class="tab__count">{archivedCount}</span>{/if}
	</a>
</nav>

<style>
	.tabs {
		display: flex;
		gap: 0.4rem;
		border-bottom: 1px solid var(--line);
		margin-bottom: 1.4rem;
	}

	.tab {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.55rem 1rem 0.65rem;
		text-decoration: none;
		color: var(--ink-600);
		font-family: var(--font-display);
		font-size: 0.95rem;
		font-weight: 500;
		border-bottom: 2.5px solid transparent;
		margin-bottom: -1px;
	}

	.tab:hover {
		color: var(--ink-900);
	}

	.tab[aria-current='page'] {
		color: var(--ink-900);
		border-bottom-color: var(--orange-500);
	}

	.tab__badge {
		background: var(--orange-500);
		color: #fff;
		font-size: 0.72rem;
		font-weight: 600;
		border-radius: 999px;
		padding: 0.1rem 0.5rem;
		line-height: 1.4;
	}

	.tab__count {
		background: var(--tint);
		border: 1px solid var(--line);
		color: var(--ink-600);
		font-size: 0.72rem;
		font-weight: 600;
		border-radius: 999px;
		padding: 0.1rem 0.5rem;
		line-height: 1.4;
	}
</style>
