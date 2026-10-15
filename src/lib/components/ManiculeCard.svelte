<script lang="ts">
	interface Props {
		title: string;
		date?: string;
	}
	let { title, date }: Props = $props();

	// w = wordmark width, h = icon height (rem); tuned by eye so wordmarks read the same size
	const clients: { name: string; href: string; logo: string; showName?: boolean; w?: number; h?: number }[] = [
		{ name: 'Greptile', href: 'https://www.greptile.com', logo: '/clients/greptile.svg', showName: true },
		{ name: 'xpander.ai', href: 'https://xpander.ai', logo: '/clients/xpander.png', w: 6.75 },
		{ name: 'Skyvern', href: 'https://www.skyvern.com', logo: '/clients/skyvern.png', w: 7.75 },
		{ name: 'Context.dev', href: 'https://context.dev', logo: '/clients/context.svg', showName: true, h: 1.4 },
		{ name: 'Limrun', href: 'https://limrun.com', logo: '/clients/limrun.png', showName: true },
		{ name: 'Surge', href: 'https://surge.app', logo: 'https://surge.app/favicon.svg', showName: true },
		{ name: 'AgentMail', href: 'https://agentmail.to', logo: '/clients/agentmail.svg', w: 6.5 },
		{ name: 'Mastra', href: 'https://mastra.ai', logo: '/clients/mastra.svg', w: 6.25 },
		{ name: 'OpenComputer', href: 'https://opencomputer.dev', logo: '/clients/opencomputer.svg', w: 7.5 },
		{ name: 'boat', href: 'https://boat.dev', logo: 'https://boat.dev/icon.svg', showName: true }
	];
</script>

<article class="manicule-card" aria-labelledby="manicule-title">
	<div class="stack-layer stack-layer-back" aria-hidden="true"></div>
	<div class="stack-layer stack-layer-front" aria-hidden="true"></div>
	<div class="card-surface">
		<div class="color-bar" aria-hidden="true"><span></span><span></span><span></span></div>
		<div class="card-body">
			<header>
				<div>
					<p class="eyebrow">{date}</p>
					<h3 id="manicule-title">{title}</h3>
				</div>
				<img class="manicule-mark" src="/manicule.png" alt="" width="56" height="56" />
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
							<li>I helped build SKILLs, prompts and agents for our internal client service app. We use it to power all content operations across over half a dozen clients at a time with a client work team of just 4.</li>
							<li>I also built a writing platform to collaborate with coding agents on writing technical content drafts. This fast-tracks human reviews for agents' writing and makes sure it follows SEO and readability best practices while not sounding like AI slop.</li>
						</ul>
					</section>
				</div>
			</div>

			<footer class="clients-section">
				<h4 class="eyebrow">CLIENTS I WORKED WITH</h4>
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
	</div>
</article>

<style>
	.manicule-card { position: relative; isolation: isolate; margin-bottom: 2.5rem; }
	.stack-layer { position: absolute; inset: 0; border: 1px solid var(--border-color); border-radius: .5rem; background: var(--bg-secondary); z-index: -1; }
	.stack-layer-back { transform: rotate(.65deg) translateY(5px); }
	.stack-layer-front { transform: rotate(-.35deg) translateY(3px); }
	.card-surface { overflow: hidden; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: .5rem; box-shadow: 0 1px 3px rgb(0 0 0 / .1); }
	.color-bar { display: flex; height: 6px; }
	.color-bar span { flex: 1; background: #e76f51; }
	.color-bar span:nth-child(2) { background: #703d57; }
	.color-bar span:nth-child(3) { background: #f4a261; }
	.card-body { padding: clamp(1.25rem, 3vw, 2.25rem); }
	header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
	.eyebrow { margin: 0; color: var(--text-secondary); font-size: .75rem; font-weight: 400; line-height: 1.5; }
	h3 { margin: .4rem 0 0; color: var(--text-primary); font: 1.5rem Georgia, serif; }
	.manicule-mark { flex-shrink: 0; border-radius: .5rem; transform: rotate(6deg); }
	:global(html.dark) .manicule-mark { background: #fff; padding: .35rem; }
	.work-copy { margin-top: 1.25rem; }
	.work-copy .intro { max-width: 70ch; }
	.work-columns { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; margin-top: 1.5rem; }
	.work-copy p, .work-copy li { margin: 0; color: var(--text-secondary); font-size: 1rem; line-height: 1.6; }
	.work-copy strong { color: var(--text-primary); font-weight: 600; }
	.work-copy h4 { margin: 0 0 .5rem; color: var(--text-primary); font-size: .875rem; font-weight: 600; }
	.work-copy ul { margin: 0; padding-left: 1.25rem; list-style: disc; }
	.work-copy li + li { margin-top: .5rem; }
	.clients-section { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px dashed var(--border-color); }
	.client-logos { list-style: none; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1.25rem 2rem; margin: 1.25rem 0 0; padding: 0; }
	.client-logos li { margin: 0; min-width: 0; }
	.client-logos a { display: flex; gap: .5rem; justify-content: center; align-items: center; height: 2.5rem; padding: .25rem; border-radius: .25rem; color: var(--text-primary) !important; font-size: 1rem; font-weight: 600; }
	.client-logos a:focus-visible { outline: 2px solid var(--accent-color); outline-offset: 4px; }
	.client-logos img { width: auto; max-width: 100%; height: 1.75rem; object-fit: contain; filter: grayscale(1); }
	.client-logos img + span { white-space: nowrap; }
	.client-logos img[src$="skyvern.png"] { filter: grayscale(1) brightness(.2); }
	:global(html.dark) .client-logos a { background: #fff; color: #1f2937 !important; }
	@media (max-width: 768px) {
		.work-columns { grid-template-columns: 1fr; }
		.client-logos { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
	}
</style>
