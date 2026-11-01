<script lang="ts">
	import { buildStages } from './buildStages';
	import BuildBrand from './BuildBrand.svelte';
	import BuildSlide from './BuildSlide.svelte';
	import BuildCounter from './BuildCounter.svelte';

	let { active, percent }: { active: number; percent: number } = $props();
</script>

<div class="copy">
	<BuildBrand />

	<div class="copy__slides">
		{#each buildStages as s, i (s.id)}
			<BuildSlide stage={s} isActive={active === i} isLast={i === buildStages.length - 1} />
		{/each}
	</div>

	<BuildCounter {percent} />
</div>

<style>
	.copy {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: clamp(1.6rem, 4vw, 3.2rem);
		background: linear-gradient(90deg, var(--navy) 78%, rgba(26, 30, 41, 0));
		margin-right: -8%;
		pointer-events: none;
	}

	.copy :global(a) {
		pointer-events: auto;
	}

	.copy__slides {
		position: relative;
		flex: 1;
		display: grid;
		align-items: center;
		min-height: 0;
	}

	@media (max-width: 860px) {
		.copy {
			order: 2;
			margin-right: 0;
			padding: 1.2rem 1.25rem 1.4rem;
			background: linear-gradient(0deg, var(--navy) 82%, rgba(26, 30, 41, 0));
			margin-top: -3.5rem;
			gap: 0.9rem;
		}

		.copy__slides {
			min-height: 13.5rem;
			align-items: end;
		}
	}
</style>
