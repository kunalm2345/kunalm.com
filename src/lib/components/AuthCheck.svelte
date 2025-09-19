<!-- src/lib/components/AuthCheck.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { authStore } from '$lib/stores/auth';

    let { children } = $props();
    
    let pin = $state('');
    let error = $state('');
    let isAuthenticated = $state(false);

    onMount(() => {
        isAuthenticated = authStore.checkAuth();
    });

    authStore.subscribe(value => {
        isAuthenticated = value;
    });

    function handleLogin() {
        const success = authStore.login(pin);
        if (success) {
            error = '';
            pin = '';
        } else {
            error = 'Invalid PIN';
            pin = '';
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }
</script>

{#if isAuthenticated}
    {@render children()}
{:else}
    <div class="flex items-center ">
        <div class="max-w-sm w-full space-y-8">
            <div>
                <h1 class="">
                    Admin Access
                </h1>
            </div>
            <div class="mt-8 space-y-2">
                <div>
                    <input
                        bind:value={pin}
                        onkeydown={handleKeydown}
                        type="password"
                        maxlength="6"
                        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm text-center text-2xl tracking-widest"
                        placeholder="••••••"
                        autocomplete="off"
                    />
                </div>
                
                {#if error}
                    <div class="text-red-600 text-sm text-center">{error}</div>
                {/if}
                
                <div>
                    <button
                        onclick={handleLogin}
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}