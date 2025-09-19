<script>
    import { onMount } from 'svelte';
    import { convex } from '$lib/convex';

    let content = $state('');
    let loading = $state(true);

    onMount(async () => {
        try {
            const pageContent = await convex.query("pages:getPageContent", { path: "/work" });
            content = pageContent || getDefaultContent();
        } catch (error) {
            console.error('Failed to load content:', error);
            content = getDefaultContent();
        }
        loading = false;
    });

    function getDefaultContent() {
        return `<h1 class="font-serif text-6xl mb-2">Work Experience</h1>
<p class="text-2xl">
    Currently I'm: <br><br>
</p>
<ul class="text-2xl list-inside no-single-line-list">
    <li><b>Building a hi-precision indoor positioning system</b> using Wifi (and other sensors) as a replacement for GPS.
    </li><br/>

    <li><b>Heading the Marketing vertical at <a href="https://celbitsgoa.in/">CEL</a></b>, short for Center for Entrepreneurial Leadership. We help students on campus build startups.
    </li>

</ul>
<p class="text-2xl"><br>Previously, I: <br><br> </p>
<ul class="text-2xl list-inside no-underline">
    <li><b>Built a few features at Buttondown</b> — I built a few features with Django and Vue.js. I've been generally interested in the email industry. It was a dream working with Justin.
    </li> <br>

    <li><b>Built a smart classroom at DaSH Lab</b> – I worked under Prof Arnab Paul to build a smart classroom environment that monitors student attention to help improve teaching pedagogy.</li> <br/>

    <li><b>Researched and wrote scripts for BioCompute</b> — Bacterial DNA can store digital data thousands of times more densely than Seagate's current best tech. We're working on a device which would bring this in a form you can plug into your PC.
    </li> <br>

    <li><b>Did marketing consulting for Deta.space</b> — For a brief stint, Deta hired me to help them think new marketing strategies for their personal cloud product. About an year later, they pivoted to building a browser.
    </li> <br>

    <li><b>Did SEO for HelloMeets</b> — I handled the entire publishing process for the HelloMeets blog while growing it from 600 to over 45k visits a month, in 8 months on a strict budget.
    </li> <br>

    <li><b>Designed an infographic template for The Morning Context</b> — I designed a template for an newly launched, independent, subscription-based news publication called The Morning Context. Thanks Ashish K Mishra and Harveen Ahluwalia for this gig.
    </li> <br>

    <li><b>Did Freelance Content Writing</b> — In 2018-19, I wrote a bunch of articles for Mobisium, a blog that later turned into a content platform but eventually shut down. They paid me peanuts (between ₹180-300 per 1000-2000 words) but it was my first time working for someone else and I loved it. I even pitched them a video that I did alongside a blog post. I also did a few gigs on Fiverr for their minimum $5. I'm just glad I can say I have never worked for anyone else for free and I don't think anyone should.
    </li> <br>

</ul>`;
    }
</script>

{#if loading}
    <p>Loading...</p>
{:else}
    <div class="content-spacing">
        {@html content}
    </div>
{/if}
