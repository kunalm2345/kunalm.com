<script lang="ts">
	let { data } = $props();

	// Simple mosaic grid - just vary the column span occasionally
	function getGridClasses(index: number, contentLength: number, hasTitle: boolean) {
		// Create subtle variation: some cards span 2 columns for longer content
		if (!hasTitle && contentLength > 150) {
			return 'md:col-span-2'; // Wide card for long untitled content
		} else if (index % 6 === 0) {
			return 'md:col-span-2'; // Every 6th card is wide
		}
		return ''; // Standard single column
	}
</script>

<h1 class="font-serif text-6xl mb-8">My Notes</h1>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
	{#each data.summaries as { slug, title, displayTitle, date, contentPreview }, index}
		<a href="/notes/{slug}" class="block group {getGridClasses(index, contentPreview?.length || 0, !!title)}">
			<div class="relative h-52 w-full">
				<!-- Card 3 (bottom of stack) -->
				<div class="card-layer card-layer-3"></div>

				<!-- Card 2 (middle of stack) -->
				<div class="card-layer card-layer-2"></div>

				<!-- Card 1 (top of stack - main card) -->
				<div class="card-main">
					<!-- Top color bar (blue to orange on hover) -->
					<div class="card-top-bar"></div>

					<div class="card-content">
						<!-- Text content area -->
						<div class="text-section">
							<p class="{title ? 'font-serif text-xl font-bold transition-colors' : 'font-normal text-base text-[#1c1917]'} group-hover:text-[#e76f51]">
								{displayTitle}
							</p>
						</div>

						<!-- Sine wave SVG separator -->
						<div class="wave-container">
							<svg class="wave-svg" viewBox="0 0 400 12" preserveAspectRatio="none">
								<path 
									d="M0,6 C20,2 40,10 60,6 C80,2 100,10 120,6 C140,2 160,10 180,6 C200,2 220,10 240,6 C260,2 280,10 300,6 C320,2 340,10 360,6 C380,2 400,10 400,6" 
									fill="none" 
									stroke="rgba(0,0,0,0.1)" 
									stroke-width="1.5"
								/>
							</svg>
							<!-- Upward shadow from wave -->
							<div class="wave-shadow"></div>
						</div>

						<!-- Footer section: Date and Link -->
						<div class="footer-section">
							{#if date}
								<p class="text-gray-400 text-xs font-mono uppercase tracking-wider">{date}</p>
							{:else}
								<span></span>
							{/if}
							<span class="flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-gray-400 group-hover:text-[#e76f51] transition-colors">
								READ MORE
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3">
									<path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
								</svg>
							</span>
						</div>
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.card-layer {
		position: absolute;
		inset: 0;
		background: white;
		border-radius: 0.125rem;
		border: 1px solid #e5e7eb;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		transition: all 0.3s ease;
	}

	.card-layer-3 {
		transform: rotate(2.5deg) translateY(2px);
	}

	.card-layer-2 {
		transform: rotate(1.2deg) translateY(1px);
	}

	.group:hover .card-layer-3 {
		transform: rotate(5deg) translateY(4px) translateX(4px);
	}

	.group:hover .card-layer-2 {
		transform: rotate(2.5deg) translateY(2px) translateX(2px);
	}

	.card-main {
		position: absolute;
		inset: 0;
		background: white;
		border-radius: 0.125rem;
		border: 1px solid #e5e7eb;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.group:hover .card-main {
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.card-top-bar {
		height: 6px;
		background: #0091ad;
		transition: background-color 0.3s ease;
		flex-shrink: 0;
	}

	.group:hover .card-top-bar {
		background: #e76f51;
	}

	.card-content {
		padding: 1rem;
		flex: 1;
		display: flex;
		flex-direction: column;
		position: relative;
		min-height: 0;
	}

	.text-section {
		flex: 1;
		overflow: hidden;
		min-height: 0;
	}

	.wave-container {
		position: relative;
		height: 12px;
		margin: 0.5rem -1rem 0 -1rem;
		flex-shrink: 0;
	}

	.wave-svg {
		width: 100%;
		height: 12px;
		display: block;
	}

	.wave-shadow {
		position: absolute;
		top: -20px;
		left: 0;
		right: 0;
		height: 24px;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.06), transparent);
		pointer-events: none;
	}

	.footer-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.5rem;
		flex-shrink: 0;
	}
</style>