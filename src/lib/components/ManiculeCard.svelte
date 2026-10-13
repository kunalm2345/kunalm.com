<script lang="ts">
	interface Props {
		title: string;
		date?: string;
	}
	let { title, date }: Props = $props();

	const clients = [
		{ name: 'Greptile', href: 'https://www.greptile.com', logo: '/clients/greptile.svg', showName: true },
		{ name: 'xpander.ai', href: 'https://xpander.ai', logo: '/clients/xpander.png' },
		{ name: 'Skyvern', href: 'https://www.skyvern.com', logo: '/clients/skyvern.png' },
		{ name: 'Context.dev', href: 'https://context.dev', logo: '/clients/context.svg', showName: true },
		{ name: 'Limrun', href: 'https://limrun.com', logo: '/clients/limrun.png', showName: true },
		{ name: 'Surge', href: 'https://surge.app', logo: 'https://surge.app/favicon.svg', showName: true },
		{ name: 'AgentMail', href: 'https://agentmail.to', logo: '/clients/agentmail.svg' },
		{ name: 'Mastra', href: 'https://mastra.ai', logo: '/clients/mastra.svg' },
		{ name: 'OpenComputer', href: 'https://opencomputer.dev', logo: '/clients/opencomputer.svg' },
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

			<p class="intro">I write the docs, bring in the work, and build the systems behind it.</p>

			<div class="work-columns">
				<section aria-labelledby="delivery-title">
					<p class="metric">5-figure</p>
					<h4 id="delivery-title">Docs & content engagements led</h4>
					<p>I've led documentation revamps and content projects, writing technical and product docs, agent SKILLS, benchmarks, and blog posts. TK pieces delivered, from the first brief to the final review.</p>
				</section>
				<section aria-labelledby="growth-title">
					<p class="metric">TK</p>
					<h4 id="growth-title">New clients closed myself</h4>
					<p>I handle outreach, sales calls, and the close. On the delivery side, I work on SEO and AEO, Reddit, SEO audits, and docs audits: how people find a product, and what they understand when they get there.</p>
				</section>
				<section aria-labelledby="systems-title">
					<p class="metric">TK</p>
					<h4 id="systems-title">Drafts through the writing pipeline</h4>
					<p>I work on our internal agents platform, and built its writing and review interface and pipeline. It catches generic AI phrasing and helps turn drafts into clear, specific work that reads like a person wrote it.</p>
				</section>
			</div>

			<footer class="clients-section">
				<h4 class="eyebrow">CLIENTS I WORKED WITH</h4>
				<ul class="client-logos">
					{#each clients as client}
						<li>
							<a href={client.href} target="_blank" rel="noopener noreferrer" aria-label={client.name}>
								{#if client.logo}
									<img src={client.logo} alt={client.showName ? '' : client.name} loading="lazy" onerror={(event) => event.currentTarget.setAttribute('hidden', '')} />
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
	.eyebrow { margin: 0; color: var(--text-secondary); font: .65rem ui-monospace, monospace; letter-spacing: .12em; text-transform: uppercase; }
	h3 { margin: .4rem 0 0; color: var(--text-primary); font: 1.5rem Georgia, serif; }
	.manicule-mark { flex-shrink: 0; border-radius: .5rem; transform: rotate(6deg); }
	:global(html.dark) .manicule-mark { background: #fff; padding: .35rem; }
	.intro { max-width: 42rem; margin: 1.25rem 0 1.75rem; font: clamp(1.5rem, 2.5vw, 2rem)/1.25 Georgia, serif; color: var(--text-primary); }
	.work-columns { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; }
	.work-columns section + section { border-left: 1px solid var(--border-color); padding-left: 2rem; }
	.metric { margin: 0 0 .4rem; color: #703d57; font: 2rem/1.1 Georgia, serif; }
	:global(html.dark) .metric { color: #dda9c5; }
	h4 { margin: 0 0 .75rem; color: var(--text-primary); font-size: .875rem; font-weight: 600; }
	.work-columns section > p:last-child { margin: 0; color: var(--text-secondary); font-size: 1rem; line-height: 1.6; }
	.clients-section { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px dashed var(--border-color); }
	.client-logos { list-style: none; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 1.25rem 2rem; margin: 1.25rem 0 0; padding: 0; }
	.client-logos li { margin: 0; min-width: 0; }
	.client-logos a { display: flex; gap: .5rem; justify-content: center; align-items: center; height: 2.5rem; padding: .25rem; border-radius: .25rem; color: var(--text-primary) !important; font-size: 1rem; font-weight: 600; }
	.client-logos a:focus-visible { outline: 2px solid var(--accent-color); outline-offset: 4px; }
	.client-logos img { width: auto; max-width: 100%; height: auto; max-height: 2rem; object-fit: contain; filter: grayscale(1); }
	.client-logos img + span { white-space: nowrap; }
	.client-logos img[src$="skyvern.png"] { filter: grayscale(1) brightness(.2); }
	:global(html.dark) .client-logos a { background: #fff; color: #1f2937 !important; }
	@media (max-width: 768px) {
		.work-columns { grid-template-columns: 1fr; gap: 1.5rem; }
		.work-columns section + section { border-left: 0; border-top: 1px solid var(--border-color); padding: 1.5rem 0 0; }
		.client-logos { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
	}
</style>
