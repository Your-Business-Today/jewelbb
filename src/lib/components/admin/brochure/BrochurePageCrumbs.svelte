<script lang="ts">
	type Props = {
		brochure: { id: string; title: string };
		pageNumber: number;
		pageCount: number;
		templateName: string;
		prevId: string | null;
		nextId: string | null;
	};
	let { brochure, pageNumber, pageCount, templateName, prevId, nextId }: Props = $props();
</script>

<nav class="crumbs">
	<a href="/admin/brochure/{brochure.id}">← {brochure.title}</a>
	<span class="crumbs__pos">
		Page {pageNumber} of {pageCount} · {templateName}
		{#if prevId}
			· <a href="/admin/brochure/{brochure.id}/page/{prevId}">Prev</a>
		{/if}
		{#if nextId}
			· <a href="/admin/brochure/{brochure.id}/page/{nextId}">Next</a>
		{/if}
	</span>
</nav>

<style>
	.crumbs {
		margin-bottom: 0.8rem;
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.crumbs a {
		color: var(--ink-600);
		font-size: 0.92rem;
	}

	.crumbs__pos {
		color: var(--ink-400);
		font-size: 0.88rem;
	}
</style>
