<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { Field } from '$lib/brochure/templates';
	import type { PageContentEditor, PickTarget } from '$lib/brochure/pageContentEditor.svelte';
	import PageField from './PageField.svelte';

	type Props = { editor: PageContentEditor; fields: Field[]; isDirty: boolean; onchoose: (target: PickTarget) => void };
	let { editor, fields, isDirty, onchoose }: Props = $props();
</script>

<form
	class="card fields"
	method="POST"
	action="?/save"
	use:enhance={() => async ({ update }) => {
		await update({ reset: false });
		await invalidateAll();
	}}
>
	<input type="hidden" name="content" value={JSON.stringify(editor.content)} />

	{#each fields as field (field.key)}
		<PageField {editor} {field} {onchoose} />
	{/each}

	<div class="fields__save">
		<button class="btn btn--primary" type="submit">Save page</button>
		{#if isDirty}
			<span class="fields__dirty">Unsaved changes</span>
		{/if}
	</div>
</form>

<style>
	.fields {
		display: grid;
		gap: 1.2rem;
		padding: 1.5rem;
	}

	.fields__save {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.fields__dirty {
		color: var(--orange-600);
		font-size: 0.88rem;
	}

</style>
