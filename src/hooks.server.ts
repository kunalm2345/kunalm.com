import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { waitUntil } from '@vercel/functions';
import { returnmd } from 'returnmd';

// Markdown for AI agents (and any /page.md), HTML plus server-side analytics for everyone else.
const md = returnmd({ siteKey: env.RETURNMD_SITE_KEY ?? '' });

export const handle: Handle = ({ event, resolve }) =>
	md.handle(event.request, () => resolve(event), { waitUntil });
