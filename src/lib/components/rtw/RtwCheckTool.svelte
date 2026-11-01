<script lang="ts">
	import { onMount } from 'svelte';
	import './rtw-tool.css';
	import './rtw-steps.css';
	import './rtw-fields.css';
	import './rtw-choices.css';
	import './rtw-record.css';
	import './rtw-print.css';
	import RtwRail from './RtwRail.svelte';
	import RtwPrintHead from './RtwPrintHead.svelte';
	import StepDetails from './StepDetails.svelte';
	import StepEngagement from './StepEngagement.svelte';
	import StepRoute from './StepRoute.svelte';
	import StepConfirmations from './StepConfirmations.svelte';
	import StepExpiry from './StepExpiry.svelte';
	import StepOutcome from './StepOutcome.svelte';
	import CheckRecord from './CheckRecord.svelte';
	import { startRtwCheckTool } from '$lib/rtw/rtwCheckTool';

	onMount(startRtwCheckTool);
</script>

<section class="rtwp">
	<div class="rtwp__inner">
		<RtwRail />
		<RtwPrintHead />
		<StepDetails />
		<StepEngagement />
		<StepRoute />
		<StepConfirmations />
		<StepExpiry />
		<StepOutcome />
		<CheckRecord />
	</div>
</section>
