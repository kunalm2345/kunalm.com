<script lang="ts">
	import me from '$lib/assets/me.jpeg';
	import Wave from '$lib/components/Wave.svelte';
	import { tagColors, type Tag } from '$lib/tags';

	let isExpanded = $state(false);
	
	function toggleExpand() {
		isExpanded = !isExpanded;
	}

	const barColors = (['Research', 'Dev', 'Content', 'Design', 'Marketing'] as Tag[]).map((tag) => tagColors[tag]);
</script>

<section class="hero-card" aria-label="About me">
	<div class="stack-layer stack-layer-back" aria-hidden="true"></div>
	<div class="stack-layer stack-layer-front" aria-hidden="true"></div>
	<div class="polaroid rotate-6">
		<img
			src={me}
			alt="me, kunal"
			class="w-28 h-auto border-white border-x-8 border-t-8"
		/>
		<p
			class="text-center handwritten font-bold bg-white px-0 mx-0 py-1 border-x-8 border-white text-sm"
		>
			Kunal Mishra
		</p>
	</div>
	<div class="hero-surface">
		<div class="color-bar" aria-hidden="true">{#each barColors as color}<span style:background={color}></span>{/each}</div>

		<div class="hero-body">
			<h1 class="font-serif text-5xl sm:text-6xl mb-6">Kunal Mishra</h1>
			<div class="text-2xl">
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
		</div>

		<div class="hero-wave">
			<button type="button" class="read-more-pill" class:expanded={isExpanded} onclick={toggleExpand} aria-expanded={isExpanded} aria-controls="about-more">
				<span>{isExpanded ? 'THAT\'S ENOUGH' : 'READ MORE ABOUT ME'}</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3" class:rotate-180={isExpanded}>
					<path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
				</svg>
			</button>
			<Wave />
		</div>

		<div class="hero-footer flex flex-col lg:flex-row lg:items-center gap-6">
			<!-- Newsletter form -->
			<div class="flex-1 min-w-0">
				<p class="text-[#e76f51] font-mono text-xs uppercase tracking-wider mb-3">Subscribe to get my weeknotes newsletter</p>
				<form
					action="https://buttondown.com/api/emails/embed-subscribe/kunal"
					method="post"
					class="flex flex-col sm:flex-row gap-3"
				>
					<input 
						type="email" 
						name="email" 
						id="bd-email" 
						placeholder="Enter your email"
						class="flex-1 min-w-0 px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e76f51] focus:border-transparent"
					/>
					<button 
						type="submit" 
						class="px-6 py-2 bg-[#e76f51] text-white text-sm font-mono uppercase tracking-wider rounded-lg hover:bg-[#d4532a] transition-colors"
					>
						Subscribe
					</button>
				</form>
			</div>
			<!-- Vertical separator -->
			<div class="hidden lg:block w-px h-16 shrink-0 bg-gray-300 dark-separator"></div>
			<!-- Social icons -->
			<nav class="list-none lg:shrink-0">
				<ul class="flex flex-wrap gap-3 items-center">
					<li class="list-none">
						<a href="http://x.com/knlmsh/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="social-icon-btn twitter-button">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
							</svg>
							<span class="font-mono text-sm">@knlmsh</span>
						</a>
					</li>
					<li class="list-none">
						<a href="http://github.com/kunalm2345/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="social-icon-btn">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
						</a>
					</li>
					<li class="list-none">
						<a href="http://instagr.am/knlmsh/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-icon-btn">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
							</svg>
						</a>
					</li>
					<li class="list-none">
						<a href="https://www.linkedin.com/in/kunal-mishra-8238bb187/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-icon-btn">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
							</svg>
						</a>
					</li>
					<li class="list-none">
						<a href="https://cal.com/kunalm/30/" target="_blank" rel="noopener noreferrer" aria-label="Cal.com" class="social-icon-btn">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134 134" fill="currentColor" class="size-5"><path d="M33.84,50.25c4.13,7.45,8.89,14.6,15.07,21.12c6.2,6.56,13.91,12.53,23.89,17.63c0.74,0.36,1.44,0.36,2.07,0.11 c0.95-0.36,1.92-1.15,2.87-2.1c0.74-0.74,1.66-1.92,2.62-3.21c3.84-5.05,8.59-11.32,15.3-8.18c0.15,0.07,0.26,0.15,0.41,0.21 l22.38,12.87c0.07,0.04,0.15,0.11,0.21,0.15c2.95,2.03,4.17,5.16,4.2,8.71c0,3.61-1.33,7.67-3.28,11.1 c-2.58,4.53-6.38,7.53-10.76,9.51c-4.17,1.92-8.81,2.95-13.27,3.61c-7,1.03-13.56,0.37-20.27-1.69 c-6.56-2.03-13.17-5.38-20.39-9.84l-0.53-0.34c-3.31-2.07-6.89-4.28-10.4-6.89C31.12,93.32,18.03,79.31,9.5,63.89 C2.35,50.95-1.55,36.98,0.58,23.67c1.18-7.3,4.31-13.94,9.77-18.32c4.76-3.84,11.17-5.94,19.47-5.2c0.95,0.07,1.8,0.62,2.25,1.44 l14.35,24.26c2.1,2.72,2.36,5.42,1.21,8.12c-0.95,2.21-2.87,4.25-5.49,6.15c-0.77,0.66-1.69,1.33-2.66,2.03 c-3.21,2.33-6.86,5.02-5.61,8.18L33.84,50.25L33.84,50.25L33.84,50.25z"/></svg>
						</a>
					</li>
					<li class="list-none">
						<a href="mailto:kunalm@duck.com" aria-label="Email" class="social-icon-btn">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
								<path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
								<path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
							</svg>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</section>

<style>
	.hero-card {
		position: relative;
		isolation: isolate;
		max-width: 52rem;
		margin: 0 auto 5rem;
	}

	/* The card hangs from the top of the viewport, so it has no top border or top corners */
	.stack-layer,
	.hero-surface {
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-top: none;
		border-radius: 0 0 0.5rem 0.5rem;
	}

	.stack-layer {
		position: absolute;
		inset: 0;
		z-index: -1;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		transform-origin: top center;
	}

	.stack-layer-back {
		transform: rotate(0.6deg) translateY(6px);
	}

	.stack-layer-front {
		transform: rotate(-0.4deg) translateY(3px);
	}

	/* The card gets much taller on narrow screens, so the same angle would fan the bottom out further */
	@media (max-width: 640px) {
		.stack-layer-back {
			transform: rotate(0.3deg) translateY(6px);
		}

		.stack-layer-front {
			transform: rotate(-0.2deg) translateY(3px);
		}
	}

	.hero-surface {
		--pad: clamp(1.5rem, 5vw, 2.5rem);
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.color-bar {
		display: flex;
		height: 6px;
	}

	.color-bar span {
		flex: 1;
	}

	.hero-body {
		padding: calc(var(--pad) + 0.5rem) var(--pad) 0;
	}

	.polaroid {
		position: absolute;
		z-index: 15;
		top: 1.5rem;
		right: 1.25rem;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.polaroid:hover {
		transform: scale(1.05);
	}

	/* Too narrow to sit beside the name, so the text starts below the photo */
	@media (max-width: 767px) {
		.hero-body {
			padding-top: 11.5rem;
		}
	}

	/* Hangs off the right edge; the text keeps clear of it */
	@media (min-width: 768px) {
		.polaroid {
			top: 1.75rem;
			right: -1.25rem;
		}

		.hero-body {
			padding-right: calc(var(--pad) + 5.5rem);
		}
	}

	.hero-wave {
		position: relative;
		height: 16px;
		margin-top: 2rem;
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
		background: var(--bg-card);
		border: 1px solid #e5e7eb;
		border-radius: 9999px;
		font-size: 0.625rem;
		font-family: ui-monospace, monospace;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		white-space: nowrap;
		color: #6b7280;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.read-more-pill:hover,
	.read-more-pill.expanded {
		color: #e76f51;
		border-color: #e76f51;
	}

	.read-more-pill svg {
		transition: transform 0.2s ease;
	}

	.hero-footer {
		padding: 1.25rem var(--pad) var(--pad);
	}

	.social-icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		color: #6b7280;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		transition: all 0.2s ease;
	}

	.social-icon-btn:hover {
		color: #e76f51;
		border-color: #e76f51;
	}

	.twitter-button {
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
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
