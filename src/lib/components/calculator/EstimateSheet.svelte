<script lang="ts">
	import { images } from '$lib/data/images';
	import { site } from '$lib/data/site';
	import { inPounds } from '$lib/calculator/money';
	import { estimateBasis } from '$lib/calculator/estimateBasis';
	import type { Estimate, EstimateSettings } from '$lib/calculator/estimate';

	let { estimate, settings }: { estimate: Estimate; settings: EstimateSettings } = $props();

	const preparedOn = new Date().toLocaleDateString('en-GB', { dateStyle: 'long' });
</script>

<article class="sheet">
	<img class="sheet__logo" src={images.logo} alt={site.name} />
	<span class="kicker">Your project estimate</span>
	<h1 class="sheet__range">{inPounds(estimate.low)} to {inPounds(estimate.high)}</h1>
	<p class="sheet__basis">{estimateBasis(estimate.details)}</p>
	<p class="sheet__date">Prepared on {preparedOn}</p>
	<p class="sheet__disclaimer">{settings.disclaimer}</p>
	<footer class="sheet__contact">
		<strong>Ready for an exact price?</strong>
		<span>Request a free quote at {site.url}/contact, call {site.phone} or email {site.email}.</span>
	</footer>
</article>

<style>
	.sheet {
		box-sizing: border-box;
		width: 210mm;
		min-height: 297mm;
		padding: 24mm 20mm;
		display: flex;
		flex-direction: column;
		gap: 6mm;
		font-family: var(--font-body);
		color: var(--ink-900);
	}

	.sheet__logo {
		width: 60mm;
		margin-bottom: 10mm;
	}

	.sheet__range {
		font-family: var(--font-display);
		font-size: 28pt;
		margin: 0;
	}

	.sheet__basis {
		font-size: 14pt;
		margin: 0;
	}

	.sheet__date,
	.sheet__disclaimer {
		color: var(--ink-600);
		font-size: 10pt;
	}

	.sheet__contact {
		margin-top: auto;
		display: grid;
		gap: 2mm;
		padding-top: 6mm;
		border-top: 2px solid var(--orange-500);
	}
</style>
