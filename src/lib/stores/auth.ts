import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const CORRECT_PIN = import.meta.env.VITE_EDIT_PASSWORD; // Make sure this matches what you're entering
const AUTH_KEY = 'admin_authenticated';

interface AuthStore {
    subscribe: (run: (value: boolean) => void) => () => void;
    login: (pin: string) => boolean;
    logout: () => void;
    checkAuth: () => boolean;
    isAuthenticated: () => boolean;
}

function createAuthStore(): AuthStore {
    const { subscribe, set } = writable<boolean>(false);

    return {
        subscribe,
        login: (pin: string): boolean => {
            console.log('Attempting login with PIN:', pin, 'Expected:', CORRECT_PIN); // Debug log
            if (pin === CORRECT_PIN) {
                if (browser) {
                    sessionStorage.setItem(AUTH_KEY, 'true');
                }
                set(true);
                console.log('Login successful'); // Debug log
                return true;
            }
            console.log('Login failed'); // Debug log
            return false;
        },
        logout: (): void => {
            if (browser) {
                sessionStorage.removeItem(AUTH_KEY);
            }
            set(false);
        },
        checkAuth: (): boolean => {
            if (browser) {
                const isAuth = sessionStorage.getItem(AUTH_KEY) === 'true';
                set(isAuth);
                return isAuth;
            }
            return false;
        },
        isAuthenticated: (): boolean => {
            if (browser) {
                return sessionStorage.getItem(AUTH_KEY) === 'true';
            }
            return false;
        }
    };
}

export const authStore = createAuthStore();