<script lang="ts">
  import { marked } from 'marked';
  
  // Just edit this markdown string - any format you want!
  const content = `# My New Title

## Section One
This is a paragraph about something.

- First list item
- Second list item  

## Another Section
Another paragraph here.

- Different list
- More items

Regular paragraph without lists.
`;

  let listCount = 0;

  const renderer = new marked.Renderer();
  
  renderer.heading = function(text, level) {
    if (level === 1) {
      return `<h1 class="font-serif text-6xl mb-2">${text}</h1>`;
    } else if (level === 2) {
      return `<h2 class="text-4xl mb-4">${text}</h2>`;
    }
    return `<h${level} class="text-2xl mb-2">${text}</h${level}>`;
  };
  
  renderer.paragraph = function(token) {
    return `<p class="text-2xl mb-4">${token.text}</p>`;
  };

  renderer.list = function(token) {
    const body = token.items.map((item) => renderer.listitem(item)).join('');
    const ordered = token.ordered;
    const className = listCount === 0 ? 'no-single-line-list' : 'no-underline';
    listCount++;
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag} class="text-2xl list-inside ${className} mb-4">${body}</${tag}>`;
  };

  renderer.listitem = function(token) {
    return `<li class="mb-2">${token.text}</li>`;
  };

  marked.setOptions({
    renderer: renderer,
    breaks: true,
    gfm: true
  });

  function parseContent() {
    console.log(marked(content));
    listCount = 0; // Reset for each parse
    return marked(content);
  }

  $: html = parseContent();
</script>

{@html html}