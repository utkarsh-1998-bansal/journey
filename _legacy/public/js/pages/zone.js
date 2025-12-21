import { State } from '../core/state.js';
import { API } from '../core/api.js';

const ZONE_ORDER = ['zone1', 'zone2', 'zone3', 'zone4', 'zone5'];

document.addEventListener('DOMContentLoaded', async () => {
    // Init State
    State.init();

    // Get Zone ID from URL
    const pathParts = window.location.pathname.split('/');
    const zoneId = pathParts[pathParts.length - 1]; // 'zone1'

    // Load Content
    const allContent = await API.getContent();
    const zoneData = allContent[zoneId];

    if (!zoneData) {
        document.getElementById('game-content').innerText = "Zone not found.";
        return;
    }

    // Render
    const renderer = new ZoneRenderer(zoneId, zoneData);
    renderer.start();
});

class ZoneRenderer {
    constructor(zoneId, data) {
        this.zoneId = zoneId;
        this.data = data;
        this.currentMomentIndex = 0;
        this.container = document.getElementById('game-content');
        this.bgLayer = document.getElementById('bg-layer');
    }

    start() {
        this.setupBackground();
        this.renderMoment(0);
    }

    setupBackground() {
        // Add zone specific SVGs
        if (this.zoneId === 'zone1') {
            this.bgLayer.innerHTML = `
            <div class="bio-brain"><svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><path class="neuron-path" d="M50 20 C 30 20, 20 40, 20 50 C 20 70, 40 80, 50 80 C 60 80, 80 70, 80 50 C 80 40, 70 20, 50 20 Z M 50 20 C 50 40, 30 50, 50 80 M 20 50 C 40 50, 50 50, 80 50" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <div class="bio-heart"><svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><path d="M50 80 C 50 80, 20 50, 20 35 C 20 25, 30 15, 40 15 C 45 15, 50 20, 50 25 C 50 20, 55 15, 60 15 C 70 15, 80 25, 80 35 C 80 50, 50 80, 50 80 Z" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
           `;
        } else if (this.zoneId === 'zone2') {
            this.bgLayer.innerHTML = `
            <div class="business-cheque"><div style="padding: 15px; font-family: monospace; font-size: 0.6rem; color: var(--color-warm-mid); opacity: 0.7;"><div>PAY TO: Utkarsh</div><div style="margin-top: 5px;">AMOUNT: ********</div></div></div>
            <div class="business-suitcase"><svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><rect x="20" y="30" width="60" height="40" rx="2" /><path d="M40 30 V 20 A 10 10 0 0 1 60 20 V 30" /></svg></div>
           `;
        }
    }

    renderMoment(index) {
        if (index >= this.data.moments.length) {
            this.showCompletion();
            return;
        }

        const moment = this.data.moments[index];

        let html = `
            <div class="warm-card revealed">
                <div class="zone-story">
                    ${moment.story}
                </div>
                
                <h3 style="color: var(--color-amber); margin-bottom: var(--space-lg);">
                    ${this.data.title}
                </h3>
                
                <p style="font-size: 1.25rem; margin-bottom: var(--space-xl); font-family: var(--font-story);">
                    ${moment.prompt}
                </p>
                
                <div class="choice-grid" style="grid-template-columns: 1fr; gap: var(--space-md);">
        `;

        Object.keys(moment.options).forEach(key => {
            const opt = moment.options[key];
            html += `
                <div class="choice-card" onclick="window.handleChoice('${key}')">
                    <p style="margin: 0; font-size: 1.125rem;">
                        <strong>${key.toUpperCase()}.</strong> ${opt.text}
                    </p>
                </div>
            `;
        });

        html += `</div>
            <div id="feedback-area" class="hidden" style="margin-top: var(--space-xl);"></div>
            <div id="next-btn-area" class="hidden text-center" style="margin-top: var(--space-lg);">
                 <button class="warm-btn warm-btn-secondary" onclick="window.nextMoment()">Continue</button>
            </div>
        </div>`;

        this.container.innerHTML = html;
        this.currentMomentIndex = index;

        // Expose handlers to global scope for onclick (quick hack for modules)
        window.handleChoice = (key) => this.handleChoice(key);
        window.nextMoment = () => this.renderMoment(this.currentMomentIndex + 1);
    }

    handleChoice(key) {
        const moment = this.data.moments[this.currentMomentIndex];
        const option = moment.options[key];

        // Update State
        State.updateTraits(option.traits);

        // Show Feedback
        const feedbackDiv = document.getElementById('feedback-area');
        const nextArea = document.getElementById('next-btn-area');
        const grid = document.querySelector('.choice-grid');

        // Visuals
        grid.style.pointerEvents = 'none';
        grid.style.opacity = '0.7';

        feedbackDiv.innerHTML = `
            <div class="paper-note revealed">
                <p><strong>I would have thought...</strong></p>
                <p>${option.reflection}</p>
            </div>
        `;
        feedbackDiv.classList.remove('hidden');
        nextArea.classList.remove('hidden');
    }

    showCompletion() {
        // Find next zone
        const currentIndex = ZONE_ORDER.indexOf(this.zoneId);
        const islast = currentIndex === ZONE_ORDER.length - 1;

        let html = `
            <div class="warm-card revealed text-center">
                <h2>${this.data.title} Complete</h2>
                <p style="margin: var(--space-lg) 0;">The journey continues...</p>
        `;

        if (islast) {
            html += `<button class="warm-btn warm-btn-primary" onclick="window.location.href='/final'">View The Letter</button>`;
        } else {
            const nextZone = ZONE_ORDER[currentIndex + 1];
            html += `<button class="warm-btn warm-btn-primary" onclick="window.location.href='/zone/${nextZone}'">Enter Next Zone</button>`;
        }

        html += `</div>`;
        this.container.innerHTML = html;

        State.completeZone(this.zoneId);
    }
}
