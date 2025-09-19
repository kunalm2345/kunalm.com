<script>
    import { onMount } from 'svelte';
    import { authStore } from '$lib/stores/auth.ts';
    
    let { children } = $props();
    let pins = $state(['', '', '', '', '', '']);
    let error = $state('');
    let isAuthenticated = $state(false);
    let inputElements = $state([]);

    // Check if all pins are filled - FIXED FOR SVELTE 5
    let allFilled = $derived(pins.every(pin => pin !== '') && pins.join('').length === 6);

    onMount(() => {
        // Autofocus first input when component loads
        setTimeout(() => {
            inputElements[0]?.focus();
        }, 100);
    });

    $effect(() => {
        isAuthenticated = authStore.checkAuth();
    });

    function handleInput(index, event) {
        const value = event.target.value;
        
        // Only allow single digits
        if (!/^\d?$/.test(value)) {
            event.target.value = pins[index];
            return;
        }

        // Update the pins array
        pins[index] = value;
        
        // Move to next input if current is filled and not the last input
        if (value && index < 5) {
            inputElements[index + 1]?.focus();
        }
        
        // Auto-submit when all 6 digits are entered
        if (pins.every(pin => pin !== '') && pins.join('').length === 6) {
            setTimeout(() => handleLogin(), 200);
        }
        
        // Clear error when user starts typing
        if (error) {
            error = '';
        }
    }

    function handleKeydown(index, event) {
        // Handle backspace
        if (event.key === 'Backspace') {
            if (!pins[index] && index > 0) {
                // If current input is empty, move to previous and clear it
                pins[index - 1] = '';
                inputElements[index - 1]?.focus();
            } else {
                // Clear current input
                pins[index] = '';
            }
        }
        
        // Handle arrow keys
        if (event.key === 'ArrowLeft' && index > 0) {
            inputElements[index - 1]?.focus();
        }
        if (event.key === 'ArrowRight' && index < 5) {
            inputElements[index + 1]?.focus();
        }
        
        // Handle Enter
        if (event.key === 'Enter') {
            handleLogin();
        }
        
        // Clear error on any key press
        if (error) {
            error = '';
        }
    }

    function handlePaste(event) {
        event.preventDefault();
        const paste = (event.clipboardData || window.clipboardData).getData('text');
        const digits = paste.replace(/\D/g, '').slice(0, 6);
        
        // Fill the pins array with pasted digits
        for (let i = 0; i < 6; i++) {
            pins[i] = digits[i] || '';
        }
        
        // Focus appropriate input
        const focusIndex = Math.min(digits.length, 5);
        inputElements[focusIndex]?.focus();
        
        // Auto-submit if all 6 digits were pasted
        if (digits.length === 6) {
            setTimeout(() => handleLogin(), 200);
        }
        
        // Clear error
        error = '';
    }

    function handleLogin() {
        const pinString = pins.join('');
        console.log('Submitting PIN:', pinString);
        
        if (pinString.length !== 6) {
            error = 'Please enter all 6 digits';
            return;
        }
        
        const success = authStore.login(pinString);
        if (success) {
            error = '';
            console.log('Login successful, clearing form');
        } else {
            error = 'Invalid PIN';
            clearAll();
        }
    }

    function clearAll() {
        pins = ['', '', '', '', '', ''];
        setTimeout(() => {
            inputElements[0]?.focus();
        }, 100);
        error = '';
    }

    function handleFocus(index) {
        // Select all text when focusing (helpful for mobile)
        inputElements[index]?.select();
    }
</script>

{#if isAuthenticated}
    {@render children()}
{:else}
    <div class="max-w-md mx-auto my-24 space-y-8">
        <div>
            <h2 class="text-center text-3xl font-serif">
                Admin Access
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Enter your 6-digit PIN to continue
            </p>
        </div>
        
        <div class="space-y-6">
            <!-- PIN Input Grid -->
            <div class="flex gap-3 justify-center">
                {#each pins as pin, index}
                    <input
                        bind:this={inputElements[index]}
                        bind:value={pins[index]}
                        type="text"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        maxlength="1"
                        oninput={(e) => handleInput(index, e)}
                        onkeydown={(e) => handleKeydown(index, e)}
                        onfocus={() => handleFocus(index)}
                        onpaste={index === 0 ? handlePaste : (e) => e.preventDefault()}
                        class="w-12 h-12 text-center text-2xl font-mono border-2 rounded-lg 
                               border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
                               focus:outline-none transition-all duration-200
                               {pin ? 'border-orange-400 bg-orange-50' : ''}"
                        autocomplete="off"
                    />
                {/each}
            </div>
            
            {#if error}
                <div class="text-red-600 text-sm text-center font-medium animate-pulse">{error}</div>
            {/if}
            
            <!-- Main Submit Button -->
            <div class="space-y-3">
                <button
                    onclick={handleLogin}
                    disabled={!allFilled}
                    class="w-full py-3 px-6 rounded-lg text-white font-medium text-lg transition-all duration-200
                           {allFilled 
                               ? 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 shadow-md hover:shadow-lg' 
                               : 'bg-gray-300 cursor-not-allowed'}"
                >
                    {allFilled ? 'Sign In' : 'Enter PIN'}
                </button>
                
                <!-- Helper button -->
                <div class="text-center">
                    <button
                        onclick={clearAll}
                        class="text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                        Clear All
                    </button>
                </div>
            </div>
            
            <div class="text-xs text-center text-gray-400">
                Enter PIN digit by digit or paste to auto-fill
            </div>
        </div>
    </div>
{/if}