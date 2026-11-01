<script lang="ts">
	import { onMount } from 'svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import BuildCopy from '$lib/components/demo/BuildCopy.svelte';
	import HouseScene from '$lib/components/demo/HouseScene.svelte';
	import BuildRail from '$lib/components/demo/BuildRail.svelte';
	import ScrollHint from '$lib/components/demo/ScrollHint.svelte';
	import DemoAbout from '$lib/components/demo/DemoAbout.svelte';
	import { findHouseParts } from '$lib/components/demo/houseParts';
	import { renderBuild } from '$lib/components/demo/renderBuild';
	import { driveBuildByScroll } from '$lib/components/demo/scrollDriver';
	import { percentComplete, stageIndexAt } from '$lib/components/demo/buildProgress';

	let active = $state(0);
	let percent = $state(0);

	onMount(() => {
		const track = document.getElementById('build-track') as HTMLElement;
		const stage = document.getElementById('build-stage') as HTMLElement;
		const svg = document.getElementById('house') as unknown as SVGSVGElement;
		if (!track || !stage || !svg) return;

		const parts = findHouseParts(svg);
		return driveBuildByScroll({ track, stage, svg }, (progress) => {
			active = stageIndexAt(progress);
			percent = percentComplete(progress);
			renderBuild(parts, progress);
		});
	});
</script>

<svelte:head>
	<title>Demo — From the ground up | Jewel Bespoke Build</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="description" content="Concept page — a house built stage by stage as you scroll." />
</svelte:head>

<section class="build" id="build-track">
	<div class="stage" id="build-stage">
		<BuildCopy {active} {percent} />
		<HouseScene />
		<BuildRail {active} />
		<ScrollHint isHidden={active > 0} />
	</div>
</section>

<DemoAbout />

<CtaBand />

<style>
	.build {
		--hdr: 0px;
		--navy: #1a1e29;
		--gold: #c09a51;
		--orange: #ff8300;
		--cream: #e9e2d6;
		position: relative;
		height: 720vh;
		background: var(--navy);
		color: var(--cream);
	}

	.build:global(.build--static) {
		height: auto;
	}

	.stage {
		position: sticky;
		top: var(--hdr);
		height: calc(100dvh - var(--hdr));
		overflow: hidden;
		display: grid;
		grid-template-columns: minmax(300px, 34%) 1fr;
		background: var(--navy);
	}

	.build:global(.build--static) .stage {
		position: relative;
		min-height: 640px;
	}

	@media (max-width: 860px) {
		.stage {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr auto;
		}
	}
</style>
