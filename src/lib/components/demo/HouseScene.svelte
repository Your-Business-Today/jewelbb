<script lang="ts">
	import HouseDefs from './HouseDefs.svelte';
	import HouseBackdrop from './HouseBackdrop.svelte';
	import HouseGroundworks from './HouseGroundworks.svelte';
	import HouseFrame from './HouseFrame.svelte';
	import HouseEnvelope from './HouseEnvelope.svelte';
	import HouseGlazing from './HouseGlazing.svelte';
	import HouseFinishes from './HouseFinishes.svelte';
	import HouseLandscape from './HouseLandscape.svelte';
</script>

<div class="scene">
	<svg
		id="house"
		viewBox="120 0 1110 720"
		preserveAspectRatio="xMidYMid meet"
		role="img"
		aria-label="Illustration of a house being built stage by stage"
	>
		<HouseDefs />
		<HouseBackdrop />
		<g data-layer="house">
			<HouseGroundworks />
			<HouseFrame />
			<HouseEnvelope />
			<HouseGlazing />
			<HouseFinishes />
		</g>
		<HouseLandscape />
	</svg>
</div>

<style>
	.scene {
		position: relative;
		height: 100%;
		overflow: hidden;
	}

	.scene svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		transform-origin: 50% 70%;
		overflow: visible;
		will-change: transform;
	}

	.scene :global([data-layer]) {
		will-change: transform;
	}

	.scene :global(.plant) {
		transform-box: fill-box;
		transform-origin: 50% 100%;
	}

	@media (max-width: 860px) {
		.scene {
			order: 1;
		}
	}
</style>
