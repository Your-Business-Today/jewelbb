<script lang="ts">
	import { enhance } from '$app/forms';
	import type { TestimonialRow } from '$lib/testimonials/testimonial';
	import TestimonialFields from './TestimonialFields.svelte';

	let { testimonial }: { testimonial: TestimonialRow } = $props();

	const visibilityAction = $derived(testimonial.is_visible ? '?/hide' : '?/show');
	const visibilityLabel = $derived(testimonial.is_visible ? 'Hide' : 'Show');

	function confirmDelete(event: SubmitEvent) {
		const question = `Delete the testimonial from ${testimonial.author}? This cannot be undone. Use Hide instead if you might want it back.`;
		if (!confirm(question)) event.preventDefault();
	}
</script>

<li class="card testimonial" class:testimonial--hidden={!testimonial.is_visible}>
	{#if !testimonial.is_visible}
		<p class="status">Hidden: not shown anywhere on the site</p>
	{/if}
	<form class="details" method="POST" action="?/save" use:enhance>
		<input type="hidden" name="id" value={testimonial.id} />
		<TestimonialFields {testimonial} />
		<div><button class="btn btn--primary" type="submit">Save</button></div>
	</form>
	<div class="actions">
		<form method="POST" action={visibilityAction} use:enhance>
			<input type="hidden" name="id" value={testimonial.id} />
			<button class="btn btn--outline" type="submit">{visibilityLabel}</button>
		</form>
		<form method="POST" action="?/delete" use:enhance onsubmit={confirmDelete}>
			<input type="hidden" name="id" value={testimonial.id} />
			<button class="danger" type="submit">Delete</button>
		</form>
	</div>
</li>

<style>
	.testimonial {
		display: grid;
		gap: 1rem;
		padding: 1.3rem 1.5rem;
	}

	.testimonial--hidden {
		opacity: 0.65;
	}

	.status {
		margin: 0;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--ink-400);
	}

	.details {
		display: grid;
		gap: 0.9rem;
	}

	.actions {
		display: flex;
		gap: 0.8rem;
		justify-content: flex-end;
	}

	.danger {
		font: inherit;
		font-size: 0.85rem;
		color: var(--danger-ink);
		background: none;
		border: 1px solid var(--danger-edge);
		border-radius: 999px;
		padding: 0.4rem 1rem;
		cursor: pointer;
	}
</style>
