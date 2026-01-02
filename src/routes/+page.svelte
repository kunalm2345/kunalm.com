<script lang="ts">
	let isExpanded = $state(false);
	
	function toggleExpand() {
		isExpanded = !isExpanded;
	}
</script>

<h1 class="font-serif text-6xl mb-4">Kunal Mishra</h1>
<div class="text-2xl ">
    Hi! I'm Kunal, an product builder, full stack dev and an electronics major at BITS, Goa.
    <br><br>
    Right now, I split my time between classes, working on research projects and building web products.

</div>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="wave-container" onclick={toggleExpand}>
	<div class="read-more-pill" class:expanded={isExpanded}>
		<span>{isExpanded ? 'THAT\'S ENOUGH' : 'READ MORE ABOUT ME'}</span>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3" class:rotate-180={isExpanded}>
			<path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
		</svg>
	</div>
	<svg class="wave-svg" viewBox="0 0 400 16" preserveAspectRatio="none">
		<defs>
			<linearGradient id="shadowGradUp" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="0%" class="wave-shadow-stop-start" />
				<stop offset="100%" class="wave-shadow-stop-end" />
			</linearGradient>
		</defs>

		<!-- Shadow ABOVE the wave (pointing upwards) -->
		<path
			class="wave-shadow"
			d="
			M0,8
			C7.5,4 15,12 22.5,8
			C30,4 37.5,12 45,8
			C52.5,4 60,12 67.5,8
			C75,4 82.5,12 90,8
			C97.5,4 105,12 112.5,8
			C120,4 127.5,12 135,8
			C142.5,4 150,12 157.5,8
			C165,4 172.5,12 180,8
			C187.5,4 195,12 202.5,8
			C210,4 217.5,12 225,8
			C232.5,4 240,12 247.5,8
			C255,4 262.5,12 270,8
			C277.5,4 285,12 292.5,8
			C300,4 307.5,12 315,8
			C322.5,4 330,12 337.5,8
			C345,4 352.5,12 360,8
			C367.5,4 375,12 382.5,8
			C390,4 397.5,12 400,8
			L400,0
			L0,0
			Z
			"
			fill="url(#shadowGradUp)"
		/>

		<!-- Main wave -->
		<path
			class="wave-stroke"
			d="
			M0,8
			C7.5,4 15,12 22.5,8
			C30,4 37.5,12 45,8
			C52.5,4 60,12 67.5,8
			C75,4 82.5,12 90,8
			C97.5,4 105,12 112.5,8
			C120,4 127.5,12 135,8
			C142.5,4 150,12 157.5,8
			C165,4 172.5,12 180,8
			C187.5,4 195,12 202.5,8
			C210,4 217.5,12 225,8
			C232.5,4 240,12 247.5,8
			C255,4 262.5,12 270,8
			C277.5,4 285,12 292.5,8
			C300,4 307.5,12 315,8
			C322.5,4 330,12 337.5,8
			C345,4 352.5,12 360,8
			C367.5,4 375,12 382.5,8
			C390,4 397.5,12 400,8
			"
			fill="none"
			stroke-width="1.5"
		/>
	</svg>
</div>

<div class="expandable-section" class:expanded={isExpanded}>
	<div class="text-2xl">
		I fell in love with computers and the Internet when I was 10.
		Ever since, I have written a few newsletters, did SEO, designing and consultant-work for startups and built a bunch of saas products that earned me some pocket money.
	</div>
</div>

<style>
	.wave-container {
		position: relative;
		height: 16px;
		margin: 1.5rem 0;
		cursor: pointer;
	}

	.wave-svg {
		width: 100%;
		height: 16px;
		display: block;
	}

	/* Wave colors - light mode */
	.wave-shadow-stop-start {
		stop-color: rgba(0, 0, 0, 0.08);
	}
	.wave-shadow-stop-end {
		stop-color: rgba(0, 0, 0, 0);
	}
	.wave-stroke {
		stroke: rgba(0, 0, 0, 0.12);
	}

	/* Wave colors - dark mode */
	:global(html.dark) .wave-shadow-stop-start {
		stop-color: rgba(148, 163, 184, 0.2);
	}
	:global(html.dark) .wave-shadow-stop-end {
		stop-color: rgba(148, 163, 184, 0);
	}
	:global(html.dark) .wave-stroke {
		stroke: rgba(148, 163, 184, 0.4);
	}

	.read-more-pill {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 20;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.25rem 0.75rem;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 9999px;
		font-size: 0.625rem;
		font-family: ui-monospace, monospace;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #6b7280;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease;
	}

	.read-more-pill:hover {
		color: #e76f51;
		border-color: #e76f51;
	}

	.read-more-pill.expanded {
		color: #e76f51;
		border-color: #e76f51;
	}

	.read-more-pill svg {
		transition: transform 0.2s ease;
	}

	.expandable-section {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.3s ease, opacity 0.3s ease;
		opacity: 0;
	}

	.expandable-section.expanded {
		max-height: 500px;
		opacity: 1;
	}
</style>