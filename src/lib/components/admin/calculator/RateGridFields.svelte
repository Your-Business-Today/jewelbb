<script lang="ts">
	import { SpecLevels } from '$lib/calculator/options';
	import RateInput from '$lib/components/admin/calculator/RateInput.svelte';
	import { rateFor, type RateRow } from '$lib/calculator/estimate';
	import { rateGridRows, type RateCell } from '$lib/calculator/rateGrid';

	let { rates }: { rates: RateRow[] } = $props();

	function storedRate(cell: RateCell): number | string {
		const rate = rateFor(rates, cell);
		return rate?.rate_per_square_metre ?? '';
	}
</script>

<table class="grid">
	<thead>
		<tr>
			<th scope="col">£ per m²</th>
			{#each SpecLevels as specLevel (specLevel.value)}
				<th scope="col">{specLevel.label}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each rateGridRows as row (row.label)}
			<tr>
				<th scope="row">{row.label}</th>
				{#each row.cells as cell (cell.fieldName)}
					<RateInput {cell} value={storedRate(cell)} />
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.grid {
		border-collapse: collapse;
		width: 100%;
	}

	th {
		padding: 0.4rem 0.5rem;
		text-align: left;
		font-size: 0.88rem;
	}
</style>
