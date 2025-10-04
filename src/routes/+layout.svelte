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
					<img
						src={me}
						alt="me, kunal"
						class="basis-2/6 w-36 h-full md:h-max border-white border-x-8 border-y-8"
					/>
					<p
						class="text-center handwritten font-bold bg-white basis-1/3 px-0 mx-0 py-1 border-x-8 border-white text-sm"
					>
						Kunal Mishra
					</p>
				</div>
				<nav class="basis-4/6 list-none text-right" data-sveltekit-reload>
					<ul class="md:no-single-ligitne-list single-line-list md:h-auto md:mb-0 mb-6">
						{#if current_url == '/'}
							<a href="/" class="link-active"><li class="list-none">About</li></a
							>{:else}<a href="/"><li class="list-none">About</li></a>{/if}
						{#if current_url == '/work'}
							<a href="/work" class="link-active"><li class="list-none">Work</li></a
							>{:else}<a href="/work"><li class="list-none">Work</li></a>{/if}
						{#if current_url == '/projects'}
							<a href="/projects" class="link-active"
								><li class="list-none">Projects</li></a
							>{:else}<a href="/projects"><li class="list-none">Projects</li></a>{/if}
						{#if current_url.startsWith('/notes')}
							<a href="/notes" class="link-active"><li class="list-none">Notes</li></a
							>{:else}<a href="/notes"><li class="list-none">Notes</li></a>{/if}
						{#if current_url.startsWith('/hire-me')}
							<a href="/hire-me" class="link-active">
								<li class="list-none flex flex-row-reverse">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="size-4"
									>
										<path
											fill-rule="evenodd"
											d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
											clip-rule="evenodd"
										/>
									</svg>
									Hire me
								</li>
							</a>
						{:else}
							<a href="/hire-me">
								<li class="list-none flex flex-row-reverse">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="size-4"
									>
										<path
											fill-rule="evenodd"
											d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
											clip-rule="evenodd"
										/>
									</svg>
									Hire me
								</li>
							</a>
						{/if}
						<br />
					</ul>
					<ul class="md:no-single-line-list single-line-list md:h-auto md:mb-0 mb-6">
						<li class="list-none">
							<a
								href="http://x.com/knlmsh/"
								class="flex flex-row-reverse align-middle"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path
										fill-rule="evenodd"
										d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								Twitter
							</a>
						</li>
						<li class="list-none">
							<a
								href="http://github.com/kunalm2345/"
								class="flex flex-row-reverse align-middle"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path
										fill-rule="evenodd"
										d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								Github</a
							>
						</li>
						<li class="list-none">
							<a
								href="http://instagr.am/knlmsh/"
								class="flex flex-row-reverse align-middle"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path
										fill-rule="evenodd"
										d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								Instagram</a
							>
						</li>
						<li class="list-none">
							<a
								href="https://www.linkedin.com/in/kunal-mishra-8238bb187/"
								class="flex flex-row-reverse align-middle"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path
										fill-rule="evenodd"
										d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								LinkedIn</a
							>
						</li>
						<li class="list-none">
							<a
								href="mailto:kunalm@duck.com"
								class="flex flex-row-reverse align-middle"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path
										fill-rule="evenodd"
										d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								Email</a
							>
						</li>
					</ul>
				</nav>
			</div>
			<div class="md:sticky md:top-24 hidden md:block">
				<div class="rotate-6 mb-7">
					<img
						src={me}
						alt="me, kunal"
						class="basis-1/3 w-36 h-full md:h-max border-white border-x-8 border-t-8"
					/>
					<p
						class="text-center handwritten font-bold bg-white basis-1/3 px-0 mx-0 py-1 border-x-8 border-white text-sm"
					>
						Kunal Mishra
					</p>
				</div>
				<nav class="md:basis-2/3 list-none text-right" data-sveltekit-reload>
					<ul class="md:no-single-line-list single-line-list md:h-auto md:mb-0 mb-6 text-2xl">
						{#if current_url == '/'}
							<a href="/" class="link-active"><li class="list-none">About</li></a
							>{:else}<a href="/"><li class="list-none">About</li></a>{/if}
						{#if current_url == '/work'}
							<a href="/work" class="link-active"><li class="list-none">Work</li></a
							>{:else}<a href="/work"><li class="list-none">Work</li></a>{/if}
						{#if current_url == '/projects'}
							<a href="/projects" class="link-active"
								><li class="list-none">Projects</li></a
							>{:else}<a href="/projects"><li class="list-none">Projects</li></a>{/if}
						{#if current_url.startsWith('/notes')}
							<a href="/notes" class="link-active"><li class="list-none">Notes</li></a
							>{:else}<a href="/notes"><li class="list-none">Notes</li></a>{/if}
						{#if current_url.startsWith('/hire-me')}
							<a href="/hire-me" class="link-active">
								<li class="list-none flex flex-row-reverse">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="size-4"
									>
										<path
											fill-rule="evenodd"
											d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
											clip-rule="evenodd"
										/>
									</svg>
									Hire me
								</li>
							</a>
						{:else}
							<a href="/hire-me">
								<li class="list-none flex flex-row-reverse">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="size-4"
									>
										<path
											fill-rule="evenodd"
											d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
											clip-rule="evenodd"
										/>
									</svg>
									Hire me
								</li>
							</a>
						{/if}
						<br />
					</ul>
					<ul class="md:no-single-line-list single-line-list md:h-auto md:mb-0 mb-6">
						<li class="list-none">
							<a
								href="http://x.com/knlmsh/"
								class="flex flex-row-reverse align-middle"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path
										fill-rule="evenodd"
										d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								Twitter
							</a>
						</li>
						<li class="list-none">
							<a
								href="http://github.com/kunalm2345/"
								class="flex flex-row-reverse align-middle"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path
										fill-rule="evenodd"
										d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								Github</a
							>
						</li>
						<li class="list-none">
							<a
								href="http://instagr.am/knlmsh/"
								class="flex flex-row-reverse align-middle"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path
										fill-rule="evenodd"
										d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								Instagram</a
							>
						</li>
						<li class="list-none">
							<a
								href="https://www.linkedin.com/in/kunal-mishra-8238bb187/"
								class="flex flex-row-reverse align-middle"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path
										fill-rule="evenodd"
										d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								LinkedIn</a
							>
						</li>
						<li class="list-none">
							<a
								href="mailto:kunalm@duck.com"
								class="flex flex-row-reverse align-middle"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path
										fill-rule="evenodd"
										d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								Email</a
							>
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
