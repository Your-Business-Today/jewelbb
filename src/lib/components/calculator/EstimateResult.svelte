<script lang="ts">
	import { ProjectTypes, SpecLevels } from '$lib/calculator/options';
	import { inPounds } from '$lib/calculator/money';
	import type { Estimate, EstimateSettings } from '$lib/calculator/estimate';

	let { estimate, settings }: { estimate: Estimate; settings: EstimateSettings } = $props();

	const details = $derived(estimate.details);
	const projectType = $derived(ProjectTypes.find((option) => option.value === details.projectType));
	const specLevel = $derived(SpecLevels.find((option) => option.value === details.specLevel));
</script>

<div class="estimate" role="status">
	<span class="kicker">Your estimate</span>
	<p class="estimate__range">{inPounds(estimate.low)} to {inPounds(estimate.high)}</p>
	<p class="estimate__basis">
		{projectType?.label}, {specLevel?.label.toLowerCase()} finish, {details.floorArea} m²
	</p>
	<p class="estimate__disclaimer">{settings.disclaimer}</p>
	<a class="btn btn--primary" href="/contact">Request a free quote</a>
</div>

<style>
	.estimate {
		display: grid;
		gap: 0.6rem;
		justify-items: start;
	}

	.estimate__range {
		font-family: var(--font-display);
		font-size: clamp(1.6rem, 4vw, 2.3rem);
		font-weight: 600;
		margin: 0;
	}

	.estimate__basis {
		color: var(--ink-600);
		margin: 0;
	}

	.estimate__disclaimer {
		font-size: 0.85rem;
		color: var(--ink-400);
	}
</style>
