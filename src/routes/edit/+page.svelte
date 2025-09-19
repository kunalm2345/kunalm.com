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
            <h2 class="text-2xl font-bold mb-4">Pages</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each pages as page}
                    <button
                        onclick={() => editPage(page.path)}
                        class="p-4 border rounded hover:border-orange-500 transition-all text-left {page.hasContent ? 'bg-green-50 border-green-200' : 'bg-gray-50'}"
                    >
                        <h3 class="font-semibold">{page.title}</h3>
                        <p class="text-sm text-gray-600">{page.path}</p>
                        {#if page.hasContent}
                            <p class="text-xs text-green-600 mt-1">Last updated: {formatDate(page.lastUpdated)}</p>
                        {:else}
                            <p class="text-xs text-gray-500 mt-1">No content saved</p>
                        {/if}
                    </button>
                {/each}
            </div>
        </section>

        <!-- Notes Section -->
        <section>
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold">Notes</h2>
                <button
                    onclick={createNewNote}
                    class="px-4 py-2 text-sm text-white bg-orange-600 rounded hover:bg-orange-700"
                >
                    + New Note
                </button>
            </div>

            {#if notes.length > 0}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each notes as note}
                        <div class="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-orange-500 transition-all relative group">
                            <button
                                onclick={() => editNote(note.path)}
                                class="w-full text-left"
                            >
                                <h3 class="font-semibold text-gray-900">
                                    {note.path.replace('/notes/', '').replace(/-/g, ' ')}
                                </h3>
                                <p class="text-sm text-gray-600 mt-1">{note.path}</p>
                                <p class="text-xs text-gray-500 mt-2">
                                    Last updated: {formatDate(note.updatedAt)}
                                </p>
                                <p class="text-xs text-gray-500 mt-1 truncate">
                                    {note.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                </p>
                            </button>

                            <!-- Delete button -->
                            <button
                                onclick={(e) => {
                                    e.stopPropagation();
                                    deleteNote(note.path, note.path.replace('/notes/', '').replace(/-/g, ' '));
                                }}
                                class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                title="Delete note"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="text-center py-8 text-gray-500">
                    No notes created yet. Click "New Note" to get started.
                </div>
            {/if}
        </section>
    {/if}
</div>