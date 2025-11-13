// Agent class representing individuals in the simulation

class Agent {
    constructor(x, y, canvasWidth, canvasHeight) {
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(
            randomGaussian(0, 0.5),
            randomGaussian(0, 0.5)
        );
        this.acceleration = new Vector2D(0, 0);

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        // Climate commitment (0-1)
        this.climateCommitment = Math.random() * 0.3; // Start low

        // Identity type
        const rand = Math.random();
        if (rand < 0.35) {
            this.identityType = "green_growth";
        } else if (rand < 0.7) {
            this.identityType = "degrowth";
        } else {
            this.identityType = "undecided";
        }

        // Baseline relationships (simplified - could be expanded)
        this.baselineAffinity = Math.random();

        // Current We-frame connections
        this.weFrameConnections = [];

        // Visual properties
        this.baseRadius = 8;
        this.currentRadius = this.baseRadius;

        // Frame inertia (resistance to context switching)
        this.frameInertia = 0.3; // 0-1, will be set by control
        this.lastContextName = null;

        // For force calculations
        this.perceptionRadius = 150;
        this.separationRadius = 30;
        this.alignmentRadius = 80;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    updateForces(agents, currentContext, attractorManager, frameInertia) {
        this.frameInertia = frameInertia;
        this.acceleration.mult(0); // Reset acceleration

        // 1. Social forces (agent-agent interaction)
        const socialForce = this.calculateSocialForce(agents, currentContext);
        this.applyForce(socialForce);

        // 2. Attractor forces (paradigm attractors)
        const attractorForce = attractorManager.calculateForces(
            this.position,
            currentContext.name,
            this.identityType
        );
        this.applyForce(attractorForce);

        // 3. Boundary forces (keep agents on screen)
        const boundaryForce = this.calculateBoundaryForce();
        this.applyForce(boundaryForce);

        // Update We-frame connections
        this.updateWeFrameConnections(agents, currentContext);
    }

    calculateSocialForce(agents, currentContext) {
        const separation = new Vector2D(0, 0);
        const alignment = new Vector2D(0, 0);
        const cohesion = new Vector2D(0, 0);

        let separationCount = 0;
        let alignmentCount = 0;
        let cohesionCount = 0;

        for (let other of agents) {
            if (other === this) continue;

            const dist = Vector2D.dist(this.position, other.position);

            // Separation (avoid crowding)
            if (dist < this.separationRadius && dist > 0) {
                const diff = Vector2D.sub(this.position, other.position);
                diff.normalize();
                diff.div(dist); // Weight by distance
                separation.add(diff);
                separationCount++;
            }

            // Context-dependent clustering
            if (dist < this.perceptionRadius) {
                const compatibility = this.calculateContextCompatibility(other, currentContext);

                if (compatibility > 0.3) { // Threshold for interaction
                    // Alignment
                    alignment.add(other.velocity);
                    alignmentCount++;

                    // Cohesion (attraction to similar others)
                    const cohesionForce = Vector2D.sub(other.position, this.position);
                    cohesionForce.mult(compatibility);
                    cohesion.add(cohesionForce);
                    cohesionCount++;
                }
            }
        }

        // Average the forces
        if (separationCount > 0) {
            separation.div(separationCount);
            separation.normalize();
            separation.mult(1.5); // Separation strength
        }

        if (alignmentCount > 0) {
            alignment.div(alignmentCount);
            alignment.normalize();
            alignment.mult(0.3); // Alignment strength
        }

        if (cohesionCount > 0) {
            cohesion.div(cohesionCount);
            cohesion.normalize();
            cohesion.mult(0.8); // Cohesion strength
        }

        const totalForce = new Vector2D(0, 0);
        totalForce.add(separation);
        totalForce.add(alignment);
        totalForce.add(cohesion);

        return totalForce;
    }

    calculateContextCompatibility(other, currentContext) {
        // Base compatibility
        let compatibility = this.baselineAffinity * 0.3;

        // Context-specific compatibility
        if (currentContext.name === "Shopping/Consumer Context") {
            // In consumer context, random clustering (consumption preferences)
            compatibility += Math.random() * 0.4;
        } else if (currentContext.name === "Workplace Context") {
            // In workplace, green_growth is more compatible
            if (this.identityType === "green_growth" && other.identityType === "green_growth") {
                compatibility += 0.7;
            } else {
                compatibility += 0.2;
            }
        } else if (currentContext.name === "Community Meeting") {
            // Community context - moderate climate alignment
            if (this.climateCommitment > 0.5 && other.climateCommitment > 0.5) {
                compatibility += 0.6;
            } else {
                compatibility += 0.3;
            }
        } else if (currentContext.name === "Climate Context") {
            // Climate context - paradigm matters!
            if (this.identityType === other.identityType && this.identityType !== "undecided") {
                compatibility += 0.9; // Strong same-paradigm attraction
            } else if (this.identityType !== other.identityType) {
                compatibility -= 0.3; // Different paradigms repel
            } else {
                compatibility += 0.4; // Undecided cluster loosely
            }
        }

        // Frame inertia: if we were connected in last context, bonus compatibility
        if (this.frameInertia > 0 && this.lastContextName) {
            if (this.weFrameConnections.includes(other)) {
                compatibility += this.frameInertia * 0.5;
            }
        }

        return clamp(compatibility, -0.5, 1.0);
    }

    calculateBoundaryForce() {
        const force = new Vector2D(0, 0);
        const margin = 50;
        const strength = 0.5;

        if (this.position.x < margin) {
            force.x = strength * (margin - this.position.x);
        } else if (this.position.x > this.canvasWidth - margin) {
            force.x = -strength * (this.position.x - (this.canvasWidth - margin));
        }

        if (this.position.y < margin) {
            force.y = strength * (margin - this.position.y);
        } else if (this.position.y > this.canvasHeight - margin) {
            force.y = -strength * (this.position.y - (this.canvasHeight - margin));
        }

        return force;
    }

    updateWeFrameConnections(agents, currentContext) {
        this.lastContextName = currentContext.name;
        this.weFrameConnections = [];

        for (let other of agents) {
            if (other === this) continue;

            const dist = Vector2D.dist(this.position, other.position);
            const compatibility = this.calculateContextCompatibility(other, currentContext);

            // Form We-frame if close and compatible
            if (dist < this.alignmentRadius && compatibility > 0.5) {
                this.weFrameConnections.push(other);
            }
        }
    }

    updateClimateCommitment(currentContext, dt = 1) {
        const climateComp = currentContext.climateCompatibility;

        if (climateComp > 0) {
            // In climate-positive contexts, commitment accumulates
            const accumulation = climateComp * 0.008 * dt;
            this.climateCommitment += accumulation;

            // Being in We-frames boosts accumulation
            if (this.weFrameConnections.length > 2) {
                this.climateCommitment += 0.002 * dt;
            }
        } else {
            // In climate-negative contexts, commitment decays
            this.climateCommitment *= 0.995;
        }

        this.climateCommitment = clamp(this.climateCommitment, 0, 1);
    }

    updatePosition() {
        // Update velocity and position
        this.velocity.add(this.acceleration);
        this.velocity.limit(3); // Max speed
        this.position.add(this.velocity);

        // Wrap around edges (optional - or use hard boundaries)
        if (this.position.x < 0) this.position.x = this.canvasWidth;
        if (this.position.x > this.canvasWidth) this.position.x = 0;
        if (this.position.y < 0) this.position.y = this.canvasHeight;
        if (this.position.y > this.canvasHeight) this.position.y = 0;

        // Update visual radius based on We-frame centrality
        const targetRadius = this.baseRadius + this.weFrameConnections.length * 0.5;
        this.currentRadius = lerp(this.currentRadius, targetRadius, 0.1);
    }

    display() {
        push();

        // Color based on identity type
        let baseColor;
        if (this.identityType === "green_growth") {
            baseColor = { r: 100, g: 150, b: 255 }; // Blue
        } else if (this.identityType === "degrowth") {
            baseColor = { r: 100, g: 255, b: 150 }; // Green
        } else {
            baseColor = { r: 180, g: 180, b: 180 }; // Gray
        }

        // Brightness based on climate commitment
        const brightness = 0.5 + this.climateCommitment * 0.5;
        const r = baseColor.r * brightness;
        const g = baseColor.g * brightness;
        const b = baseColor.b * brightness;

        // Draw agent
        fill(r, g, b, 200);
        noStroke();
        circle(this.position.x, this.position.y, this.currentRadius * 2);

        // Optional: small highlight if high commitment
        if (this.climateCommitment > 0.7) {
            fill(255, 255, 255, 100);
            circle(this.position.x - 2, this.position.y - 2, this.currentRadius * 0.6);
        }

        pop();
    }

    displayConnections(alpha = 100) {
        push();
        strokeWeight(1);

        for (let other of this.weFrameConnections) {
            // Only draw each connection once (check if this agent's index is less)
            if (this.position.x < other.position.x) {
                const connectionStrength = 1 / (Vector2D.dist(this.position, other.position) / 50);
                stroke(200, 200, 200, alpha * connectionStrength);
                line(this.position.x, this.position.y, other.position.x, other.position.y);
            }
        }

        pop();
    }
}
