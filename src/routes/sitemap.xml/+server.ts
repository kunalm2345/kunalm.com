const PAGES = ['/', '/stack'];

export const prerender = true;

export const GET = () =>
	new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `<url><loc>https://www.kunalm.com${p}</loc></url>`).join('\n')}
</urlset>`,
		{ headers: { 'content-type': 'application/xml' } }
	);
