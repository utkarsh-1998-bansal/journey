// ==========================================
// UTKARSH'S WARM ROOM
// Dynamic Trait Engine - Game Logic
// ==========================================

// Load choice data
// (choices.js should be loaded before this file)

// ==========================================
// LETTER VARIANTS
// ==========================================
const letterVariants = {
  opening: {
    systems: "The way you moved through this suggests you see patterns before details. You noticed how things connected, not just what they were.",
    outcome: "The way you moved through this suggests you track impact instinctively. You asked what mattered, not just what was interesting.",
    people: "The way you moved through this suggests you notice the human layer first. You saw who was affected before what was broken."
  },

  ambiguity: {
    explores: "You seemed comfortable with gaps. That curiosity—the willingness to sit with unknowns—is rare.",
    manages: "You acknowledged uncertainty without letting it stall you. That balance is harder than it looks.",
    avoids: "You preferred clarity. There's wisdom in that—ambiguity can paralyze as easily as it can inspire."
  },

  decisionStyle: {
    deliberate: "You gathered context before committing. That patience protects against solving the wrong problem well.",
    iterative: "You chose quickly and adjusted. That adaptability matters when perfect information doesn't exist.",
    decisive: "You committed and moved forward. That confidence creates momentum others can follow."
  },

  noticing: {
    systemsRoot: "You kept zooming out to see how pieces fit together.",
    peopleUX: "You kept asking how this would feel to someone else.",
    outcomeBusiness: "You kept tracking what would actually change.",
    systemsRedesign: "You kept questioning whether the system itself needed rethinking.",
    peopleDeliberate: "You kept considering who this would affect and how.",
    outcomeDecisive: "You kept focusing on what needed to happen next."
  },

  connection: "Utkarsh's path was shaped by similar tensions—between depth and breadth, between understanding and shipping, between empathy and sustainability.\n\nThe difference isn't in the answers. It's in how those tensions became tools instead of obstacles.",

  invitation: "If the way you think resonates with the way this story unfolded, that's worth exploring further."
};

// ==========================================
// GAME STATE
// ==========================================
const gameState = {
  currentZone: 'landing',
  currentQuestion: 0,
  completedZones: [],
  traitState: {
    orientation: { systems: 0, outcome: 0, people: 0 },
    decisionStyle: { deliberate: 0, iterative: 0, decisive: 0 },
    ambiguity: { explores: 0, manages: 0, avoids: 0 },
    changeInstinct: { symptoms: 0, rootCause: 0, redesign: 0 },
    productLens: { ux: 0, business: 0, system: 0 },
    choices: []
  }
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  setupLanding();
});

// ==========================================
// FLOATING PARTICLES
// ==========================================
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (8 + Math.random() * 4) + 's';
    particlesContainer.appendChild(particle);
  }
}

// ==========================================
// LANDING PAGE
// ==========================================
function setupLanding() {
  const enterBtn = document.getElementById('enterBtn');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      startZone('zone1');
    });
  }
}

// ==========================================
// ZONE NAVIGATION
// ==========================================
function startZone(zoneId) {
  gameState.currentZone = zoneId;
  gameState.currentQuestion = 0;

  // Hide all zones
  document.querySelectorAll('.zone').forEach(z => z.classList.remove('active'));

  // Show target zone
  const targetZone = document.getElementById(zoneId);
  if (targetZone) {
    targetZone.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Add zone-specific objects
    createZoneObjects(zoneId);

    // Load first question
    loadQuestion(zoneId, 0);
  }
}

function createZoneObjects(zoneId) {
  // Remove existing objects
  const existing = document.querySelector('.zone-objects');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.className = 'zone-objects';

  if (zoneId === 'zone1') {
    // Biology zone - Brain and Heart
    container.innerHTML = `
      <div class="bio-brain">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path class="neuron-path" d="M100,50 Q120,70 100,90 T100,130" 
                stroke="#d4a574" stroke-width="3" fill="none" 
                stroke-dasharray="100" stroke-dashoffset="100"
                style="transition: all 1s ease;"/>
          <circle cx="100" cy="50" r="8" fill="#d4a574" opacity="0.6"/>
          <circle cx="100" cy="90" r="8" fill="#d4a574" opacity="0.6"/>
          <circle cx="100" cy="130" r="8" fill="#d4a574" opacity="0.6"/>
          <path d="M80,100 Q70,110 80,120 Q90,130 100,120 Q110,130 120,120 Q130,110 120,100 Q110,90 100,100 Q90,90 80,100" 
                fill="#c17a7a" opacity="0.3"/>
        </svg>
      </div>
      <div class="bio-heart">
        <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
          <path d="M70,120 C70,120 30,90 30,65 C30,45 45,35 55,35 C65,35 70,45 70,45 C70,45 75,35 85,35 C95,35 110,45 110,65 C110,90 70,120 70,120 Z" 
                fill="#c17a7a" opacity="0.4"/>
        </svg>
      </div>
    `;
  } else if (zoneId === 'zone2') {
    // Business zone - Cheque and Suitcase
    container.innerHTML = `
      <div class="business-cheque">
        <div style="padding: 1rem; font-family: 'Courier New', monospace; font-size: 0.75rem; color: var(--color-warm-dark);">
          <div style="text-align: right; margin-bottom: 0.5rem;">₹ _______</div>
          <div style="border-bottom: 1px solid var(--color-warm-light); margin: 0.5rem 0;"></div>
          <div style="font-size: 0.65rem; opacity: 0.6;">Pay to the order of...</div>
        </div>
      </div>
      <div class="business-suitcase">
        <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="30" width="80" height="60" rx="5" fill="#b8936a" opacity="0.5"/>
          <rect x="30" y="20" width="60" height="10" rx="3" fill="#b8936a" opacity="0.6"/>
          <rect x="55" y="50" width="10" height="15" rx="2" fill="#d4a574" opacity="0.7"/>
          <line x1="20" y1="60" x2="100" y2="60" stroke="#6b6862" stroke-width="2" opacity="0.4"/>
        </svg>
      </div>
    `;
  }

  if (container.innerHTML) {
    document.body.appendChild(container);
  }
}

function loadQuestion(zoneId, questionIndex) {
  const zoneData = choiceData[zoneId];
  if (!zoneData || !zoneData.moments[questionIndex]) return;

  const moment = zoneData.moments[questionIndex];
  const container = document.getElementById(`${zoneId}Content`);
  if (!container) return;

  // Always render moment story if it exists
  const storyHTML = moment.story ? `
      <div class="zone-story revealed">
        ${moment.story}
      </div>
    ` : '';

  container.innerHTML = `
    <div class="warm-card">
      ${storyHTML}
      
      <h3 style="color: var(--color-amber); margin-bottom: var(--space-lg);">
        ${zoneData.title}
      </h3>
      
      <p style="font-size: 1.25rem; margin-bottom: var(--space-xl); font-family: var(--font-story);">
        ${moment.prompt}
      </p>
      
      <div class="choice-grid" style="grid-template-columns: 1fr; gap: var(--space-md);">
        ${Object.keys(moment.options).map(key => `
          <div class="choice-card" data-choice="${key}">
            <p style="margin: 0; font-size: 1.125rem;">
              <strong>${key.toUpperCase()}.</strong> ${moment.options[key].text}
            </p>
          </div>
        `).join('')}
      </div>
      
      <div id="feedback${zoneId}${questionIndex}" class="hidden" style="margin-top: var(--space-xl);"></div>
    </div>
  `;

  // Add click handlers
  container.querySelectorAll('.choice-card').forEach(card => {
    card.addEventListener('click', () => {
      const choice = card.getAttribute('data-choice');
      handleChoice(zoneId, questionIndex, choice);
    });
  });
}

// ==========================================
// CHOICE HANDLING
// ==========================================
function handleChoice(zoneId, questionIndex, choiceKey) {
  const zoneData = choiceData[zoneId];
  const moment = zoneData.moments[questionIndex];
  const choice = moment.options[choiceKey];

  // Record choice
  gameState.traitState.choices.push({
    zone: zoneId,
    moment: moment.id,
    choice: choiceKey,
    timestamp: Date.now()
  });

  // Update traits
  updateTraits(choice.traits);

  // Show feedback
  showFeedback(zoneId, questionIndex, choice);

  // Disable choices and highlight selected
  const selectedCard = event.target.closest('.choice-card');
  document.querySelectorAll(`#${zoneId}Content .choice-card`).forEach(card => {
    card.style.pointerEvents = 'none';
    card.style.opacity = '0.5';
  });

  selectedCard.style.opacity = '1';
  selectedCard.classList.add('selected');

  // Show feedback with Continue button callback
  showFeedback(zoneId, questionIndex, choice, () => {
    const nextMoment = questionIndex + 1;
    if (nextMoment < zoneData.moments.length) {
      loadQuestion(zoneId, nextMoment);
    } else {
      completeZone(zoneId);
    }
  });
}

function updateTraits(traits) {
  for (const [dimension, value] of Object.entries(traits)) {
    if (gameState.traitState[dimension] && gameState.traitState[dimension][value] !== undefined) {
      gameState.traitState[dimension][value]++;
    }
  }
}

function showFeedback(zoneId, questionIndex, choice, onContinue) {
  const feedbackContainer = document.getElementById(`feedback${zoneId}${questionIndex}`);
  if (!feedbackContainer) return;

  feedbackContainer.classList.remove('hidden');
  feedbackContainer.innerHTML = `
    <div class="paper-note revealed">
      <p style="margin-bottom: var(--space-md); font-style: italic; color: var(--color-warm-mid);">
        ${choice.story}
      </p>
      <p style="margin-bottom: var(--space-md); color: var(--color-warm-dark);">
        ${choice.player}
      </p>
      <p style="margin-bottom: var(--space-lg); color: var(--color-amber); font-weight: 500;">
        I would have thought: ${choice.reflection}
      </p>
      <button class="warm-btn warm-btn-primary" id="continueBtn" style="margin-top: var(--space-md);">
        <span>Continue →</span>
      </button>
    </div>
  `;

  // Add continue button handler
  const continueBtn = document.getElementById('continueBtn');
  if (continueBtn && onContinue) {
    continueBtn.addEventListener('click', onContinue);
  }
}

function completeZone(zoneId) {
  gameState.completedZones.push(zoneId);

  // Determine next zone
  const zoneOrder = ['zone1', 'zone2', 'zone3', 'zone4', 'zone5'];
  const currentIndex = zoneOrder.indexOf(zoneId);
  const container = document.getElementById(`${zoneId}Content`);

  if (currentIndex < zoneOrder.length - 1) {
    const nextZone = zoneOrder[currentIndex + 1];

    // Show manual transition UI
    if (container) {
      container.innerHTML = `
        <div class="paper-note revealed" style="text-align: center; margin-top: var(--space-xl);">
          <h3 style="color: var(--color-warm-dark); margin-bottom: var(--space-md);">Section Complete</h3>
          <p style="color: var(--color-warm-mid); margin-bottom: var(--space-lg);">
            Take a moment before moving on.
          </p>
          <button class="warm-btn warm-btn-primary" id="nextZoneBtn">
            <span>Enter Next Section →</span>
          </button>
        </div>
      `;

      document.getElementById('nextZoneBtn').addEventListener('click', () => {
        startZone(nextZone);
      });
    }
  } else {
    // All zones complete - show manual transition to letter
    if (container) {
      container.innerHTML = `
        <div class="paper-note revealed" style="text-align: center; margin-top: var(--space-xl);">
          <h3 style="color: var(--color-warm-dark); margin-bottom: var(--space-md);">Journey Complete</h3>
          <p style="color: var(--color-warm-mid); margin-bottom: var(--space-lg);">
            The pieces are all here.
          </p>
          <button class="warm-btn warm-btn-primary" id="finalBtn">
            <span>Read the Letter →</span>
          </button>
        </div>
      `;

      document.getElementById('finalBtn').addEventListener('click', () => {
        generateLetter();
      });
    }
  }
}

// ==========================================
// TRAIT ANALYSIS
// ==========================================
function getDominantTrait(dimension) {
  const traits = gameState.traitState[dimension];
  let maxTrait = null;
  let maxValue = 0;

  for (const [trait, value] of Object.entries(traits)) {
    if (value > maxValue) {
      maxValue = value;
      maxTrait = trait;
    }
  }

  return maxTrait;
}

function getTop2Traits() {
  const allTraits = [];

  // Collect all traits with their scores
  for (const [dimension, traits] of Object.entries(gameState.traitState)) {
    if (dimension === 'choices') continue;

    for (const [trait, value] of Object.entries(traits)) {
      allTraits.push({ dimension, trait, value });
    }
  }

  // Sort by value
  allTraits.sort((a, b) => b.value - a.value);

  return allTraits.slice(0, 2);
}

// ==========================================
// LETTER GENERATION
// ==========================================
function generateLetter() {
  // Analyze traits
  const dominantOrientation = getDominantTrait('orientation');
  const dominantAmbiguity = getDominantTrait('ambiguity');
  const dominantDecision = getDominantTrait('decisionStyle');
  const top2 = getTop2Traits();

  // Determine noticing pattern
  let noticingKey = 'systemsRoot';
  if (top2.length >= 2) {
    const combo = `${top2[0].dimension}_${top2[0].trait}_${top2[1].dimension}_${top2[1].trait}`;

    if (combo.includes('systems') && combo.includes('rootCause')) {
      noticingKey = 'systemsRoot';
    } else if (combo.includes('people') && combo.includes('ux')) {
      noticingKey = 'peopleUX';
    } else if (combo.includes('outcome') && combo.includes('business')) {
      noticingKey = 'outcomeBusiness';
    } else if (combo.includes('systems') && combo.includes('redesign')) {
      noticingKey = 'systemsRedesign';
    } else if (combo.includes('people') && combo.includes('deliberate')) {
      noticingKey = 'peopleDeliberate';
    } else if (combo.includes('outcome') && combo.includes('decisive')) {
      noticingKey = 'outcomeDecisive';
    }
  }

  // Build letter
  const letter = `
    <div class="letter-card">
      <h2 style="color: var(--color-warm-dark); margin-bottom: var(--space-lg);">A Letter</h2>
      
      <div style="font-family: var(--font-story); font-size: 1.125rem; line-height: 1.8; margin: var(--space-lg) 0;">
        <p>${letterVariants.opening[dominantOrientation]}</p>
        
        <p>${letterVariants.ambiguity[dominantAmbiguity]}</p>
        
        <p>${letterVariants.decisionStyle[dominantDecision]}</p>
        
        <p>${letterVariants.noticing[noticingKey]}</p>
        
        <p>${letterVariants.connection}</p>
        
        <p>${letterVariants.invitation}</p>
        
        <p class="letter-signature">— Utkarsh</p>
      </div>
    </div>
    
    <div class="paper-note" style="margin-top: var(--space-xl);">
      <h3 style="color: var(--color-amber); margin-bottom: var(--space-md);">Patterns We Noticed</h3>
      <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: var(--space-sm);">• You tend to notice <strong>${dominantOrientation}</strong> first</li>
        <li style="margin-bottom: var(--space-sm);">• When uncertain, you <strong>${dominantDecision === 'deliberate' ? 'gather context' : dominantDecision === 'iterative' ? 'choose and adapt' : 'commit and move forward'}</strong></li>
        <li style="margin-bottom: var(--space-sm);">• You're drawn to <strong>${getDominantTrait('productLens')}</strong> thinking</li>
      </ul>
      <p style="margin-top: var(--space-md); font-style: italic; color: var(--color-warm-mid); font-size: 0.95rem;">
        This doesn't define you—it's just one lens on one journey.
      </p>
    </div>
    
    <div class="warm-card" style="margin-top: var(--space-xl);" id="today">
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

  // Show letter
  showLetter(letter);
}

function showLetter(letterHTML) {
  // Hide all zones
  document.querySelectorAll('.zone').forEach(z => z.classList.remove('active'));

  // Show final zone
  const finalZone = document.getElementById('final');
  if (finalZone) {
    finalZone.classList.add('active');
    const container = finalZone.querySelector('.zone-content');
    if (container) {
      container.innerHTML = letterHTML;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
