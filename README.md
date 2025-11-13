# We-Frame Climate Coordination Simulation

An interactive simulation demonstrating why climate coordination is so difficult through the lens of context-switching dynamics and We-frame fragmentation.

## Core Concept

This simulation visualizes how collective identity and climate commitment fragment across different social contexts, making sustained coordination nearly impossible. It demonstrates:

1. **Context-dependent clustering**: Agents form different We-frames in different contexts
2. **Climate commitment dynamics**: Commitment accumulates in climate-positive contexts but decays in climate-negative ones
3. **Green Growth vs Degrowth tension**: Two competing climate paradigms that rarely have time to converge
4. **Temporal fragmentation**: Climate contexts are too rare and brief for stable coordination to emerge

---

## How to Run

### Option 1: Using Launch Scripts (Easiest)

**Windows:**
```bash
Double-click start.bat
```

**Mac/Linux:**
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Manual HTTP Server

1. Open terminal in this directory
2. Run one of these commands:
   - Python 3: `python -m http.server 8000`
   - Python 2: `python -m SimpleHTTPServer 8000`
   - Node.js: `npx http-server -p 8000`
   - PHP: `php -S localhost:8000`

3. Open `http://localhost:8000` in your browser

### Option 3: Direct File Opening

Simply open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)

---

## Visual Elements Guide

### Canvas Main Display

#### 1. Background Color
- **Red tones** → Climate-negative contexts (Shopping, Workplace)
- **Green tones** → Climate-positive contexts (Community Meeting, Climate Context)
- **Color intensity** → Reflects the context's climate compatibility level
- **Color gradients** → Smooth transitions when contexts switch

#### 2. Top Banner
- **Context Name**: Current social context (highlighted in context color)
- **Frame Logic**: Dominant framing logic in this context (e.g., "cheap goods, convenience")

#### 3. Agents (Dots)

**Color Meanings:**
- 🔵 **Blue** = Green Growth believers
- 🟢 **Green** = Degrowth believers
- ⚪ **Gray** = Undecided

**Brightness:**
- **Dim** = Low climate commitment
- **Bright** = High climate commitment
- Brightest agents represent high climate commitment levels

**Size:**
- **Small dots** = Isolated agents with few connections
- **Large dots** = Central agents with many We-frame connections
- Size reflects the agent's "We-frame centrality" in current context

**White Highlight:**
- Appears when agent's climate commitment > 70%

#### 4. Connection Lines (We-Frames)
- **White thin lines** = We-frame connections
- Connect two agents who are "compatible" in the current context
- **Lines appearing/disappearing** → Formation and dissolution of We-frames
- **Line density** → Collective cohesion in current context
- Lines change dynamically with context switches

#### 5. Attractors (Glowing Circles)

**Green Growth Attractor (Left side):**
- 🔵 Blue halo
- Strongest in Workplace Context (work contexts reinforce tech/economic growth narratives)
- Attracts blue agents to cluster leftward

**Degrowth Attractor (Right side):**
- 🟢 Green halo
- Strongest in Climate Context (climate contexts reinforce ecological/degrowth narratives)
- Attracts green agents to cluster rightward

**Pulsing Effect:**
- Attractors pulse gently, more visible when stronger
- When attractor strength = 0 in current context, it completely disappears

#### 6. Climate Shock Event
- **Red pulsing border** → Climate shock event in progress
- **Top red text**: "CLIMATE SHOCK EVENT"
- Forces all agents into Climate Context temporarily

---

### Right Control Panel

#### Live Metrics

1. **Current Context**
   - Current context name (displayed in context color)
   - Frame Logic description
   - Progress bar showing time remaining in this context

2. **Climate Impact**
   - Current context's impact on climate
   - 🟢 Positive numbers = Climate-positive (+60%, +100%)
   - 🔴 Negative numbers = Climate-negative (-30%, -50%)

3. **Avg Climate Commitment**
   - Average climate commitment across all agents
   - Progress bar: Green fill shows overall commitment level
   - Percentage: 0-100%

4. **Active We-Frames**
   - Number of currently active We-frame connections
   - Higher number = Stronger collective cohesion

5. **Climate-aligned**
   - Number of agents with high climate commitment (>60%) AND strong We-frame connections (>2)
   - Measures true "climate actors"

6. **Paradigm Distribution**
   - Three-color bar chart:
     - 🔵 Blue = Green Growth agents count
     - 🟢 Green = Degrowth agents count
     - ⚪ Gray = Undecided agents count
   - Specific numbers shown below (GG: X, DG: Y, Un: Z)

7. **Climate Coordination Goal**
   - Progress bar: Gradient from red (0%) to green (100%)
   - Percentage: Overall climate coordination progress
   - Status messages:
     - "Fragmented - No coordination" < 20%
     - "Partial coordination emerging" 20-50%
     - "Strong coordination building" 50-80%
     - "Near-complete coordination!" > 80%
   - This metric combines: climate context frequency, average commitment, We-frame connectivity

---

## Interactive Controls

### Sliders

1. **Climate Context Frequency** (5% - 40%, default: 15%)
   - Adjusts how often the climate context appears
   - Higher values = More frequent climate contexts
   - **Experiment**: Try increasing to 30-40% and observe improved coordination
   - **Key insight**: Shows that coordination *is* possible with sufficient climate context time

2. **Frame Inertia** (0% - 100%, default: 30%)
   - Controls how quickly agents switch between frames
   - Higher values = Agents maintain previous connections longer even when context changes
   - Low inertia = Rapid, complete frame switching (realistic)
   - High inertia = "Sticky" connections that persist across contexts (idealistic)
   - **Experiment**: Try 80%+ to see what happens if people maintained climate frames across contexts

3. **Green Growth Strength** (0% - 100%, default: 60%)
   - Adjusts the pull of the Green Growth attractor
   - Controls how strongly technology/growth narratives attract agents
   - **Experiment**: Set to 100% to see Green Growth dominance
   - Set to 0% to remove Green Growth influence entirely

4. **Degrowth Strength** (0% - 100%, default: 60%)
   - Adjusts the pull of the Degrowth attractor
   - Controls how strongly ecological/degrowth narratives attract agents
   - **Experiment**: Set to 100% to see Degrowth dominance
   - Compare different strength combinations to see paradigm competition

### Buttons

- **Trigger Climate Shock**: Forces all agents into Climate Context for 3 seconds
  - Simulates a major climate disaster (e.g., extreme weather event)
  - Observe: Temporary mobilization followed by rapid dissolution
  - Shows how shock events rarely lead to sustained coordination

- **Reset Simulation**: Restarts with randomized agent positions and fresh state
  - Use to test different parameter combinations
  - Each reset creates slightly different initial conditions

### Keyboard Shortcuts

- **`S`**: Trigger climate shock event
- **`R`**: Reset simulation
- **`Space`**: Pause/unpause (useful for examining specific moments)

---

## What to Observe

### 1. The Fragmentation Cycle

Watch the repeating pattern:
- **Shopping/Workplace Contexts** (majority of time): Agents scatter, random clustering, climate commitment decays
- **Climate Context** (rare, brief): Agents suddenly form climate We-frames, commitment starts rising
- **Context Switch**: Everything dissolves, progress lost

**Key observation**: Climate coordination *does* emerge when given the context, but it never lasts long enough.

### 2. Green Growth vs Degrowth Separation

- In **Workplace Context**: Blue (Green Growth) agents cluster strongly (tech/growth narrative dominates work)
- In **Climate Context**: Blue and Green agents separate into distinct camps
- **Problem**: They're separated precisely when they should be coordinating
- Neither paradigm "wins" - they just oscillate without resolution

### 3. Climate Commitment Dynamics

Watch the "Avg Climate Commitment" metric:
- **Saw-tooth pattern**: Brief spikes during climate contexts, long decay periods
- **Never stabilizes**: Commitment can't accumulate because climate contexts are too infrequent
- **Individual variation**: Some agents (brightest dots) maintain high commitment, but they're isolated

### 4. We-Frame Dissolution

Pay attention to the connection lines:
- **Rapid appearance/disappearance**: We-frames form and dissolve completely with each context switch
- **Different topologies**: Completely different network structures in different contexts
- **No persistence**: Yesterday's climate allies are today's disconnected consumers

### 5. The Coordination Goal

Watch the "Climate Coordination Goal" progress bar:
- **Typical pattern**: Stalls around 10-20%, occasionally spikes to 30-40%, then crashes
- **What success looks like**: Sustained progress above 60% (almost never happens with default settings)
- **The frustration**: You can see it *almost* working, then context switches destroy progress

---

## Experimental Scenarios

### Experiment 1: Increase Climate Context Frequency

**Setup**: Move "Climate Context Frequency" slider to 35-40%

**Observe**:
- Climate Coordination Goal now reaches 60-80%
- Average commitment stabilizes at higher levels
- Climate We-frames persist longer
- Green Growth and Degrowth actually start to interact/converge

**Insight**: Coordination is **structurally possible** but requires transforming the context distribution - something individuals can't do alone.

### Experiment 2: High Frame Inertia

**Setup**: Set "Frame Inertia" to 80-90%

**Observe**:
- Connections persist across context switches
- Agents maintain "memory" of previous We-frames
- Coordination improves even with low climate context frequency

**Insight**: If people could maintain climate frames across contexts (work, shopping, etc.), coordination would improve. But cognitively, we're fundamentally context-bound.

### Experiment 3: Paradigm Strength Asymmetry

**Setup**: Set Green Growth Strength to 100%, Degrowth Strength to 20%

**Observe**:
- Blue agents dominate clustering
- Green agents become marginalized
- Reflects real-world dynamics where growth narratives dominate institutional contexts

**Try the reverse** (GG: 20%, DG: 100%):
- Degrowth dominates in climate contexts
- But lacks influence in workplace/consumer contexts
- Shows why counter-hegemonic narratives struggle

### Experiment 4: Climate Shock Events

**Setup**: Click "Trigger Climate Shock" several times during the simulation

**Observe**:
- Temporary spike in coordination during shock
- Rapid dissolution after shock ends
- Each shock creates briefer "afterglow" of elevated commitment

**Insight**: Shock-driven mobilization is temporary unless followed by sustained context change.

---

## The Core Theoretical Insight

This simulation demonstrates the **Contextual Commons Dilemma**:

> Climate coordination requires sustained collective identity, but human cognition and social structures are fundamentally context-bound. The temporal distribution of contexts - which individuals cannot control - determines whether coordination is structurally possible.

**Three key mechanisms:**

1. **Context-dependent framing**: The same individuals adopt different frames (consumer, worker, citizen, activist) in different contexts
2. **Asymmetric temporal distribution**: Climate-negative contexts (work, consumption) dominate time; climate-positive contexts are rare
3. **Frame-strategy asynchrony**: Even when individuals care, their capacity for collective action depends on being in the same context simultaneously

**The experiment proves**: Increase climate context frequency to 35%+, and coordination emerges. But this parameter is not individually controllable - it's determined by institutional structures, media attention, policy frameworks, and economic organization.

---

## Presentation Narrative for Demonstrations

### Opening (30 seconds)

*"This simulation demonstrates why climate coordination is so difficult - not because people don't care, but because their collective identity is fragmented across contexts."*

*"Watch these 50 agents. They represent people with different climate paradigms: Blue are Green Growth believers (technology, efficiency), Green are Degrowth believers (ecological limits, sufficiency), and Gray are undecided."*

### Running the Default Simulation (1-2 minutes)

*"Notice the background color changes - red tones are climate-negative contexts like shopping and work, green tones are climate-positive contexts like community meetings and climate discussions."*

*"See how agents cluster differently in each context? In the workplace [point to screen when it happens], Green Growth believers cluster strongly - the tech/growth narrative dominates. In shopping contexts, clustering is almost random - just consumption preferences."*

*"Now watch what happens when we briefly enter Climate Context [wait for it]... THERE! Suddenly, agents form climate We-frames, those white connection lines. Blue and Green separate into paradigmatic camps. Climate commitment starts rising."*

*"But look - [context switches] - it's gone. Back to shopping. All those connections dissolve. The commitment that was building... decaying. This cycle repeats endlessly."*

### Highlighting the Problem (1 minute)

*"See the 'Climate Coordination Goal' on the right? It keeps starting to rise, then crashing. That's the fundamental problem: climate contexts are too rare and too brief for stable coordination to emerge."*

*"And notice the Green Growth vs Degrowth separation? They're divided precisely when they should be coordinating. There's not enough 'climate context time' for these paradigms to engage, debate, and potentially converge."*

### The Intervention Experiment (1-2 minutes)

*"Now, let me show you something important. I'm going to increase the Climate Context Frequency from 15% to 35%."*

*[Move slider, wait 10-15 seconds]*

*"Look at that! Coordination is actually emerging now. The Climate Goal is rising to 60%, 70%. Climate commitment is stabilizing. Green Growth and Degrowth agents are interacting more, starting to form mixed clusters."*

*"This proves coordination IS structurally possible - but here's the critical insight: We can't simply 'increase climate context frequency' in real life. That frequency is determined by institutional structures, media cycles, economic organization - things beyond individual control."*

### Alternative Experiments (optional, 30 seconds each)

**Frame Inertia:**
*"What if people could maintain climate frames across contexts? [Increase Frame Inertia to 90%] See, coordination improves even with low climate context frequency. But cognitively, we're not wired this way - context switches really do fragment our frames."*

**Climate Shock:**
*"What about crisis events? [Trigger Climate Shock] Here's a climate disaster forcing everyone into climate context. Yes, there's temporary mobilization... and [wait for it to end] ...it evaporates the moment the shock ends. Shock-driven mobilization is inherently unstable."*

### Conclusion (30 seconds)

*"This is the Contextual Commons Dilemma: We need cross-context collective identity for climate coordination, but human cognition and social structures are fundamentally context-bound."*

*"The implication isn't despair - it's strategic clarity. If we want climate coordination, we need to transform the temporal distribution of contexts through institutional change, not just rely on individual commitment."*

*"Questions?"*

---

## Technical Details

### Architecture

- **Framework**: p5.js (JavaScript creative coding library)
- **Model Type**: Agent-based simulation with force-directed layout
- **Update Rate**: 60 FPS
- **Agent Count**: 50 (configurable in `sketch.js`)
- **Canvas Size**: 900x600 pixels

### Core Mechanisms

**1. Agent Dynamics**
- Each agent has position, velocity, acceleration (Newtonian physics)
- Three identity types: Green Growth (35%), Degrowth (35%), Undecided (30%)
- Climate commitment: Continuous variable [0,1] that accumulates/decays based on context
- We-frame connections: Dynamic network edges based on context compatibility

**2. Force Calculations**
- **Separation**: Avoid crowding (inverse distance weighting)
- **Alignment**: Match velocity of nearby compatible agents
- **Cohesion**: Attraction to compatible agents based on context logic
- **Attractor forces**: Paradigm-specific pull based on context strength
- **Boundary forces**: Soft walls to keep agents on screen

**3. Context System**
- Four contexts with different durations, frequencies, and climate compatibility
- Weighted random selection based on frequency distribution
- Smooth color transitions (30-frame interpolation)
- Climate shock override mechanism

**4. Climate Commitment Dynamics**
```
If climate_compatibility > 0:
    commitment += climate_compatibility × 0.008 × dt
    commitment += 0.002 × dt (if strong We-frames)
Else:
    commitment *= 0.995 (exponential decay)
```

**5. Context Compatibility Logic**
- **Shopping**: Random clustering (consumption preferences)
- **Workplace**: Green Growth highly compatible, others moderate
- **Community**: Climate commitment drives compatibility
- **Climate**: Same paradigm attracts (0.9), different paradigms repel (-0.3)
- **Frame Inertia**: Bonus compatibility for previous connections

### File Structure

```
weFrameSimulation/
├── index.html          # Main HTML structure, metrics display
├── style.css           # Styling for UI and metrics panels
├── sketch.js           # p5.js main loop, setup, and display functions
├── agent.js            # Agent class: behavior, forces, We-frames (10.9 KB)
├── context.js          # Context definitions and switching logic (5.9 KB)
├── attractor.js        # Green Growth/Degrowth attractors (4.9 KB)
├── ui.js               # Dashboard, controls, climate goal (12 KB)
├── utils.js            # Vector2D class and helper functions (2.3 KB)
├── start.bat           # Windows launch script
├── start.sh            # Mac/Linux launch script
└── README.md           # This file
```

### Key Parameters (configurable in code)

| Parameter | Location | Default | Description |
|-----------|----------|---------|-------------|
| `NUM_AGENTS` | sketch.js:14 | 50 | Number of agents |
| `CANVAS_WIDTH` | sketch.js:12 | 900 | Canvas width in pixels |
| `CANVAS_HEIGHT` | sketch.js:13 | 600 | Canvas height in pixels |
| Context durations | context.js:26-58 | Varies | Frames each context lasts |
| Context frequencies | context.js:26-58 | Varies | Probability weights |
| Climate compatibility | context.js:26-58 | -0.5 to 1.0 | Climate impact of contexts |
| Commitment accumulation | agent.js:262 | 0.008 | Rate of commitment increase |
| Commitment decay | agent.js:268 | 0.995 | Exponential decay multiplier |

### Performance

- Runs at stable 60 FPS on modern browsers
- O(n²) force calculations (acceptable for n=50)
- No GPU acceleration required
- Total file size: ~45 KB (excluding p5.js CDN)

### Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Mobile browsers (works but small screen limits visibility)

### Extending the Simulation

**Add a new context:**
1. Edit `context.js`, add new Context object in `initializeContexts()`
2. Define compatibility logic in `agent.js`, `calculateContextCompatibility()`
3. Optionally add attractor behavior in `attractor.js`

**Modify agent behavior:**
1. Edit force weights in `agent.js`, `calculateSocialForce()`
2. Adjust commitment dynamics in `updateClimateCommitment()`
3. Change clustering thresholds in `updateWeFrameConnections()`

**Change visual appearance:**
1. Colors: Edit hex values in `context.js` and `attractor.js`
2. Agent size/appearance: Modify `agent.js`, `display()`
3. UI styling: Edit `style.css`

---

## Troubleshooting

**Problem**: Simulation runs slowly or stutters
- **Solution**: Reduce `NUM_AGENTS` in `sketch.js` to 30-40

**Problem**: Agents cluster too tightly or too loosely
- **Solution**: Adjust separation/cohesion force multipliers in `agent.js:147-165`

**Problem**: Climate coordination never happens
- **Solution**: Increase climate context frequency or duration in `context.js`

**Problem**: Can't see attractors
- **Solution**: They only appear when strong in current context; wait for appropriate context or increase strength via sliders

**Problem**: Metrics not updating
- **Solution**: Check browser console for JavaScript errors; ensure all files are loaded

---

## Citations and References

This simulation is a computational implementation of theoretical concepts from:

- **We-mode reasoning**: Tuomela, R. (2013). *Social Ontology: Collective Intentionality and Group Agents*
- **Frame analysis**: Goffman, E. (1974). *Frame Analysis: An Essay on the Organization of Experience*
- **Context-dependent cognition**: Spillers & Unsworth (2011), context-dependent attention and memory
- **Climate coordination failures**: Ostrom, E. (2010), polycentric governance and collective action
- **Green Growth vs Degrowth debates**: Hickel & Kallis (2020), Jackson (2017)

**Conceptual framework**: Contextual Commons Dilemma and We-frame fragmentation in climate coordination

---

## License

This simulation is provided for educational and research purposes. Feel free to modify and extend for your own research or teaching.

---

## Contact and Feedback

For questions, suggestions, or to report issues, please refer to your course instructor or research supervisor.

**Version**: 1.0
**Last Updated**: November 2024
