<script lang="ts">
	let { data } = $props();
	let entries = data.entries;
</script>

<h1>Last 10 Journal Entries</h1>

<ul>
	{#each entries as entry}
		<li class="">
			<p class="font-mono font-bold text-gray-500 text-sm">
				{new Date(entry.creationDate).toLocaleDateString()}
			</p>
			<p>{entry.text}</p>
		</li>
	{/each}
</ul>

<style>
	h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-bottom: 1.5rem;
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 5px;
		background-color: #f9f9f9;
	}
</style>
