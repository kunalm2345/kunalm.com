<script lang="ts">
	let { data } = $props();
</script>

    <h1 class="font-serif text-6xl mb-4">My Notes</h1>
    <ul class="list-disc" style="list-style-type: disc; !important">
    	{#each data.summaries as { slug, title }}
    		<li class="text-xl"><a href="/notes/{slug}">{title}</a><br></li>
    	{/each}
    </ul>
