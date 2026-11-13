<script lang="ts">
	import me from '$lib/assets/me.jpeg';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import CardStack from '$lib/components/CardStack.svelte';
	import { tagColors, type Tag } from '$lib/tags';

	const barColors = (['Research', 'Engineering', 'Content', 'Design', 'Marketing'] as Tag[]).map((tag) => tagColors[tag]);

	// date = the small mono label in each card's footer. Image boxes keep each cutout's aspect ratio (static/stack/).
	// Placement rule so nothing collides at any column count: top images rise at most ~20px into the 32px gap
	// between cards, bottom images stay inside their card, and nothing sticks out past the right edge.
	const gadgets = [
		{ title: 'MacBook Air M2', date: 'Laptop', image: '/stack/macbook.png', imageClass: '-top-5 right-4 w-24 h-[58px] rotate-6' },
		{ title: 'Dell S2725QC 27" 4K Monitor', date: 'Monitor', image: '/stack/monitor.png', imageClass: 'bottom-2 right-3 w-14 h-[50px] -rotate-3' },
		{ title: 'Keychron K3 V2', date: 'Keyboard', image: '/stack/keychron.png', imageClass: '-top-4 right-5 w-28 h-[43px] rotate-3' },
		{ title: 'Magic Trackpad', date: 'Trackpad', image: '/stack/trackpad.png', imageClass: 'bottom-4 right-3 w-28 h-6 -rotate-6' },
		{ title: 'iPad 10th gen', date: 'Tablet', image: '/stack/ipad.png', imageClass: '-top-5 right-6 w-12 h-[55px] rotate-12' },
		{ title: 'AirPods Pro 3', date: 'Earbuds', image: '/stack/airpods.png', imageClass: 'bottom-2 right-3 w-14 h-[62px] rotate-6' },
		{ title: 'Timex Marlin', date: 'Watch', image: '/stack/timex.png', imageClass: '-top-5 right-8 w-9 h-[67px] -rotate-12' },
		{ title: 'iPhone 16', date: 'Phone', image: '/stack/iphone.png', imageClass: 'bottom-2 right-4 w-11 h-[54px] rotate-6' }
	];
</script>

<svelte:head>
	<title>My Stack · Kunal Mishra</title>
</svelte:head>

<!-- Same sheet, name block and polaroid as the homepage hero (src/routes/+page.svelte), without the tear and footer -->
<section class="hero-card" aria-labelledby="stack-title">
	<span class="polaroid rotate-6"><span class="postcard"><img src={me} alt="me, kunal" /></span></span>
	<div class="hero-surface">
		<div class="color-bar" aria-hidden="true">{#each barColors as color}<span style:background={color}></span>{/each}</div>
		<div class="hero-body">
			<div class="hero-name mb-6">
				<a href="/" class="home-link squiggle-link font-mono text-sm font-semibold uppercase tracking-wider"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true"><path fill-rule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clip-rule="evenodd" /></svg>Kunal Mishra</a>
				<h1 id="stack-title" class="font-serif text-4xl sm:text-5xl md:text-6xl">My Stack</h1>
			</div>
			<div class="text-2xl">The gadgets I use every day.</div>
		</div>
	</div>
</section>

<div class="max-w-screen-xl mx-auto pb-20">
	<BentoGrid items={gadgets}>
		{#snippet card(item)}
			<CardStack {...item} />
		{/snippet}
	</BentoGrid>
</div>

<style>
	.hero-card {
		--pad: clamp(1.25rem, 4vw, 2rem);
		position: relative;
		width: min(100%, max(36rem, (min(100%, 77rem) - 3.5rem) * 7 / 12));
		margin: clamp(1.5rem, 4vw, 2.5rem) auto 4rem;
	}

	.hero-surface {
		background: var(--bg-card);
		border: 1px solid var(--border-color);
		border-radius: 0 0 0.5rem 0.5rem;
		filter: drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.1));
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

	.home-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		margin-bottom: 0.5rem;
		color: #e76f51;
	}

	.polaroid {
		position: absolute;
		z-index: 15;
		top: 1.5rem;
		right: 1.25rem;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
	}

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

	/* Small screens: smaller photo in the corner, the name block beside it (bottom-aligned) so the text starts below it */
	@media (max-width: 767px) {
		.polaroid {
			top: 1.25rem;
			right: 1rem;
		}

		.postcard {
			font-size: 7px;
		}

		.hero-name {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			min-height: 6.5rem;
			padding-right: 7rem;
		}
	}

	@media (min-width: 768px) {
		.polaroid {
			top: 1.75rem;
			right: -1.25rem;
		}

		.hero-body {
			padding-right: calc(var(--pad) + 5.5rem);
		}
	}
</style>
