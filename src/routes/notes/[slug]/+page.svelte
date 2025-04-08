<script lang="ts">
  import { marked } from 'marked';
  let { data } = $props();
</script>

<div class="mb-1">
  <a href="/notes" class="inline-block text-gray-500 text-md font-bold font-mono hover:text-[#e76f51] transition-colors mb-4">← back to notes</a>
</div>

{#if data.post.title}
<div class="relative mb-8">
  <!-- Card shadow/background layers -->
  <div class="absolute inset-0 bg-white rounded-sm border border-gray-200 transform rotate-3 shadow-sm -z-20"></div>
  <div class="absolute inset-0 bg-white rounded-sm border border-gray-200 transform rotate-1.5 shadow-sm -z-10"></div>
  
  <!-- Main title card -->
  <div class="bg-white rounded-sm border border-gray-200 shadow-sm p-6">
    <!-- Top color bar - orange for title card -->
    <div class="absolute top-0 left-0 right-0 h-1.5 bg-[#e76f51]"></div>
    
    <h1 class="mb-4">
      <span class="text-gray-500 text-md font-bold font-mono">notes on</span><br> 
      <span class="font-serif text-5xl text-shadow">{data.post.title}</span>
    </h1>
  </div>
</div>
{/if}


<!-- Content Card - no stacking effect -->
<div class="relative">
  <!-- Main content card - no tilted background cards -->
  <div class="bg-white rounded-sm border border-gray-200 shadow-sm p-6">
    <!-- Top color bar - blue for content cards -->
    <div class="absolute top-0 left-0 right-0 h-1.5 bg-[#0091ad]"></div>
    
    <div class="text-2xl note-content">
      {@html data.post.content}
    </div>
  </div>
</div>

<style>
  /* This ensures the content card styling works with the HTML content */
  :global(.note-content ul) {
    padding-left: 1rem;
  }
  
  :global(.note-content blockquote) {
    margin: 1rem 0;
  }
  
  /* Add a subtle text shadow to the title */
  .text-shadow {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
</style>