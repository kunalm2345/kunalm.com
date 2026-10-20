<script lang="ts">
	import Wave from './Wave.svelte';
	import { tagColors, type Tag } from '$lib/tags';

	interface Props {
		title: string;
		date?: string;
		tags?: Tag[];
	}
	let { title, date, tags = [] }: Props = $props();

	// w = wordmark width, h = icon height (rem); tuned by eye so wordmarks read the same size
	const clients: { name: string; href: string; logo: string; showName?: boolean; w?: number; h?: number }[] = [
		{ name: 'Greptile', href: 'https://www.greptile.com', logo: '/clients/greptile.svg', showName: true },
		{ name: 'xpander.ai', href: 'https://xpander.ai', logo: '/clients/xpander.png', w: 7.75 },
		{ name: 'Skyvern', href: 'https://www.skyvern.com', logo: '/clients/skyvern.png', w: 9 },
		{ name: 'Context.dev', href: 'https://context.dev', logo: '/clients/context.svg', showName: true, h: 1.6 },
		{ name: 'Limrun', href: 'https://limrun.com', logo: '/clients/limrun.png', showName: true },
		{ name: 'Surge', href: 'https://surge.app', logo: 'https://surge.app/favicon.svg', showName: true },
		{ name: 'AgentMail', href: 'https://agentmail.to', logo: '/clients/agentmail.svg', w: 7.5 },
		{ name: 'Mastra', href: 'https://mastra.ai', logo: '/clients/mastra.svg', w: 7.25 },
		{ name: 'OpenComputer', href: 'https://opencomputer.dev', logo: '/clients/opencomputer.svg', w: 8.5 },
		{ name: 'boat', href: 'https://boat.dev', logo: 'https://boat.dev/icon.svg', showName: true }
	];
</script>

<article class="manicule-card" aria-labelledby="manicule-title">
	<div class="card-surface">
		<div class="color-bar" aria-hidden="true">{#each tags as tag}<span style:background={tagColors[tag]}></span>{/each}</div>
		<div class="card-body">
			<header>
				<div>
					<p class="text-xs font-mono uppercase tracking-wider text-gray-400">{date}</p>
					<h3 id="manicule-title">{title}</h3>
				</div>
				<img class="manicule-mark" src="/manicule.png" alt="" width="68" height="68" />
			</header>

			<div class="work-copy">
				<p class="intro">As a founding engineer, I had a lot of fun working with a small, young team on everything from client work, to marketing &amp; sales and building the internal agents to do all of it at scale.</p>

				<div class="work-columns">
					<section>
						<h4>Client work</h4>
						<ul>
							<li><strong>Docs site revamps.</strong> I have written the technical docs for some of the biggest AI DevTool companies, including Greptile, Mastra and AgentMail. For coding agents, docs are the UI. Good docs mean your customer's agents understand your product better.</li>
							<li><strong>Benchmarks.</strong> I ran several large-scale benchmarks showing how a client's product fares against the competition. Benchmark reports are excellent for Google AI search overviews btw!</li>
							<li><strong>Cookbooks.</strong> I built several working demos showcasing a use case for our clients' products and wrote about how they work and can be customised. For example, I wrote Mastra's cookbook on how to build Software Factories!</li>
							<li><strong>SEO/AEO content.</strong> This includes tracking your brand rankings across Google search, AI chat apps and coding agents. Then finding new opportunities for keywords and search questions that you can rank for. And finally writing new pieces of content and refreshing old ones until you start getting organic traffic.</li>
						</ul>
					</section>

					<section>
						<h4>Sales and Outreach</h4>
						<ul>
							<li><strong>Outbound cold outreach.</strong> I like quality &gt; quantity. I find potential clients by being chronically online on X, and then talk to them to see if they need us.</li>
							<li><strong>Audits &amp; proposals.</strong> I play around with their product, read their docs, and understand their positioning. This helps me concretely list out what they should be doing (to get discovered and used by coding agents!)</li>
							<li><strong>Closing.</strong> The DMs and audits I send over get roughly a 40% reply rate (at around 10 emails/DMs a week). I then also take the sales call and do the client onboarding.</li>
						</ul>
					</section>

					<section>
						<h4>Engineering</h4>
						<ul>
							<li><strong>Internal agents.</strong> I helped build SKILLs, prompts and agents for our internal client service app. We use it to power all content operations across over half a dozen clients at a time with a client work team of just 4.</li>
							<li><strong>Writing platform.</strong> I also built a writing platform to collaborate with coding agents on writing technical content drafts. This fast-tracks human reviews for agents' writing and makes sure it follows SEO and readability best practices while not sounding like AI slop.</li>
						</ul>
					</section>
				</div>
			</div>
		</div>
		<div class="tear"><Wave /></div>
	</div>
	<!-- Second sheet: the client list shows through where the top sheet is torn -->
	<div class="stack-layer stack-layer-front">
		<footer class="clients-section">
			<div class="clients-head">
				<h4 class="label">CLIENTS I WORKED WITH</h4>
				<a class="label squiggle-link" href="https://manicule.com" target="_blank" rel="noopener noreferrer">
					MANICULE.COM
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true"><path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" /></svg>
				</a>
			</div>
			<ul class="client-logos">
				{#each clients as client}
					<li>
						<a href={client.href} target="_blank" rel="noopener noreferrer" aria-label={client.name}>
							{#if client.logo}
								<img src={client.logo} style:width={client.w ? `${client.w}rem` : null} style:height={client.h ? `${client.h}rem` : null} alt={client.showName ? '' : client.name} loading="lazy" onerror={(event) => event.currentTarget.setAttribute('hidden', '')} />
								{#if client.showName}<span aria-hidden="true">{client.name}</span>{/if}
							{:else}
								<span>{client.name}</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</footer>
	</div>
	<div class="stack-layer stack-layer-back" aria-hidden="true"></div>
</article>

<style>
	.manicule-card { --pad: clamp(1.25rem, 3vw, 2.25rem); position: relative; isolation: isolate; display: grid; grid-template-rows: auto auto; margin-bottom: 2.5rem; }
	/* The top sheet fills row 1; the second sheet spans both rows and its subgrid puts the client list in row 2, below the tear */
	.card-surface, .stack-layer { grid-column: 1; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: .5rem; }
	.card-surface { grid-row: 1; position: relative; z-index: 2; border-bottom: none; border-radius: .5rem .5rem 0 0; filter: drop-shadow(0 1px 1.5px rgb(0 0 0 / .1)); }
	.stack-layer { grid-row: 1 / 3; }
	.stack-layer-front { z-index: 1; display: grid; grid-template-rows: subgrid; transform: rotate(-.35deg) translateY(3px); }
	.stack-layer-back { z-index: 0; transform: rotate(.65deg) translateY(5px); }
	.color-bar { display: flex; height: 6px; overflow: hidden; border-radius: calc(.5rem - 1px) calc(.5rem - 1px) 0 0; }
	.color-bar span { flex: 1; }
	.card-body { padding: var(--pad); }
	.tear { position: absolute; left: -1px; right: -1px; bottom: -8px; height: 16px; z-index: 1; }
	header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
	.label { margin: 0; color: #9ca3af; font: 700 .8125rem/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; text-transform: uppercase; letter-spacing: .05em; }
	h3 { margin: .4rem 0 0; color: var(--text-primary); font: 1.5rem Georgia, serif; }
	.manicule-mark { flex-shrink: 0; border-radius: .5rem; transform: rotate(6deg); }
	:global(html.dark) .manicule-mark { background: #fff; padding: .35rem; }
	.work-copy { margin-top: 1.25rem; }
	.work-copy .intro { max-width: 70ch; }
	.work-columns { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; margin-top: 1.5rem; }
	.work-copy p, .work-copy li { margin: 0; color: var(--text-secondary); font-size: 1rem; line-height: 1.6; }
	.work-copy strong { color: var(--text-primary); font-weight: 600; }
	.work-copy h4 { margin: 0 0 .5rem; color: #9ca3af; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .875rem; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }
	.work-copy ul { margin: 0; padding-left: 1.25rem; list-style: disc; }
	.work-copy li + li { margin-top: .5rem; }
	.clients-section { grid-row: 2; padding: calc(1.25rem + 8px) var(--pad) var(--pad); }
	.clients-head { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
	a.label { display: flex; align-items: center; gap: .25rem; }
	.client-logos { list-style: none; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1.25rem 2rem; margin: 1.25rem 0 0; padding: 0; }
	.client-logos li { margin: 0; min-width: 0; }
	.client-logos a { display: flex; gap: .5rem; justify-content: center; align-items: center; height: 2.75rem; padding: .25rem; border-radius: .25rem; color: var(--text-primary) !important; font-size: 1.125rem; font-weight: 600; }
	.client-logos a:focus-visible { outline: 2px solid var(--accent-color); outline-offset: 4px; }
	.client-logos img { width: auto; max-width: 100%; height: 2rem; object-fit: contain; filter: grayscale(1); }
	.client-logos img + span { white-space: nowrap; }
	.client-logos img[src$="skyvern.png"] { filter: grayscale(1) brightness(.2); }
	:global(html.dark) .client-logos a { background: #fff; color: #1f2937 !important; }
	@media (max-width: 768px) {
		.work-columns { grid-template-columns: 1fr; }
		.client-logos { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
	}
</style>
