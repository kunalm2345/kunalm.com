import { ConvexHttpClient } from "convex/browser";

interface Page {
  path: string;
  content: string;
  updatedAt: number;
}

function stripHtml(html: string): string {
	// Remove HTML tags with a simple regex
	return html.replace(/<\/?[^>]+(>|$)/g, '');
}

export async function load() {
  try {
    // Use environment variables properly on server side
    const convexUrl = process.env.VITE_CONVEX_URL || process.env.PUBLIC_CONVEX_URL || "https://perceptive-roadrunner-104.convex.cloud";
    console.log('Notes server: Using Convex URL:', convexUrl);

    const convex = new ConvexHttpClient(convexUrl);

    // Get all pages from Convex
    console.log('Notes server: Querying for all pages...');
    const allPages = await convex.query("pages:getAllPages", {});
    console.log('Notes server: Found pages:', allPages);

    // Filter to only notes (paths starting with /notes/)
    const notePages = allPages.filter((page: Page) => page.path.startsWith('/notes/'));
    console.log('Notes server: Filtered note pages:', notePages);

    return {
      summaries: notePages.map((page: Page) => {
        // Extract slug from path (/notes/slug -> slug)
        const slug = page.path.replace('/notes/', '');

        // Get content preview
        const plainText = stripHtml(page.content);
        const displayTitle = plainText.length > 280
          ? plainText.substring(0, 280) + '...'
          : plainText;

        return {
          slug,
          title: undefined, // We don't have separate titles in our schema
          displayTitle,
          date: new Date(page.updatedAt).toISOString().split('T')[0], // Format as YYYY-MM-DD
          contentPreview: plainText.substring(0, 280)
        };
      }).sort((a: any, b: any) => b.date.localeCompare(a.date)) // Sort by newest first
    };
  } catch (error) {
    console.error('Failed to load notes from Convex:', error);
    // Fallback to empty array if Convex fails
    return {
      summaries: []
    };
  }
}