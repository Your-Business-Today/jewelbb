<svelte:options namespace="svg" />

<g clip-path="url(#wipe-roof)">
	<g fill="#7a4d38">
		<rect x="328" y="142" width="44" height="72" />
		<rect x="828" y="142" width="44" height="72" />
		<rect x="324" y="150" width="52" height="8" fill="#d9cfb8" />
		<rect x="824" y="150" width="52" height="8" fill="#d9cfb8" />
	</g>
	<g fill="#5a4038">
		<rect x="334" y="128" width="10" height="16" rx="2" />
		<rect x="356" y="128" width="10" height="16" rx="2" />
		<rect x="834" y="128" width="10" height="16" rx="2" />
		<rect x="856" y="128" width="10" height="16" rx="2" />
	</g>
</g>
<!-- 03 · Envelope: brick below, hung tile above -->
<g clip-path="url(#wipe-walls)">
	<!-- central block -->
	<rect x="450" y="400" width="300" height="120" fill="url(#brick)" />
	<rect x="450" y="300" width="300" height="100" fill="url(#tilehang)" />
	<!-- left wing -->
	<rect x="250" y="400" width="200" height="120" fill="url(#brick)" />
	<polygon points="250,400 250,330 350,200 450,330 450,400" fill="url(#tilehang)" />
	<!-- right wing -->
	<rect x="750" y="400" width="200" height="120" fill="url(#brick)" />
	<polygon points="750,400 750,330 850,200 950,330 950,400" fill="url(#tilehang)" />
	<!-- plinth -->
	<rect x="250" y="506" width="700" height="14" fill="#6f5a4b" />
	<!-- corner quoins -->
	<g fill="#d9cfb8" opacity="0.9">
		<rect x="250" y="400" width="6" height="106" /><rect x="444" y="400" width="6" height="106" />
		<rect x="750" y="400" width="6" height="106" /><rect x="944" y="400" width="6" height="106" />
	</g>
</g>

<!-- 04 · Roof -->
<g clip-path="url(#wipe-roof)">
	<polygon points="432,302 540,205 660,205 768,302" fill="url(#rooftile)" />
	<path d="M432 302 L540 205 H660 L768 302" fill="none" stroke="#2d2523" stroke-width="2" />
	<path d="M540 205 H660" stroke="#6d5a52" stroke-width="5" stroke-linecap="round" />
	<!-- bargeboards on the gables -->
	<path d="M236 344 L350 194 L464 344" fill="none" stroke="#e9e2d6" stroke-width="6" stroke-linejoin="round" />
	<path d="M736 344 L850 194 L964 344" fill="none" stroke="#e9e2d6" stroke-width="6" stroke-linejoin="round" />
	<!-- fascia + gutter on the central eaves -->
	<rect x="428" y="298" width="344" height="7" fill="#e9e2d6" />
</g>
