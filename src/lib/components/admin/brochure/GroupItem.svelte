<script lang="ts">
	import type { Field } from '$lib/brochure/templates';
	import type { PageContentEditor } from '$lib/brochure/pageContentEditor.svelte';
	import GroupSubField from './GroupSubField.svelte';

	type GroupListSpec = Extract<Field, { type: 'group-list' }>;
	type Props = {
		editor: PageContentEditor;
		field: GroupListSpec;
		item: Record<string, unknown>;
		index: number;
		isLast: boolean;
		onchoose: (key: string, index: number, subKey: string) => void;
	};
	let { editor, field, item, index, isLast, onchoose }: Props = $props();
</script>

<div class="group card">
	<div class="group__head">
		<span>{field.itemLabel} {index + 1}</span>
		<span class="group__btns">
			<button type="button" disabled={index === 0} onclick={() => editor.groupMove(field.key, index, -1)}>↑</button>
			<button type="button" disabled={isLast} onclick={() => editor.groupMove(field.key, index, 1)}>↓</button>
			<button type="button" class="group__del" onclick={() => editor.groupRemove(field.key, index)}>✕</button>
		</span>
	</div>
	{#each field.fields as sub (sub.key)}
		<GroupSubField {editor} fieldKey={field.key} {index} {sub} {item} {onchoose} />
	{/each}
</div>

<style>
	.group {
		padding: 0.9rem 1rem;
		display: grid;
		gap: 0.7rem;
	}

	.group__head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--ink-400);
	}

	.group__btns {
		display: flex;
		gap: 0.3rem;
	}

	.group__btns button {
		font: inherit;
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		border: 1px solid var(--line);
		background: #fff;
		cursor: pointer;
		color: var(--ink-600);
		font-size: 0.8rem;
		line-height: 1;
	}

	.group__btns button:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.group__del {
		color: #a33a2a;
	}

</style>
