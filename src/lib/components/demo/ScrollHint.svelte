<script lang="ts">
	let { isHidden }: { isHidden: boolean } = $props();
</script>

<div class="hint" class:hint--hidden={isHidden}>
	<span>Scroll</span>
	<span class="hint__line"></span>
</div>

<style>
	.hint {
		position: absolute;
		left: 50%;
		bottom: 1.4rem;
		transform: translateX(-50%);
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 0.62rem;
		letter-spacing: 0.26em;
		text-transform: uppercase;
		color: rgba(233, 226, 214, 0.6);
		transition: opacity 0.4s ease;
	}

	.hint--hidden {
		opacity: 0;
	}

	.hint__line {
		width: 1px;
		height: 34px;
		background: linear-gradient(180deg, var(--orange), transparent);
		animation: drop 1.8s ease-in-out infinite;
	}

	@keyframes drop {
		0% {
			transform: scaleY(0);
			transform-origin: top;
		}
		50% {
			transform: scaleY(1);
			transform-origin: top;
		}
		51% {
			transform-origin: bottom;
		}
		100% {
			transform: scaleY(0);
			transform-origin: bottom;
		}
	}

	@media (max-width: 860px) {
		.hint {
			bottom: auto;
			top: 1rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hint__line {
			transition: none;
			animation: none;
		}
	}
</style>
