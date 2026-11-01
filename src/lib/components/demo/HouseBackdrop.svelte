<svelte:options namespace="svg" />

<g data-layer="sky">
	<rect x="-500" y="-500" width="2200" height="1700" fill="url(#sky-grad)" />
	<g id="stars" fill="#e9e2d6">
		<circle cx="120" cy="90" r="1.2" /><circle cx="260" cy="150" r="0.9" />
		<circle cx="410" cy="60" r="1.1" /><circle cx="560" cy="120" r="0.8" />
		<circle cx="700" cy="40" r="1.3" /><circle cx="820" cy="140" r="0.9" />
		<circle cx="960" cy="70" r="1.2" /><circle cx="1090" cy="160" r="0.8" />
		<circle cx="1150" cy="50" r="1" /><circle cx="330" cy="210" r="0.7" />
		<circle cx="880" cy="230" r="0.7" /><circle cx="40" cy="240" r="0.9" />
	</g>
	<rect id="dusk" x="-500" y="-500" width="2200" height="1700" fill="url(#dusk-grad)" opacity="0" />
</g>
<!-- Distant treeline ---------------------------------------------- -->
<g data-layer="far" fill="#1c222b">
	<path
		d="M-100 540 L-100 500 C-40 470 20 455 70 470 C110 440 150 430 190 455 C230 420 280 425 320 455 C360 445 400 450 430 470 C470 440 520 435 560 465 C600 445 650 440 700 468 C740 438 790 430 830 462 C870 445 920 448 950 468 C990 440 1040 432 1080 462 C1120 450 1170 455 1220 480 C1260 470 1300 480 1300 540 Z"
	/>
</g>

<!-- Ground ---------------------------------------------------------- -->
<g data-layer="ground">
	<rect x="-500" y="520" width="2200" height="700" fill="#1f2529" />
	<rect id="lawn" x="-500" y="520" width="2200" height="700" fill="#2b3f35" opacity="0" />
	<line x1="-500" y1="520" x2="1700" y2="520" stroke="#c09a51" stroke-opacity="0.45" stroke-width="1" />
</g>
<!-- Trees behind the house ------------------------------------------ -->
<g data-layer="back">
	<g data-plant class="plant" opacity="0">
		<rect x="218" y="380" width="14" height="140" fill="#2a2321" />
		<circle cx="225" cy="352" r="82" fill="#24382f" />
		<circle cx="180" cy="392" r="48" fill="#1f3129" />
		<circle cx="268" cy="392" r="44" fill="#1f3129" />
	</g>
	<g data-plant class="plant" opacity="0">
		<rect x="968" y="390" width="14" height="130" fill="#2a2321" />
		<circle cx="975" cy="366" r="76" fill="#24382f" />
		<circle cx="934" cy="400" r="44" fill="#1f3129" />
		<circle cx="1018" cy="402" r="44" fill="#1f3129" />
	</g>
</g>
