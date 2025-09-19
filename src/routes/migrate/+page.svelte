<!-- src/routes/migrate/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { convex } from '$lib/convex';
    // Using string-based function calls since API import is problematic
    import { posts } from '../notes/data.js';

    let migrating = $state(false);
    let migrated = $state(false);
    let results: Array<{path: string, status: string, title: string, error?: string}> = $state([]);

    async function migrateData() {
        migrating = true;
        results = [];

        try {
            for (const post of posts) {
                const path = `/notes/${post.slug}`;

                try {
                    console.log('Migrating post:', path, 'content length:', post.content.length);
                    const result = await convex.mutation("pages:savePageContent", {
                        path: path,
                        content: post.content
                    });
                    console.log('Migration result for', path, ':', result);

                    results.push({
                        path: path,
                        status: 'success',
                        title: post.title || post.slug
                    });
                } catch (error) {
                    console.error('Migration error for', path, ':', error);
                    results.push({
                        path: path,
                        status: 'error',
                        error: error instanceof Error ? error.message : 'Unknown error',
                        title: post.title || post.slug
                    });
                }
            }

            migrated = true;
        } catch (error) {
            console.error('Migration failed:', error);
        } finally {
            migrating = false;
        }
    }
</script>

<div class="max-w-2xl mx-auto space-y-6">
    <h1 class="text-3xl font-bold">Data Migration</h1>

    <div class="bg-yellow-50 border border-yellow-200 rounded p-4">
        <p class="text-yellow-800">
            This will migrate all notes from the static data.js file to Convex database.
            Run this once to populate your database with existing content.
        </p>
    </div>

    {#if !migrated}
        <button
            onclick={migrateData}
            disabled={migrating}
            class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50"
        >
            {migrating ? 'Migrating...' : 'Start Migration'}
        </button>
    {/if}

    {#if results.length > 0}
        <div class="space-y-2">
            <h2 class="text-xl font-semibold">Migration Results</h2>

            {#each results as result}
                <div class="p-3 border rounded {result.status === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}">
                    <div class="font-medium {result.status === 'success' ? 'text-green-800' : 'text-red-800'}">
                        {result.title}
                    </div>
                    <div class="text-sm {result.status === 'success' ? 'text-green-600' : 'text-red-600'}">
                        {result.path} - {result.status === 'success' ? 'Success' : result.error}
                    </div>
                </div>
            {/each}
        </div>
    {/if}

    {#if migrated}
        <div class="bg-green-50 border border-green-200 rounded p-4">
            <p class="text-green-800 font-medium">
                Migration completed! You can now use the unified dashboard.
            </p>
            <a href="/edit" class="text-green-700 underline">Go to Dashboard →</a>
        </div>
    {/if}
</div>