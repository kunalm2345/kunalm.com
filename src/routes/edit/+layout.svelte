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
        <div class="min-h-screen bg-gray-50">
            <!-- Header -->
            <div class="bg-white shadow-sm border-b">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center py-4">
                        <h1 class="text-xl font-semibold text-gray-900">Content Editor</h1>
                        <button
                            onclick={logout}
                            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <!-- Content -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {@render children()}
            </div>
        </div>
    {/snippet}
</AuthCheck>