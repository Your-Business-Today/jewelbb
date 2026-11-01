<script lang="ts">
	import type { Field } from '$lib/brochure/templates';
	import type { PageContentEditor } from '$lib/brochure/pageContentEditor.svelte';

	type Props = { editor: PageContentEditor; field: Field; onchoose: (key: string) => void };
	let { editor, field, onchoose }: Props = $props();
	const isFilled = $derived(editor.isFilled(field));
</script>

<div class="imgfield">
	{#if isFilled}
		<img class="imgfield__thumb" src={String(editor.content[field.key])} alt="" />
	{/if}
	<div class="imgfield__controls">
		<button type="button" class="btn btn--outline btn--sm" onclick={() => onchoose(field.key)}>
			{isFilled ? 'Change photo' : 'Choose photo'}
		</button>
		{#if isFilled}
			<button type="button" class="linkish linkish--danger" onclick={() => (editor.content[field.key] = '')}>
				Remove
			</button>
		{/if}
	</div>
</div>

<style>
	.imgfield {
		display: flex;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.imgfield__thumb {
		width: 130px;
		height: 92px;
		object-fit: cover;
		border-radius: var(--radius);
		border: 1px solid var(--line);
	}

	.imgfield__controls {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	.linkish {
		font: inherit;
		font-size: 0.86rem;
		background: none;
		border: 0;
		padding: 0;
		cursor: pointer;
		color: var(--ink-600);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.linkish--danger {
		color: #a33a2a;
	}

</style>
