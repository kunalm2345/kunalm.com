import { error } from '@sveltejs/kit';
import { ConvexHttpClient } from "convex/browser";

interface Page {
  path: string;
  content: string;
  updatedAt: number;
}

export async function load({ params }: { params: { slug: string } }) {
  try {
    // Use environment variables properly on server side
    const convexUrl = process.env.VITE_CONVEX_URL || process.env.PUBLIC_CONVEX_URL || "https://perceptive-roadrunner-104.convex.cloud";
    console.log('Note detail server: Using Convex URL:', convexUrl);

    const convex = new ConvexHttpClient(convexUrl);

    // Query for the specific note
    const notePath = `/notes/${params.slug}`;
    console.log('Note detail server: Querying for note:', notePath);
    const page = await convex.query("pages:getPage", { path: notePath });
    console.log('Note detail server: Found page:', page);

    if (!page) {
      console.log('Note detail server: Note not found');
      throw error(404, 'Note not found');
    }

    return {
      post: {
        slug: params.slug,
        content: page.content,
        title: undefined // We don't have separate titles in our schema
      },
      slug: params.slug,
    };
  } catch (err) {
    console.error('Failed to load note from Convex:', err);
    throw error(404, 'Note not found');
  }
}
