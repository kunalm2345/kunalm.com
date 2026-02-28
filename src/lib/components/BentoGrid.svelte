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
		grid-template-columns: repeat(3, minmax(0, 1fr));
		/* Auto rows so each row sizes independently — expanding one card won't stretch others */
		grid-auto-rows: auto;
		row-gap: 2rem;
        column-gap: 1.75rem;
		width: 100%;
		max-width: 100%;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.bento-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 480px) {
		.bento-grid {
			grid-template-columns: minmax(0, 1fr);
		}

		/* Force 1x2 cards to single row on mobile */
		.bento-grid :global(.card-1x2) {
			grid-row: span 1;
		}
	}
</style>
