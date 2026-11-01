<svelte:options namespace="svg" />

<g data-layer="land">
	<polygon id="drive" points="572,522 628,522 690,1100 510,1100" fill="#4d4840" opacity="0" />
	<!-- yew hedging -->
	<rect data-plant class="plant" x="70" y="474" width="170" height="48" rx="22" fill="#2f4a3c" opacity="0" />
	<rect data-plant class="plant" x="960" y="474" width="170" height="48" rx="22" fill="#2f4a3c" opacity="0" />
	<!-- low box hedging along the frontage -->
	<rect data-plant class="plant" x="256" y="500" width="290" height="24" rx="12" fill="#35533f" opacity="0" />
	<rect data-plant class="plant" x="654" y="500" width="290" height="24" rx="12" fill="#35533f" opacity="0" />
	<!-- box balls either side of the drive -->
	<circle data-plant class="plant" cx="540" cy="540" r="20" fill="#3b5d47" opacity="0" />
	<circle data-plant class="plant" cx="660" cy="540" r="20" fill="#3b5d47" opacity="0" />
</g>

<!-- Foreground hedge, closest to the viewer ------------------------- -->
<g data-layer="fore" fill="#10141a">
	<path
		d="M-500 1200 L-500 690 C-40 660 30 650 90 668 C150 640 220 645 270 670 C330 648 400 640 450 668 C520 645 600 640 650 668 C720 646 800 642 850 670 C920 646 990 642 1040 670 C1100 650 1180 648 1240 680 C1280 690 1300 700 1700 700 L1700 1200 Z"
	/>
</g>
