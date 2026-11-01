<script lang="ts">
	import type { Field } from '$lib/brochure/templates';
	import type { PageContentEditor } from '$lib/brochure/pageContentEditor.svelte';
	import GroupItem from './GroupItem.svelte';

	type GroupListSpec = Extract<Field, { type: 'group-list' }>;
	type Props = {
		editor: PageContentEditor;
		field: GroupListSpec;
		onchoose: (key: string, index: number, subKey: string) => void;
	};
	let { editor, field, onchoose }: Props = $props();
	const items = $derived(editor.listOf(field.key));
</script>

<div class="groups">
	{#each items as item, i (i)}
		<GroupItem {editor} {field} {item} index={i} isLast={i === items.length - 1} {onchoose} />
	{/each}
	{#if !field.max || items.length < field.max}
		<button type="button" class="btn btn--outline btn--sm" onclick={() => editor.groupAdd(field.key, field.fields)}>
			+ Add {field.itemLabel}
		</button>
	{/if}
</div>

<style>
	.groups {
		display: grid;
		gap: 0.8rem;
	}

</style>
