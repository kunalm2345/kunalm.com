<script lang="ts">
	import '../app.css';
	import me from '$lib/assets/me.jpeg';
	import type { Snippet } from 'svelte';
	import CardStack, { type Tag } from '$lib/components/CardStack.svelte';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	
	interface Props {
		children: Snippet;
	}
	
	let { children }: Props = $props();
	import { page } from '$app/stores';

	// Dark mode state
	let isDarkMode = $state(false);

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
	
	// Reactive current URL
	let current_url = $derived($page.url.pathname);
	let isHomePage = $derived(current_url === '/');

	// Filter state
	let activeFilters = $state<Tag[]>([]);

	const allTags: { name: Tag; color: string }[] = [
		{ name: 'Research', color: '#3d348b' },
		{ name: 'Web Dev', color: '#e76f51' },
		{ name: 'Content', color: '#703d57' },
		{ name: 'Design', color: '#84a59d' },
		{ name: 'Marketing', color: '#f4a261' }
	];

	function toggleFilter(tag: Tag) {
		if (activeFilters.includes(tag)) {
			activeFilters = activeFilters.filter(t => t !== tag);
		} else {
			activeFilters = [...activeFilters, tag];
		}
	}

	function isVisible(tag: Tag): boolean {
		if (activeFilters.length === 0) return true;
		return tag !== undefined && activeFilters.includes(tag);
	}
</script>

<div class="min-h-screen">
	<!-- First Fold: Header on top + content layout -->
	<div class="md:relative md:p-none px-6">
		<div class="max-w-screen-md mx-auto my-24">
			<!-- Header with photo -->
			<header class="mb-12">
				<div class="rotate-6 w-fit">
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
			</header>
			<!-- Main content -->
			<div>
				{@render children()}
			</div>
			<!-- Newsletter signup form + Social icons row -->
			<div class="mt-4 flex flex-col md:flex-row md:items-center gap-6">
				<!-- Newsletter form -->
				<div class="flex-1">
					<p class="text-[#e76f51] font-mono text-sm uppercase tracking-wider mb-3">Subscribe to get my weeknotes newsletter</p>
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
							class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e76f51] focus:border-transparent"
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
				<div class="hidden md:block w-px h-16 bg-gray-300 dark-separator"></div>
				<!-- Social icons -->
				<nav class="list-none">
					<ul class="flex gap-3 items-center">
						<li class="list-none">
							<a href="http://x.com/knlmsh/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="twitter-button">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="size-4">
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
								</svg>
								<span class="font-mono text-sm text-white">@knlmsh</span>
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
	</div>

	<!-- Second Fold: Full-width project grid (only on home page) -->
	{#if isHomePage}
		<section class="second-fold">
			<div class="max-w-screen-xl mx-auto px-6">
				<!-- Filter header with title and buttons -->
				<div class="flex flex-wrap items-center justify-between gap-4 mb-8">
					<h2 class="text-2xl font-serif">Projects & Work Experience</h2>
					<div class="flex flex-wrap gap-2">
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

				<BentoGrid>
					<!-- Aug 2025 — NOW: Indoor Positioning System -->
					{#if isVisible('Research')}
						<CardStack 
							title="Indoor Positioning System"
							content="I'm building a wifi-based hi-precision indoor positioning system as a GPS alternative indoors. Supported by gradCapital and BITS SIRE."
							date="Aug 2025 — NOW"
							size="1x1"
							tag="Research"
							type="work"
							featured={false}
						/>
					{/if}

					<!-- Aug 2025 — NOW: SLM Inference on Edge Devices -->
					{#if isVisible('Research')}
						<CardStack 
							title="SLM Inference on Edge Devices"
							content="A lot of mobile devices come with Neural Processing Units but they're underutilised for Small Language Model (SLM) inference processes. We're building an inference engine that solves this."
							date="Aug 2025 — NOW"
							size="1x1"
							tag="Research"
							type="project"
						/>
					{/if}

					<!-- Apr – Aug 2025: ServiceSetu Higher-Ed Job Portal -->
					{#if isVisible('Web Dev')}
						<CardStack 
							title="ServiceSetu Higher-Ed Job Portal"
							content="Built a jobs and announcements portal for ServiceSetu, a higher ed job portal that a PhD at my college is running with her husband. They have a large following and routinely get 45-60k views a month."
							date="Apr – Aug 2025"
							size="1x1"
							tag="Web Dev"
							type="work"
							featured={true}
							image="servicesetu.png"
							imageClass="bottom-10 -right-6 w-24 h-12 rotate-6"
							href="https://servicesetu.org/?ref=kunal"
							linkText="SERVICESTU.ORG"
						/>
					{/if}

					<!-- Jan — May 2025: CSI Based Activity Recognition -->
					{#if isVisible('Research')}
						<CardStack 
							title="CSI Based Activity Recognition"
							content="A paper I worked on under Prof Sougata Sen where we're trying to train a model on CSI value plots of a WIFi network in a room to recognise what's going on between the sender and receiver."
							linkText="VISIT"
							date="Jan — May 2025"
							size="1x1"
							image="sense.png"
							imageClass="-bottom-4 -right-4 w-16 h-20 rotate-6"
							tag="Research"
							type="project"
						/>
					{/if}

					<!-- Jan – May 2025: Telescope Webportal -->
					{#if isVisible('Web Dev')}
						<CardStack 
							title="Telescope Webportal"
							content="I lead a team building a webportal for an automated telescope setup at SEDS Celestia, our college astronomy club's motorised telescope, so anybody could request a live image from it of the night sky."
							date="Jan – May 2025"
							size="1x1"
							tag="Web Dev"
							type="project"
						/>
					{/if}

					<!-- Aug — Dec 2024: Smart Space at DaSH Lab -->
					{#if isVisible('Research')}
						<CardStack 
							title="Smart Space at DaSH Lab"
							content="A research project I lead under Prof Arnab Paul at DaSH lab, BITS Goa. We're set up raspberry pis and cameras in a classroom to monitor student attention and help improve teaching pedagogy. It's been a wild ride getting hardware, ML, and real classrooms to play nice together."
							date="Aug — Dec 2024"
							size="1x1"
							tag="Research"
							type="project"
							href="https://dashlab.in"
							image="dash.png"
							imageClass="-top-3 -right-3 w-16 h-20 rotate-6"
							linkText="DASHLAB.IN"
						/>
					{/if}

					<!-- Jul – Oct 2024: Full Stack at Buttondown -->
					{#if isVisible('Web Dev')}
						<CardStack 
							title="Full Stack at Buttondown"
							content="I built a few features with Django and Vue.js. I've been generally interested in the email industry. It was a dream working with Justin."
							date="Jul – Oct 2024"
							size="1x2"
							tag="Web Dev"
							type="work"
							featured={true}
							href="https://buttondown.email"
							image="buttondown.png"
							imageClass="bottom-20 -left-5 w-20 h-20 rotate-6"
							linkText="BUTTONDOWN.com"
						/>
					{/if}

					<!-- May – Jun 2024: BioCompute Research -->
					{#if isVisible('Research')}
						<CardStack 
							title="BioCompute Research"
							content="Researched and wrote scripts for BioCompute — Bacterial DNA can store digital data thousands of times more densely than Seagate's current best tech. We're working on a device which would bring this in a form you can plug into your PC."
							date="May – Jun 2024"
							size="1x1"
							tag="Research"
							type="work"
							featured={true}
							href="https://biocomputeinc.com"
							image="biocompute.jpeg"
							imageClass="-top-3 right-16 w-14 h-14 rotate-6"
							linkText="BioComputeInc.com"
						/>
					{/if}

					<!-- Jul – Sep 2023: Dump.ink -->
					{#if isVisible('Web Dev')}
						<CardStack 
							title="Dump.ink (now defunct)"
							content="Dump is a minimal micro-blogging platform I built for Deta Space which lets anybody create and host their own microblogs for free for ever. It is completely decentralised. Deta offered to buy it from me if I turned it into a decentralised social media protocol which I couldn't work on as life got in the way. I may continue this in the future."
							date="Jul – Sep 2023"
							size="1x1"
							tag="Web Dev"
							type="project"
						/>
					{/if}

					<!-- Jul 2023: Marketing at Deta.space -->
					{#if isVisible('Marketing')}
						<CardStack 
							title="Marketing Consulting at Deta.space"
							content="For a brief stint, Deta hired me to help them think new marketing strategies for their personal cloud product. About an year later, they pivoted to building a browser. They recently shut down."
							date="Jul 2023"
							size="1x1"
							image="deta.svg"
							imageClass="-bottom-4 -right-4 w-20 h-20 rotate-6"
							tag="Marketing"
							type="work"
						/>
					{/if}

					<!-- Jan 2022 – Apr 2023: Twift.xyz -->
					{#if isVisible('Web Dev')}
						<CardStack 
							title="Twift.xyz (now defunct)"
							content='Now defunct, Twift helped creators run "reply with an 👋" giveaways on Twitter, handling sending thousands of DMs without being marked as spam. I built and designed the whole web-app and DM-ing engine while Prado (@pradologue) helped me with growing it to hundreds of users. We had to eventually shut down when the Twitter API pricing change made this too expensive to continue ($40k/month to be exact).'
							date="Jan 2022 – Apr 2023"
							size="1x1"
							image="twift.png"
							imageClass="-top-3 -right-3 w-16 h-16 rotate-6"
							tag="Web Dev"
							type="project"
							featured={true}
						/>
					{/if}

					<!-- Jan 2022 — NOW: Socialscri.be (featured, 1x2) -->
					{#if isVisible('Web Dev')}
						<CardStack 
							title="Socialscri.be"
							content="I built a SaaS tool that lets newsletter creators add social sign-up buttons (sign-up with google) to their websites without coding. I designed and built the entire thing up and grew it to a few thousand dollars in profits."
							href="http://socialscri.be/?ref=kunal"
							linkText="VISIT"
							date="Jan 2022 — NOW"
							size="1x2"
							tag="Web Dev"
							image="socialscribe.png"
							imageClass="bottom-20 -right-2 w-20 h-20 rotate-6"
							type="project"
							featured={true}
						/>
					{/if}

					<!-- CTA Card -->
					<CardStack 
						title="Work with me"
						content="I'm always up for working on cool things and also regularly take up freelance projects. It'll be a good fit if<br><br>• involves building (websites, products, newsletters, designs, hardware)<br>• is in an industry I like (newsletters, creators, marketing, internet, consumer tech...)<br>• appreciates high-agency and contrarian-ism.<br>"
						href="https://cal.com/kunalm/30"
						linkText="LET'S TALK"
						size="1x2"
						type="cta"
						variant="cta"
					/>

					<!-- ~May 2021 – May 2022: Content Marketing at HelloMeets -->
					{#if isVisible('Marketing')}
						<CardStack 
							title="Content Marketing at HelloMeets"
							content="Did SEO for HelloMeets — I handled the entire publishing process for the HelloMeets blog while growing it from 600 to over 45k visits a month, in 8 months on a strict budget."
							date="~May 2021 – May 2022"
							size="1x1"
							image="hellomeets.png"
							imageClass="-bottom-4 -right-4 w-16 h-16 rotate-6"
							tag="Marketing"
							type="work"
						/>
					{/if}

					<!-- ~Apr – Aug 2021: Back of my Head -->
					{#if isVisible('Content')}
						<CardStack 
							title="Back of my Head (now defunct)"
							content="I ran an email newsletter rounding up cool stuff I found throughout the week. It went on the get over a thousand subscribers but I couldn't be consistent and decided to drop it. It did lead me to build Socialscribe though."
							date="~Apr – Aug 2021"
							size="1x1"
							tag="Content"
							type="project"
						/>
					{/if}

					<!-- 2021: Design for The Morning Context -->
					{#if isVisible('Design')}
						<CardStack 
							title="Design for The Morning Context"
							content="I designed the infographic template for an newly launched, independent, subscription-based news publication from the cofounders of The Ken. Thanks Ashish K Mishra and Harveen Ahluwalia for this gig."
							date="2021"
							size="1x1"
							tag="Design"
							type="work"
							image="themorningcontext.png"
							imageClass="bottom-3 -right-4 w-20 h-20 rotate-6"
							href="https://themorningcontext.com/?ref=kunalm.com"
							linkText="THEMORNINGCONTEXT.COM"
						/>
					{/if}

					<!-- Dec 2020 – Apr 2021: Right Click -->
					{#if isVisible('Content')}
						<CardStack 
							title="Right Click (now defunct)"
							content="I used to write a blog called Theciva about tech news and stuff like what would happen if Apple bought DuckDuckGo, flaws of India's COVID-times contact tracing app or what Google being carbon neutral meant. I also got a little bit of readers through SEO though most readers came through repost (w canonical urls) on Medium (unfortunately their partner program wasn't in India then) and HackerNoon (where I won me 3 Noonies prizes!). Theciva evolved into Right Click (had to change the name!) which I tried to turn into Morning Brew for tech (also inspired by Filter Coffee). Later, I shut it down and sold the coolest twitter username I have ever owned yet—@rightclick—to rc.xyz, an NFT art platform for the easiest $1000 of my life."
							href="https://rightclick.substack.com/"
							linkText="SUBSTACK"
							date="Dec 2020 – Apr 2021"
							size="1x1"
							image="rightclick.png"
							imageClass="-top-5 -right-2 w-20 h-30 rotate-6"
							tag="Content"
							type="project"
						/>
					{/if}

					<!-- 2018-20: Freelance Content Writing -->
					{#if isVisible('Content')}
						<CardStack 
							title="Freelance Content Writing"
							content="Did Freelance Content Writing — In 2018-19, I wrote a bunch of articles for Mobisium, a blog that later turned into a content platform. They paid me peanuts (between ₹180-300 per 1000-2000 words) but it was my first time working for someone else and I loved it. I even pitched them a video that I did alongside a blog post. I also did a few gigs on Fiverr for their minimum $5."
							date="2018-20"
							size="1x1"
							tag="Content"
							type="work"
						/>
					{/if}
				</BentoGrid>
			</div>
		</section>
	{/if}

	<!-- Footer -->
	<footer class="site-footer">
		<div class="max-w-screen-xl mx-auto px-6">
			<div class="footer-divider"></div>
			<div class="footer-content">
				<span class="footer-text">© 2025 KUNAL MISHRA</span>
				<div class="flex items-center gap-4">
					<button onclick={toggleDarkMode} class="dark-mode-toggle" aria-label="Toggle dark mode">
						{#if isDarkMode}
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
								<path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.591 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
							</svg>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
								<path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />
							</svg>
						{/if}
					</button>
					<a href="https://github.com/kunalm2345/kunalm.com" target="_blank" rel="noopener noreferrer" class="footer-link">
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

	.filter-btn {
		background: white;
		border: 1.5px solid var(--tag-color);
		cursor: pointer;
	}

	.filter-btn:hover {
		opacity: 0.85;
	}

	.filter-btn.active {
		border-color: var(--tag-color);
	}

	.social-icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		background: white;
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
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: black;
		color: white;
		border-radius: 0.5rem;
		transition: background-color 0.2s ease;
	}

	.twitter-button:hover {
		background: #333;
	}

	.dark-mode-toggle {
		color: #9ca3af;
		transition: color 0.2s ease;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
	}

	.dark-mode-toggle:hover {
		color: #e76f51;
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
