<script lang="ts">
	import { inPounds } from '$lib/calculator/money';
	import { estimateBasis, estimateQuery } from '$lib/calculator/estimateBasis';
	import type { Estimate, EstimateSettings } from '$lib/calculator/estimate';

	let { estimate, settings }: { estimate: Estimate; settings: EstimateSettings } = $props();

	const pdfHref = $derived(`/cost-calculator/pdf?${estimateQuery(estimate.details)}`);
</script>

<div class="estimate" role="status">
	<span class="kicker">Your estimate</span>
	<p class="estimate__range">{inPounds(estimate.low)} to {inPounds(estimate.high)}</p>
	<p class="estimate__basis">{estimateBasis(estimate.details)}</p>
	<p class="estimate__disclaimer">{settings.disclaimer}</p>
	<div class="estimate__actions">
		<a class="btn btn--primary" href="/contact">Request a free quote</a>
		<a class="btn btn--outline" href={pdfHref} data-sveltekit-preload-data="off" data-sveltekit-reload>Download as PDF</a>
	</div>
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

	.estimate__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	.estimate__disclaimer {
		font-size: 0.85rem;
		color: var(--ink-400);
	}
</style>
