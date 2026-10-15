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

			<div class="work-copy">
				<p>I've led five-figure documentation revamps and content projects at Manicule, from the first brief to the final review. The work spans technical and product docs, agent SKILLS, benchmarks, and blog posts.</p>
				<p>I also work on SEO, AEO, Reddit content, and audits of search performance and documentation. I've won new clients through my own outreach and sales calls.</p>
				<p>Alongside client work, I help build our internal agent platform. I built the writing and review interface and pipeline to catch generic AI phrasing and help produce clear, specific writing.</p>
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
	.eyebrow { margin: 0; color: var(--text-secondary); font-size: .75rem; font-weight: 400; line-height: 1.5; }
	h3 { margin: .4rem 0 0; color: var(--text-primary); font: 1.5rem Georgia, serif; }
	.manicule-mark { flex-shrink: 0; border-radius: .5rem; transform: rotate(6deg); }
	:global(html.dark) .manicule-mark { background: #fff; padding: .35rem; }
	.work-copy { max-width: 70ch; margin-top: 1.25rem; }
	.work-copy p { margin: 0; color: var(--text-secondary); font-size: 1rem; line-height: 1.6; }
	.work-copy p + p { margin-top: 1rem; }
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
		.client-logos { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
	}
</style>
