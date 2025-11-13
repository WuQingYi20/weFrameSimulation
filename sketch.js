// Main p5.js sketch

// Global variables
let agents = [];
let contextManager;
let attractorManager;
let uiController;
let dashboard;
let climateGoalIndicator;

// Canvas dimensions
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
const NUM_AGENTS = 50;

// Global parameters (controlled by UI)
window.globalFrameInertia = 0.3;

function setup() {
    // Create canvas and attach to container
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.parent('canvas-container');

    // Initialize managers
    contextManager = new ContextManager();
    attractorManager = new AttractorManager(CANVAS_WIDTH, CANVAS_HEIGHT);
    uiController = new UIController(contextManager, attractorManager);

    // Initialize dashboard and climate goal indicator (HTML-based, no canvas position needed)
    dashboard = new Dashboard();
    climateGoalIndicator = new ClimateGoalIndicator();

    // Initialize agents
    for (let i = 0; i < NUM_AGENTS; i++) {
        const x = random(100, CANVAS_WIDTH - 100);
        const y = random(100, CANVAS_HEIGHT - 100);
        agents.push(new Agent(x, y, CANVAS_WIDTH, CANVAS_HEIGHT));
    }

    // Set frame rate
    frameRate(60);
}

function draw() {
    // Update context
    contextManager.update();
    const currentContext = contextManager.getCurrentContext();

    // Draw background with context color
    const bgColor = contextManager.getDisplayColor();
    background(bgColor.r, bgColor.g, bgColor.b, bgColor.a);

    // Add darker overlay for better contrast
    fill(0, 0, 0, 50);
    rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Display context name (large, centered)
    displayContextBanner(currentContext);

    // Update and display agents
    for (let agent of agents) {
        agent.updateForces(agents, currentContext, attractorManager, window.globalFrameInertia);
    }

    for (let agent of agents) {
        agent.updatePosition();
        agent.updateClimateCommitment(currentContext);
    }

    // Display connections first (behind agents)
    for (let agent of agents) {
        agent.displayConnections(150);
    }

    // Display attractors
    attractorManager.display(currentContext.name);

    // Display agents
    for (let agent of agents) {
        agent.display();
    }

    // Update UI elements (HTML-based, no display needed)
    const contextProgress = contextManager.getProgress();
    dashboard.update(agents, currentContext, contextProgress);
    climateGoalIndicator.update(agents, currentContext);

    // Display shock indicator if active
    if (contextManager.shockActive) {
        displayShockIndicator();
    }
}

function displayContextBanner(currentContext) {
    push();

    // Semi-transparent banner across full width
    fill(0, 0, 0, 150);
    noStroke();
    const bannerHeight = 60;
    rect(0, 0, CANVAS_WIDTH, bannerHeight);

    // Context name
    fill(currentContext.colorRgb.r, currentContext.colorRgb.g, currentContext.colorRgb.b);
    textAlign(CENTER, TOP);
    textSize(20);
    textStyle(BOLD);
    text(currentContext.name, CANVAS_WIDTH / 2, 12);

    // Frame logic description
    fill(200, 200, 200);
    textSize(11);
    textStyle(NORMAL);
    text(currentContext.frameLogic, CANVAS_WIDTH / 2, 38);

    pop();
}

function displayShockIndicator() {
    push();

    // Pulsing red border
    noFill();
    stroke(255, 107, 107, 150 + Math.sin(frameCount * 0.2) * 100);
    strokeWeight(6);
    rect(3, 3, CANVAS_WIDTH - 6, CANVAS_HEIGHT - 6);

    // Shock text
    fill(255, 107, 107);
    textAlign(CENTER, CENTER);
    textSize(24);
    textStyle(BOLD);
    text("CLIMATE SHOCK EVENT", CANVAS_WIDTH / 2, 30);

    pop();
}

// Keyboard shortcuts
function keyPressed() {
    if (key === 's' || key === 'S') {
        // Trigger shock
        contextManager.triggerShock(180);
    }

    if (key === 'r' || key === 'R') {
        // Reset simulation
        window.location.reload();
    }

    if (key === ' ') {
        // Pause/unpause
        if (isLooping()) {
            noLoop();
        } else {
            loop();
        }
    }
}

// Window resize handler
function windowResized() {
    // Optional: handle window resize
    // For now, we keep canvas size fixed
}
