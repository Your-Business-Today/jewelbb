<script lang="ts">
	import { TestimonialLimits } from '$lib/testimonials/limits';
	import { placementList, type TestimonialInput } from '$lib/testimonials/testimonial';

	let { testimonial }: { testimonial?: TestimonialInput } = $props();
</script>

<label>
	Quote
	<textarea name="quote" rows="5" required maxlength={TestimonialLimits.quoteLength}
		>{testimonial?.quote ?? ''}</textarea
	>
</label>
<div class="pair">
	<label>
		Name <span>(e.g. Mrs. Carson)</span>
		<input name="author" required maxlength={TestimonialLimits.authorLength} value={testimonial?.author ?? ''} />
	</label>
	<label>
		Company or project <span>(optional)</span>
		<input name="context" maxlength={TestimonialLimits.contextLength} value={testimonial?.context ?? ''} />
	</label>
</div>
<div class="pair">
	<fieldset>
		<legend>Show on</legend>
		{#each placementList as placement (placement.column)}
			<label class="tick">
				<input type="checkbox" name={placement.column} checked={testimonial?.[placement.column] ?? false} />
				{placement.label}
			</label>
		{/each}
	</fieldset>
	<label>
		Sort order <span>(lower shows first)</span>
		<input
			name="sort_order"
			type="number"
			step="1"
			min={TestimonialLimits.sortOrderMinimum}
			max={TestimonialLimits.sortOrderMaximum}
			value={testimonial?.sort_order ?? TestimonialLimits.newSortOrder}
		/>
	</label>
</div>

<style>
	label,
	fieldset {
		display: grid;
		gap: 0.3rem;
		font-size: 0.88rem;
		font-weight: 600;
	}

	label span {
		font-weight: 400;
		color: var(--ink-400);
	}

	fieldset {
		border: 0;
		padding: 0;
		margin: 0;
		grid-auto-flow: column;
		justify-content: start;
		gap: 1.2rem;
	}

	input:not([type='checkbox']),
	textarea {
		font: inherit;
		font-weight: 400;
		padding: 0.55rem 0.75rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		width: 100%;
	}

	.pair {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		align-items: end;
	}

	.tick {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-weight: 400;
	}

	.tick input {
		accent-color: var(--orange-500);
	}
</style>
