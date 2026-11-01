<div class="copy__brand">
	<span class="copy__eyebrow">Jewel Bespoke Build</span>
	<span class="copy__rule"></span>
	<span class="copy__tag">Surrey · Est. 2021</span>
</div>

<style>
	.copy__brand {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	.copy__eyebrow {
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.24em;
		text-transform: uppercase;
		color: var(--orange);
	}

	.copy__rule {
		width: 34px;
		height: 1px;
		background: var(--orange);
	}

	.copy__tag {
		font-family: var(--font-display);
		font-size: 0.66rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--gold);
	}

	@media (max-width: 860px) {
		.copy__brand {
			display: none;
		}
	}
</style>
