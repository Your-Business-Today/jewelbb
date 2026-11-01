<script lang="ts">
	type Props = { page: number; totalPages: number; pageBase: string };
	let { page, totalPages, pageBase }: Props = $props();
</script>

<nav class="pager" aria-label="Pagination">
	{#if page > 1}
		<a class="btn btn--outline pager__btn" href="{pageBase}page={page - 1}">← Newer</a>
	{/if}
	<span class="pager__info">Page {page} of {totalPages}</span>
	{#if page < totalPages}
		<a class="btn btn--outline pager__btn" href="{pageBase}page={page + 1}">Older →</a>
	{/if}
</nav>

<style>
	.pager {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1.6rem;
	}

	.pager__btn {
		padding: 0.45rem 1.1rem;
		font-size: 0.88rem;
	}

	.pager__info {
		color: var(--ink-400);
		font-size: 0.9rem;
	}
</style>
