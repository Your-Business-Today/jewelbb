<div class="card hidden" id="result">
	<h2>Completed check record</h2>
	<div id="resultBanner"></div>
	<dl class="summary-grid" id="summaryGrid"></dl>
	<div class="no-print">
		<label for="rowOutput" style="margin-top:16px"
			>Register row - paste into the group register (columns match exactly)</label
		>
		<textarea id="rowOutput" readonly></textarea>
	</div>
	<button class="tbtn tbtn-primary no-print" id="copyBtn">Copy row</button>
	<button class="tbtn tbtn-secondary no-print" onclick={() => window.print()}
		>Print / save as PDF</button
	>
	<p class="muted no-print" id="saveStatus" aria-live="polite"></p>
	<p class="muted">
		The printed record can be filed alongside the document copy or online check PDF as part of
		the evidence.
	</p>
</div>
