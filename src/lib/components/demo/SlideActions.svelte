<div class="slide__actions">
	<a href="/contact" class="btn btn--primary">Start a conversation</a>
	<a href="/portfolio" class="btn btn--ghost">View our work</a>
</div>

<style>
	.slide__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 1.5rem;
	}

	.btn--ghost {
		border-color: rgba(233, 226, 214, 0.45);
		color: var(--cream);
		background: transparent;
	}

	.btn--ghost:hover {
		border-color: var(--cream);
		background: rgba(233, 226, 214, 0.08);
	}

	@media (max-width: 860px) {
		.slide__actions {
			margin-top: 1rem;
		}

		.slide__actions .btn {
			padding: 0.6rem 1.15rem;
			font-size: 0.86rem;
		}
	}
</style>
