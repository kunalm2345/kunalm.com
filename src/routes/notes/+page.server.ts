import { posts } from './data.js';

interface post {
  title: string,
  slug: string,
  content: string,
}

export function load() {
	return {
		summaries: posts.map((post: post) => ({
			slug: post.slug,
			title: post.title
		}))
	};
}
