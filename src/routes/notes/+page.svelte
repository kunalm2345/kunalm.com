<script lang="ts">
	let { data } = $props();
</script>

<h1 class="font-serif text-6xl mb-8">My Notes</h1>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
	{#each data.summaries as { slug, title, displayTitle, date }}
		<a href="/notes/{slug}" class="block group {!title ? 'md:col-span-2' : ''}">
			<div class="relative h-36 w-full">
				<!-- Card 3 (bottom of stack) -->
				<div class="absolute inset-0 bg-white rounded-sm border border-gray-200 transform rotate-3 transition-all duration-300 group-hover:rotate-6 shadow-sm"></div>
				
				<!-- Card 2 (middle of stack) -->
				<div class="absolute inset-0 bg-white rounded-sm border border-gray-200 transform rotate-1.5 transition-all duration-300 group-hover:rotate-3 shadow-sm"></div>
				
				<!-- Card 1 (top of stack - main card) -->
				<div class="absolute inset-0 bg-white rounded-sm border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-300">
					<!-- Top color bar (blue to orange on hover) -->
					<div class="h-1.5 bg-[#0091ad] group-hover:bg-[#e76f51] transition-colors duration-300"></div>
					
					<div class="p-4 h-[calc(100%-6px)] flex flex-col justify-between">
						<p class="{title ? 'font-serif text-xl line-clamp-3 transition-colors' : 'font-normal text-l line-clamp-4 text-[#1c1917]'} group-hover:text-[#e76f51] overflow-hidden">
							{displayTitle}
						</p>
						
						{#if date}
							<p class="text-gray-500 text-xs font-mono mt-2">{date}</p>
						{/if}
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	/* Add line-clamp utility if not already in your Tailwind config */
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>