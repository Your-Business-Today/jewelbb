<script lang="ts">
	import SlideActions from './SlideActions.svelte';

	type Stage = { kicker: string; title: string; text: string };
	let { stage, isActive, isLast }: { stage: Stage; isActive: boolean; isLast: boolean } = $props();
</script>

<div class="slide" class:slide--active={isActive} aria-hidden={!isActive}>
	<span class="slide__kicker">{stage.kicker}</span>
	<h2 class="slide__title">{stage.title}</h2>
	<p class="slide__text">{stage.text}</p>
	{#if isLast}
		<SlideActions />
	{/if}
</div>

<style>
	.slide {
		grid-area: 1 / 1;
		opacity: 0;
		transform: translateY(14px);
		transition:
			opacity 0.5s ease,
			transform 0.5s ease;
		max-width: 26rem;
	}

	.slide--active {
		opacity: 1;
		transform: none;
		transition-delay: 0.08s;
	}

	.slide__kicker {
		display: block;
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--gold);
		margin-bottom: 0.9rem;
	}

	.slide__title {
		color: #fff;
		font-size: clamp(1.5rem, 2.6vw, 2.25rem);
		font-weight: 500;
		line-height: 1.15;
		margin-bottom: 0.8rem;
	}

	.slide__text {
		color: rgba(233, 226, 214, 0.78);
		font-size: 1.02rem;
		line-height: 1.65;
		margin: 0;
	}

	@media (max-width: 860px) {
		.slide__title {
			font-size: 1.4rem;
		}

		.slide__text {
			font-size: 0.94rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.slide {
			transition: none;
			animation: none;
		}
	}
</style>
