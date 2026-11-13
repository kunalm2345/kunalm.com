<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import CardStack from '$lib/components/CardStack.svelte';
	import { tagColors, type Tag } from '$lib/tags';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import ManiculeCard from '$lib/components/ManiculeCard.svelte';
	import Wave from '$lib/components/Wave.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
	import { page } from '$app/stores';

	// Reactive current URL
	let current_url = $derived($page.url.pathname);
	let isHomePage = $derived(current_url === '/');

	// Filter state
	let activeFilters = $state<Tag[]>([]);

	const allTags = (['Research', 'Engineering', 'Content', 'Design', 'Marketing'] as Tag[]).map((name) => ({ name, color: tagColors[name] }));

	function toggleFilter(tag: Tag) {
		if (activeFilters.includes(tag)) {
			activeFilters = activeFilters.filter(t => t !== tag);
		} else {
			activeFilters = [...activeFilters, tag];
		}
	}

	// All project/work cards, in display order
	const cards = [
		{
			title: 'Manicule (YC P26)',
			date: 'Jan 2026 — Oct 2026',
			size: '1x2',
			tags: ['Engineering', 'Content', 'Marketing'],
			fullWidth: true,
			type: 'work',
			featured: true,
			image: 'manicule.png',
			imageClass: '-bottom-4 -right-4 w-20 h-20 rotate-6'
		},
		{
			title: 'Full Stack at Buttondown',
			content: "I built a few features with Django and Vue.js. I've been generally interested in the email industry. It was a dream working with Justin.",
			date: 'Jul – Oct 2024',
			size: '1x2',
			tags: ['Engineering'],
			type: 'work',
			featured: true,
			href: 'https://buttondown.email',
			image: 'buttondown.png',
			imageClass: 'bottom-20 -left-5 w-20 h-20 rotate-6',
			linkText: 'BUTTONDOWN.com'
		},
		{
			title: 'BioCompute Research',
			content: "Researched and wrote scripts for BioCompute — Bacterial DNA can store digital data thousands of times more densely than Seagate's current best tech. We're working on a device which would bring this in a form you can plug into your PC.",
			date: 'May – Jun 2024',
			size: '1x1',
			tags: ['Research'],
			type: 'work',
			featured: true,
			href: 'https://biocomputeinc.com',
			image: 'biocompute.jpeg',
			imageClass: '-top-3 right-16 w-14 h-14 rotate-6',
			linkText: 'BioComputeInc.com'
		},
		{
			title: 'Twift.xyz (now defunct)',
			content: 'Now defunct, Twift helped creators run "reply with an 👋" giveaways on Twitter, handling sending thousands of DMs without being marked as spam. I built and designed the whole web-app and DM-ing engine while Prado (@pradologue) helped me with growing it to hundreds of users. We had to eventually shut down when the Twitter API pricing change made this too expensive to continue ($40k/month to be exact).',
			date: 'Jan 2022 – Apr 2023',
			size: '1x1',
			image: 'twift.png',
			imageClass: '-top-3 -right-3 w-16 h-16 rotate-6',
			tags: ['Engineering'],
			type: 'project',
			featured: true
		},
		{
			title: 'Socialscri.be',
			content: 'I built a SaaS tool that lets newsletter creators add social sign-up buttons (sign up with Google) to their websites without coding. I designed and built the entire thing and grew it to a few thousand dollars in profits.',
			href: 'http://socialscri.be/?ref=kunal',
			linkText: 'VISIT',
			date: 'Jan 2022 — NOW',
			size: '1x2',
			tags: ['Engineering'],
			image: 'socialscribe.png',
			imageClass: 'bottom-20 -right-2 w-20 h-20 rotate-6',
			type: 'project',
			featured: true
		},
		{
			title: 'Marketing Consulting at Deta.space',
			content: 'For a brief stint, Deta hired me to help them think up new marketing strategies for their personal cloud product. About a year later, they pivoted to building a browser. They recently shut down.',
			date: 'Jul 2023',
			size: '1x1',
			image: 'deta.svg',
			imageClass: '-bottom-4 -right-4 w-20 h-20 rotate-6',
			tags: ['Marketing'],
			type: 'work'
		},
		{
			title: 'Indoor Positioning System',
			content: "I'm building a wifi-based hi-precision indoor positioning system as a GPS alternative indoors. Supported by gradCapital and BITS SIRE.",
			date: 'Aug 2025 — NOW',
			size: '1x1',
			tags: ['Research'],
			type: 'work',
			featured: false
		},
		{
			title: 'SLM Inference on Edge Devices',
			content: "A lot of mobile devices come with Neural Processing Units but they're underutilised for Small Language Model (SLM) inference processes. We're building an inference engine that solves this.",
			date: 'Aug 2025 — NOW',
			size: '1x1',
			tags: ['Research'],
			type: 'project'
		},
		{
			title: 'CSI Based Activity Recognition',
			content: "A paper I worked on under Prof Sougata Sen where we're trying to train a model on CSI value plots of a WiFi network in a room to recognise what's going on between the sender and receiver.",
			linkText: 'VISIT',
			date: 'Jan — May 2025',
			size: '1x1',
			image: 'sense.png',
			imageClass: '-bottom-4 -right-4 w-16 h-20 rotate-6',
			tags: ['Research'],
			type: 'project'
		},
		{
			title: 'Content Marketing at HelloMeets',
			content: 'Did SEO for HelloMeets — I handled the entire publishing process for the HelloMeets blog while growing it from 600 to over 45k visits a month, in 8 months on a strict budget.',
			date: '~May 2021 – May 2022',
			size: '1x1',
			image: 'hellomeets.png',
			imageClass: '-bottom-4 -right-4 w-16 h-16 rotate-6',
			tags: ['Marketing'],
			type: 'work'
		},
		{
			title: 'Dump.ink (now defunct)',
			content: 'Dump is a minimal micro-blogging platform I built for Deta Space which lets anybody create and host their own microblogs for free, forever. It is completely decentralised. Deta offered to buy it from me if I turned it into a decentralised social media protocol which I couldn\'t work on as life got in the way. I may continue this in the future.',
			date: 'Jul – Sep 2023',
			size: '1x1',
			tags: ['Engineering'],
			type: 'project'
		},
		{
			title: 'Design for The Morning Context',
			content: 'I designed the infographic template for a newly launched, independent, subscription-based news publication from the cofounders of The Ken. Thanks Ashish K Mishra and Harveen Ahluwalia for this gig.',
			date: '2021',
			size: '1x1',
			tags: ['Design'],
			type: 'work',
			image: 'themorningcontext.png',
			imageClass: 'bottom-3 -right-4 w-20 h-20 rotate-6',
			href: 'https://themorningcontext.com/?ref=kunalm.com',
			linkText: 'THEMORNINGCONTEXT.COM'
		},
		{
			title: 'ServiceSetu Higher-Ed Job Portal',
			content: 'Built a jobs and announcements portal for ServiceSetu, a higher ed job portal that a PhD at my college is running with her husband. They have a large following and routinely get 45-60k views a month.',
			date: 'Apr – Aug 2025',
			size: '1x1',
			tags: ['Engineering'],
			type: 'work',
			featured: false,
			image: 'servicesetu.png',
			imageClass: 'bottom-10 -right-6 w-24 h-12 rotate-6',
			href: 'https://servicesetu.org/?ref=kunal',
			linkText: 'SERVICESTU.ORG'
		},
		{
			title: 'Telescope Webportal',
			content: "I lead a team building a webportal for an automated telescope setup at SEDS Celestia, our college astronomy club's motorised telescope, so anybody could request a live image from it of the night sky.",
			date: 'Jan – May 2025',
			size: '1x1',
			tags: ['Engineering'],
			type: 'project'
		},
		{
			title: 'Smart Space at DaSH Lab',
			content: "A research project I lead under Prof Arnab Paul at DaSH lab, BITS Goa. We've set up Raspberry Pis and cameras in a classroom to monitor student attention and help improve teaching pedagogy. It's been a wild ride getting hardware, ML, and real classrooms to play nice together.",
			date: 'Aug — Dec 2024',
			size: '1x1',
			tags: ['Research'],
			type: 'project',
			href: 'https://dashlab.in',
			image: 'dash.png',
			imageClass: '-top-3 -right-3 w-16 h-20 rotate-6',
			linkText: 'DASHLAB.IN'
		},
		{
			title: 'Work with me',
			content: "I'm always up for working on cool things and also regularly take up freelance projects. It'll be a good fit if it<br><br>• involves building (websites, products, newsletters, designs, hardware)<br>• is in an industry I like (newsletters, creators, marketing, internet, consumer tech...)<br>• appreciates high agency and contrarianism.<br>",
			href: 'https://cal.com/kunalm/30',
			linkText: "LET'S TALK",
			size: '1x2',
			type: 'cta',
			variant: 'cta'
		},
		{
			title: 'Back of my Head (now defunct)',
			content: "I ran an email newsletter rounding up cool stuff I found throughout the week. It went on to get over a thousand subscribers but I couldn't be consistent and decided to drop it. It did lead me to build Socialscribe though.",
			date: '~Apr – Aug 2021',
			size: '1x1',
			tags: ['Content'],
			type: 'project'
		},
		{
			title: 'Right Click (now defunct)',
			content: "I used to write a blog called Theciva about tech news and stuff like what would happen if Apple bought DuckDuckGo, flaws of India's COVID-times contact tracing app or what Google being carbon neutral meant. I also got a few readers through SEO, though most came through reposts (w/ canonical URLs) on Medium (unfortunately their partner program wasn't in India then) and HackerNoon (where I won 3 Noonies prizes!). Theciva evolved into Right Click (had to change the name!) which I tried to turn into Morning Brew for tech (also inspired by Filter Coffee). Later, I shut it down and sold the coolest twitter username I have ever owned yet—@rightclick—to rc.xyz, an NFT art platform for the easiest $1000 of my life.",
			href: 'https://rightclick.substack.com/',
			linkText: 'SUBSTACK',
			date: 'Dec 2020 – Apr 2021',
			size: '1x1',
			image: 'rightclick.png',
			imageClass: '-top-5 -right-2 w-20 h-30 rotate-6',
			tags: ['Content'],
			type: 'project'
		},
		{
			title: 'Freelance Content Writing',
			content: 'Did Freelance Content Writing — In 2018-19, I wrote a bunch of articles for Mobisium, a blog that later turned into a content platform. They paid me peanuts (between ₹180-300 per 1000-2000 words) but it was my first time working for someone else and I loved it. I even pitched them a video that I did alongside a blog post. I also did a few gigs on Fiverr for their minimum $5.',
			date: '2018-20',
			size: '1x1',
			tags: ['Content'],
			type: 'work'
		}
	];

	// w = wordmark width, h = icon height (rem); tuned by eye so wordmarks read the same size
	// The first FIRST_ROW logos get their own row; the rest wrap below it
	const FIRST_ROW = 7;
	const clients: { name: string; href: string; logo: string; showName?: boolean; w?: number; h?: number }[] = [
		{ name: 'boat', href: 'https://boat.dev', logo: 'https://boat.dev/icon.svg', showName: true },
		{ name: 'Greptile', href: 'https://www.greptile.com', logo: '/clients/greptile.svg', showName: true },
		{ name: 'Context.dev', href: 'https://context.dev', logo: '/clients/context.svg', showName: true, h: 1.6 },
		{ name: 'AgentMail', href: 'https://agentmail.to', logo: '/clients/agentmail.svg', w: 7.5 },
		{ name: 'Mastra', href: 'https://mastra.ai', logo: '/clients/mastra.svg', w: 7.25 },
		{ name: 'Buttondown', href: 'https://buttondown.com', logo: '/clients/buttondown.png', showName: true },
		{ name: 'xpander.ai', href: 'https://xpander.ai', logo: '/clients/xpander.png', w: 7.75 },
		{ name: 'Manicule', href: 'https://manicule.com', logo: '/manicule.png', showName: true },
		{ name: 'Skyvern', href: 'https://www.skyvern.com', logo: '/clients/skyvern.png', w: 9 },
		{ name: 'Limrun', href: 'https://limrun.com', logo: '/clients/limrun.png', showName: true },
		{ name: 'Surge', href: 'https://surge.app', logo: 'https://surge.app/favicon.svg', showName: true },
		{ name: 'OpenComputer', href: 'https://opencomputer.dev', logo: '/clients/opencomputer.svg', w: 8.5 },
		{ name: 'BioCompute', href: 'https://biocomputeinc.com', logo: '/clients/biocompute.png', showName: true },
		{ name: 'Deta', href: 'https://deta.sh', logo: '/clients/deta.png', showName: true },
		{ name: 'The Morning Context', href: 'https://www.themorningcontext.com', logo: '/clients/tmc.png' }
	];

	let visibleCards = $derived(cards.filter((card) => {
		if (card.variant === 'cta') return true;
		if (activeFilters.length === 0) return true;
		return card.tags?.some((t) => activeFilters.includes(t as Tag)) ?? false;
	}).sort((a, b) => Number(!!b.featured) - Number(!!a.featured)));
</script>

<div class="min-h-screen">
	<div class="px-4 sm:px-6">
		{@render children()}
	</div>

	<!-- Second Fold: Full-width project grid (only on home page) -->
	{#if isHomePage}
		<section class="second-fold">
			<section class="clients" aria-labelledby="clients-title">
				<div class="band-edge"><Wave id="band" fill="var(--bg-primary)" /></div>
				<h2 id="clients-title" class="kicker">I have worked for</h2>
				{#each [clients.slice(0, FIRST_ROW), clients.slice(FIRST_ROW)] as row}
					<ul class="client-logos">
						{#each row as client}
							<li>
								<a href={client.href} target="_blank" rel="noopener noreferrer" aria-label={client.name}>
									<img src={client.logo} style:width={client.w ? `${client.w}rem` : null} style:height={client.h ? `${client.h}rem` : null} alt={client.showName ? '' : client.name} loading="lazy" onerror={(event) => event.currentTarget.setAttribute('hidden', '')} />
									{#if client.showName}<span aria-hidden="true">{client.name}</span>{/if}
								</a>
							</li>
						{/each}
					</ul>
				{/each}
				<div class="band-edge band-edge-bottom"><Wave id="band" fill="var(--bg-primary)" /></div>
			</section>
			<div class="max-w-screen-xl mx-auto px-6">

				<h2 class="kicker">Projects &amp; work experience</h2>
				<!-- Filter buttons -->
				<div class="flex justify-center mb-8">
					<div class="flex flex-wrap justify-center gap-2">
						{#each allTags as { name, color }}
							<button
								type="button"
								onclick={() => toggleFilter(name)}
								class="filter-btn flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-mono font-bold uppercase tracking-wider transition-all"
								class:active={activeFilters.includes(name)}
								style="--tag-color: {color}; border-color: {color}; {activeFilters.includes(name) ? `background-color: ${color}; color: white;` : `color: ${color};`}"
							>
								{#if activeFilters.includes(name)}
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3">
										<path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
									</svg>
								{:else}
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3">
										<path d="M8 1a.75.75 0 0 1 .75.75V6.5h4.75a.75.75 0 0 1 0 1.5H8.75v4.75a.75.75 0 0 1-1.5 0V8H2.5a.75.75 0 0 1 0-1.5h4.75V1.75A.75.75 0 0 1 8 1Z" />
									</svg>
								{/if}
								{name}
							</button>
						{/each}
					</div>
				</div>

				{#each visibleCards.filter((card) => card.fullWidth) as item (item.title)}
					<ManiculeCard title={item.title} date={item.date} tags={item.tags as Tag[]} />
				{/each}

				<BentoGrid items={visibleCards.filter((card) => !card.fullWidth)}>
					{#snippet card(item)}
						<CardStack {...item} />
					{/snippet}
				</BentoGrid>
			</div>
		</section>
	{/if}

	<!-- Footer -->
	<footer class="site-footer">
		<div class="max-w-screen-xl mx-auto px-6">
			<div class="footer-divider"></div>
			<div class="footer-content">
				<span class="footer-text">© 2026 KUNAL MISHRA</span>
				<div class="flex items-center gap-4">
					<a href="https://github.com/kunalm2345/kunalm.com" target="_blank" rel="noopener noreferrer" class="footer-link squiggle-link">
						VIEW SOURCE CODE
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-5">
							<path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	.second-fold {
		width: 100%;
	}

	/* Same 3rem as the hero's bottom margin, so both gaps around the band match */
	.clients { position: relative; margin-bottom: 3rem; padding: 3rem 1.5rem; text-align: center; background: var(--bg-card); }
	/* Wavy edges in the page colour: the top one casts its shadow down onto the band, the bottom one (flipped) casts it up */
	.band-edge { position: absolute; left: 0; right: 0; top: 0; }
	.band-edge-bottom { top: auto; bottom: 0; transform: scaleY(-1); }
	.kicker { margin: 0 0 1rem; text-align: center; color: #e76f51; font: 700 .8125rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; text-transform: uppercase; letter-spacing: .05em; }
	.client-logos { list-style: none; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1rem 2.5rem; margin: 0; padding: 0; }
	.client-logos + .client-logos { margin-top: 1rem; }
	.client-logos a { display: flex; gap: .5rem; align-items: center; height: 2rem; padding: 0 .25rem; border-radius: .25rem; color: var(--text-primary) !important; font-size: 1.125rem; font-weight: 600; }
	.client-logos a:focus-visible { outline: 2px solid var(--accent-color); outline-offset: 4px; }
	.client-logos img { width: auto; height: 2rem; object-fit: contain; filter: grayscale(1); }
	.client-logos img + span { white-space: nowrap; }
	.client-logos img[src$="skyvern.png"] { filter: grayscale(1) brightness(.2); }
	:global(html.dark) .client-logos a { background: #fff; color: #1f2937 !important; }

	.filter-btn {
		background: var(--bg-card);
		border: 1.5px solid var(--tag-color);
		cursor: pointer;
	}

	.filter-btn:hover {
		opacity: 0.85;
	}

	.filter-btn.active {
		border-color: var(--tag-color);
	}

	/* Footer styles */
	.site-footer {
		padding: 2rem 0 3rem;
		margin-top: 1rem;
	}

	.footer-divider {
		height: 1px;
		background: #e5e7eb;
		margin-bottom: 1.5rem;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footer-text {
		font-family: ui-monospace, monospace;
		font-size: 1rem;
		font-weight: 700;
		color: #9ca3af;
	}

	.footer-link {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-family: ui-monospace, monospace;
		font-size: 1rem;
		font-weight: 700;
		color: #9ca3af !important;
	}

	.footer-link:hover {
		color: #e76f51;
	}
</style>
