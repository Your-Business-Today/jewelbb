<section class="section about">
	<div class="container about__grid">
		<div>
			<span class="kicker">About this page</span>
			<h2>A concept, not a finished thing.</h2>
		</div>
		<div class="about__text">
			<p class="lede">
				This is a working sketch of a scroll-driven build sequence for jewelbb.co.uk — the house
				assembles itself as you move down the page, in the order a real one would.
			</p>
			<p>
				The finished version would swap the illustration for photography from one of our own
				sites: the same elevation, captured at each stage from the same spot, so the house you
				scroll through is one we actually built. The mechanism stays exactly as it is here.
			</p>
		</div>
	</div>
</section>

<style>
	.about__grid {
		display: grid;
		gap: 1.5rem;
	}

	.about__text p:last-child {
		margin-bottom: 0;
		max-width: 46rem;
	}

	@media (min-width: 860px) {
		.about__grid {
			grid-template-columns: 1fr 1.6fr;
			gap: 3rem;
		}
	}
</style>
