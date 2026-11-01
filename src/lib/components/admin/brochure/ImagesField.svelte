<script lang="ts">
	import type { Field } from '$lib/brochure/templates';
	import type { PageContentEditor } from '$lib/brochure/pageContentEditor.svelte';

	type ImagesFieldSpec = Extract<Field, { type: 'images' }>;
	type Props = { editor: PageContentEditor; field: ImagesFieldSpec; onchoose: (key: string, index: number) => void };
	let { editor, field, onchoose }: Props = $props();
	const images = $derived(editor.arrayOf(field.key));
</script>

<div class="imggrid">
	{#each images as url, i (i)}
		<div class="imggrid__cell">
			<img src={url} alt="" />
			<div class="imggrid__cellbtns">
				<button type="button" title="Change" onclick={() => onchoose(field.key, i)}>✎</button>
				<button type="button" title="Remove" onclick={() => editor.removeAt(field.key, i)}>✕</button>
			</div>
		</div>
	{/each}
	{#if images.length < field.max}
		<button type="button" class="imggrid__add" onclick={() => onchoose(field.key, images.length)}>+ Add</button>
	{/if}
</div>

<style>
	.imggrid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
		gap: 0.55rem;
	}

	.imggrid__cell {
		position: relative;
		aspect-ratio: 4 / 3;
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid var(--line);
	}

	.imggrid__cell img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.imggrid__cellbtns {
		position: absolute;
		top: 4px;
		right: 4px;
		display: flex;
		gap: 4px;
	}

	.imggrid__cellbtns button {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		border: 0;
		background: rgba(255, 255, 255, 0.92);
		cursor: pointer;
		font-size: 0.75rem;
		line-height: 1;
	}

	.imggrid__add {
		aspect-ratio: 4 / 3;
		border: 1.5px dashed var(--line);
		border-radius: 8px;
		background: none;
		color: var(--ink-600);
		font: inherit;
		font-size: 0.85rem;
		cursor: pointer;
	}

	.imggrid__add:hover {
		border-color: var(--orange-500);
		color: var(--orange-600);
	}

</style>
