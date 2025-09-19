// src/lib/stores/content.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const CONTENT_KEY = 'website_content';

interface ContentStore {
    [path: string]: string;
}

function createContentStore() {
    const { subscribe, set, update } = writable<ContentStore>({});

    return {
        subscribe,
        loadContent: (): ContentStore => {
            if (browser) {
                const saved = localStorage.getItem(CONTENT_KEY);
                if (saved) {
                    try {
                        const parsed: ContentStore = JSON.parse(saved);
                        set(parsed);
                        return parsed;
                    } catch (e) {
                        console.error('Failed to parse saved content:', e);
                    }
                }
            }
            return {};
        },
        savePageContent: (path: string, content: string): void => {
            update((store: ContentStore) => {
                const newStore = { ...store, [path]: content };
                if (browser) {
                    localStorage.setItem(CONTENT_KEY, JSON.stringify(newStore));
                }
                return newStore;
            });
        },
        getPageContent: (path: string, fallback: string = ''): string => {
            const store: ContentStore = browser ? JSON.parse(localStorage.getItem(CONTENT_KEY) || '{}') : {};
            return store[path] || fallback;
        }
    };
}

export const contentStore = createContentStore();