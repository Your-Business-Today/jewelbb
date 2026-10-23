<script lang="ts">
	import { onMount } from 'svelte';
	import { massingFor } from '$lib/calculator/massing';
	import type { HouseView } from '$lib/calculator/houseScene';
	import type { VisitorDetails } from '$lib/calculator/estimate';

	let { details }: { details: VisitorDetails } = $props();

	let canvas: HTMLCanvasElement;
	let view = $state<HouseView | null>(null);

	onMount(() => {
		let resizeObserver: ResizeObserver | undefined;
		import('$lib/calculator/houseScene').then(({ createHouseView }) => {
			const createdView = createHouseView(canvas);
			resizeObserver = new ResizeObserver(() => createdView.resize(canvas.clientWidth, canvas.clientHeight));
			resizeObserver.observe(canvas);
			view = createdView;
		});
		return () => {
			resizeObserver?.disconnect();
			view?.dispose();
		};
	});

	$effect(() => {
		view?.show(massingFor(details.floorArea, details.storeys));
	});
</script>

<figure class="house-model">
	<canvas bind:this={canvas} aria-label="3D model of a {details.storeys}-storey house with {details.floorArea} m² of floor space"></canvas>
	<figcaption>Drag to turn the model. A simple massing of the size you entered, not a design.</figcaption>
</figure>

<style>
	.house-model {
		margin: 0;
		display: grid;
		gap: 0.5rem;
	}

	canvas {
		width: 100%;
		aspect-ratio: 4 / 3;
		display: block;
		touch-action: none;
	}

	figcaption {
		font-size: 0.85rem;
		color: var(--ink-400);
	}
</style>
