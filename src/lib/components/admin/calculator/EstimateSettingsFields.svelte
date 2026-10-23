<script lang="ts">
	import { EstimateLimits } from '$lib/calculator/options';
	import type { EstimateSettings } from '$lib/calculator/estimate';

	let { settings }: { settings: EstimateSettings | null } = $props();
</script>

<label>
	Range either side of the estimate, in %
	<input
		name="range_percent"
		type="number"
		required
		min="0"
		max={EstimateLimits.rangePercentMaximum}
		step={EstimateLimits.rangePercentStep}
		value={settings?.range_percent ?? ''}
	/>
</label>
<label>
	Disclaimer shown with every estimate
	<textarea name="disclaimer" rows="4" required maxlength={EstimateLimits.disclaimerLength}
		>{settings?.disclaimer ?? ''}</textarea
	>
</label>

<style>
	label {
		display: grid;
		gap: 0.3rem;
		font-size: 0.88rem;
		font-weight: 600;
	}

	input,
	textarea {
		font: inherit;
		font-weight: 400;
		padding: 0.55rem 0.75rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
	}
</style>
