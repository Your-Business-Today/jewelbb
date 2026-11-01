<div class="card" id="step3">
	<h2><span class="stepnum">3</span>Route <span class="tick">&#10003; Complete</span></h2>
	<div class="radio-group" id="routeGroup">
		<div class="radio-opt" data-route="online">
			Non-UK national - Home Office online check with share code (free)
		</div>
		<div class="radio-opt" data-route="manual">
			British or Irish passport holder - manual passport check
		</div>
	</div>
	<div id="onlineRoute" class="hidden">
		<p class="muted">
			The individual gets their share code at
			<a href="https://www.gov.uk/prove-right-to-work" target="_blank" rel="noopener"
				>gov.uk/prove-right-to-work</a
			>. You check it at
			<a href="https://www.gov.uk/view-right-to-work" target="_blank" rel="noopener"
				>gov.uk/view-right-to-work</a
			>
			- when asked for the organisation carrying out the check, enter the engaging company's
			full name exactly. Codes are valid for 90 days.
		</p>
		<div class="grid2">
			<div>
				<label for="shareCode">Share code</label><input
					type="text"
					id="shareCode"
					placeholder="e.g. W12 345 678"
				/>
			</div>
			<div><label for="dob">Date of birth</label><input type="date" id="dob" /></div>
		</div>
	</div>
	<div id="manualRoute" class="hidden">
		<p class="muted">
			You must be holding the original passport, with the individual present in person or on a
			live video call. The passport must be current - the draft Home Office guidance does not
			accept expired passports for manual checks. Copy every relevant page (photo, date of
			birth, nationality, signature, expiry) and mark the copy: "The date on which this right
			to work check was made: [date]".
		</p>
		<label for="docDetail">Document seen (type and number)</label>
		<input type="text" id="docDetail" placeholder="e.g. British passport 123456789" />
	</div>
</div>
