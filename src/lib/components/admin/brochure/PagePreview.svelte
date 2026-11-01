<script lang="ts">
	import BrochureDoc from '$lib/components/brochure/BrochureDoc.svelte';

	const a4WidthPixels = 794;
	const a4HeightPixels = 1123;

	type Props = { pageNumber: number; page: { id: string; template: string }; content: Record<string, unknown> };
	let { pageNumber, page, content }: Props = $props();

	let previewWidth = $state(0);
	const scale = $derived(previewWidth > 0 ? previewWidth / a4WidthPixels : 0.5);
</script>

<div class="editor__preview">
	<div class="editor__preview-label">
		Live preview — page {pageNumber}
	</div>
	<div class="editor__preview-frame" bind:clientWidth={previewWidth}>
		<div class="editor__preview-scaler" style="transform: scale({scale}); height: {a4HeightPixels * scale}px;">
			<BrochureDoc pages={[{ id: page.id, template: page.template, content }]} />
		</div>
	</div>
</div>

<style>
	.editor__preview {
		position: sticky;
		top: 84px;
	}

	.editor__preview-label {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--ink-400);
		margin-bottom: 0.5rem;
	}

	.editor__preview-frame {
		border: 1px solid var(--line);
		border-radius: 8px;
		overflow: hidden;
		background: #fff;
		box-shadow: var(--shadow-soft);
	}

	.editor__preview-scaler {
		transform-origin: top left;
		width: 794px;
	}
</style>
