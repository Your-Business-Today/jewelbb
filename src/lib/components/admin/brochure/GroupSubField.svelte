<script lang="ts">
	import type { SubField } from '$lib/brochure/templates';
	import type { PageContentEditor } from '$lib/brochure/pageContentEditor.svelte';

	type Props = {
		editor: PageContentEditor;
		fieldKey: string;
		index: number;
		sub: SubField;
		item: Record<string, unknown>;
		onchoose: (key: string, index: number, subKey: string) => void;
	};
	let { editor, fieldKey, index, sub, item, onchoose }: Props = $props();
	const id = $derived(`g-${fieldKey}-${index}-${sub.key}`);
	const setValue = (value: string) => editor.setListItemField(fieldKey, index, sub.key, value);
</script>

<div class="group__field">
	<label for={id}>{sub.label}</label>
	{#if sub.type === 'textarea'}
		<textarea {id} rows="3" value={String(item[sub.key] ?? '')} oninput={(e) => setValue(e.currentTarget.value)}
		></textarea>
	{:else}
		<div class="group__inline">
			<input
				{id}
				type="text"
				placeholder={sub.placeholder ?? ''}
				value={String(item[sub.key] ?? '')}
				oninput={(e) => setValue(e.currentTarget.value)}
			/>
			{#if sub.key === 'photo'}
				<button type="button" class="btn btn--outline btn--sm" onclick={() => onchoose(fieldKey, index, 'photo')}>
					Choose
				</button>
			{/if}
		</div>
	{/if}
</div>

<style>
	.group__field {
		display: grid;
		gap: 0.3rem;
	}

	.group__field label {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--ink-600);
	}

	.group__field input[type='text'] {
		font: inherit;
		font-weight: 400;
		padding: 0.6rem 0.8rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		width: 100%;
	}

	.group__field textarea {
		font: inherit;
		font-weight: 400;
		font-size: 0.92rem;
		padding: 0.5rem 0.7rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		width: 100%;
	}

	.group__field input:focus,
	.group__field textarea:focus {
		outline: 2px solid var(--orange-500);
		outline-offset: 1px;
	}

	.group__inline {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

</style>
