<script lang="ts">
	import { enhance } from '$app/forms';
	import TestimonialEditor from '$lib/components/admin/testimonials/TestimonialEditor.svelte';
	import TestimonialFields from '$lib/components/admin/testimonials/TestimonialFields.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Testimonials | Admin</title>
</svelte:head>

<h1>Testimonials</h1>
<p class="intro">
	Client quotes for the homepage, the contact page and the brochure. Tick where each one shows.
	<strong>Hide</strong> takes one off the whole site without deleting it; <strong>Show</strong> brings it back.
</p>

{#if form?.saved}
	<p class="ok" role="status">Saved. <a href="/" target="_blank" rel="noopener">View the homepage ↗</a></p>
{/if}
{#if form?.error}
	<p class="err" role="alert">{form.error}</p>
{/if}

{#if !data.isConfigured}
	<p class="warn">Supabase is not connected yet. See the dashboard for setup steps.</p>
{:else if data.isTableMissing}
	<p class="warn">
		The testimonials table doesn't exist yet. Run <code>supabase/2026-10-20-testimonials.sql</code>
		in the Supabase SQL editor (it only adds the new table), then reload this page.
	</p>
{:else}
	{#if data.testimonials.length === 0}<p>No testimonials yet. Add one below.</p>{/if}
	<ul class="list">
		{#each data.testimonials as testimonial (testimonial.id)}
			<TestimonialEditor {testimonial} />
		{/each}
	</ul>

	<h2 class="add-title">Add a testimonial</h2>
	<form class="card add" method="POST" action="?/create" use:enhance>
		<TestimonialFields />
		<div><button class="btn btn--primary" type="submit">+ Add testimonial</button></div>
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

	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.9rem;
		max-width: 56rem;
	}

	.add-title {
		font-size: 1.1rem;
		margin: 2rem 0 0.8rem;
	}
	.add {
		display: grid;
		gap: 0.9rem;
		padding: 1.4rem 1.6rem;
		max-width: 56rem;
	}
</style>
