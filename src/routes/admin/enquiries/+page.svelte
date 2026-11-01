<script lang="ts">
	import EnquiryTabs from '$lib/components/admin/enquiries/EnquiryTabs.svelte';
	import EnquiriesEmpty from '$lib/components/admin/enquiries/EnquiriesEmpty.svelte';
	import EnquiryItem from '$lib/components/admin/enquiries/EnquiryItem.svelte';
	import EnquiriesPager from '$lib/components/admin/enquiries/EnquiriesPager.svelte';

	let { data } = $props();

	let expanded: Record<string, boolean> = $state({});

	function toggle(id: string) {
		expanded[id] = !expanded[id];
	}

	const pageBase = $derived(data.view === 'archived' ? '?view=archived&' : '?');
</script>

<svelte:head>
	<title>Enquiries | Admin</title>
</svelte:head>

<div class="head">
	<div>
		<h1>Enquiries</h1>
		<p class="sub">
			Quote requests from the website contact form land here —
			{#if data.newCount > 0}<strong>{data.newCount} new</strong> waiting.{:else}nothing new right now.{/if}
		</p>
	</div>
</div>

<EnquiryTabs view={data.view} newCount={data.newCount} archivedCount={data.archivedCount} />

{#if !data.configured}
	<p class="warn">Supabase is not connected yet — see the dashboard for setup steps.</p>
{:else if data.dbError}
	<p class="warn">
		Could not load enquiries — check that <code>supabase/schema.sql</code> (which now includes the
		<code>enquiries</code> table) has been run.
		<br /><code class="warn__detail">{data.dbError}</code>
	</p>
{:else if data.total === 0}
	<EnquiriesEmpty view={data.view} />
{:else}
	<ul class="list">
		{#each data.rows as r (r.id)}
			<EnquiryItem enquiry={r} isExpanded={expanded[r.id] ?? false} {pageBase} ontoggle={() => toggle(r.id)} />
		{/each}
	</ul>

	{#if data.totalPages > 1}
		<EnquiriesPager page={data.page} totalPages={data.totalPages} {pageBase} />
	{/if}
{/if}

<style>
	.head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.head h1 {
		margin-bottom: 0.2rem;
	}

	.sub {
		color: var(--ink-600);
		margin: 0 0 1.4rem;
	}

	.warn {
		background: #fdf6ec;
		border: 1px solid #f0dfc0;
		border-radius: var(--radius);
		padding: 0.9rem 1.1rem;
		color: var(--ink-600);
		max-width: 46rem;
	}

	.warn__detail {
		display: inline-block;
		margin-top: 0.5rem;
		font-size: 0.82rem;
		word-break: break-word;
		color: #8a5a2a;
	}

	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.7rem;
		max-width: 52rem;
	}
</style>
