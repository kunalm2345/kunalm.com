<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import Link from '@tiptap/extension-link';
    import Placeholder from '@tiptap/extension-placeholder';

    let { content = $bindable(''), placeholder = 'Start typing...' } = $props();

    let element;
    let editor = $state();

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                StarterKit.configure({
                    // Don't create paragraphs automatically
                    paragraph: {
                        HTMLAttributes: {
                            class: 'text-2xl', // Default paragraph styling
                        },
                    },
                }),
                Link.configure({
                    openOnClick: false,
                    HTMLAttributes: {
                        class: 'text-blue-600 underline',
                    },
                }),
                Placeholder.configure({
                    placeholder,
                }),
            ],
            content,
            onTransaction: () => {
                editor = editor;
            },
            onUpdate: ({ editor }) => {
                content = editor.getHTML();
            },
            editorProps: {
                attributes: {
                    class: 'focus:outline-none min-h-[400px] p-4',
                },
            },
        });
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });

    export function setContent(newContent) {
        if (editor) {
            editor.commands.setContent(newContent, false);
        }
    }

    export function getContent() {
        return editor ? editor.getHTML() : content;
    }

    // Update content when prop changes
    $effect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content, false);
        }
    });
</script>

<div class="border rounded-lg">
    <!-- Toolbar -->
    {#if editor}
        <div class="border-b p-2 flex flex-wrap gap-1">
            <button
                class="px-2 py-1 text-sm border rounded hover:bg-gray-100 {editor.isActive('bold') ? 'bg-gray-200' : ''}"
                onclick={() => editor.chain().focus().toggleBold().run()}
            >
                <strong>B</strong>
            </button>
            <button
                class="px-2 py-1 text-sm border rounded hover:bg-gray-100 {editor.isActive('italic') ? 'bg-gray-200' : ''}"
                onclick={() => editor.chain().focus().toggleItalic().run()}
            >
                <em>I</em>
            </button>
            <button
                class="px-2 py-1 text-sm border rounded hover:bg-gray-100"
                onclick={() => {
                    const url = window.prompt('URL');
                    if (url) {
                        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                    }
                }}
            >
                Link
            </button>
            <button
                class="px-2 py-1 text-sm border rounded hover:bg-gray-100 {editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}"
                onclick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                H1
            </button>
            <button
                class="px-2 py-1 text-sm border rounded hover:bg-gray-100 {editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}"
                onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                H2
            </button>
            <button
                class="px-2 py-1 text-sm border rounded hover:bg-gray-100 {editor.isActive('bulletList') ? 'bg-gray-200' : ''}"
                onclick={() => editor.chain().focus().toggleBulletList().run()}
            >
                • List
            </button>
            <button
                class="px-2 py-1 text-sm border rounded hover:bg-gray-100 {editor.isActive('blockquote') ? 'bg-gray-200' : ''}"
                onclick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                Quote
            </button>
        </div>
    {/if}
    
    <!-- Editor -->
    <div bind:this={element}></div>
</div>

<style>
    :global(.ProseMirror) {
        outline: none;
    }
    
    :global(.ProseMirror p.is-editor-empty:first-child::before) {
        content: attr(data-placeholder);
        float: left;
        color: #adb5bd;
        pointer-events: none;
        height: 0;
    }

    /* Apply your existing styles to the editor content */
    :global(.ProseMirror h1) {
        @apply font-serif text-6xl mb-4;
    }

    :global(.ProseMirror h2) {
        @apply font-serif text-4xl mb-3;
    }

    :global(.ProseMirror p) {
        @apply text-2xl;
        margin-bottom: 1rem;
    }

    :global(.ProseMirror a) {
        @apply text-blue-600 font-bold underline;
    }

    :global(.ProseMirror small) {
        @apply text-sm text-gray-500;
    }

    :global(.ProseMirror ul) {
        @apply text-2xl list-inside space-y-8;
    }

    :global(.ProseMirror blockquote) {
        @apply border-l-4 bg-orange-200 border-orange-400 p-4;
    }
</style>