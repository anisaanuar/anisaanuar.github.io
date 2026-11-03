import { useEffect, useRef } from 'react';

// A custom cursor that sits exactly on the real pointer, and gently nudges to point the way
// it is moving. When the pointer slows down or stops, it rocks softly back to its normal
// angle, with a little overshoot.
//
// The tip never leaves the pointer. The nudge is a rotation around the tip, so what you
// point at is always what you hit, and nothing lags behind.
//
// The browser's own cursor can't be animated, so this draws one from the same shapes the
// plain CSS cursors use (the --cursor-arrow and --cursor-hand variables in theme.scss). It
// only turns on for a mouse or trackpad, and not when someone prefers reduced motion. In
// those cases, and before the first mouse move, the plain CSS cursors show instead.
//
// Over anything marked data-cursor="wave" the cursor becomes an open hand, and shaking the
// mouse back and forth there makes it wave. If that spot is also marked data-wave-hold, the hand
// then stays wherever the pointer goes, for that many milliseconds after the pointer last touched
// the spot, and then goes back to normal; it takes pointing at the spot again to bring it back.

// Keep this gentle: a hint of life, not a performance.
const MAX_NUDGE = 14;      // the most the cursor turns toward where it is heading, in degrees
const START_SPEED = 0.25;  // pointer speed (pixels per millisecond) where the nudge begins
const FULL_SPEED = 2.5;    // pointer speed where the nudge is at its full strength
const STIFFNESS = 0.0011;  // how strongly it is pulled to its target angle (per ms squared)
const DAMPING = 0.029;     // how quickly the rocking dies out (per ms); lower rocks more
const IDLE_MS = 70;        // how long without movement before it starts returning to normal

// Which way each shape points when it is at rest, in degrees (0 = right, -90 = up).
const POINTS = { arrow: -123, hand: -104 };

// How a shake is noticed: this many changes of direction, each from a move of at least
// SHAKE_MIN pixels, within SHAKE_MS.
const SHAKE_REVERSALS = 2;
const SHAKE_MS = 800;
const SHAKE_MIN = 2;
const SHAKE_HOLD_MS = 450; // how long the wave carries on after the last shake

const WAVE = "[data-cursor='wave']";
const HOLD = '[data-wave-hold]';

const CLICKABLE = "a, button, summary, select, [role='button'], input[type='button'], input[type='submit']";

const smoothstep = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function Cursor() {
  const ref = useRef(null);
  const shaking = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || calm) return undefined;

    const el = ref.current;
    const root = document.documentElement;

    // The pointer, a smoothed idea of how it is moving, and the spring that turns the cursor.
    let px = 0;
    let py = 0;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let vxs = 0;
    let vys = 0;
    let shape = 'arrow';
    let holdUntil = 0; // until when the hand stays, after the pointer has touched a spot that holds it
    let holdTimer = 0;
    let overWave = false;
    let overClickable = false;
    let target = 0;
    let angle = 0;
    let spin = 0;
    let frame = 0;
    let frameT = 0;

    // For noticing a shake: the last direction of travel on each axis, and when it flipped.
    const lastSign = { x: 0, y: 0 };
    const flips = [];
    let shakeTimer = 0;

    const draw = () => {
      el.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${angle.toFixed(2)}deg)`;
    };

    const step = (now) => {
      const dt = Math.max(0, Math.min(now - frameT, 32));
      frameT = now;
      // After a short pause, the target goes back to the normal angle.
      if (now - lastT > IDLE_MS) target = 0;
      // A damped spring pulling the angle toward the target, so it rocks gently into place.
      spin += (-STIFFNESS * (angle - target) - DAMPING * spin) * dt;
      angle += spin * dt;
      if (!Number.isFinite(angle) || !Number.isFinite(spin)) angle = spin = 0;
      const resting = target === 0 && Math.abs(angle) < 0.04 && Math.abs(spin) < 0.0004;
      if (resting) {
        angle = spin = 0;
        frame = 0;
      } else {
        frame = requestAnimationFrame(step);
      }
      draw();
    };

    const wake = () => {
      if (!frame) {
        frameT = performance.now();
        frame = requestAnimationFrame(step);
      }
    };

    // Which shape to show: the open hand over a wave spot, else the pointing hand over anything clickable (even
    // while the open hand is being held), else the open hand if it is still being held, else the arrow.
    const pick = () => {
      shape = overWave ? 'wave' : overClickable ? 'hand' : performance.now() < holdUntil ? 'wave' : 'arrow';
      el.dataset.shape = shape;
    };

    const onMove = (e) => {
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const first = !el.classList.contains('is-visible');
      lastX = px = e.clientX;
      lastY = py = e.clientY;
      lastT = now;

      const closest = e.target.closest ? (sel) => e.target.closest(sel) : () => null;
      overWave = Boolean(closest(WAVE));
      overClickable = Boolean(closest(CLICKABLE));
      const holder = closest(HOLD);
      if (holder) {
        const ms = Number(holder.dataset.waveHold) || 5000;
        holdUntil = now + ms;
        clearTimeout(holdTimer);
        holdTimer = setTimeout(pick, ms + 20);
      }
      pick();

      // Shaking over a wave spot: count quick changes of direction, left-right or up-down.
      if (shape === 'wave') {
        [['x', dx], ['y', dy]].forEach(([axis, d]) => {
          if (Math.abs(d) < SHAKE_MIN) return;
          const sign = Math.sign(d);
          if (lastSign[axis] && sign !== lastSign[axis]) flips.push(now);
          lastSign[axis] = sign;
        });
        while (flips.length && now - flips[0] > SHAKE_MS) flips.shift();
        if (flips.length >= SHAKE_REVERSALS) {
          el.classList.add('is-waving');
          shaking.current = true;
          clearTimeout(shakeTimer);
          shakeTimer = setTimeout(() => {
            shaking.current = false;
          }, SHAKE_HOLD_MS);
        }
      } else {
        flips.length = 0;
        lastSign.x = 0;
        lastSign.y = 0;
        shaking.current = false;
        el.classList.remove('is-waving');
      }

      if (first) {
        root.classList.add('has-custom-cursor');
        el.classList.add('is-visible');
        vxs = vys = 0;
      } else {
        // Smooth the speed a little, so one jittery event doesn't jerk the cursor around.
        vxs = vxs * 0.6 + (dx / dt) * 0.4;
        vys = vys * 0.6 + (dy / dt) * 0.4;
        const speed = Math.hypot(vxs, vys);
        if (speed > START_SPEED && shape !== 'wave') {
          // Turn toward the direction of travel. Using the sine of the gap between where the
          // cursor points and where it is heading keeps this smooth: no turn when it is
          // already pointing that way, or heading straight away from it, and the most when
          // heading across it.
          const heading = (Math.atan2(vys, vxs) * 180) / Math.PI;
          const gap = ((heading - POINTS[shape]) * Math.PI) / 180;
          target = MAX_NUDGE * Math.sin(gap) * smoothstep(START_SPEED, FULL_SPEED, speed);
          wake();
        }
      }
      draw();
    };

    const onLeave = () => {
      el.classList.remove('is-visible');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    root.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      root.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
      clearTimeout(shakeTimer);
      clearTimeout(holdTimer);
      root.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div ref={ref} className="cursor" data-shape="arrow" aria-hidden="true">
      <span className="cursor__arrow" />
      <span className="cursor__hand" />
      <span
        className="cursor__wave"
        onAnimationIteration={() => {
          // Let a wave finish its swing before stopping, so the hand never snaps back.
          if (!shaking.current) ref.current.classList.remove('is-waving');
        }}
      />
    </div>
  );
}
