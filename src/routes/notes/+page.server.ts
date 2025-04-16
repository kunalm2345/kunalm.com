import { posts } from './data.js';

interface Post {
  title?: string,  // Make title optional
  slug: string,
  content: string,
  date?: string    // Make date optional
}

function stripHtml(html: string): string {
	// Remove HTML tags with a simple regex
	return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

export function load() {
  return {
    summaries: posts.map((post: Post) => {
      // Get content preview for untitled posts
      let displayTitle = post.title;
      
      if (!displayTitle) {
        // Strip HTML tags and get first 100 characters
        const plainText = stripHtml(post.content);
        displayTitle = plainText.length > 280 
          ? plainText.substring(0, 280) + '...' 
          : plainText;
      }
      
      return {
        slug: post.slug,
        title: post.title, // Original title (may be undefined)
        displayTitle,      // Either the real title or content preview
        date: post.date || null,
        // Send a small portion of content for preview
        contentPreview: post.content ? stripHtml(post.content).substring(0, 280) : ''
      };
    })
  };
}