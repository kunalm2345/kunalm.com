<script lang="ts">
    import { onMount } from 'svelte';
    import { convex } from '$lib/convex';
    // Using string-based function calls since API import is problematic
    import { goto } from '$app/navigation';

    let pages = $state([]);
    let notes = $state([]);
    let loading = $state(true);

    const staticPages = [
        { path: '/', title: 'Home Page' },
        { path: '/work', title: 'Work Experience' },
        { path: '/projects', title: 'Projects' },
        { path: '/hire-me', title: 'Hire Me' },
    ];

    onMount(async () => {
        try {
            console.log('Dashboard: Loading all pages from Convex...');
            const allPages = await convex.query("pages:getAllPages");
            console.log('Dashboard: All pages loaded:', allPages);

            pages = staticPages.map(staticPage => {
                const savedPage = allPages.find(p => p.path === staticPage.path);
                return {
                    ...staticPage,
                    hasContent: !!savedPage,
                    lastUpdated: savedPage?.updatedAt
                };
            });

            notes = allPages.filter(page => page.path.startsWith('/notes/'));
            console.log('Dashboard: Pages processed:', pages);
            console.log('Dashboard: Notes found:', notes);

        } catch (error) {
            console.error('Dashboard: Error loading pages:', error);
        } finally {
            loading = false;
        }
    });

    function editPage(path) {
        goto(`/edit/page?path=${encodeURIComponent(path)}`);
    }

    function editNote(path) {
        goto(`/edit/page?path=${encodeURIComponent(path)}`);
    }

    function createNewNote() {
        const slug = prompt('Enter note slug (e.g., "my-note"):');
        if (slug) {
            const path = `/notes/${slug}`;
            goto(`/edit/page?path=${encodeURIComponent(path)}`);
        }
    }

    async function deleteNote(notePath, noteTitle) {
        const confirmed = confirm(`Are you sure you want to delete "${noteTitle}"?\n\nThis action cannot be undone.`);
        if (!confirmed) return;

        try {
            console.log('Deleting note:', notePath);
            await convex.mutation("pages:deletePage", { path: notePath });
            console.log('Note deleted successfully');

            // Refresh the page data
            location.reload();
        } catch (error) {
            console.error('Error deleting note:', error);
            alert('Failed to delete note. Please try again.');
        }
    }

    function formatDate(timestamp) {
        return new Date(timestamp).toLocaleDateString();
    }
</script>

<div class="space-y-8">
    <h1 class="font-serif text-6xl mb-8">Content Dashboard</h1>

    {#if loading}
        <div class="text-center py-8">Loading...</div>
    {:else}
        <!-- Pages Section -->
        <section>
            <div class="flex items-center justify-between mb-4">
                <p class="text-2xl font-bold uppercase">Pages</p>
                <div class="flex-1 mx-4 border-t border-gray-300"></div>
            </div>
            <table class="w-full text-left">
                <thead>
                    <tr class="text-xs uppercase text-gray-700 border-gray-200 border-b">
                        <th class="p-2">Title</th>
                        <th class="p-2">Path</th>
                        <th class="p-2">Last Updated</th>
                        <th class="p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {#each pages as page}
                        <tr class="border-b border-gray-200">
                            <td class="p-2">{page.title}</td>
                            <td class="p-2">{page.path}</td>
                            <td class="p-2">
                                {#if page.hasContent}
                                    {formatDate(page.lastUpdated)}
                                {:else}
                                    No content saved
                                {/if}
                            </td>
                            <td class="p-2">
                                <button
                                    onclick={() => editPage(page.path)}
                                    class="text-orange-600 hover:text-orange-700 p-1 rounded hover:bg-orange-50"
                                    title="Edit page"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </section>

        <!-- Notes Section -->
        <section>
            <div class="flex items-center justify-between mb-4">
                <p class="text-2xl font-bold uppercase">Notes</p>
                <div class="flex-1 mx-4 border-t border-gray-300"></div>
                <button
                    onclick={createNewNote}
                    class="px-4 py-2 text-sm uppercase font-bold text-white bg-orange-600 rounded hover:bg-orange-700"
                >
                    + New Note
                </button>
            </div>

            {#if notes.length > 0}
                <table class="w-full text-left">
                    <thead>
                        <tr class="text-xs uppercase text-gray-700 border-gray-200 border-b">
                            <th class="p-2">Title</th>
                            <th class="p-2">Path</th>
                            <th class="p-2">Last Updated</th>
                            <th class="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each notes as note}
                            <tr class="border-b border-gray-200">
                                <td class="p-2">{note.path.replace('/notes/', '').replace(/-/g, ' ')}</td>
                                <td class="p-2">{note.path}</td>
                                <td class="p-2">{formatDate(note.updatedAt)}</td>
                                <td class="p-2 flex">
                                    <button
                                        onclick={() => editNote(note.path)}
                                        class="text-orange-600 hover:text-orange-700 p-1 rounded hover:bg-orange-50 mr-2"
                                        title="Edit note"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onclick={() => deleteNote(note.path, note.path.replace('/notes/', '').replace(/-/g, ' '))}
                                        class="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50"
                                        title="Delete note"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {:else}
                <div class="text-center py-8 text-gray-500">
                    No notes created yet. Click "New Note" to get started.
                </div>
            {/if}
        </section>
    {/if}
</div>