# We-Frame Climate Coordination Simulation
**An Agent-Based Model of Context-Dependent Collective Identity Fragmentation**

---

## Abstract

This interactive simulation demonstrates why climate coordination fails despite widespread concern: collective identity is fundamentally **context-bound**, and the temporal distribution of contexts—which individuals cannot control—determines whether coordination is structurally possible.

The model reveals three interconnected mechanisms: (1) **context-induced fragmentation** of We-frames, (2) **structural asymmetry** between competing climate paradigms (Green Growth vs Degrowth), and (3) **paradigm marginality**—the fact that most people, most of the time, are not thinking within climate frameworks at all.

---

## Research Question

**Why does climate coordination remain elusive despite increasing awareness and concern?**

Standard explanations focus on:
- Individual motivation deficits
- Information asymmetries
- Free-rider problems
- Coordination failures due to scale

This simulation proposes a different explanation: **The Contextual Commons Dilemma**

> Climate coordination requires sustained collective identity, but human cognition and social structures are fundamentally context-bound. The temporal distribution of contexts—which individuals cannot control—determines whether coordination is structurally possible.

---

## Theoretical Framework

### The Three-Zone Spatial Model

The simulation models social-cognitive space as dynamically divided into three zones:

**1. Green Growth Exclusive Territory**
- Represents the spatial presence of techno-optimistic, growth-compatible climate narratives
- Dominant in mainstream contexts (workplace, consumption, policy)
- High institutional backing, media presence, economic alignment

**2. Degrowth Exclusive Territory**
- Represents the spatial presence of limits-to-growth, sufficiency-oriented climate narratives
- Strong only in niche contexts (academic, activist, crisis moments)
- Low institutional support, politically marginalized

**3. Unaligned Space**
- **The critical insight**: This is the majority of cognitive/social space in most contexts
- Represents people not thinking within climate paradigm frameworks
- "Just living life" - work concerns, consumption decisions, daily routines
- Climate paradigms are *absent*, not just *contested*

### Why This Matters: Paradigm Marginality

The key theoretical contribution is demonstrating that **Green Growth vs Degrowth is not the primary problem**. The primary problem is that **climate paradigms occupy minority mindshare** in the contexts where people spend most of their time.

```
Typical Space Distribution:

Workplace Context:
├─ Green Growth: 18%
├─ Overlap: 1%
├─ Degrowth: 2%
└─ UNALIGNED: 79% ← Most people thinking about productivity, wages, NOT climate

Shopping Context:
├─ Green Growth: 14%
├─ Overlap: 2%
├─ Degrowth: 1%
└─ UNALIGNED: 83% ← Most people thinking about price, convenience, NOT climate

Climate Context (rare!):
├─ Green Growth: 35%
├─ Overlap: 15%
├─ Degrowth: 25%
└─ UNALIGNED: 25% ← Climate paradigms finally dominant
```

---

## Design Rationale: Why These Choices?

### 1. Dynamic Spatial Zones (Not Fixed Ideologies)

**Design Choice**: Attractors with variable spatial radius, not static identity markers

**Rationale**:
- Climate paradigms are not internal belief states—they are **context-activated frames**
- The same person can think "green tech will save us" at work and "I need cheap groceries" while shopping
- Spatial representation reveals **structural advantage**: Green Growth occupies more space in more contexts

**Alternative Rejected**: Fixed agent identities (e.g., "agent is Green Growth believer") would miss context-dependency

### 2. Unaligned Space as Default Background

**Design Choice**: Gray background covering canvas, opacity scales with unaligned %

**Rationale**:
- Makes **absence** visible—the default state is not "contested" but "absent"
- When 75% of space is gray in Workplace Context, it viscerally shows: climate paradigms are marginal here
- **Theoretical point**: The problem isn't just GG vs DG conflict—it's that climate doesn't occupy enough mindshare

**Alternative Rejected**: Showing only GG/DG territories would make it seem like everyone is always in climate frame, just divided

### 3. Context-Dependent Overlap Zones

**Design Choice**: Overlap varies by context (5% workplace, 35% community)

**Rationale**:
- **Convergence is structurally context-dependent**
- In workplace: GG (green jobs) vs DG (job reduction) are incompatible → minimal overlap
- In community: Both support local initiatives → higher overlap (though for different reasons)
- Shows why paradigm debates are often "talking past each other"—they occur in contexts where overlap is structurally minimal

**Alternative Rejected**: Fixed overlap % would miss that some contexts enable dialogue, others prevent it

### 4. Asymmetric Attractor Sizes

**Design Choice**: Green Growth 8-75% size, Degrowth 2-55% size across contexts

**Rationale**:
- **Not a symmetric competition**—GG has structural advantages
- GG present in ALL contexts (even if weak), DG almost invisible in workplace/shopping
- Represents institutional backing, media normalization, economic alignment
- **Key insight**: Hegemony is not "winning the debate"—it's "being present where the debate isn't even happening"

**Alternative Rejected**: Equal-sized attractors would suggest a "level playing field" that doesn't exist

### 5. Temporal Frequency Distribution

**Design Choice**: Workplace 30%, Shopping 40%, Climate Context 15%

**Rationale**:
- **Time spent in contexts is not individually controllable**
- People don't choose to spend 70% of time in climate-negative contexts—that's structural
- Rare climate contexts mean GG/DG can't sustain dialogue or convergence
- **Intervention insight**: Changing paradigm strength won't help if context distribution doesn't change

**Alternative Rejected**: Equal time in all contexts would miss the core mechanism—temporal asymmetry

---

## Visual Grammar: Reading the Simulation

### Color Coding

| Element | Color | Meaning |
|---------|-------|---------|
| **Gray overlay** | Light gray, variable opacity | Unaligned space—people NOT in climate paradigm frame |
| **Blue gradient** | Light blue (#508CFF) | Green Growth influence territory |
| **Green gradient** | Light green (#50DC8C) | Degrowth influence territory |
| **Purple blend** | Blue+Green mix | Overlap zone—where paradigms coexist |
| **Context banner** | Red or Green tones | Climate compatibility of current context |

### Agent Appearance

| Visual Feature | Meaning |
|----------------|---------|
| **Dot color** | Paradigm alignment: Blue (GG), Green (DG), Gray (Undecided) |
| **Dot brightness** | Climate commitment level (brighter = higher commitment) |
| **Dot size** | We-frame centrality (larger = more connections in current context) |
| **White lines** | Active We-frame connections (appear/disappear with context) |

### Spatial Dynamics

**When context switches, watch:**
1. **Gray overlay changes opacity** → Unaligned space expanding/contracting
2. **Attractors pulse and resize** → Paradigm territories growing/shrinking
3. **Agent clusters dissolve/reform** → We-frames fragmenting
4. **Connections flash in/out** → Collective identity unstable

---

## Key Phenomena: What the Simulation Reveals

### Phenomenon 1: Paradigm Marginality in Mainstream Contexts

**Observable**: In Workplace/Shopping contexts, gray "UNALIGNED SPACE" text appears prominently

**Mechanism**:
- Climate Paradigm Space metric drops to 20-25% (red warning)
- Unaligned Space metric jumps to 75-80% (red, enlarged)
- Most agents cluster based on non-climate logics (work teams, consumption preferences)

**Theoretical Insight**:
Climate coordination fails not because people disagree on solutions, but because **climate is not a salient frame** in contexts where people spend most time.

### Phenomenon 2: Context-Induced Hegemony

**Observable**: In Workplace Context, Green Growth zone expands to 55% while Degrowth shrinks to 2%

**Mechanism**:
- GG benefits from "green jobs," "innovation," "competitiveness" narratives—all workplace-aligned
- DG message ("reduce production") is structurally incompatible with workplace frame
- Degrowth believers feel **isolated and outnumbered**, not because of debate loss, but structural squeeze

**Theoretical Insight**:
Green Growth hegemony is not ideological victory—it's **structural congruence** with dominant contexts. Degrowth struggles not because arguments are weak, but because it lacks resonance in contexts that dominate temporal distribution.

### Phenomenon 3: Rare Moments of Contestation

**Observable**: In Climate Context, both zones expand, Overlap reaches 15%, gray recedes to 25%

**Mechanism**:
- Climate paradigms suddenly occupy majority mindshare
- GG and DG believers can actually engage—there's overlap space for dialogue
- This is when debate, convergence, coalition-building become possible

**But**: Context is brief (30 frames) and rare (15% frequency). Before meaningful convergence, context switches.

**Theoretical Insight**:
Convergence is not impossible—it's **structurally time-constrained**. The problem isn't that paradigms *can't* align, but that contexts enabling alignment are too rare.

### Phenomenon 4: Cumulative Exposure Asymmetry

**Observable**: Exposure Ratio metric climbs to 2.5x, 3x, 4x over time (turns red)

**Mechanism**:
- Green Growth accumulates exposure time: 60% × 30% (workplace) + 40% × 40% (shopping) + ...
- Degrowth accumulates exposure time: 2% × 30% (workplace) + 1% × 40% (shopping) + ...
- **Cumulative advantage**: GG gets ~3x more "mindshare time" than DG

**Theoretical Insight**:
This is **reproduction asymmetry**. New recruits from unaligned space encounter GG 3x more often than DG. Even if conversion rates were equal, GG would grow faster simply due to visibility.

### Phenomenon 5: We-Frame Instability Across Contexts

**Observable**: Connection lines flash in/out, agent clusters dissolve/reform every context switch

**Mechanism**:
- In Workplace: Agents cluster by work teams, GG believers connect
- In Shopping: Completely different topology, random clustering
- In Climate: GG and DG believers separate into opposing camps

**Theoretical Insight**:
Climate coordination requires **cross-context identity persistence**, but We-frames are fundamentally context-bound. "Yesterday's climate allies" become "today's disconnected coworkers."

---

## Metrics Dashboard: Interpretation Guide

### Climate Paradigm Space (Large centered metric)

**What it shows**: % of cognitive/social space occupied by climate paradigms (GG + DG + Overlap)

**Color coding**:
- 🟢 Green (>60%): Climate paradigms dominant—rare, usually only in Climate Context
- 🔵 Cyan (30-60%): Moderate presence—transitional moments
- 🔴 Red (<30%): Climate paradigms marginal—typical in mainstream contexts

**Why it matters**: This is the **total capacity for climate-focused collective action**. If paradigm space is 25%, only 25% of agents can even engage in climate coordination.

### Unaligned Space (Large gray metric below)

**What it shows**: % of space where people are NOT thinking in climate paradigm terms

**Color coding**:
- 🔴 Red, enlarged (>50%): Majority unaligned—climate marginalized
- Gray, normal size (<50%): Minority unaligned—climate salient

**Why it matters**: This is the **structural barrier to recruitment**. To mobilize climate action, people must first *enter* paradigm space—but most contexts don't facilitate this.

### Spatial Territory Occupation

**GG Territory %** vs **DG Territory %**

**Why it matters**: Shows the **spatial asymmetry**. Even when both paradigms are present, GG typically occupies 3-10x more territory. This is not "debate dominance"—it's structural presence.

### Agents in Zones

**GG Zone / DG Zone / Contested**

**Why it matters**:
- High "Contested" count → Overlap zone is active, dialogue possible
- Low "Contested" count → Paradigms spatially separated, talking past each other

### Cumulative Exposure Ratio

**What it shows**: Total GG exposure time ÷ Total DG exposure time

**Why it matters**:
- Ratio > 2.0 (turns red) → GG has >2x visibility advantage
- This compounds over time—structural advantage accumulates
- Explains paradigm reproduction asymmetry

### Paradigm Distribution Breakdown

**GG Exclusive / Overlap / DG Exclusive**

**Why it matters**:
- Low Overlap (1-5%) in Workplace → Convergence structurally blocked
- Higher Overlap (15-35%) in Community → Dialogue space exists
- Shows **where** convergence might be possible

---

## Experimental Scenarios: Using the Controls

### Experiment 1: Increase Climate Context Frequency (Slider: 15% → 35%)

**What happens**:
- Climate Paradigm Space sustains at 60-70%
- Climate Coordination Goal reaches 70-80%
- Unaligned Space drops to 30-40%
- GG and DG zones interact more, Overlap becomes visible

**Theoretical Point**:
Coordination IS structurally possible—but requires transforming context distribution. This is **not individually achievable**. You cannot decide to spend 35% of your time in "climate context"—that's determined by institutions, media, policy, economic organization.

**Implication**:
The solution is not "try harder to care"—it's **structural transformation** of temporal context distribution.

### Experiment 2: High Frame Inertia (Slider: 30% → 90%)

**What happens**:
- We-frame connections persist across context switches
- Climate Commitment decays slower
- Coordination improves even with low climate context frequency

**Theoretical Point**:
If people could maintain climate frames across contexts (work, shopping, leisure), coordination would work. But **cognitively, we're context-bound**. Frame inertia is not a parameter we can voluntarily increase.

**Implication**:
This is a **counterfactual experiment**—shows what *would* happen if cognition worked differently. Highlights that the problem is cognitive architecture + social structure interaction.

### Experiment 3: Paradigm Strength Asymmetry (GG: 100%, DG: 20%)

**What happens**:
- GG zone expands massively in all contexts
- DG zone almost disappears
- Mimics real-world institutional asymmetry

**Theoretical Point**:
This recreates the **actual structural conditions**. Green Growth has institutional backing, media normalization, economic alignment. Degrowth does not. The simulation shows the spatial consequences.

**Implication**:
Paradigm strength is not "better arguments"—it's structural support. Changing DG's strength requires institutional change, not better rhetoric.

### Experiment 4: Trigger Climate Shock (Button)

**What happens**:
- Forced 3-second Climate Context
- Coordination spikes, Paradigm Space jumps to 75%
- After shock ends, rapid dissolution back to fragmentation

**Theoretical Point**:
**Shock-driven mobilization is inherently unstable**. Without sustained context transformation, the temporary alignment evaporates. This explains why climate disasters produce brief mobilization spikes but no lasting coordination.

**Implication**:
Crisis mobilization ≠ sustained transformation. Shocks can catalyze change only if followed by institutional restructuring of context distribution.

---

## The Core Theoretical Insight

### The Contextual Commons Dilemma

Climate coordination requires sustained collective identity, but:

1. **Cognitive constraint**: Humans are context-bound thinkers. We-frames fragment across contexts.

2. **Temporal constraint**: Context distribution is not individually controllable. We don't choose to spend 70% of time in climate-negative contexts.

3. **Spatial constraint**: Climate paradigms occupy minority mindshare in contexts dominating temporal distribution.

4. **Structural asymmetry**: Green Growth benefits from congruence with dominant contexts. Degrowth does not.

**The coordination failure is not motivational—it's architectural.**

### Implications for Climate Strategy

**What won't work**:
- Individual behavior change (doesn't address context distribution)
- Better climate communication (unaligned space is the problem, not misinformation)
- Paradigm debate resolution (GG vs DG is not the main barrier)

**What might work**:
- **Institutional transformation** of context distribution
  - Climate integration into workplace contexts (not just "green jobs" but "climate-centered work frames")
  - Economic restructuring so consumption contexts include climate frames by default

- **Cross-context frame persistence mechanisms**
  - Social structures that maintain climate identity across contexts
  - "Climate citizenship" as a role that transcends specific contexts

- **Expanding paradigm space, not just shifting within it**
  - Goal: Reduce unaligned space from 75% to 40%
  - This is more important than resolving GG vs DG

---

## How to Access the Simulation

**Web Access**: Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge recommended)

**Local Server** (if direct file opening doesn't work):
- Windows: Double-click `start.bat`
- Mac/Linux: Run `./start.sh` in terminal
- Or manually: `python -m http.server 8000` then open `http://localhost:8000`

**Keyboard Shortcuts**:
- `S`: Trigger climate shock event
- `R`: Reset simulation
- `Space`: Pause/unpause

---

## For Further Discussion

This simulation is a **computational thought experiment**, not an empirical model. It makes visible the structural mechanisms that are invisible in standard climate discourse.

The core claim: **Climate coordination failure is not a problem of insufficient care or information—it's a problem of context-bound cognition meeting asymmetric temporal distribution of contexts.**

Questions for discussion:
1. If paradigm marginality (not paradigm conflict) is the core problem, what interventions does this suggest?
2. How might we empirically measure "unaligned space" in real-world contexts?
3. Can institutional design transform context distributions, or are they path-dependent?
4. What would "cross-context climate citizenship" mechanisms look like?

---

**Version**: 1.0
**Last Updated**: November 2024
**Framework**: Contextual Commons Dilemma in Climate Coordination
**Contact**: Refer to course instructor or research supervisor
