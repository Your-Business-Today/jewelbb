<script lang="ts">
	import RtwCheckTool from '$lib/components/rtw/RtwCheckTool.svelte';
</script>

<svelte:head>
	<title>Right to Work Check | Jewel Bespoke Build Ltd</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="section page-hero no-print">
	<div class="container">
		<span class="kicker">Internal compliance</span>
		<h1>Right to Work Check</h1>
		<p class="lede">
			Guided statutory check for every new individual engagement at Jewel Bespoke Build, in force
			for engagements starting on or after 1 October 2026.
		</p>
		<span class="rule-chip">&#9888;&#65038; No completed check, no start - no exceptions</span>
	</div>
</section>

<RtwCheckTool />

<style>
	.rule-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: 1.1rem;
		background: #fff6df;
		border: 1px solid #eedc9a;
		color: #935f00;
		font-size: 0.85rem;
		font-weight: 600;
		padding: 6px 14px;
		border-radius: 999px;
	}

	@media print {
		/* Hide the site chrome and the form; print only the check record. */
		:global(.header),
		:global(.footer),
		:global(.cookies),
		.page-hero {
			display: none !important;
		}
	}
</style>
