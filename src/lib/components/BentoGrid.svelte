<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		items: any[];
		card: Snippet<[any]>;
	}

	let { items, card }: Props = $props();

	let innerWidth = $state(0);
	// 0 = pre-hydration (SSR), default to 3 columns
	let numCols = $derived(innerWidth !== 0 && innerWidth <= 480 ? 1 : innerWidth !== 0 && innerWidth <= 768 ? 2 : 3);

	// Distribute cards into independent columns (shortest column first,
	// preserving order) so expanding a card only pushes down the cards
	// in its own column — not the whole row.
	let columns = $derived.by(() => {
		const cols: any[][] = Array.from({ length: numCols }, () => []);
		const heights = new Array(numCols).fill(0);
		for (const item of items) {
			let target = 0;
			for (let i = 1; i < numCols; i++) {
				if (heights[i] < heights[target]) target = i;
			}
			cols[target].push(item);
			heights[target] += item.size === '1x2' ? 2 : 1;
		}
		return cols;
	});
</script>

<svelte:window bind:innerWidth />

<div class="bento-grid">
	{#each columns as column}
		<div class="bento-col">
			{#each column as item (item.title)}
				{@render card(item)}
			{/each}
		</div>
	{/each}
</div>

<style>
	.bento-grid {
		display: flex;
		align-items: flex-start;
		column-gap: 1.75rem;
		width: 100%;
		max-width: 100%;
	}

	/* Each column lays out independently of its siblings */
	.bento-col {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		row-gap: 2rem;
	}
</style>
