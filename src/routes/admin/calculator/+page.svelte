<script lang="ts">
	import { enhance } from '$app/forms';
	import EstimateSettingsFields from '$lib/components/admin/calculator/EstimateSettingsFields.svelte';
	import RateGridFields from '$lib/components/admin/calculator/RateGridFields.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Cost calculator | Admin</title>
</svelte:head>

<h1>Cost calculator</h1>
<p class="intro">
	The rates behind the cost calculator at <a href="/cost-calculator" target="_blank" rel="noopener">/cost-calculator</a>.
	Leave a rate empty to stop offering that project type and finish online. The calculator stays hidden until at
	least one rate and the disclaimer are saved.
</p>

{#if form?.saved}<p class="ok" role="status">Saved.</p>{/if}
{#if form?.error}<p class="err" role="alert">{form.error}</p>{/if}

{#if data.isTableMissing}
	<p class="warn">The calculator tables don't exist yet. They are added when this change's migration runs.</p>
{:else}
	<p class="state">{data.isLive ? 'The calculator is live on the site.' : 'The calculator is hidden on the site.'}</p>
	<form class="card rates" method="POST" action="?/save" use:enhance={() => ({ update }) => update({ reset: false })}>
		<RateGridFields rates={data.rates} />
		<EstimateSettingsFields settings={data.settings} />
		<div><button class="btn btn--primary" type="submit">Save rates</button></div>
	</form>
{/if}

<style>
	.intro {
		color: var(--ink-600);
		max-width: 46rem;
		margin-bottom: 1.4rem;
	}

	.ok,
	.err,
	.warn {
		border: 1px solid;
		border-radius: var(--radius);
		padding: 0.7rem 1rem;
		max-width: 46rem;
	}

	.ok {
		background: var(--success-tint);
		border-color: var(--success-line);
	}

	.err {
		background: var(--danger-tint);
		border-color: var(--danger-line);
		color: var(--danger-ink);
	}

	.warn {
		background: var(--notice-tint);
		border-color: var(--notice-line);
		color: var(--ink-600);
	}

	.state {
		font-weight: 600;
	}

	.rates {
		display: grid;
		gap: 1rem;
		padding: 1.4rem 1.6rem;
		max-width: 56rem;
	}
</style>
