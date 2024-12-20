<script>
  let category = [];
</script>

<h1 class="font-serif text-6xl">Projects</h1>

<form class="text-lg font-mono font-bold text-gray-500 uppercase mt-4 mb-6 *:px-2 *:py-1 *:bg-white *:text-xs *:rounded *:cursor-pointer">FILTERS:
    <label for="webdev" class="border-2 border-purple-400 text-purple-400 has-[:checked]:bg-purple-400 has-[:checked]:text-white">
        <input id="webdev" value="webdev" type="checkbox" class="hidden" bind:group={category}/> Web dev
    </label>
    <label for="hardware" class="border-2 border-red-400 text-red-400 has-[:checked]:bg-red-400 has-[:checked]:text-white">
        <input id="hardware" value="hardware" type="checkbox" class="hidden" bind:group={category}/> Hardware
    </label>
    <label for="content" class="border-2 border-yellow-400 text-yellow-400 has-[:checked]:bg-yellow-400 has-[:checked]:text-white">
        <input id="content" value="content" type="checkbox" class="hidden" bind:group={category}/> Content
    </label>
</form>
<ul class="text-2xl list-inside space-y-8">
    {#if category.includes("hardware") || category.length === 0}
    <li><b>Smart Space</b> — My research project at DaSH lab, BITS Goa where we're putting 18 raspberry pis in a classroom to monitor student attention to help improve teaching pedagogy.
    </li>
    {/if}

    {#if category.includes("hardware") || category.length === 0}
    <li>
        <b class="">Telescope Webportal</b> — I'm leading a team building a webportal for SEDS Celestia, our college astronomy club's motorised telescope, so anybody could request a live image from it of the night sky.
    </li>
    {/if}

    {#if category.includes("webdev") || category.length === 0}
    <li><b>Socialscribe</b> — Socialscribe lets newsletter creators add social sign-up buttons (<span class="text-white text-sm uppercase font-mono px-3 py-1 rounded-lg bg-gray-500">sign-up with google</span>) to their websites without coding. I designed and built the entire thing up and grew it to over $1k in profits.
    </li>
    {/if}

    {#if category.includes("webdev") || category.length === 0}
    <li><b>Twift (now defunct)</b> – Now defunct, Twift helped creators run "reply with an 👋" giveaways on Twitter, handling sending thousands of DMs without being marked as spam. I built and designed the whole web-app and DM-ing engine while Prado (@pradologue) helped me with growing it to hundreds of users. We had to eventually shut down when the Twitter API pricing change made this too expensive to continue ($40k/month to be exact).    </li>
    {/if}

    {#if category.includes("webdev") || category.length === 0}
    <li><b>Dump.ink (now defunct)</b> – Dump is a minimal micro-blogging platform I built for Deta Space which lets anybody create and host their own microblogs for free for ever. It is completely decentralised. Deta offered to buy it from me if I turned it into a decentralised social media protocol which I couldn't work on as life got in the way. I may continue this in the future.    </li>
    {/if}

    {#if category.includes("content") || category.length === 0}
    <li><b>Back of my Head (now defunct)</b> – I ran an email newsletter rounding up cool stuff I found throughout the week. It went on the get over a thousand subscribers but I couldn't be consistent and decided to drop it. It did lead me to build Socialscribe though.
    </li>
    {/if}

    {#if category.includes("content") || category.length === 0}
      <li><b>Right Click (now defunct)</b> – I used to write a blog called <i>Theciva</i> about tech news and stuff like what would happen if Apple bought DuckDuckGo, flaws of India's COVID-times contact tracing app or what Google being carbon neutral meant. I also got a little bit of readers through SEO though mostly readers come through repost (w canonical urls) on Medium (unfortunately their partner program wasn't in India then) and HackerNoon (which won me 3 Noonies prizes!). Theciva evolved into Right Click (had to change the name!) which I tried to turn into Morning Brew for tech (also inspired by <a href="https://filtercoffee.co/?ref=kunal">Filter Coffee</a>). Later, I shut it down and sold the coolest twitter username I have ever owned yet—@rightclick—to rc.xyz, an NFT art platform for the easiest $1000 of my life.
    </li>
    {/if}

</ul>
