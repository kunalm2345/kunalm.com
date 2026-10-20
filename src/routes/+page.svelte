<script lang="ts">
	let isExpanded = $state(false);
	
	function toggleExpand() {
		isExpanded = !isExpanded;
	}
</script>

<h1 class="font-serif text-6xl mb-4">Kunal Mishra</h1>
<div class="text-2xl ">
    Hi! I'm Kunal, a marketing engineer, full stack dev and an electronics major at BITS, Goa.
    <br><br>
    Right now, I split my time between classes, working on research projects and building web products.

</div>

<div id="about-more" class="expandable-section" class:expanded={isExpanded}>
	<div class="text-2xl">
		I fell in love with computers and the Internet when I was 10.
		Ever since, I have written a few newsletters, did SEO, designing and consultant-work for startups and built a bunch of saas products that earned me some pocket money.
	</div>
</div>

<button type="button" class="about-toggle" class:expanded={isExpanded} onclick={toggleExpand} aria-expanded={isExpanded} aria-controls="about-more">
	<span>{isExpanded ? 'THAT\'S ENOUGH' : 'READ MORE ABOUT ME'}</span>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3" class:rotate-180={isExpanded}>
		<path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
	</svg>
</button>

<style>
	.about-toggle {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		margin: 1.25rem 0 1.5rem;
		padding: 0;
		background: none;
		border: none;
		font-size: 0.75rem;
		font-family: ui-monospace, monospace;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: #9ca3af;
		cursor: pointer;
		transition: color 0.2s ease;
	}

	.about-toggle:hover,
	.about-toggle.expanded {
		color: #e76f51;
	}

	.about-toggle svg {
		transition: transform 0.2s ease;
	}

	.expandable-section {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
		opacity: 0;
	}

	.expandable-section.expanded {
		max-height: 500px;
		margin-top: 1.5rem;
		opacity: 1;
	}
</style>
