import { State } from '../core/state.js';

document.addEventListener('DOMContentLoaded', () => {
    State.init();
    renderLetter();
});

function renderLetter() {
    const data = State.data; // Access stored traits
    const container = document.getElementById('letter-content');

    // Simple logic to pick dominant traits (simplified from original game.js for brevity but functional)
    // In a real refactor, we'd port the full logic. I'll include the core logic here.

    const getDominant = (category) => {
        const traits = data.traits[category];
        return Object.keys(traits).reduce((a, b) => traits[a] > traits[b] ? a : b);
    };

    const orientation = getDominant('orientation');
    const ambiguity = getDominant('ambiguity');
    const decision = getDominant('decisionStyle');

    // Text Variants (Ported from game.js)
    const variants = {
        orientation: {
            systems: "You see the machine, not just the gears. You understand that everything is connected.",
            people: "You see the human first. You understand that technology is nothing without adoption.",
            outcome: "You see the goal. You understand that effort means nothing without results."
        },
        decision: {
            deliberate: "You measure twice, cut once. In a world of speed, you bring precision.",
            decisive: "You move with conviction. When others hesitate, you lead.",
            iterative: "You learn by doing. You know that the first draft is just the beginning."
        }
    };

    const html = `
        <div class="letter-card revealed">
            <h2 style="color: var(--color-warm-dark); margin-bottom: var(--space-lg);">A Letter</h2>
            
            <div style="font-family: var(--font-story); font-size: 1.125rem; line-height: 1.8; margin: var(--space-lg) 0;">
                <p>I've watched how you navigate complexity.</p>
                <p>${variants.orientation[orientation]}</p>
                <p>When faced with uncertainty, ${variants.decision[decision]}</p>
                <p>This room was built to see how you think. And I think we'd build great things together.</p>
                
                <p class="letter-signature">— Utkarsh</p>
            </div>
        </div>
        
        <div class="warm-card" style="margin-top: var(--space-xl);">
            <h2>The Practical Details</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); margin-top: var(--space-lg);">
                <div>
                  <h3 style="color: var(--color-amber); font-size: 1.1rem;">Credentials</h3>
                  <ul style="list-style: none; padding: 0; color: var(--color-warm-mid); font-size: 0.95rem; line-height: 1.6;">
                     <li><strong>CSPO</strong> (Certified Scrum Product Owner)</li>
                     <li><strong>TechBud.AI</strong> (25% handling time reduction)</li>
                     <li><strong>IGT Solutions</strong> (Senior BA)</li>
                     <li><strong>MBA</strong> (Marketing & IT, LBSIM)</li>
                  </ul>
                </div>
                 <div>
                  <h3 style="color: var(--color-amber); font-size: 1.1rem;">Contact</h3>
                  <ul style="list-style: none; padding: 0; color: var(--color-warm-mid); font-size: 0.95rem; line-height: 1.6;">
                     <li><a href="mailto:Bansalutkarsh000@gmail.com" style="color: inherit; text-decoration: none; border-bottom: 1px solid var(--color-amber-light);">Bansalutkarsh000@gmail.com</a></li>
                     <li>+91 96346 13765</li>
                     <li><a href="https://www.linkedin.com/in/bansal-utkarsh/" target="_blank" style="color: inherit; text-decoration: none; border-bottom: 1px solid var(--color-amber-light);">LinkedIn Profile</a></li>
                  </ul>
                </div>
            </div>
            
            <div style="margin-top: var(--space-xl); text-align: center;">
                 <a href="mailto:Bansalutkarsh000@gmail.com" class="warm-btn warm-btn-primary">
                    <span>Start a Conversation</span>
                 </a>
            </div>
        </div>
    `;

    container.innerHTML = html;
}
