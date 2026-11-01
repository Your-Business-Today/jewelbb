<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { subcontractorTermsHtml } from '$lib/legal/subcontractorTerms';
</script>

<Seo
	title="Subcontractor Terms | Jewel Bespoke Build"
	description="Works Order terms on which Jewel Bespoke Build Ltd engages subcontractors and suppliers."
/>

<section class="section">
	<div class="container prose">
		<h1>Subcontractor Terms: Jewel Bespoke Build Ltd</h1>
		<p class="note">
			These are the terms on which we engage subcontractors and suppliers. They are not the terms
			of a building contract with a homeowner — if you are a client, your contract with us sets out
			the terms that apply to your project.
		</p>
		{@html subcontractorTermsHtml}
	</div>
</section>

<style>
	.note {
		background: var(--tint);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 0.9rem 1.1rem;
	}
</style>
