// Core State Management
// Handles local storage and in-memory state

export const State = {
    // Default State
    data: {
        userId: null,
        currentZone: 'zone1',
        traits: {
            orientation: { systems: 0, people: 0, outcome: 0 },
            productLens: { ux: 0, business: 0, system: 0 },
            changeInstinct: { rootCause: 0, redesign: 0, symptoms: 0 },
            decisionStyle: { deliberate: 0, decisive: 0, iterative: 0 },
            ambiguity: { avoids: 0, manages: 0, explores: 0 }
        },
        history: [], // Track choices
        completedZones: []
    },

    // Initialize or Load
    init() {
        // Check LocalStorage
        const saved = localStorage.getItem('utkarsh_hunt_state');
        if (saved) {
            this.data = JSON.parse(saved);
        } else {
            // Generate new User ID
            this.data.userId = 'user_' + Math.random().toString(36).substr(2, 9);
            this.save();
        }
        return this.data;
    },

    // Save to LocalStorage and Server
    save() {
        localStorage.setItem('utkarsh_hunt_state', JSON.stringify(this.data));

        // Async save to server
        fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: this.data.userId, state: this.data })
        }).catch(err => console.error('Save failed:', err));
    },

    // Update Traits
    updateTraits(traitChanges) {
        for (const [category, item] of Object.entries(traitChanges)) {
            // item matches { "orientation": "systems" } format stored in content.json
            // but we need to increment the score.
            // Wait, content.json has structure: traits: { orientation: 'systems' }
            // We need to increment this.data.traits[category][value]

            const value = item;
            if (this.data.traits[category] !== undefined) {
                if (this.data.traits[category][value] !== undefined) {
                    this.data.traits[category][value]++;
                }
            }
        }
        this.save();
    },

    // Complete Zone
    completeZone(zoneId) {
        if (!this.data.completedZones.includes(zoneId)) {
            this.data.completedZones.push(zoneId);
            this.save();
        }
    },

    reset() {
        localStorage.removeItem('utkarsh_hunt_state');
        // Reload page to re-init
        window.location.href = '/';
    }
};
