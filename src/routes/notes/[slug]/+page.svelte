<script lang="ts">
  import { marked } from 'marked';
  let { data } = $props();
</script>


<h1 class="mb-4"><span class="text-gray-500 text-md font-bold font-mono">notes on</span><br> <span class="font-serif text-6xl">{data.post.title}</span></h1>

<p class="text-2xl list-inside no-underline">
    {@html data.post.content}
</p>
