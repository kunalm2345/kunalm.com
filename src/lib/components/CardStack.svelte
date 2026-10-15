<script lang="ts">
	import Wave from './Wave.svelte';
	import { tick } from 'svelte';
	
	export type Tag = 'Content' | 'Design' | 'Dev' | 'Research' | 'Marketing' | undefined;
	export type CardType = 'project' | 'work' | 'cta';

	interface Props {
		title?: string;
		content?: string;
		date?: string;
		href?: string;
		linkText?: string;
		image?: string | null;
		imageClass?: string;
		size?: '1x1' | '1x2';
		tags?: Tag[];
		type?: CardType;
		variant?: 'default' | 'cta';
		featured?: boolean;
	}

	let { title, content, date, href, linkText = 'READ MORE', image, imageClass = 'top-0 right-0 -translate-y-1/2 translate-x-1/4 w-20 h-20', size = '1x1', tags = [], type = 'project', variant = 'default', featured = false }: Props = $props();

	// 1x1 = text only, 2:1 aspect ratio (twice as wide as tall)
	// 1x2 = text + image, square aspect ratio
	const is1x2 = size === '1x2';
	const isCta = variant === 'cta';
	
	// Check if link is external
	const isExternal = href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:'));

	// Overflow detection and expansion
	let textSection: HTMLElement;
	let wrapperEl: HTMLElement;
	let isOverflowing = $state(false);
	let isExpanded = $state(false);
	let isAnimating = $state(false);
	
	function measureOverflow() {
		if (textSection) {
			isOverflowing = textSection.scrollHeight > textSection.clientHeight;
		}
	}

	$effect(() => {
		if (textSection && !isExpanded) {
			measureOverflow();
		}
	});

	const TRANSITION_DURATION = 450;
	const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

	async function handleTextClick() {
		if (isCta || isAnimating) return;
		if (!(isOverflowing || isExpanded)) return;

		isAnimating = true;
		const wrapper = wrapperEl;

		if (!isExpanded) {
			// --- EXPANDING ---
			// 1. Capture collapsed height
			const startHeight = wrapper.offsetHeight;
			wrapper.style.height = `${startHeight}px`;

			// 2. Apply expanded state
			isExpanded = true;
			await tick();

			// 3. Measure natural expanded height
			wrapper.style.height = 'auto';
			const endHeight = wrapper.offsetHeight;
			wrapper.style.height = `${startHeight}px`;

			// 4. Force reflow then animate
			wrapper.offsetHeight; // force reflow
			wrapper.style.transition = `height ${TRANSITION_DURATION}ms ${EASING}`;
			wrapper.style.height = `${endHeight}px`;

			const onEnd = () => {
				wrapper.removeEventListener('transitionend', onEnd);
				wrapper.style.height = 'auto';
				wrapper.style.transition = '';
				isAnimating = false;
			};
			wrapper.addEventListener('transitionend', onEnd, { once: true });

			// Safety fallback in case transitionend doesn't fire
			setTimeout(() => {
				if (isAnimating) {
					onEnd();
				}
			}, TRANSITION_DURATION + 50);

		} else {
			// --- COLLAPSING ---
			// 1. Capture expanded height
			const startHeight = wrapper.offsetHeight;
			wrapper.style.height = `${startHeight}px`;

			// 2. Calculate collapsed target height from aspect ratio
			const targetHeight = is1x2 ? wrapper.offsetWidth : wrapper.offsetWidth / 2;

			// 3. Apply collapsed state
			isExpanded = false;
			await tick();

			// 4. Force reflow then animate
			wrapper.offsetHeight; // force reflow
			wrapper.style.transition = `height ${TRANSITION_DURATION}ms ${EASING}`;
			wrapper.style.height = `${targetHeight}px`;

			const onEnd = () => {
				wrapper.removeEventListener('transitionend', onEnd);
				wrapper.style.height = '';
				wrapper.style.transition = '';
				isAnimating = false;
				// Re-measure once the collapsed layout settles so the
				// READ MORE pill comes back after collapsing
				measureOverflow();
			};
			wrapper.addEventListener('transitionend', onEnd, { once: true });

			setTimeout(() => {
				if (isAnimating) {
					onEnd();
				}
			}, TRANSITION_DURATION + 50);
		}
	}

	// Tag colors
	const tagColors: Record<string, string> = {
		'Content': '#703d57',
		'Design': '#84a59d',
		'Dev': '#e76f51',
		'Research': '#3d348b',
		'Marketing': '#f4a261'
	};

	const barColors = tags.length > 0 ? tags.map((t) => tagColors[t!]) : ['#0091ad'];
</script>

<div class="block group" class:card-1x1={!is1x2} class:card-1x2={is1x2} class:card-cta={isCta} class:card-expanded={isExpanded}>
	<div class="card-wrapper" bind:this={wrapperEl}>
		<!-- Card 3 (bottom of stack) -->
		<div class="card-layer card-layer-3" class:cta-layer={isCta}></div>

		<!-- Card 2 (middle of stack) -->
		<div class="card-layer card-layer-2" class:cta-layer={isCta}></div>

		<!-- Card 1 (top of stack - main card) -->
		<div class="card-main" class:cta-main={isCta}>
			<!-- Featured star icon -->
			{#if featured}
				<div class="featured-star">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
						<path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
					</svg>
				</div>
			{/if}
			<!-- Top color bar (hidden for CTA) — one segment per tag -->
			{#if !isCta}
				<div class="card-top-bar">
					{#each barColors as color}
						<div class="card-top-bar-segment" style="background-color: {color}"></div>
					{/each}
				</div>
			{/if}

			<div class="card-content" class:cta-content={isCta}>
				<!-- Text content area -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div 
					class="text-section" 
					class:text-section-overflow={isOverflowing && !isCta && !isExpanded} 
					class:text-section-clickable={(isOverflowing || isExpanded) && !isCta}
					bind:this={textSection}
					onclick={handleTextClick}
				>
					{#if title}
						<p class="font-serif text-xl" class:text-white={isCta}>
							{title}
						</p>
					{/if}
					{#if content}
						<p class="text-xl font-normal mt-1" class:text-white={isCta} class:text-gray-600={!isCta}>
							{@html content}
						</p>
					{/if}
				</div>

				<!-- Sine wave SVG separator with tracking shadow (hidden for CTA) -->
				{#if !isCta}
				<div class="wave-container z-10">
					{#if isOverflowing || isExpanded || isAnimating}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div class="read-more-pill" onclick={handleTextClick} class:read-more-expanded={isExpanded}>
							<span>{isExpanded ? 'SHOW LESS' : 'READ MORE'}</span>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3" class:rotate-180={isExpanded}>
								<path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
							</svg>
						</div>
					{/if}
					<Wave />
				</div>
				{/if}

	

				<!-- Footer section: Date and Link -->
				<div class="footer-section" class:cta-footer={isCta}>
					{#if date}
						<p class="text-xs font-mono uppercase tracking-wider" class:text-white={isCta} class:text-gray-400={!isCta}>{date}</p>
					{:else}
						<span></span>
					{/if}
					{#if href}
						<a 
							{href} 
							target={isExternal ? '_blank' : undefined} 
							rel={isExternal ? 'noopener noreferrer' : undefined}
							class="link-text flex items-center gap-1 text-xs font-mono uppercase tracking-wider transition-colors" 
							class:text-white={isCta}
							class:hover:opacity-80={isCta}
							class:text-gray-400={!isCta}
							class:hover:text-[#e76f51]={!isCta}
						>
							{linkText}
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3">
								<path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
							</svg>
						</a>
					{/if}
				</div>
			</div>
		</div>

		<!-- Image notification (absolute positioned with custom Tailwind classes) -->
		{#if image}
			<div class="image-notification {imageClass}">
				<img src={image} alt={title || 'Card image'} class="w-full h-full object-cover" />
			</div>
		{/if}
	</div>
</div>

<style>
	/* Card sizing: 2 height units = 1 width unit */
	/* 1x1 = text only, aspect ratio 2:1 (twice as wide as tall) */
	/* 1x2 = text + image, aspect ratio 1:1 (square) */
	.card-wrapper {
		position: relative;
		width: 100%;
		overflow: visible;
	}

	.card-1x1 .card-wrapper {
		aspect-ratio: 2 / 1;
	}

	.card-1x2 .card-wrapper {
		aspect-ratio: 1 / 1;
	}

	/* When expanded, wrapper grows to fit content */
	.card-expanded .card-wrapper {
		aspect-ratio: unset !important;
	}

	.card-layer {
		position: absolute;
		inset: 0;
		background: white;
		border-radius: 0.125rem;
		border: 1px solid #e5e7eb;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.card-layer-3 {
        border-radius: 0.5rem;
		transform: rotate(2.5deg) translateY(2px);
	}

	.card-layer-2 {
        border-radius: 0.5rem;
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
		border-radius: 0.5rem;
		border: 1px solid #e5e7eb;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		transition: box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.card-top-bar {
		height: 6px;
		flex-shrink: 0;
		display: flex;
	}

	.card-top-bar-segment {
		flex: 1;
	}

	.card-content {
		padding: 1rem;
		flex: 1;
		display: flex;
		flex-direction: column;
		position: relative;
		min-height: 0;
		overflow: hidden;
	}

	.text-section {
		flex: 1;
		overflow: hidden;
		min-height: 0;
	}

	.text-section-clickable {
		cursor: pointer;
	}

	.text-section-overflow {
		-webkit-mask-image: linear-gradient(to bottom, black calc(100% - 24px), transparent 100%);
		mask-image: linear-gradient(to bottom, black calc(100% - 24px), transparent 100%);
	}

	/* Expanded card — elevated, layers fade, content flows naturally */
	.card-expanded {
		z-index: 10;
	}

	.card-expanded .card-main {
		position: relative;
		height: auto !important;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}

	.card-expanded .card-layer {
		opacity: 0;
		transform: none !important;
		pointer-events: none;
	}

	.card-expanded .text-section {
		flex: none;
		overflow: visible;
		height: auto !important;
		-webkit-mask-image: none;
		mask-image: none;
	}

	.card-expanded .card-content {
		overflow: visible;
		height: auto !important;
	}

	.wave-container {
		position: relative;
		height: 16px;
		margin: 0rem -1rem 0 -1rem;
		flex-shrink: 0;
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
		cursor: pointer;
	}

	.read-more-pill svg {
		transition: transform 0.2s ease;
	}

	.group:hover .read-more-pill {
		color: #e76f51;
		border-color: #e76f51;
	}

	.read-more-expanded {
		color: #e76f51;
		border-color: #e76f51;
	}

	/* Image notification - sticks out from card */
	.image-notification {
		position: absolute;
		z-index: 15;
		overflow: hidden;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.group:hover .image-notification {
		transform: scale(1.05);
	}

	.footer-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.5rem;
		flex-shrink: 0;
	}

	/* CTA variant styles */
	.cta-layer {
		background: #d4532a !important;
	}

	.cta-main {
		background: #e76f51 !important;
	}

	.cta-content {
		padding: 1.5rem;
	}

	.cta-footer {
		padding-top: 1rem;
	}

	/* Featured star */
	.featured-star {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		color: #f59e0b;
		z-index: 10;
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15));
	}
</style>
