<script lang="ts">
	import { EstimateLimits } from '$lib/calculator/options';
	import type { RateCell } from '$lib/calculator/rateGrid';

	let { cell, value }: { cell: RateCell; value: number | string } = $props();
</script>

<td>
	<input
		name={cell.fieldName}
		aria-label="{cell.label}, pounds per square metre"
		type="number"
		min={EstimateLimits.rateStep}
		max={EstimateLimits.rateMaximum}
		step={EstimateLimits.rateStep}
		{value}
	/>
</td>

<style>
	td {
		padding: 0.4rem 0.5rem;
	}

	input {
		font: inherit;
		padding: 0.5rem 0.65rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		width: 100%;
	}
</style>
