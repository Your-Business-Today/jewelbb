<script lang="ts">
	let { percent }: { percent: number } = $props();
</script>

<div class="counter" aria-live="off">
	<span class="counter__num">{percent}</span><span class="counter__pct">%</span>
	<span class="counter__label">complete</span>
</div>

<style>
	.counter {
		display: flex;
		align-items: baseline;
		gap: 0.15rem;
		font-family: var(--font-display);
		color: var(--gold);
		font-variant-numeric: tabular-nums;
	}

	.counter__num {
		font-size: clamp(2.4rem, 4.4vw, 3.6rem);
		font-weight: 300;
		line-height: 1;
		min-width: 2ch;
		text-align: right;
	}

	.counter__pct {
		font-size: 1.2rem;
		font-weight: 300;
	}

	.counter__label {
		margin-left: 0.7rem;
		font-size: 0.68rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: rgba(233, 226, 214, 0.55);
	}

	@media (max-width: 860px) {
		.counter__num {
			font-size: 2rem;
		}
	}
</style>
