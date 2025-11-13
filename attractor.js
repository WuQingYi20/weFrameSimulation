// Attractors for Green Growth and Degrowth paradigms with dynamic spatial presence

class Attractor {
    constructor(name, position, contextProfiles, color) {
        this.name = name;
        this.position = position; // Vector2D
        this.contextProfiles = contextProfiles; // {contextName: {size, strength, narrative}}
        this.color = color;
        this.baseRadius = 30;
        this.currentRadius = this.baseRadius;
        this.targetRadius = this.baseRadius;
        this.canvasWidth = 900;
    }

    getStrength(contextName) {
        const profile = this.contextProfiles[contextName];
        return profile ? profile.strength : 0;
    }

    getSize(contextName) {
        const profile = this.contextProfiles[contextName];
        return profile ? profile.size : 0;
    }

    getNarrative(contextName) {
        const profile = this.contextProfiles[contextName];
        return profile ? profile.narrative : "";
    }

    update(contextName) {
        // Update target radius based on context
        const size = this.getSize(contextName);
        this.targetRadius = size * this.canvasWidth * 0.35; // Max 35% of canvas width

        // Smooth transition
        this.currentRadius = lerp(this.currentRadius, this.targetRadius, 0.1);
    }

    calculateForce(agentPos, contextName, agentIdentity) {
        // Only attract agents with matching identity
        if (agentIdentity !== this.name.toLowerCase().replace(' ', '_')) {
            return new Vector2D(0, 0);
        }

        const strength = this.getStrength(contextName);
        const size = this.getSize(contextName);

        if (strength <= 0 || size <= 0) {
            return new Vector2D(0, 0);
        }

        const force = Vector2D.sub(this.position, agentPos);
        const dist = force.mag();
        const influenceRadius = this.currentRadius;

        if (dist < 1) return new Vector2D(0, 0);

        // Force is stronger within the influence radius
        let forceMagnitude;
        if (dist < influenceRadius) {
            // Inside zone: strong attraction
            forceMagnitude = strength * (1 - dist / influenceRadius) * 0.8;
        } else {
            // Outside zone: weaker pull
            forceMagnitude = (strength * 0.3) / (dist * 0.05 + 1);
        }

        force.normalize();
        force.mult(forceMagnitude);

        return force;
    }

    display(contextName) {
        const strength = this.getStrength(contextName);
        const size = this.getSize(contextName);

        if (strength <= 0 || size <= 0) return;

        push();

        // Pulsing effect
        const pulse = Math.sin(frameCount * 0.05) * 0.05;
        const displayRadius = this.currentRadius * (1 + pulse);
        const alpha = strength * 120;

        // Multiple pulsing circles (force field effect)
        noFill();
        for (let i = 0; i < 3; i++) {
            const ringAlpha = alpha * (0.4 - i * 0.1);
            stroke(this.color.r, this.color.g, this.color.b, ringAlpha);
            strokeWeight(2);
            const ringRadius = displayRadius * (1 + i * 0.15);
            circle(this.position.x, this.position.y, ringRadius * 2);
        }

        // Radial gradient fill (influence zone)
        const gradient = drawingContext.createRadialGradient(
            this.position.x, this.position.y, 0,
            this.position.x, this.position.y, displayRadius
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.6 / 255})`);
        gradient.addColorStop(0.7, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.3 / 255})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        drawingContext.fillStyle = gradient;
        noStroke();
        circle(this.position.x, this.position.y, displayRadius * 2);

        // Center marker
        fill(this.color.r, this.color.g, this.color.b, alpha);
        noStroke();
        circle(this.position.x, this.position.y, 15);

        // Label with narrative
        fill(255, 255, 255, alpha);
        textAlign(CENTER, CENTER);
        textSize(12);
        textStyle(BOLD);
        text(this.name, this.position.x, this.position.y + displayRadius + 20);

        // Narrative (smaller text)
        textSize(9);
        textStyle(NORMAL);
        fill(this.color.r, this.color.g, this.color.b, alpha * 0.8);
        const narrative = this.getNarrative(contextName);
        text(narrative, this.position.x, this.position.y + displayRadius + 35);

        pop();
    }

    isInZone(agentPos) {
        const dist = Vector2D.dist(agentPos, this.position);
        return dist < this.currentRadius;
    }

    getTerritorySize() {
        // Return territory as percentage of total canvas area
        const area = Math.PI * this.currentRadius * this.currentRadius;
        const canvasArea = this.canvasWidth * 600; // Assuming 600 height
        return (area / canvasArea) * 100;
    }
}

class AttractorManager {
    constructor(canvasWidth, canvasHeight) {
        this.attractors = [];
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.greenGrowthStrength = 1.0;
        this.degrowthStrength = 1.0;

        // Metrics tracking
        this.ggTotalExposureTime = 0;
        this.dgTotalExposureTime = 0;
        this.ggToDgConversions = 0;
        this.dgToGgConversions = 0;

        this.initializeAttractors();
    }

    initializeAttractors() {
        // Green Growth Attractor - STRUCTURALLY DOMINANT
        this.greenGrowthAttractor = new Attractor(
            "Green Growth",
            new Vector2D(this.canvasWidth * 0.35, this.canvasHeight * 0.5),
            {
                "Shopping/Consumer Context": {
                    size: 0.6,
                    strength: 0.8,
                    narrative: "Green products, EVs, sustainable consumption"
                },
                "Workplace Context": {
                    size: 0.75,  // HUGE presence!
                    strength: 0.95,
                    narrative: "Green jobs, clean tech, innovation"
                },
                "Community Meeting": {
                    size: 0.45,
                    strength: 0.6,
                    narrative: "Local green initiatives, recycling"
                },
                "Climate Context": {
                    size: 0.5,
                    strength: 0.65,
                    narrative: "Tech solutions to climate crisis"
                }
            },
            { r: 80, g: 140, b: 255 } // Blue
        );

        // Degrowth Attractor - MARGINALIZED in mainstream contexts
        this.degrowthAttractor = new Attractor(
            "Degrowth",
            new Vector2D(this.canvasWidth * 0.65, this.canvasHeight * 0.5),
            {
                "Shopping/Consumer Context": {
                    size: 0.15,  // Tiny!
                    strength: 0.2,
                    narrative: "Anti-consumerism (marginal)"
                },
                "Workplace Context": {
                    size: 0.08,  // Almost invisible!
                    strength: 0.15,
                    narrative: "Job reduction (politically toxic)"
                },
                "Community Meeting": {
                    size: 0.4,
                    strength: 0.55,
                    narrative: "Localism, commoning, cooperatives"
                },
                "Climate Context": {
                    size: 0.55,  // Largest here!
                    strength: 0.85,
                    narrative: "System change, limits to growth"
                }
            },
            { r: 80, g: 220, b: 140 } // Green
        );

        this.greenGrowthAttractor.canvasWidth = this.canvasWidth;
        this.degrowthAttractor.canvasWidth = this.canvasWidth;

        this.attractors = [this.greenGrowthAttractor, this.degrowthAttractor];
    }

    update(contextName, agents) {
        // Update attractors
        for (let attractor of this.attractors) {
            attractor.update(contextName);
        }

        // Track exposure time
        const ggSize = this.greenGrowthAttractor.getSize(contextName);
        const dgSize = this.degrowthAttractor.getSize(contextName);

        this.ggTotalExposureTime += ggSize;
        this.dgTotalExposureTime += dgSize;

        // Track agent zone membership for conversion detection
        // (Would need previous state tracking for full conversion counting)
    }

    setGreenGrowthStrength(strength) {
        this.greenGrowthStrength = strength;
        // Apply multiplier to all contexts
        for (let contextName in this.greenGrowthAttractor.contextProfiles) {
            this.greenGrowthAttractor.contextProfiles[contextName].strength *= strength;
        }
    }

    setDegrowthStrength(strength) {
        this.degrowthStrength = strength;
        // Apply multiplier to all contexts
        for (let contextName in this.degrowthAttractor.contextProfiles) {
            this.degrowthAttractor.contextProfiles[contextName].strength *= strength;
        }
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

    drawBackgroundGradient(context) {
        // Background visualization: Unaligned space + Paradigm territories
        const zones = this.calculateThreeZones(context);

        push();

        // Layer 1: Unaligned space (gray background covering everything)
        fill(180, 180, 180, Math.floor(zones.unaligned * 80)); // Alpha scales with unaligned %
        rect(0, 0, this.canvasWidth, 600);

        // Display unaligned space label if significant
        if (zones.unaligned > 0.3) {
            fill(120, 120, 120, 100);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(48);
            textStyle(BOLD);
            text("UNALIGNED SPACE", this.canvasWidth / 2, 300);

            textSize(16);
            textStyle(NORMAL);
            text(`${(zones.unaligned * 100).toFixed(0)}% not in climate paradigm frame`,
                 this.canvasWidth / 2, 340);
        }

        pop();

        // Layer 2: Paradigm influences (over the unaligned background)
        const ggPos = this.greenGrowthAttractor.position;
        const dgPos = this.degrowthAttractor.position;
        const ggRadius = this.greenGrowthAttractor.currentRadius;
        const dgRadius = this.degrowthAttractor.currentRadius;
        const ggColor = this.greenGrowthAttractor.color;
        const dgColor = this.degrowthAttractor.color;

        push();

        // Green Growth influence
        const ggGradient = drawingContext.createRadialGradient(
            ggPos.x, ggPos.y, 0,
            ggPos.x, ggPos.y, ggRadius * 1.5
        );
        ggGradient.addColorStop(0, `rgba(${ggColor.r}, ${ggColor.g}, ${ggColor.b}, 0.2)`);
        ggGradient.addColorStop(1, `rgba(${ggColor.r}, ${ggColor.g}, ${ggColor.b}, 0)`);

        drawingContext.fillStyle = ggGradient;
        circle(ggPos.x, ggPos.y, ggRadius * 3);

        // Degrowth influence
        const dgGradient = drawingContext.createRadialGradient(
            dgPos.x, dgPos.y, 0,
            dgPos.x, dgPos.y, dgRadius * 1.5
        );
        dgGradient.addColorStop(0, `rgba(${dgColor.r}, ${dgColor.g}, ${dgColor.b}, 0.2)`);
        dgGradient.addColorStop(1, `rgba(${dgColor.r}, ${dgColor.g}, ${dgColor.b}, 0)`);

        drawingContext.fillStyle = dgGradient;
        circle(dgPos.x, dgPos.y, dgRadius * 3);

        // Layer 3: Overlap region (if zones overlap)
        if (zones.sharedSpace > 0.01) {
            // Calculate overlap region center (midpoint between attractors)
            const overlapX = (ggPos.x + dgPos.x) / 2;
            const overlapY = (ggPos.y + dgPos.y) / 2;
            const overlapRadius = Math.sqrt(zones.sharedSpace) * this.canvasWidth * 0.5;

            // Draw overlap as blend of both colors
            const overlapGradient = drawingContext.createRadialGradient(
                overlapX, overlapY, 0,
                overlapX, overlapY, overlapRadius
            );
            overlapGradient.addColorStop(0, `rgba(${(ggColor.r + dgColor.r)/2}, ${(ggColor.g + dgColor.g)/2}, ${(ggColor.b + dgColor.b)/2}, 0.25)`);
            overlapGradient.addColorStop(1, `rgba(${(ggColor.r + dgColor.r)/2}, ${(ggColor.g + dgColor.g)/2}, ${(ggColor.b + dgColor.b)/2}, 0)`);

            drawingContext.fillStyle = overlapGradient;
            circle(overlapX, overlapY, overlapRadius * 2);

            // Label overlap region
            if (zones.sharedSpace > 0.05) {
                fill(255, 255, 255, 150);
                noStroke();
                textAlign(CENTER, CENTER);
                textSize(10);
                text(`Overlap: ${(zones.sharedSpace * 100).toFixed(1)}%`, overlapX, overlapY);
            }
        }

        pop();
    }

    countAgentsInZones(agents) {
        let ggCount = 0;
        let dgCount = 0;
        let contestedCount = 0;

        for (let agent of agents) {
            const inGG = this.greenGrowthAttractor.isInZone(agent.position);
            const inDG = this.degrowthAttractor.isInZone(agent.position);

            if (inGG && inDG) {
                contestedCount++;
            } else if (inGG) {
                ggCount++;
            } else if (inDG) {
                dgCount++;
            }
        }

        return { ggCount, dgCount, contestedCount };
    }

    calculateThreeZones(context) {
        // Calculate the three zones: GG exclusive, overlap, DG exclusive, unaligned
        const ggCore = this.greenGrowthAttractor.getSize(context.name) || 0;
        const dgCore = this.degrowthAttractor.getSize(context.name) || 0;
        const overlapFactor = context.overlapPotential || 0.1;

        // Overlap is the minimum of the two cores, scaled by overlap potential
        const overlap = Math.min(ggCore, dgCore) * overlapFactor;

        // Exclusive zones
        const ggExclusive = Math.max(0, ggCore - overlap);
        const dgExclusive = Math.max(0, dgCore - overlap);

        // Total paradigm space
        const totalParadigm = ggExclusive + dgExclusive + overlap;

        // Unaligned space
        const unaligned = Math.max(0, 1.0 - totalParadigm);

        return {
            greenGrowthExclusive: ggExclusive,
            sharedSpace: overlap,
            degrowthExclusive: dgExclusive,
            totalParadigm: totalParadigm,
            unaligned: unaligned
        };
    }

    getMetrics(context) {
        const ggTerritory = this.greenGrowthAttractor.getTerritorySize();
        const dgTerritory = this.degrowthAttractor.getTerritorySize();
        const exposureRatio = this.ggTotalExposureTime / (this.dgTotalExposureTime + 1);

        // Three-zone metrics
        const zones = this.calculateThreeZones(context);

        return {
            ggTerritory: ggTerritory.toFixed(1),
            dgTerritory: dgTerritory.toFixed(1),
            exposureRatio: exposureRatio.toFixed(2),
            ggExposure: this.ggTotalExposureTime.toFixed(0),
            dgExposure: this.dgTotalExposureTime.toFixed(0),
            // New zone metrics
            paradigmSpace: (zones.totalParadigm * 100).toFixed(1),
            unalignedSpace: (zones.unaligned * 100).toFixed(1),
            overlapSpace: (zones.sharedSpace * 100).toFixed(1),
            ggExclusiveSpace: (zones.greenGrowthExclusive * 100).toFixed(1),
            dgExclusiveSpace: (zones.degrowthExclusive * 100).toFixed(1)
        };
    }

    resize(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.greenGrowthAttractor.position = new Vector2D(canvasWidth * 0.35, canvasHeight * 0.5);
        this.degrowthAttractor.position = new Vector2D(canvasWidth * 0.65, canvasHeight * 0.5);
        this.greenGrowthAttractor.canvasWidth = canvasWidth;
        this.degrowthAttractor.canvasWidth = canvasWidth;
    }
}
