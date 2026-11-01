<script lang="ts">
	import type { EnquiryRow } from '$lib/server/db';
	import EnquirySummary from './EnquirySummary.svelte';
	import EnquiryDetail from './EnquiryDetail.svelte';

	type Props = { enquiry: EnquiryRow; isExpanded: boolean; pageBase: string; ontoggle: () => void };
	let { enquiry, isExpanded, pageBase, ontoggle }: Props = $props();
</script>

<li class="card enquiry" class:enquiry--new={enquiry.status === 'new'}>
	<EnquirySummary {enquiry} {isExpanded} {ontoggle} />
	{#if isExpanded}
		<EnquiryDetail {enquiry} {pageBase} />
	{/if}
</li>

<style>
	.enquiry {
		overflow: hidden;
	}

	.enquiry--new {
		border-left: 3px solid var(--orange-500);
	}
</style>
