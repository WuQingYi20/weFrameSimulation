// Context definitions and management

class Context {
    constructor(name, duration, frequency, frameLogic, climateCompatibility, color, overlapPotential = 0.1) {
        this.name = name;
        this.duration = duration; // in frames
        this.frequency = frequency; // 0-1
        this.frameLogic = frameLogic;
        this.climateCompatibility = climateCompatibility; // -1 to 1
        this.color = color; // hex color
        this.colorRgb = hexToRgb(color);
        this.overlapPotential = overlapPotential; // 0-1, how much GG and DG can overlap in this context
    }

    getBackgroundColor(alpha = 80) {
        // Return background color with low alpha for subtle effect
        return { ...this.colorRgb, a: alpha };
    }

    getIntensity() {
        // Returns intensity based on climate compatibility
        return Math.abs(this.climateCompatibility);
    }
}

class ContextManager {
    constructor() {
        this.contexts = [];
        this.currentContextIndex = 0;
        this.contextTimer = 0;
        this.transitionProgress = 0;
        this.transitionDuration = 30; // frames for smooth transition
        this.inTransition = false;
        this.shockActive = false;
        this.shockDuration = 0;
        this.previousContext = null;

        this.initializeContexts();
    }

    initializeContexts() {
        this.contexts = [
            new Context(
                "Shopping/Consumer Context",
                120, // 2 seconds at 60fps
                0.4,
                "Cheap goods, convenience, personal consumption",
                -0.5,
                "#FF6B6B", // red
                0.08 // Very low overlap - GG (green products) vs DG (anti-consumerism) rarely align
            ),
            new Context(
                "Workplace Context",
                180, // 3 seconds
                0.3,
                "Productivity, jobs, company survival, economic growth",
                -0.3,
                "#FFA07A", // light salmon
                0.05 // Almost zero overlap - jobs vs job reduction are incompatible
            ),
            new Context(
                "Community Meeting",
                60, // 1 second
                0.15,
                "Local concerns, neighbors, community well-being",
                0.6,
                "#95E1D3", // light green
                0.35 // Higher overlap - both support local initiatives, though for different reasons
            ),
            new Context(
                "Climate Context",
                30, // 0.5 seconds - intentionally short!
                0.15,
                "Planetary concern, future generations, ecological crisis",
                1.0,
                "#00B894", // green
                0.25 // Moderate overlap - both care about climate, but disagree on solutions
            )
        ];

        // Normalize frequencies
        this.normalizeFrequencies();
    }

    normalizeFrequencies() {
        const total = this.contexts.reduce((sum, ctx) => sum + ctx.frequency, 0);
        this.contexts.forEach(ctx => {
            ctx.frequency /= total;
        });
    }

    update() {
        if (this.shockActive) {
            this.shockDuration--;
            if (this.shockDuration <= 0) {
                this.shockActive = false;
                this.startTransition();
            }
            return;
        }

        this.contextTimer++;

        if (this.inTransition) {
            this.transitionProgress++;
            if (this.transitionProgress >= this.transitionDuration) {
                this.inTransition = false;
                this.transitionProgress = 0;
                this.previousContext = null;
            }
        } else {
            const currentContext = this.getCurrentContext();
            if (this.contextTimer >= currentContext.duration) {
                this.startTransition();
            }
        }
    }

    startTransition() {
        this.previousContext = this.getCurrentContext();
        this.selectNextContext();
        this.contextTimer = 0;
        this.transitionProgress = 0;
        this.inTransition = true;
    }

    selectNextContext() {
        // Weighted random selection based on frequency
        const rand = Math.random();
        let cumulative = 0;

        for (let i = 0; i < this.contexts.length; i++) {
            cumulative += this.contexts[i].frequency;
            if (rand < cumulative) {
                this.currentContextIndex = i;
                return;
            }
        }

        // Fallback
        this.currentContextIndex = 0;
    }

    getCurrentContext() {
        if (this.shockActive) {
            // Return climate context during shock
            return this.contexts.find(ctx => ctx.name === "Climate Context") || this.contexts[3];
        }
        return this.contexts[this.currentContextIndex];
    }

    getTransitionT() {
        if (!this.inTransition) return 1;
        return this.transitionProgress / this.transitionDuration;
    }

    getDisplayColor() {
        if (!this.inTransition || !this.previousContext) {
            return this.getCurrentContext().getBackgroundColor();
        }

        // Interpolate between previous and current context colors
        const t = this.getTransitionT();
        const c1 = this.previousContext.colorRgb;
        const c2 = this.getCurrentContext().colorRgb;

        return {
            r: lerp(c1.r, c2.r, t),
            g: lerp(c1.g, c2.g, t),
            b: lerp(c1.b, c2.b, t),
            a: 80
        };
    }

    setClimateContextFrequency(frequency) {
        // Adjust climate context frequency (0-1)
        const climateContext = this.contexts.find(ctx => ctx.name === "Climate Context");
        if (climateContext) {
            climateContext.frequency = frequency;
            this.normalizeFrequencies();
        }
    }

    triggerShock(duration = 180) { // 3 seconds default
        this.shockActive = true;
        this.shockDuration = duration;
        this.currentContextIndex = this.contexts.findIndex(ctx => ctx.name === "Climate Context");
        this.contextTimer = 0;
        this.inTransition = false;
    }

    getTimeInContext() {
        return this.contextTimer;
    }

    getProgress() {
        const currentContext = this.getCurrentContext();
        return this.contextTimer / currentContext.duration;
    }
}
