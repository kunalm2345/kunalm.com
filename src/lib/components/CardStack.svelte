<script lang="ts">
	export type Tag = 'Content' | 'Design' | 'Web Dev' | 'Research' | 'Marketing' | undefined;
	export type CardType = 'project' | 'work' | 'cta';

	interface Props {
		title?: string;
		content?: string;
		date?: string;
		href?: string;
		linkText?: string;
		image?: string | null;
		size?: '1x1' | '1x2';
		tag?: Tag;
		type?: CardType;
		variant?: 'default' | 'cta';
		featured?: boolean;
	}

	let { title, content, date, href, linkText = 'READ MORE', image, size = '1x1', tag, type = 'project', variant = 'default', featured = false }: Props = $props();

	// 1x1 = text only, 2:1 aspect ratio (twice as wide as tall)
	// 1x2 = text + image, square aspect ratio
	const is1x2 = size === '1x2';
	const isCta = variant === 'cta';
	
	// Check if link is external
	const isExternal = href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:'));

	// Overflow detection and expansion
	let textSection: HTMLElement;
	let isOverflowing = $state(false);
	let isExpanded = $state(false);
	
	$effect(() => {
		if (textSection && !isExpanded) {
			isOverflowing = textSection.scrollHeight > textSection.clientHeight;
		}
	});

	function handleTextClick() {
		if (isOverflowing || isExpanded) {
			isExpanded = !isExpanded;
		}
	}

	// Tag colors
	const tagColors: Record<string, string> = {
		'Content': '#703d57',
		'Design': '#84a59d',
		'Web Dev': '#e76f51',
		'Research': '#3d348b',
		'Marketing': '#f4a261'
	};

	const tagColor = tag ? tagColors[tag] : '#0091ad';
</script>

<div class="block group" class:card-1x1={!is1x2} class:card-1x2={is1x2} class:card-cta={isCta} class:card-expanded={isExpanded}>
	<div class="card-wrapper">
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
			<!-- Top color bar (hidden for CTA) -->
			{#if !isCta}
				<div class="card-top-bar" style="background-color: {tagColor}"></div>
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
					{#if isOverflowing || isExpanded}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div class="read-more-pill" onclick={handleTextClick} class:read-more-expanded={isExpanded}>
							<span>{isExpanded ? 'SHOW LESS' : 'READ MORE'}</span>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3" class:rotate-180={isExpanded}>
								<path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
							</svg>
						</div>
					{/if}
					<svg class="wave-svg" viewBox="0 0 400 16" preserveAspectRatio="none">
						<defs>
							<linearGradient id="shadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stop-color="rgba(0,0,0,0.08)" />
							<stop offset="100%" stop-color="rgba(0,0,0,0)" />
							</linearGradient>
						</defs>

						<!-- Shadow BELOW the wave -->
						<path
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
							L400,16
							L0,16
							Z
							"
							fill="url(#shadowGrad)"
						/>

						<!-- Main wave -->
						<path
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
							stroke="rgba(0,0,0,0.12)"
							stroke-width="1.5"
						/>
					</svg>
				</div>
				{/if}

				<!-- Image area (only for 1x2) -->
				{#if is1x2 && image}
					<div class="image-section">
						<img src={image} alt={title} class="w-full h-full object-cover" />
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
	</div>
</div>

<style>
	/* Card sizing: 2 height units = 1 width unit */
	/* 1x1 = text only, aspect ratio 2:1 (twice as wide as tall) */
	/* 1x2 = text + image, aspect ratio 1:1 (square) */
	.card-1x1 {
		grid-column: span 1;
		grid-row: span 1;
	}

	.card-1x2 {
		grid-column: span 1;
		grid-row: span 2;
	}

	.card-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.card-1x1 .card-wrapper {
		aspect-ratio: 2 / 1;
	}

	.card-1x2 .card-wrapper {
		aspect-ratio: 1 / 1;
	}

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
		transition: all 0.3s ease;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.card-top-bar {
		height: 6px;
		flex-shrink: 0;
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

	/* Expanded card state - removes aspect ratio constraint */
	.card-expanded .card-wrapper {
		aspect-ratio: unset !important;
		min-height: auto;
	}

	.card-expanded .card-main {
		position: relative;
		height: auto !important;
	}

	.card-expanded .card-layer {
		display: none;
	}

	.card-expanded .text-section {
		flex: none;
		overflow: visible;
		height: auto !important;
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

	.wave-svg {
		width: 100%;
		height: 16px;
		display: block;
	}

	.image-section {
		flex: 1;
		margin: 0 -1rem;
		overflow: hidden;
		min-height: 0;
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
