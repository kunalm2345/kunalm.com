<!-- One wave period, tiled so curves keep the same shape at any card width.
     Above the line is the torn edge of the top sheet; below it, its shadow falls on the sheet underneath. -->
<svg class="wave-svg" aria-hidden="true">
	<defs>
		<linearGradient id="waveShadow" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stop-color="rgba(0,0,0,0.08)" />
			<stop offset="100%" stop-color="rgba(0,0,0,0)" />
		</linearGradient>
		<pattern id="wavePattern" width="22.5" height="16" patternUnits="userSpaceOnUse">
			<path class="wave-fill" d="M0,0 L22.5,0 L22.5,8 C15,12 7.5,4 0,8 Z" />
			<path d="M0,8 C7.5,4 15,12 22.5,8 L22.5,16 L0,16 Z" fill="url(#waveShadow)" />
			<path d="M0,8 C7.5,4 15,12 22.5,8" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="1.5" />
		</pattern>
	</defs>
	<rect width="100%" height="16" fill="url(#wavePattern)" />
</svg>

<style>
	.wave-svg { width: 100%; height: 16px; display: block; }
	.wave-fill { fill: var(--bg-card); }
</style>
