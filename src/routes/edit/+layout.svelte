<!-- src/routes/edit/+layout.svelte -->
<script lang="ts">
    import AuthCheck from '$lib/components/AuthCheck.svelte';
    import { authStore } from '$lib/stores/auth';

    let { children } = $props();

    function logout() {
        authStore.logout();
    }
</script>

<AuthCheck>
    {#snippet children()}
        <div class="min-h-screen">
            <!-- Header -->
                <div class="max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-end items-center">
                        <button
                            onclick={logout}
                            class="px-4 py-2 text-sm uppercase underline font-bold text-gray-600 hover:text-gray-900"
                        >
                            Logout
                        </button>
                    </div>
            </div>

            <!-- Content -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {@render children()}
            </div>
        </div>
    {/snippet}
</AuthCheck>