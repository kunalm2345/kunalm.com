<script lang="ts">
  import '../app.css';
  import me from '$lib/assets/me.jpeg';
  export let children: any;
  let current_url: string = $page.url.pathname;
  import { page } from '$app/stores';
</script>

<div class="md:relative md:p-none px-6">
    <div class="md:flex md:flex-row max-w-screen-md mx-auto my-24 gap-8">
        <div class="md:basis-1/6">
            <div class="md:sticky md:top-24 flex flex-row md:hidden">
                <div class="rotate-6 mb-20">
                    <img src={me} alt="me, kunal" class="basis-1/3 w-36 h-full md:h-max border-white border-x-8 border-y-8" />
                    <p class="text-center handwritten font-bold bg-white basis-1/3 px-0 mx-0 py-1 border-x-8 border-white text-sm">Kunal Mishra</p>
                </div>
                <nav class="md:basis-2/3 list-none text-right" data-sveltekit-reload>
                    <ul class="md:no-single-ligitne-list single-line-list md:h-full md:h-auto md:mb-0 mb-6">
                        {#if current_url == '/'} <a href="/" class="link-active"><li class="list-none">Home</li></a>{:else}<a href="/"><li class="list-none">Home</li></a>{/if}
                        {#if current_url == '/work'} <a href="/work" class="link-active"><li class="list-none">Work</li></a>{:else}<a href="/work"><li class="list-none">Work</li></a>{/if}
                        {#if current_url == '/projects'} <a href="/projects" class="link-active"><li class="list-none">Projects</li></a>{:else}<a href="/projects"><li class="list-none">Projects</li></a>{/if}
                        {#if current_url.startsWith('/notes')} <a href="/notes" class="link-active"><li class="list-none">Notes</li></a>{:else}<a href="/notes"><li class="list-none">Notes</li></a>{/if}
                        <br>
                    </ul>
                    <ul class="md:no-single-line-list single-line-list md:h-full md:h-auto md:mb-0 mb-6">
                        <li class="list-none"><a href="http://x.com/knlmsh/" class="flex flex-row-reverse align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                            </svg>
                            Twitter
                        </a></li>
                        <li class="list-none"><a href="http://github.com/kunalm2345/" class="flex flex-row-reverse align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                            </svg>
                            Github</a></li>
                        <li class="list-none"><a href="http://instagr.am/knlmsh/" class="flex flex-row-reverse align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                            </svg>
                            Instagram</a></li>
                        <li class="list-none"><a href="https://www.linkedin.com/in/kunal-mishra-8238bb187/" class="flex flex-row-reverse align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                            </svg>
                            LinkedIn</a></li>
                        <li class="list-none"><a href="mailto:kunalm@duck.com" class="flex flex-row-reverse align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                            </svg>
                            Email</a>
                        </li>
                    </ul>

                </nav>
            </div>
            <div class="md:sticky md:top-24 hidden md:block">
                <div class="rotate-6 mb-7">
                    <img src={me} alt="me, kunal" class="basis-1/3 w-36 h-full md:h-max border-white border-x-8 border-t-8 " />
                    <p class="text-center handwritten font-bold bg-white basis-1/3 px-0 mx-0 py-1 border-x-8 border-white text-sm">Kunal Mishra</p>
                </div>
                <nav class="md:basis-2/3 list-none text-right" data-sveltekit-reload>
                    <ul class="md:no-single-line-list single-line-list md:h-full md:h-auto md:mb-0 mb-6">
                        {#if current_url == '/'} <a href="/" class="link-active"><li class="list-none">Home</li></a>{:else}<a href="/"><li class="list-none">Home</li></a>{/if}
                        {#if current_url == '/work'} <a href="/work" class="link-active"><li class="list-none">Work</li></a>{:else}<a href="/work"><li class="list-none">Work</li></a>{/if}
                        {#if current_url == '/projects'} <a href="/projects" class="link-active"><li class="list-none">Projects</li></a>{:else}<a href="/projects"><li class="list-none">Projects</li></a>{/if}
                        {#if current_url.startsWith('/notes')} <a href="/notes" class="link-active"><li class="list-none">Notes</li></a>{:else}<a href="/notes"><li class="list-none">Notes</li></a>{/if}
                        <br>
                    </ul>
                    <ul class="md:no-single-line-list single-line-list md:h-full md:h-auto md:mb-0 mb-6">
                        <li class="list-none"><a href="http://x.com/knlmsh/" class="flex flex-row-reverse align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                            </svg>
                            Twitter
                        </a></li>
                        <li class="list-none"><a href="http://github.com/kunalm2345/" class="flex flex-row-reverse align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                            </svg>
                            Github</a></li>
                        <li class="list-none"><a href="http://instagr.am/knlmsh/" class="flex flex-row-reverse align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                            </svg>
                            Instagram</a></li>
                        <li class="list-none"><a href="https://www.linkedin.com/in/kunal-mishra-8238bb187/" class="flex flex-row-reverse align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                            </svg>
                            LinkedIn</a></li>
                        <li class="list-none"><a href="mailto:kunalm@duck.com" class="flex flex-row-reverse align-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
                            </svg>
                            Email</a>
                        </li>
                    </ul>

                </nav>
            </div>
        </div>
        <div class="md:basis-5/6">
            {@render children()}
        </div>
    </div>
</div>
