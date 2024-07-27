<script>
    import "../app.css";
    import me from '$lib/assets/me.jpeg';
	import {
		afterUpdate
	} from 'svelte';

    let current_url = '';
    afterUpdate(() => {
        let currurl = window.location.href.split('/').pop();
        if (currurl) {
            current_url = currurl;
        }
    });
</script>


<div class="md:relative md:p-none px-6">
    <div class="md:flex md:flex-row max-w-screen-md mx-auto my-24 gap-8">
        <div class="md:basis-1/6">
            <div class="md:sticky md:top-24 flex flex-row md:hidden"> 
                <img src={me} alt="me, kunal" class="basis-1/3 w-36 h-full md:h-max border-white border-b-32 border-x-8 border-t-8 rotate-6 mb-7" />
                <nav class="md:basis-2/3 list-none text-right">
                    <ul class="md:no-single-ligitne-list single-line-list md:h-full md:h-auto md:mb-0 mb-6">
                        {#if current_url == ''} <a href="/" class="link-active"><li class="list-none">Home</li></a>{:else}<a href="/"><li class="list-none">Home</li></a>{/if}
                        <!-- {#if current_url == 'blog'} <a href="/blog" class="link-active"><li class="list-none">Blog</li></a>{:else}<a href="/blog"><li class="list-none">Blog</li></a>{/if} -->
                        {#if current_url == 'work'} <a href="/work" class="link-active"><li class="list-none">Work</li></a>{:else}<a href="/work"><li class="list-none">Work</li></a>{/if}
                        {#if current_url == 'projects'} <a href="/projects" class="link-active"><li class="list-none">Projects</li></a>{:else}<a href="/projects"><li class="list-none">Projects</li></a>{/if}
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
                <img src={me} alt="me, kunal" class="basis-1/3 w-36 h-full md:h-max border-white border-b-32 border-x-8 border-t-8 rotate-6 mb-7" />
                <nav class="md:basis-2/3 list-none text-right">
                    <ul class="md:no-single-line-list single-line-list md:h-full md:h-auto md:mb-0 mb-6">
                        {#if current_url == ''} <a href="/" class="link-active"><li class="list-none">Home</li></a>{:else}<a href="/"><li class="list-none">Home</li></a>{/if}
                        <!-- {#if current_url == 'blog'} <a href="/blog" class="link-active"><li class="list-none">Blog</li></a>{:else}<a href="/blog"><li class="list-none">Blog</li></a>{/if} -->
                        {#if current_url == 'work'} <a href="/work" class="link-active"><li class="list-none">Work</li></a>{:else}<a href="/work"><li class="list-none">Work</li></a>{/if}
                        {#if current_url == 'projects'} <a href="/projects" class="link-active"><li class="list-none">Projects</li></a>{:else}<a href="/projects"><li class="list-none">Projects</li></a>{/if}
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
            <slot />
        </div>
    </div>
</div>