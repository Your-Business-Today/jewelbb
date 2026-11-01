<script lang="ts">
	import { buildStages } from './buildStages';

	let { active }: { active: number } = $props();
</script>

<ol class="rail" aria-label="Build stages">
	{#each buildStages.slice(1, 8) as s, i (s.id)}
		<li class="rail__item" class:rail__item--active={active === i + 1} class:rail__item--done={active > i + 1}>
			<span class="rail__dot"></span>
			<span class="rail__label">{s.label}</span>
		</li>
	{/each}
</ol>

<style>
	.rail {
		position: absolute;
		right: clamp(1rem, 3vw, 2.4rem);
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.rail__item {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.7rem;
		font-family: var(--font-display);
		font-size: 0.66rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(233, 226, 214, 0.35);
		transition: color 0.4s ease;
	}

	.rail__item--done {
		color: rgba(233, 226, 214, 0.6);
	}

	.rail__item--active {
		color: var(--cream);
	}

	.rail__dot {
		width: 7px;
		height: 7px;
		transform: rotate(45deg);
		border: 1px solid rgba(233, 226, 214, 0.4);
		transition:
			background-color 0.4s ease,
			border-color 0.4s ease;
	}

	.rail__item--done .rail__dot {
		background: var(--gold);
		border-color: var(--gold);
	}

	.rail__item--active .rail__dot {
		background: var(--orange);
		border-color: var(--orange);
		box-shadow: 0 0 0 4px rgba(255, 131, 0, 0.18);
	}

	@media (max-width: 860px) {
		.rail {
			display: none;
		}
	}
</style>
