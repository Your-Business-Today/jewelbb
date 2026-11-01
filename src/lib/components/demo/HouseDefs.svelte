<svelte:options namespace="svg" />

<defs>
	<linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
		<stop offset="0" stop-color="#12161f" />
		<stop offset="1" stop-color="#2a3040" />
	</linearGradient>
	<radialGradient id="dusk-grad" cx="0.5" cy="0.78" r="0.75">
		<stop offset="0" stop-color="#c09a51" stop-opacity="0.5" />
		<stop offset="0.55" stop-color="#8a5a2c" stop-opacity="0.18" />
		<stop offset="1" stop-color="#1a1e29" stop-opacity="0" />
	</radialGradient>
	<linearGradient id="glass-grad" x1="0" y1="0" x2="1" y2="1">
		<stop offset="0" stop-color="#8fa9c2" />
		<stop offset="0.5" stop-color="#587188" />
		<stop offset="1" stop-color="#3f5468" />
	</linearGradient>
	<pattern id="brick" width="26" height="12" patternUnits="userSpaceOnUse">
		<rect width="26" height="12" fill="#8a5a41" />
		<rect x="0" y="0" width="12" height="5" fill="#96634a" />
		<rect x="14" y="0" width="12" height="5" fill="#8f5d44" />
		<rect x="7" y="6" width="12" height="5" fill="#93604a" />
		<rect x="-6" y="6" width="12" height="5" fill="#865640" />
		<rect x="20" y="6" width="12" height="5" fill="#865640" />
	</pattern>
	<pattern id="tilehang" width="20" height="12" patternUnits="userSpaceOnUse">
		<rect width="20" height="12" fill="#8d5843" />
		<path d="M0 6 a5 5 0 0 0 10 0 a5 5 0 0 0 10 0" fill="none" stroke="#6a3d2c" stroke-width="1.2" />
		<path d="M-5 12 a5 5 0 0 0 10 0 a5 5 0 0 0 10 0 a5 5 0 0 0 10 0" fill="none" stroke="#6a3d2c" stroke-width="1.2" />
	</pattern>
	<pattern id="rooftile" width="18" height="9" patternUnits="userSpaceOnUse">
		<rect width="18" height="9" fill="#4a3d38" />
		<path d="M0 4.5 H18 M9 0 V4.5 M0 4.5 V9 M18 4.5 V9" fill="none" stroke="#3a2f2b" stroke-width="1" />
	</pattern>
	<clipPath id="wipe-walls">
		<rect id="wipe-walls-rect" x="0" y="520" width="1200" height="0" />
	</clipPath>
	<clipPath id="wipe-roof">
		<rect id="wipe-roof-rect" x="0" y="350" width="1200" height="0" />
	</clipPath>
</defs>
