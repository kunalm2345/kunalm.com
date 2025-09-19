<!-- src/routes/edit/page/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { convex } from '$lib/convex';
    // Using string-based function calls since API import is problematic
    import TipTapEditor from '$lib/components/TipTapEditor.svelte';

    let loading = $state(true);
    let saving = $state(false);
    let content = $state('');
    let originalContent = $state('');
    let currentPath = $state('');
    let pageData = $state(null);
    let history = $state([]);
    let showHistory = $state(false);
    let error = $state('');

    $effect(() => {
        const urlPath = $page.url.searchParams.get('path');
        if (urlPath && urlPath !== currentPath) {
            currentPath = urlPath;
            loadPage();
        }
    });

    async function loadPage() {
        if (!currentPath) return;

        loading = true;
        error = '';

        try {
            console.log('Loading page:', currentPath);

            pageData = await convex.query("pages:getPage", { path: currentPath });
            console.log('Page data loaded:', pageData);

            content = pageData?.content || '';
            originalContent = content;

            const pageHistory = await convex.query("pages:getPageHistory", { path: currentPath });
            console.log('Page history loaded:', pageHistory);
            history = pageHistory;
        } catch (err) {
            console.error('Error loading page:', err);
            error = `Failed to load page content: ${err instanceof Error ? err.message : 'Unknown error'}`;
        } finally {
            loading = false;
        }
    }

    async function savePage() {
        if (!currentPath || saving) return;

        saving = true;
        error = '';

        try {
            console.log('Attempting to save page:', currentPath, 'with content length:', content.length);

            const result = await convex.mutation("pages:savePageContent", {
                path: currentPath,
                content: content
            });

            console.log('Save result:', result);
            originalContent = content;
            await loadPage(); // Refresh to get updated history
        } catch (err) {
            console.error('Error saving page:', err);
            error = `Failed to save page: ${err instanceof Error ? err.message : 'Unknown error'}`;
        } finally {
            saving = false;
        }
    }

    async function restoreFromHistory(historyContent: string) {
        content = historyContent;
        showHistory = false;
    }

    function hasUnsavedChanges() {
        return content !== originalContent;
    }

    function getPageTitle() {
        if (currentPath === '/') return 'Home Page';
        if (currentPath === '/work') return 'Work Experience';
        if (currentPath === '/projects') return 'Projects';
        if (currentPath === '/hire-me') return 'Hire Me';
        if (currentPath.startsWith('/notes/')) {
            return currentPath.replace('/notes/', '').replace(/-/g, ' ');
        }
        return currentPath;
    }

    function formatDate(timestamp: number) {
        return new Date(timestamp).toLocaleString();
    }

    onMount(() => {
        const urlPath = $page.url.searchParams.get('path');
        if (!urlPath) {
            goto('/edit');
            return;
        }
        currentPath = urlPath;
        loadPage();
    });
</script>

<svelte:head>
    <title>Edit: {getPageTitle()}</title>
</svelte:head>

{#if loading}
    <div class="text-center py-8">Loading...</div>
{:else}
    <div class="max-w-4xl mx-auto space-y-6">
        <!-- Header -->
        <div class="flex justify-between items-start">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
                <p class="text-sm text-gray-600 mt-1">{currentPath}</p>
                {#if pageData?.updatedAt}
                    <p class="text-xs text-gray-500 mt-1">
                        Last updated: {formatDate(pageData.updatedAt)}
                    </p>
                {/if}
            </div>

            <div class="flex space-x-2">
                {#if history.length > 0}
                    <button
                        onclick={() => showHistory = !showHistory}
                        class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                        History ({history.length})
                    </button>
                {/if}

                <button
                    onclick={() => goto('/edit')}
                    class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                    ← Back
                </button>

                <button
                    onclick={savePage}
                    disabled={saving || !hasUnsavedChanges()}
                    class="px-4 py-2 text-sm text-white bg-orange-600 rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>

        {#if error}
            <div class="p-4 bg-red-50 border border-red-200 rounded text-red-700">
                {error}
            </div>
        {/if}

        {#if hasUnsavedChanges()}
            <div class="p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
                You have unsaved changes
            </div>
        {/if}

        <!-- History Panel -->
        {#if showHistory}
            <div class="bg-gray-50 border rounded p-4">
                <h3 class="font-semibold mb-3">Page History</h3>
                {#if history.length > 0}
                    <div class="space-y-2 max-h-64 overflow-y-auto">
                        {#each history as item}
                            <div class="bg-white p-3 rounded border">
                                <div class="flex justify-between items-start">
                                    <div class="flex-1">
                                        <p class="text-xs text-gray-500 mb-2">
                                            {formatDate(item.timestamp)}
                                        </p>
                                        <p class="text-sm text-gray-700 truncate">
                                            {item.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                        </p>
                                    </div>
                                    <button
                                        onclick={() => restoreFromHistory(item.content)}
                                        class="ml-2 px-2 py-1 text-xs text-orange-600 border border-orange-600 rounded hover:bg-orange-50"
                                    >
                                        Restore
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <p class="text-gray-500 text-sm">No history available</p>
                {/if}
            </div>
        {/if}

        <!-- Editor -->
        <div class="bg-white border rounded">
            <TipTapEditor bind:content={content} />
        </div>
    </div>
{/if}