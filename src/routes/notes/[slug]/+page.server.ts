import { error } from '@sveltejs/kit';
import { posts } from '../data.js';

interface post {
  title: string,
  slug: string,
  content: string,
}

export function load({ params }: { params: { slug: string } }) {
    // let post: post | undefined;

   	const post = posts.find((post) => post.slug === params.slug);

    if (post === undefined) {
      throw error(404, 'Post not found');
    }

	return {
		"post": post,
		"slug": params.slug,
	};
}
