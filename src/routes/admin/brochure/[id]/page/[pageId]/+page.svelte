<script lang="ts">
	import ImagePicker from '$lib/components/admin/ImagePicker.svelte';
	import BrochurePageCrumbs from '$lib/components/admin/brochure/BrochurePageCrumbs.svelte';
	import PageEditorHeading from '$lib/components/admin/brochure/PageEditorHeading.svelte';
	import PageFieldsForm from '$lib/components/admin/brochure/PageFieldsForm.svelte';
	import DeletePageForm from '$lib/components/admin/brochure/DeletePageForm.svelte';
	import PagePreview from '$lib/components/admin/brochure/PagePreview.svelte';
	import { PageContentEditor, type PickTarget } from '$lib/brochure/pageContentEditor.svelte';

	let { data, form } = $props();

	/* Editable copy of the page content. Re-initialised whenever the admin
	   navigates to a different page (the #key block below re-mounts us). */
	const editor = new PageContentEditor(data.page.content ?? {});
	const original = $derived(JSON.stringify(data.page.content ?? {}));
	const isDirty = $derived(JSON.stringify(editor.content) !== original);

	let uploaded = $state<string[]>([...data.uploaded]);
	let pickerOpen = $state(false);
	let pickTarget = $state<PickTarget | null>(null);

	function openPicker(target: PickTarget) {
		pickTarget = target;
		pickerOpen = true;
	}

	function assignPicked(url: string) {
		if (!pickTarget) return;
		editor.assignPicked(pickTarget, url);
	}
</script>

<svelte:head>
	<title>Edit page — {data.brochure.title} | Admin</title>
</svelte:head>

{#key data.page.id}
	<BrochurePageCrumbs
		brochure={data.brochure}
		pageNumber={data.pageNumber}
		pageCount={data.pageCount}
		templateName={data.template.name}
		prevId={data.prevId}
		nextId={data.nextId}
	/>

	<div class="editor">
		<div class="editor__form">
			<PageEditorHeading name={data.template.name} description={data.template.description} {form} />
			<PageFieldsForm {editor} fields={data.template.fields} {isDirty} onchoose={openPicker} />
			<DeletePageForm />
		</div>

		<PagePreview pageNumber={data.pageNumber} page={data.page} content={editor.content} />
	</div>

	<ImagePicker
		bind:open={pickerOpen}
		bind:uploaded
		groups={data.siteImages}
		canUpload={data.canUpload}
		onpick={assignPicked}
	/>
{/key}

<style>
	.editor {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(320px, 480px);
		gap: 2rem;
		align-items: start;
	}

	@media (max-width: 1000px) {
		.editor {
			grid-template-columns: 1fr;
		}
	}


	.editor :global(.btn--sm) {
		padding: 0.4rem 1rem;
		font-size: 0.86rem;
	}
</style>
