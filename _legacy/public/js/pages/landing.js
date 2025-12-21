import { State } from '../core/state.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Particles (Simulated for this modular version)
    // We could move particle logic to separate file but for simplicity:
    const pContainer = document.getElementById('particles');
    // ... particle logic if needed ...

    const enterBtn = document.getElementById('enterBtn');
    enterBtn.addEventListener('click', () => {
        // Reset state for new game
        State.reset();
        // Force redirect (reset() usually does this but let's be explicit)
        window.location.href = '/zone/zone1';
    });
});
