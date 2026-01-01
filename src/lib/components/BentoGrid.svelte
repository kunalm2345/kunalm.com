<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="bento-grid">
	{@render children()}
</div>

<style>
	.bento-grid {
		display: grid;
		/* Each column is 1fr, rows auto-sized based on content aspect ratios */
		grid-template-columns: repeat(3, 1fr);
		/* Row height is half of column width (since 2 height = 1 width) */
		grid-auto-rows: 1fr;
		row-gap: 2rem;
        column-gap: 1.75rem;
		width: 100%;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.bento-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.bento-grid {
			grid-template-columns: 1fr;
		}

		/* Force 1x2 cards to single row on mobile */
		.bento-grid :global(.card-1x2) {
			grid-row: span 1;
		}
	}
</style>
