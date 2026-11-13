<script lang="ts">
	import Wave from './Wave.svelte';
	import { tagColors, type Tag } from '$lib/tags';

	interface Props {
		title: string;
		date?: string;
		tags?: Tag[];
	}
	let { title, date, tags = [] }: Props = $props();

	// One flag per section; the tear pill opens or closes all three at once
	let open = $state([false, false, false]);
	let allOpen = $derived(open.every(Boolean));
	const toggleAll = () => (open = open.map(() => !allOpen));
</script>

<article class="manicule-card" aria-labelledby="manicule-title">
	<div class="card-surface">
		<div class="color-bar" aria-hidden="true">{#each tags as tag}<span style:background={tagColors[tag]}></span>{/each}</div>
		<div id="manicule-body" class="card-body">
			<header>
				<img class="manicule-mark" src="/manicule.png" alt="" width="68" height="68" />
				<h3 id="manicule-title" class="font-serif text-xl">{title}</h3>
			</header>

			<div class="work-copy">
				<p class="intro">As a founding engineer, I joined Manicule before we got into YC and I had a lot of fun working with a small, young team. I did everything from client work, to marketing &amp; sales, and to building internal agents to do all of it at scale.</p>

				<div class="work-sections">
					<details bind:open={open[0]}>
						<summary><h4>Client work</h4><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="14" height="14" aria-hidden="true"><path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg></summary>
						<ul>
							<li><strong>Technical Documentation.</strong> I wrote the docs for Greptile, AgentMail, and some more AI DevTool startups. For coding agents, docs are the UI. Good docs mean your customer's agents find and understand your product better.</li>
							<li><strong>Benchmarks.</strong> I ran several benchmarks showing how a client's product fares against the competition. Benchmark reports are excellent for Google AI search overviews btw!</li>
							<li><strong>Cookbooks.</strong> I built several working demos showcasing a use case for our clients' products and wrote about it. These are massive attention drivers on social media and reddit. For example, I wrote Mastra's cookbook on how to build Software Factories!</li>
							<li><strong>SEO/AEO content.</strong> This includes tracking your brand rankings across Google search, AI chat apps and coding agents. Then finding new opportunities for keywords and search questions that you can rank for. And finally writing new pieces of content and refreshing old ones until you start getting organic traffic.</li>
						</ul>
					</details>

					<details bind:open={open[1]}>
						<summary><h4>Sales and Outreach</h4><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="14" height="14" aria-hidden="true"><path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg></summary>
						<ul>
							<li><strong>Outbound.</strong> I like quality &gt; quantity. I built agents for finding potential clients, then researching about their products, founders and the team, whether they are hiring for devrel/growth and if they have recently raised. I then did a quick audit tailored to their goals and methods. I start engaging with their posts or chatting with them on how they work.</li>
							<li><strong>Audits &amp; proposals.</strong> I play around with their product, read their docs, and understand their positioning. This helps me concretely list out what they should be doing (to get discovered and used by coding agents!)</li>
							<li><strong>Closing.</strong> The emails, DMs and audits I send get roughly a 40% reply rate because I send no more than ~10 a week. I then also take the sales call and do the client onboarding.</li>
						</ul>
					</details>

					<details bind:open={open[2]}>
						<summary><h4>Engineering</h4><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="14" height="14" aria-hidden="true"><path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg></summary>
						<ul>
							<li><strong>Internal agent platform.</strong> I helped build skills, prompts and agents for our internal client service app. We use it to power all content operations across over half a dozen clients at a time with a service team of just 4 humans.</li>
							<li><strong>Writing platform.</strong> I also built a writing platform to collaborate with coding agents on writing technical content drafts. This fast-tracks human reviews for agents' writing and makes sure it follows SEO and readability best practices while not sounding like AI slop.</li>
						</ul>
					</details>
				</div>
			</div>
		</div>
		<div class="tear">
			<button type="button" class="read-more-pill" class:expanded={allOpen} onclick={toggleAll} aria-expanded={allOpen} aria-controls="manicule-body">
				<span>{allOpen ? 'SHOW LESS' : 'READ MORE'}</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="12" height="12" class:rotate-180={allOpen} aria-hidden="true"><path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>
			</button>
			<Wave />
		</div>
	</div>
	<!-- Second sheet: the date and link show through below the tear, like the grid cards -->
	<div class="stack-layer stack-layer-front">
		<footer class="tear-gap">
			<p class="text-xs font-mono uppercase tracking-wider text-gray-400">{date}</p>
			<a href="https://manicule.com" target="_blank" rel="noopener noreferrer" class="squiggle-link flex items-center gap-1 text-xs font-mono uppercase tracking-wider transition-colors text-gray-400 hover:text-[#e76f51]">
				MANICULE.COM
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-hidden="true"><path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" /></svg>
			</a>
		</footer>
	</div>
	<div class="stack-layer stack-layer-back" aria-hidden="true"></div>
</article>

<style>
	.manicule-card { --pad: clamp(1.25rem, 2.5vw, 1.75rem); position: relative; isolation: isolate; display: grid; grid-template-rows: auto auto; width: min(100%, max(36rem, (min(100%, 77rem) - 3.5rem) * 7 / 12) * 0.8); margin: 0 auto 2.5rem; }
	/* The top sheet fills row 1; the second sheet spans both rows and its subgrid puts the 3rem strip in row 2, below the tear */
	.card-surface, .stack-layer { grid-column: 1; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 0 0 .5rem .5rem; }
	.card-surface { grid-row: 1; position: relative; z-index: 2; border-bottom: none; border-radius: 0; filter: drop-shadow(0 1px 1.5px rgb(0 0 0 / .1)); }
	.stack-layer { grid-row: 1 / 3; }
	.stack-layer-front { z-index: 1; display: grid; grid-template-rows: subgrid; transform: rotate(-.35deg) translateY(3px); }
	.stack-layer-back { z-index: 0; transform: rotate(.65deg) translateY(5px); }
	.color-bar { display: flex; height: 6px; }
	.color-bar span { flex: 1; }
	.tear-gap { grid-row: 2; height: 3rem; display: flex; justify-content: space-between; align-items: flex-end; padding: 0 var(--pad) 1rem; }
	.tear-gap p { margin: 0; }
	/* Same 1rem top padding as the grid cards */
	.card-body { padding: 1rem var(--pad) var(--pad); }
	.tear { position: absolute; left: 0; right: 0; bottom: -8px; height: 16px; z-index: 1; }
	.read-more-pill { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 20; display: flex; align-items: center; gap: .25rem; padding: .25rem .75rem; background: var(--bg-card); border: 1px solid #e5e7eb; border-radius: 9999px; font: 700 .625rem ui-monospace, monospace; text-transform: uppercase; letter-spacing: .05em; white-space: nowrap; color: #6b7280; box-shadow: 0 1px 3px rgba(0, 0, 0, .1); transition: all .2s ease; cursor: pointer; }
	.manicule-card:hover .read-more-pill, .read-more-pill.expanded { color: #e76f51; border-color: #e76f51; }
	.read-more-pill svg { transition: transform .2s ease; }
	h3 { margin: 0; color: var(--text-primary); }
	/* Floated so the logo's height doesn't push the intro away from the title */
	.manicule-mark { float: right; margin: 0 0 .5rem 1rem; border-radius: .5rem; transform: rotate(6deg); }
	:global(html.dark) .manicule-mark { background: #fff; padding: .35rem; }
	.work-copy { margin-top: .25rem; }
	.work-copy .intro { max-width: 70ch; }
	.work-sections { margin-top: 1.25rem; border-top: 1px solid var(--border-color); }
	.work-sections details { border-bottom: 1px solid var(--border-color); }
	.work-sections summary { display: flex; justify-content: space-between; align-items: center; padding: .75rem 0; list-style: none; cursor: pointer; color: #e76f51; }
	.work-sections summary::-webkit-details-marker { display: none; }
	.work-sections summary svg { transition: transform .2s ease; }
	.work-sections details[open] summary svg { transform: rotate(180deg); }
	.work-sections ul { padding-bottom: 1rem; }
	.work-copy p, .work-copy li { margin: 0; color: var(--text-secondary); font-size: 1.125rem; line-height: 1.6; }
	.work-copy strong { color: var(--text-primary); font-weight: 600; }
	.work-copy h4 { margin: 0; color: #e76f51; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .875rem; font-weight: 600; text-transform: uppercase; letter-spacing: .05em; }
	.work-copy ul { margin: 0; padding-left: 1.25rem; list-style: disc; }
	.work-copy li + li { margin-top: .5rem; }
</style>
