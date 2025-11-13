// Attractors for Green Growth and Degrowth paradigms

class Attractor {
    constructor(name, position, strengthInContext, color) {
        this.name = name;
        this.position = position; // Vector2D
        this.strengthInContext = strengthInContext; // object mapping context names to strength values
        this.color = color;
        this.baseRadius = 30;
    }

    getStrength(contextName) {
        return this.strengthInContext[contextName] || 0;
    }

    calculateForce(agentPos, contextName, agentIdentity) {
        // Only attract agents with matching identity
        if (agentIdentity !== this.name.toLowerCase().replace(' ', '_')) {
            return new Vector2D(0, 0);
        }

        const strength = this.getStrength(contextName);
        if (strength <= 0) {
            return new Vector2D(0, 0);
        }

        const force = Vector2D.sub(this.position, agentPos);
        const dist = force.mag();

        if (dist < 1) return new Vector2D(0, 0);

        force.normalize();
        const magnitude = (strength * 0.5) / (dist * 0.1 + 1);
        force.mult(magnitude);

        return force;
    }

    display(contextName) {
        const strength = this.getStrength(contextName);
        if (strength <= 0) return;

        push();

        // Pulsing effect based on strength
        const pulseRadius = this.baseRadius * (1 + Math.sin(frameCount * 0.05) * 0.1);
        const alpha = strength * 150;

        // Outer glow
        noFill();
        stroke(this.color.r, this.color.g, this.color.b, alpha * 0.3);
        strokeWeight(2);
        circle(this.position.x, this.position.y, pulseRadius * 2.5);

        // Inner circle
        fill(this.color.r, this.color.g, this.color.b, alpha * 0.5);
        noStroke();
        circle(this.position.x, this.position.y, pulseRadius);

        // Label
        fill(255, 255, 255, alpha);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text(this.name, this.position.x, this.position.y + pulseRadius + 15);

        pop();
    }
}

class AttractorManager {
    constructor(canvasWidth, canvasHeight) {
        this.attractors = [];
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.greenGrowthStrength = 0.6;
        this.degrowthStrength = 0.6;

        this.initializeAttractors();
    }

    initializeAttractors() {
        // Green Growth Attractor (left side)
        this.greenGrowthAttractor = new Attractor(
            "Green Growth",
            new Vector2D(this.canvasWidth * 0.3, this.canvasHeight * 0.5),
            {
                "Shopping/Consumer Context": 0.2,
                "Workplace Context": 0.8, // Strong in work context
                "Community Meeting": 0.4,
                "Climate Context": 0.6
            },
            { r: 100, g: 150, b: 255 } // Blue-ish
        );

        // Degrowth Attractor (right side)
        this.degrowthAttractor = new Attractor(
            "Degrowth",
            new Vector2D(this.canvasWidth * 0.7, this.canvasHeight * 0.5),
            {
                "Shopping/Consumer Context": 0.1,
                "Workplace Context": 0.1,
                "Community Meeting": 0.5,
                "Climate Context": 0.9 // Strongest in climate context
            },
            { r: 100, g: 255, b: 150 } // Green-ish
        );

        this.attractors = [this.greenGrowthAttractor, this.degrowthAttractor];
    }

    updateStrengths() {
        // Update all strength values based on control parameters
        Object.keys(this.greenGrowthAttractor.strengthInContext).forEach(key => {
            this.greenGrowthAttractor.strengthInContext[key] *= this.greenGrowthStrength;
        });

        Object.keys(this.degrowthAttractor.strengthInContext).forEach(key => {
            this.degrowthAttractor.strengthInContext[key] *= this.degrowthStrength;
        });
    }

    setGreenGrowthStrength(strength) {
        this.greenGrowthStrength = strength;
    }

    setDegrowthStrength(strength) {
        this.degrowthStrength = strength;
    }

    calculateForces(agentPos, contextName, agentIdentity) {
        const totalForce = new Vector2D(0, 0);

        for (let attractor of this.attractors) {
            const force = attractor.calculateForce(agentPos, contextName, agentIdentity);
            totalForce.add(force);
        }

        return totalForce;
    }

    display(contextName) {
        for (let attractor of this.attractors) {
            attractor.display(contextName);
        }
    }

    resize(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.greenGrowthAttractor.position = new Vector2D(canvasWidth * 0.3, canvasHeight * 0.5);
        this.degrowthAttractor.position = new Vector2D(canvasWidth * 0.7, canvasHeight * 0.5);
    }
}
