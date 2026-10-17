<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { privacyNoticeHtml } from '$lib/legal/privacyNotice';
</script>

<Seo
	title="Privacy Notice | Jewel Bespoke Build"
	description="How Jewel Bespoke Build Ltd collects, uses, shares and keeps personal information, the lawful bases it relies on, and your rights under UK GDPR."
/>

<section class="section">
	<div class="container prose">
		{@html privacyNoticeHtml}
	</div>
</section>
