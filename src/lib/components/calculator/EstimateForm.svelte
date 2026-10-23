<script lang="ts">
	import { enhance } from '$app/forms';
	import { EstimateLimits, SpecLevels, storeyChoices } from '$lib/calculator/options';
	import { offeredProjectTypes, offeredSpecLevels } from '$lib/calculator/offeredChoices';
	import type { RateRow } from '$lib/calculator/estimate';

	let { rates }: { rates: RateRow[] } = $props();

	const projectTypes = $derived(offeredProjectTypes(rates));
	const unchosen = '';
	let projectType = $state(unchosen);
	const hasChosenProjectType = $derived(projectType !== unchosen);
	const specLevels = $derived(hasChosenProjectType ? offeredSpecLevels(rates, projectType) : SpecLevels);
</script>

<form method="POST" class="estimate-form" use:enhance={() => ({ update }) => update({ reset: false })}>
	<label>
		Type of project
		<select name="project_type" required bind:value={projectType}>
			<option value={unchosen} disabled>Choose one</option>
			{#each projectTypes as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</label>
	<label>
		Finish
		<select name="spec_level" required>
			{#each specLevels as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</label>
	<label>
		Floor area in m²
		<input
			name="floor_area"
			type="number"
			required
			min={EstimateLimits.floorAreaMinimum}
			max={EstimateLimits.floorAreaMaximum}
			step={EstimateLimits.floorAreaStep}
			inputmode="decimal"
		/>
	</label>
	<label>
		Storeys
		<select name="storeys" required>
			{#each storeyChoices as storeys (storeys)}
				<option value={storeys}>{storeys}</option>
			{/each}
		</select>
	</label>
	<button class="btn btn--primary" type="submit">Estimate my cost</button>
</form>

<style>
	.estimate-form {
		display: grid;
		gap: 1.1rem;
	}

	label {
		display: grid;
		gap: 0.35rem;
		font-weight: 600;
	}

	select,
	input {
		font: inherit;
		font-weight: 400;
		padding: 0.65rem 0.8rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
	}
</style>
