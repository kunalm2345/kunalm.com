<script lang="ts">
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import me from '$lib/assets/me.jpeg';
	import Wave from '$lib/components/Wave.svelte';
	import { tagColors, type Tag } from '$lib/tags';

	let isExpanded = $state(false);
	
	function toggleExpand() {
		isExpanded = !isExpanded;
	}

	const barColors = (['Research', 'Dev', 'Content', 'Design', 'Marketing'] as Tag[]).map((tag) => tagColors[tag]);

	let thumbEl: HTMLButtonElement;
	let closeEl: HTMLButtonElement | undefined = $state();
	let photoOpen = $state(false);
	let thumbHidden = $state(false);
	let usedKeyboard = false;

	// A click with detail 0 came from Enter/Space, not a pointer
	async function openPhoto(event: MouseEvent) {
		usedKeyboard = event.detail === 0;
		photoOpen = true;
		thumbHidden = true;
		await tick();
		closeEl?.focus({ preventScroll: true });
	}

	function closePhoto(viaKeyboard: boolean) {
		usedKeyboard ||= viaKeyboard;
		photoOpen = false;
	}

	// Only keyboard users get focus handed back, so pointer users don't see a focus ring on the thumbnail
	async function restoreThumb() {
		thumbHidden = false;
		if (!usedKeyboard) return;
		await tick();
		thumbEl.focus({ preventScroll: true });
	}

	// Flies the enlarged postcard to and from wherever the thumbnail sits, matching its tilt and size
	function zoomFromThumb(node: HTMLElement) {
		const from = thumbEl.getBoundingClientRect();
		const to = node.getBoundingClientRect();
		const hovered = thumbEl.matches(':hover');
		const dx = from.left + from.width / 2 - (to.left + to.width / 2);
		const dy = from.top + from.height / 2 - (to.top + to.height / 2);
		const startScale = ((hovered ? 1.05 : 1) * thumbEl.offsetWidth) / node.offsetWidth;
		const startRotation = hovered ? 0 : 6;
		// Shadow offsets are scaled with the card, so start from the thumbnail's shadow divided by the start scale
		const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
		return {
			duration: 450,
			easing: cubicOut,
			css: (t: number, u: number) =>
				`transform: translate(${dx * u}px, ${dy * u}px) rotate(${startRotation * u}deg) scale(${lerp(startScale, 1, t)});` +
				`box-shadow: 0 ${lerp(1 / startScale, 24, t)}px ${lerp(4 / startScale, 60, t)}px rgba(0, 0, 0, ${lerp(0.15, 0.35, t)});`
		};
	}

	$effect(() => {
		if (!photoOpen) return;
		const html = document.documentElement;
		const scrollbar = window.innerWidth - html.clientWidth;
		html.style.overflow = 'hidden';
		html.style.paddingRight = scrollbar ? `${scrollbar}px` : '';
		return () => {
			html.style.overflow = '';
			html.style.paddingRight = '';
		};
	});
</script>

<svelte:window onkeydown={(event) => photoOpen && event.key === 'Escape' && closePhoto(true)} />

<section class="hero-card" aria-label="About me">
	<button type="button" class="polaroid rotate-6" class:thumb-hidden={thumbHidden} bind:this={thumbEl} onclick={openPhoto} aria-label="Enlarge photo">
		<span class="postcard"><img src={me} alt="me, kunal" /></span>
	</button>
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

		<div class="tear">
			<button type="button" class="read-more-pill" class:expanded={isExpanded} onclick={toggleExpand} aria-expanded={isExpanded} aria-controls="about-more">
				<span>{isExpanded ? 'THAT\'S ENOUGH' : 'READ MORE ABOUT ME'}</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3" class:rotate-180={isExpanded}>
					<path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
				</svg>
			</button>
			<Wave />
		</div>
	</div>

	<!-- Second sheet: the newsletter and social links show through where the top sheet is torn -->
	<div class="stack-layer stack-layer-front">
		<div class="hero-footer flex flex-col gap-6">
			<!-- Newsletter form -->
			<div class="flex-1 min-w-0">
				<p class="text-[#e76f51] font-mono text-sm font-semibold uppercase tracking-wider mb-3">Subscribe to get my weeknotes newsletter</p>
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
			<!-- Social icons -->
			<nav class="list-none">
				<ul class="flex flex-wrap gap-4 items-center">
					<li class="list-none">
						<a href="http://x.com/knlmsh/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="social-icon-btn">
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
						<a href="https://cal.com/kunalm/30/" target="_blank" rel="noopener noreferrer" aria-label="Cal.com" class="social-icon-btn social-cal">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 9.4 24 5.2" fill="currentColor" aria-hidden="true"><path d="M2.408 14.488C1.035 14.488 0 13.4 0 12.058c0-1.346.982-2.443 2.408-2.443.758 0 1.282.233 1.691.765l-.66.55a1.343 1.343 0 0 0-1.03-.442c-.93 0-1.44.711-1.44 1.57 0 .86.559 1.557 1.44 1.557.413 0 .765-.147 1.043-.443l.651.573c-.391.51-.929.743-1.695.743zM6.948 10.913h.89v3.49h-.89v-.51c-.185.362-.493.604-1.083.604-.943 0-1.695-.82-1.695-1.826 0-1.007.752-1.825 1.695-1.825.585 0 .898.241 1.083.604zm.026 1.758c0-.546-.374-.998-.964-.998-.568 0-.938.457-.938.998 0 .528.37.998.938.998.586 0 .964-.456.964-.998zM8.467 9.503h.89v4.895h-.89zM9.752 13.937a.53.53 0 0 1 .542-.528c.313 0 .533.242.533.528a.527.527 0 0 1-.533.537.534.534 0 0 1-.542-.537zM14.23 13.839c-.33.403-.832.658-1.426.658a1.806 1.806 0 0 1-1.84-1.826c0-1.007.778-1.825 1.84-1.825.572 0 1.07.241 1.4.622l-.687.577c-.172-.215-.396-.376-.713-.376-.568 0-.938.456-.938.998 0 .541.37.997.938.997.343 0 .58-.179.757-.42zM14.305 12.671c0-1.007.78-1.825 1.84-1.825 1.061 0 1.84.818 1.84 1.825 0 1.007-.779 1.826-1.84 1.826-1.06-.005-1.84-.82-1.84-1.826zm2.778 0c0-.546-.37-.998-.938-.998-.568-.004-.937.452-.937.998 0 .542.37.998.937.998.568 0 .938-.456.938-.998zM24 12.269v2.13h-.89v-1.911c0-.604-.281-.864-.704-.864-.396 0-.678.197-.678.864v1.91h-.89v-1.91c0-.604-.285-.864-.704-.864-.396 0-.744.197-.744.864v1.91h-.89v-3.49h.89v.484c.185-.376.52-.564 1.035-.564.489 0 .898.241 1.123.649.224-.417.554-.65 1.153-.65.731.005 1.299.56 1.299 1.442z"/></svg>
						</a>
					</li>
					<li class="list-none ml-auto">
						<a href="mailto:kunalm@duck.com" class="email-link link-text squiggle-link flex items-center gap-1 text-sm font-mono uppercase tracking-wider">
							kunalm@duck.com
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3.5" aria-hidden="true">
								<path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
							</svg>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
	<div class="stack-layer stack-layer-back" aria-hidden="true"></div>
</section>

{#if photoOpen}
	<div class="photo-dialog" role="dialog" aria-modal="true" aria-label="Photo of Kunal">
		<button type="button" class="photo-backdrop" aria-label="Close photo" bind:this={closeEl} onclick={(event) => closePhoto(event.detail === 0)} transition:fade={{ duration: 300 }}></button>
		<div class="postcard postcard-large" transition:zoomFromThumb onoutroend={restoreThumb}>
			<img src={me} alt="me, kunal" />
		</div>
	</div>
{/if}

<style>
	/* About 1.75x a project card in the 3-column grid (77rem content, two 1.75rem gaps), but never narrower than 36rem */
	.hero-card {
		--pad: clamp(1.25rem, 4vw, 2rem);
		position: relative;
		isolation: isolate;
		display: grid;
		grid-template-rows: auto auto;
		width: min(100%, max(36rem, (min(100%, 77rem) - 3.5rem) * 7 / 12));
		margin: clamp(1.5rem, 4vw, 2.5rem) auto 5rem;
	}

	.stack-layer,
	.hero-surface {
		grid-column: 1;
		background: var(--bg-card);
		border: 1px solid var(--border-color);
	}

	.hero-surface {
		grid-row: 1;
		position: relative;
		z-index: 2;
		border-bottom: none;
		filter: drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.1));
	}

	/* The lower sheets span the whole card; the front one's subgrid puts the footer in row 2, below the tear */
	.stack-layer {
		grid-row: 1 / 3;
		border-radius: 0 0 0.5rem 0.5rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		transform-origin: top center;
	}

	.stack-layer-back {
		z-index: 0;
		transform: rotate(0.6deg) translateY(6px);
	}

	.stack-layer-front {
		z-index: 1;
		display: grid;
		grid-template-rows: subgrid;
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

	.color-bar {
		display: flex;
		height: 6px;
	}

	.color-bar span {
		flex: 1;
	}

	.hero-body {
		padding: calc(var(--pad) + 0.5rem) var(--pad) 2rem;
	}

	.polaroid {
		position: absolute;
		z-index: 15;
		top: 1.5rem;
		right: 1.25rem;
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-in;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.polaroid:hover {
		transform: scale(1.05);
	}

	.polaroid:focus-visible {
		outline: 2px solid var(--accent-color);
		outline-offset: 4px;
	}

	.polaroid.thumb-hidden {
		visibility: hidden;
	}

	/* Sized in em so the enlarged copy is the same postcard, scaled: 8px frame, 96px photo, 28px blank strip */
	.postcard {
		display: block;
		font-size: 8px;
		padding: 1em 1em 3.5em;
		background: #fff;
	}

	.postcard img {
		display: block;
		width: 12em;
		height: 12em;
		object-fit: cover;
	}

	.photo-dialog {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: grid;
		place-items: center;
	}

	.photo-backdrop {
		position: absolute;
		inset: 0;
		border: 0;
		padding: 0;
		background: rgba(0, 0, 0, 0.6);
		cursor: zoom-out;
	}

	.photo-backdrop:focus {
		outline: none;
	}

	/* 14em wide by 16.5em tall, so it fits within 85% of the width and roughly 85% of the height */
	.postcard-large {
		position: relative;
		font-size: calc(min(85vw, 30rem, 72vh) / 14);
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
		pointer-events: none;
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

	/* Straddles the top sheet's bottom edge: the wave line is the tear, its shadow falls on the sheet below.
	   Kept inside the side borders so its fill doesn't paint over them. */
	.tear {
		position: absolute;
		left: 0;
		right: 0;
		bottom: -8px;
		height: 16px;
		z-index: 10;
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
		grid-row: 2;
		padding: calc(1.25rem + 8px) var(--pad) var(--pad);
	}

	/* Borderless, and as tall as the 14px email's line box; !important beats the global teal link color */
	.social-icon-btn {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		height: 1.25rem;
		color: #6b7280 !important;
		transition: color 0.2s ease;
	}

	.social-icon-btn:hover {
		color: #e76f51 !important;
	}

	.social-icon-btn svg {
		width: 14px;
		height: 14px;
	}

	/* The Cal.com logo is a wordmark, so it keeps its own aspect ratio */
	.social-cal svg {
		width: auto;
	}

	/* Same look as the card footer links, but semibold instead of the global bold */
	.email-link {
		font-weight: 600 !important;
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
