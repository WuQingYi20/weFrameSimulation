// UI controls and dashboard

class UIController {
    constructor(contextManager, attractorManager) {
        this.contextManager = contextManager;
        this.attractorManager = attractorManager;

        this.setupControls();
    }

    setupControls() {
        // Climate frequency slider
        const climateFreqSlider = document.getElementById('climateFreq');
        const climateFreqValue = document.getElementById('climateFreqValue');

        climateFreqSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            climateFreqValue.textContent = value + '%';
            this.contextManager.setClimateContextFrequency(value / 100);
        });

        // Frame inertia slider
        const frameInertiaSlider = document.getElementById('frameInertia');
        const frameInertiaValue = document.getElementById('frameInertiaValue');

        frameInertiaSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            frameInertiaValue.textContent = value + '%';
            window.globalFrameInertia = value / 100;
        });

        // Green growth strength slider
        const greenGrowthSlider = document.getElementById('greenGrowthStrength');
        const greenGrowthValue = document.getElementById('greenGrowthStrengthValue');

        greenGrowthSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            greenGrowthValue.textContent = value + '%';
            this.attractorManager.setGreenGrowthStrength(value / 100);
        });

        // Degrowth strength slider
        const degrowthSlider = document.getElementById('degrowthStrength');
        const degrowthValue = document.getElementById('degrowthStrengthValue');

        degrowthSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            degrowthValue.textContent = value + '%';
            this.attractorManager.setDegrowthStrength(value / 100);
        });

        // Shock button
        const shockBtn = document.getElementById('shockBtn');
        shockBtn.addEventListener('click', () => {
            this.contextManager.triggerShock(180); // 3 seconds
            shockBtn.disabled = true;
            shockBtn.style.opacity = '0.5';
            setTimeout(() => {
                shockBtn.disabled = false;
                shockBtn.style.opacity = '1';
            }, 3000);
        });

        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', () => {
            window.location.reload();
        });
    }
}

class Dashboard {
    constructor() {
        // Get HTML elements
        this.contextNameEl = document.getElementById('currentContext');
        this.contextLogicEl = document.getElementById('contextLogic');
        this.contextProgressEl = document.getElementById('contextProgressFill');
        this.climateImpactEl = document.getElementById('climateImpact');
        this.avgCommitmentEl = document.getElementById('avgCommitment');
        this.commitmentProgressEl = document.getElementById('commitmentProgressFill');
        this.activeWeFramesEl = document.getElementById('activeWeFrames');
        this.climateAlignedEl = document.getElementById('climateAligned');
        this.greenGrowthBarEl = document.getElementById('greenGrowthBar');
        this.degrowthBarEl = document.getElementById('degrowthBar');
        this.undecidedBarEl = document.getElementById('undecidedBar');
        this.ggCountEl = document.getElementById('ggCount');
        this.dgCountEl = document.getElementById('dgCount');
        this.unCountEl = document.getElementById('unCount');

        // New territory metrics elements
        this.ggTerritoryEl = document.getElementById('ggTerritory');
        this.dgTerritoryEl = document.getElementById('dgTerritory');
        this.ggZoneCountEl = document.getElementById('ggZoneCount');
        this.dgZoneCountEl = document.getElementById('dgZoneCount');
        this.contestedZoneCountEl = document.getElementById('contestedZoneCount');
        this.ggExposureBarEl = document.getElementById('ggExposureBar');
        this.dgExposureBarEl = document.getElementById('dgExposureBar');
        this.exposureRatioEl = document.getElementById('exposureRatio');

        // Paradigm space elements
        this.paradigmSpaceEl = document.getElementById('paradigmSpace');
        this.unalignedSpaceEl = document.getElementById('unalignedSpace');
        this.overlapSpaceEl = document.getElementById('overlapSpace');
        this.ggExclusiveEl = document.getElementById('ggExclusive');
        this.dgExclusiveEl = document.getElementById('dgExclusive');
    }

    update(agents, currentContext, contextProgress, attractorManager) {
        // Update context info
        this.contextNameEl.textContent = currentContext.name;
        this.contextNameEl.style.color = currentContext.color;
        this.contextLogicEl.textContent = currentContext.frameLogic;

        // Update context progress
        this.contextProgressEl.style.width = (contextProgress * 100) + '%';
        this.contextProgressEl.style.backgroundColor = currentContext.color;

        // Update climate impact
        const impact = currentContext.climateCompatibility;
        this.climateImpactEl.textContent = (impact > 0 ? '+' : '') + (impact * 100).toFixed(0) + '%';
        this.climateImpactEl.style.color = impact > 0 ? '#00B894' : '#FF6B6B';

        // Update average commitment
        const avgCommitment = agents.reduce((sum, a) => sum + a.climateCommitment, 0) / agents.length;
        this.avgCommitmentEl.textContent = (avgCommitment * 100).toFixed(1) + '%';
        this.commitmentProgressEl.style.width = (avgCommitment * 100) + '%';

        // Update We-frames
        const totalConnections = agents.reduce((sum, a) => sum + a.weFrameConnections.length, 0) / 2;
        this.activeWeFramesEl.textContent = totalConnections.toFixed(0);

        const climateAligned = this.countClimateWeFrames(agents);
        this.climateAlignedEl.textContent = climateAligned;

        // Update paradigm distribution
        const greenGrowthCount = agents.filter(a => a.identityType === "green_growth").length;
        const degrowthCount = agents.filter(a => a.identityType === "degrowth").length;
        const undecidedCount = agents.filter(a => a.identityType === "undecided").length;
        const total = greenGrowthCount + degrowthCount + undecidedCount;

        if (total > 0) {
            this.greenGrowthBarEl.style.width = ((greenGrowthCount / total) * 100) + '%';
            this.degrowthBarEl.style.width = ((degrowthCount / total) * 100) + '%';
            this.undecidedBarEl.style.width = ((undecidedCount / total) * 100) + '%';
        }

        this.ggCountEl.textContent = `GG: ${greenGrowthCount}`;
        this.dgCountEl.textContent = `DG: ${degrowthCount}`;
        this.unCountEl.textContent = `Un: ${undecidedCount}`;

        // Update territory metrics (NEW!)
        if (attractorManager) {
            const metrics = attractorManager.getMetrics(currentContext);
            const zoneCounts = attractorManager.countAgentsInZones(agents);

            this.ggTerritoryEl.textContent = metrics.ggTerritory + '%';
            this.dgTerritoryEl.textContent = metrics.dgTerritory + '%';

            this.ggZoneCountEl.textContent = zoneCounts.ggCount;
            this.dgZoneCountEl.textContent = zoneCounts.dgCount;
            this.contestedZoneCountEl.textContent = zoneCounts.contestedCount;

            // Update exposure bars
            const totalExposure = parseFloat(metrics.ggExposure) + parseFloat(metrics.dgExposure);
            if (totalExposure > 0) {
                const ggPercent = (parseFloat(metrics.ggExposure) / totalExposure) * 100;
                const dgPercent = (parseFloat(metrics.dgExposure) / totalExposure) * 100;

                this.ggExposureBarEl.style.width = ggPercent + '%';
                this.dgExposureBarEl.style.width = dgPercent + '%';
            }

            this.exposureRatioEl.textContent = metrics.exposureRatio + 'x';

            // Highlight if ratio is heavily skewed
            if (parseFloat(metrics.exposureRatio) > 2.0) {
                this.exposureRatioEl.style.color = '#FF6B6B'; // Red if heavily skewed toward GG
            } else {
                this.exposureRatioEl.style.color = '#4ECDC4';
            }

            // Update paradigm space metrics (THREE-ZONE MODEL)
            this.paradigmSpaceEl.textContent = metrics.paradigmSpace + '%';
            this.unalignedSpaceEl.textContent = metrics.unalignedSpace + '%';
            this.overlapSpaceEl.textContent = metrics.overlapSpace + '%';
            this.ggExclusiveEl.textContent = metrics.ggExclusiveSpace + '%';
            this.dgExclusiveEl.textContent = metrics.dgExclusiveSpace + '%';

            // Highlight unaligned space if it's majority
            const unaligned = parseFloat(metrics.unalignedSpace);
            if (unaligned > 50) {
                this.unalignedSpaceEl.style.color = '#FF6B6B'; // Red if majority unaligned
                this.unalignedSpaceEl.style.fontSize = '1.8em';
            } else {
                this.unalignedSpaceEl.style.color = '#888';
                this.unalignedSpaceEl.style.fontSize = '1.5em';
            }

            // Highlight paradigm space color based on size
            const paradigm = parseFloat(metrics.paradigmSpace);
            if (paradigm > 60) {
                this.paradigmSpaceEl.style.color = '#00B894'; // Green if high paradigm presence
            } else if (paradigm < 30) {
                this.paradigmSpaceEl.style.color = '#FF6B6B'; // Red if low paradigm presence
            } else {
                this.paradigmSpaceEl.style.color = '#4ECDC4'; // Default
            }
        }
    }

    countClimateWeFrames(agents) {
        let count = 0;
        for (let agent of agents) {
            if (agent.climateCommitment > 0.6 && agent.weFrameConnections.length > 2) {
                count++;
            }
        }
        return count;
    }
}

class ClimateGoalIndicator {
    constructor() {
        this.progress = 0;
        this.targetProgress = 0;
        this.maxProgress = 0;

        // Get HTML elements
        this.goalFillEl = document.getElementById('climateGoalFill');
        this.goalPercentEl = document.getElementById('climateGoalPercent');
        this.goalStatusEl = document.getElementById('climateGoalStatus');
    }

    update(agents, currentContext) {
        const avgCommitment = agents.reduce((sum, a) => sum + a.climateCommitment, 0) / agents.length;
        const totalConnections = agents.reduce((sum, a) => sum + a.weFrameConnections.length, 0);
        const connectivityRatio = totalConnections / (agents.length * 5);

        if (currentContext.climateCompatibility > 0) {
            const increment = currentContext.climateCompatibility * avgCommitment * connectivityRatio * 0.005;
            this.targetProgress += increment;
        } else {
            this.targetProgress *= 0.998;
        }

        this.targetProgress = clamp(this.targetProgress, 0, 1);
        this.progress = lerp(this.progress, this.targetProgress, 0.1);

        if (this.progress > this.maxProgress) {
            this.maxProgress = this.progress;
        }

        // Update HTML elements
        this.goalFillEl.style.width = (this.progress * 100) + '%';
        this.goalPercentEl.textContent = (this.progress * 100).toFixed(1) + '%';

        // Update color based on progress
        const r = Math.floor(lerp(255, 0, this.progress));
        const g = Math.floor(lerp(107, 184, this.progress));
        const b = Math.floor(lerp(107, 148, this.progress));
        this.goalFillEl.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        // Update status message
        let message = "";
        if (this.progress < 0.2) {
            message = "Fragmented - No coordination";
        } else if (this.progress < 0.5) {
            message = "Partial coordination emerging";
        } else if (this.progress < 0.8) {
            message = "Strong coordination building";
        } else {
            message = "Near-complete coordination!";
        }
        this.goalStatusEl.textContent = message;
    }

    reset() {
        this.progress = 0;
        this.targetProgress = 0;
        this.maxProgress = 0;
    }
}
