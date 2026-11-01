<script lang="ts">
	import type { Field } from '$lib/brochure/templates';
	import type { PageContentEditor, PickTarget } from '$lib/brochure/pageContentEditor.svelte';
	import ImageField from './ImageField.svelte';
	import ImagesField from './ImagesField.svelte';
	import GroupListField from './GroupListField.svelte';

	type Props = { editor: PageContentEditor; field: Field; onchoose: (target: PickTarget) => void };
	let { editor, field, onchoose }: Props = $props();
	const choose = (key: string, index?: number, subKey?: string) => onchoose({ key, index, subKey });
</script>

<div class="field">
	{#if field.type === 'text'}
		<label for="f-{field.key}">{field.label}</label>
		<input id="f-{field.key}" type="text" placeholder={field.placeholder ?? ''} bind:value={editor.content[field.key]} />
	{:else if field.type === 'textarea'}
		<label for="f-{field.key}">{field.label}</label>
		<textarea
			id="f-{field.key}"
			rows={field.rows ?? 6}
			placeholder={field.placeholder ?? ''}
			bind:value={editor.content[field.key]}
		></textarea>
	{:else if field.type === 'list'}
		<label for="f-{field.key}">{field.label}</label>
		<textarea
			id="f-{field.key}"
			rows="5"
			value={editor.linesOf(field.key)}
			oninput={(e) => editor.setLines(field.key, e.currentTarget.value)}
		></textarea>
	{:else if field.type === 'image'}
		<span class="field__label">{field.label}</span>
		<ImageField {editor} {field} onchoose={choose} />
	{:else if field.type === 'images'}
		<span class="field__label">{field.label} <em>(up to {field.max})</em></span>
		<ImagesField {editor} {field} onchoose={choose} />
	{:else if field.type === 'group-list'}
		<span class="field__label">{field.label}</span>
		<GroupListField {editor} {field} onchoose={choose} />
	{/if}
	{#if 'hint' in field && field.hint}
		<p class="field__hint">{field.hint}</p>
	{/if}
</div>

<style>
	.field {
		display: grid;
		gap: 0.35rem;
	}

	.field label,
	.field__label {
		font-size: 0.92rem;
		font-weight: 600;
	}

	.field__label em {
		font-style: normal;
		font-weight: 400;
		color: var(--ink-400);
	}

	.field input[type='text'],
	.field textarea {
		font: inherit;
		font-weight: 400;
		padding: 0.6rem 0.8rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		width: 100%;
	}

	.field textarea {
		line-height: 1.55;
	}

	.field input:focus,
	.field textarea:focus {
		outline: 2px solid var(--orange-500);
		outline-offset: 1px;
	}

	.field__hint {
		color: var(--ink-400);
		font-size: 0.82rem;
		margin: 0;
	}

</style>
