import { redirect } from '@sveltejs/kit';

export const GET = () => redirect(307, 'https://cal.com/kunalm/30');
