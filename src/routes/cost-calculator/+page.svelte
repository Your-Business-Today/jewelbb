<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import EstimateForm from '$lib/components/calculator/EstimateForm.svelte';
	import EstimateResult from '$lib/components/calculator/EstimateResult.svelte';

	let { data, form } = $props();
</script>

<Seo
	title="House cost calculator | Jewel Bespoke Build"
	description="Get an instant estimate of what your new build, extension or renovation could cost, in a minute and without speaking to anyone."
/>

<section class="section page-hero">
	<div class="container">
		<span class="kicker">Cost calculator</span>
		<h1>What could your project cost?</h1>
		<p class="lede">Tell us the type of project, the finish and the floor area, and see an estimated range straight away.</p>
	</div>
</section>

<section class="section section--tint">
	<div class="container calculator-grid">
		<div class="card calculator-card">
			<EstimateForm rates={data.rates} />
			{#if form?.error}<p class="calculator-error" role="alert">{form.error}</p>{/if}
		</div>
		{#if form?.estimate}
			<div class="card calculator-card">
				<EstimateResult estimate={form.estimate} settings={data.settings} />
			</div>
		{/if}
	</div>
</section>

<style>
	.calculator-grid {
		display: grid;
		gap: 2rem;
		align-items: start;
	}

	@media (min-width: 960px) {
		.calculator-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.calculator-card {
		padding: 2rem 2.2rem;
	}

	.calculator-error {
		color: var(--danger-ink);
		margin-top: 1rem;
	}
</style>
