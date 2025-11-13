// Utility functions for the simulation

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function lerpColor(c1, c2, t) {
    // p5.js lerpColor wrapper for smoother transitions
    return {
        r: lerp(c1.r, c2.r, t),
        g: lerp(c1.g, c2.g, t),
        b: lerp(c1.b, c2.b, t),
        a: lerp(c1.a || 255, c2.a || 255, t)
    };
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 255
    } : { r: 0, g: 0, b: 0, a: 255 };
}

function randomGaussian(mean = 0, sd = 1) {
    // Box-Muller transform for gaussian distribution
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return num * sd + mean;
}

class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    div(scalar) {
        if (scalar !== 0) {
            this.x /= scalar;
            this.y /= scalar;
        }
        return this;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const m = this.mag();
        if (m > 0) {
            this.div(m);
        }
        return this;
    }

    limit(max) {
        const m = this.mag();
        if (m > max) {
            this.normalize();
            this.mult(max);
        }
        return this;
    }

    copy() {
        return new Vector2D(this.x, this.y);
    }

    static sub(v1, v2) {
        return new Vector2D(v1.x - v2.x, v1.y - v2.y);
    }

    static dist(v1, v2) {
        return distance(v1.x, v1.y, v2.x, v2.y);
    }
}
