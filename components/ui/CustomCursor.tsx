"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// ─── Tuning ───────────────────────────────────────────────────────────────────
const STIFFNESS = 0.16;        // spring pull toward the pointer — higher = snappier
const DAMPING = 0.78;          // velocity damping per 60fps frame — higher = less overshoot
const TRAIL_LENGTH = 22;       // number of comet-tail points
const ORB_RADIUS = 5;          // base glowing orb radius (px)
const ORB_RADIUS_HOVER = 10;   // orb radius when hovering an interactive card
const THEME_HUE = 39;          // Gold to match the --accent theme color
const HUE_SPREAD = 15;         // slight orange shift at the tail of the trail
const SATURATION = 60;         // vibrant for glowing effect
const LIGHTNESS = 60;          // bumped slightly up for better glow on dark background
const RIPPLE_MAX = 6;          // max simultaneous click ripples
const RIPPLE_SPEED = 3.2;      // px per normalized frame
const RIPPLE_MAX_RADIUS = 60;
const MAX_DELTA = 3;           // clamp physics step (tab-resume protection)
const MAX_DPR = 2;

interface TrailPoint {
  x: number;
  y: number;
  active: boolean;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  active: boolean;
}

/**
 * SmoothTrailCursor — spring-physics glowing orb with a hue-cycling comet trail.
 *
 * Companion to the antigravity particle-burst cursor: where that one is
 * explosive and chaotic, this one is calm, elastic and continuous — a single
 * orb that "chases" the real pointer with spring damping, dragging a fading
 * rainbow trail behind it. Cards marked with [data-cursor-burst] make the
 * orb bloom on hover; clicks emit a soft expanding ripple.
 *
 * Built with the same robustness baseline as the particle cursor:
 * fixed-size pools (no per-frame allocation), delta-time physics,
 * DPR-aware canvas, resize debouncing, visibility-based pausing,
 * touch/reduced-motion opt-outs.
 */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // ── Canvas sizing (DPR-aware, debounced) ───────────────────────────────
    let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let resizeHandle = 0;

    const applySize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applySize();

    const onResize = () => {
      if (resizeHandle) cancelAnimationFrame(resizeHandle);
      resizeHandle = requestAnimationFrame(applySize);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // ── State ───────────────────────────────────────────────────────────────
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let orbX = targetX;
    let orbY = targetY;
    let orbVX = 0;
    let orbVY = 0;
    let isHovering = false;
    let hasMoved = false;

    // Fixed-size ring buffer for the trail — zero per-frame allocation.
    const trail: TrailPoint[] = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: orbX,
      y: orbY,
      active: false,
    }));
    let trailWrite = 0;

    // Fixed-size ripple pool.
    const ripples: Ripple[] = Array.from({ length: RIPPLE_MAX }, () => ({
      x: 0,
      y: 0,
      radius: 0,
      alpha: 0,
      active: false,
    }));

    const spawnRipple = (x: number, y: number) => {
      // Reuse the first inactive slot, or steal the oldest if all are busy.
      const slot = ripples.find((r) => !r.active) ?? ripples[0];
      slot.x = x;
      slot.y = y;
      slot.radius = ORB_RADIUS;
      slot.alpha = 0.5;
      slot.active = true;
    };

    // ── Pointer handling ───────────────────────────────────────────────────
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      targetX = e.clientX;
      targetY = e.clientY;
      hasMoved = true;

      let hovering = false;
      try {
        hovering = !!(e.target as HTMLElement)?.closest?.("[data-cursor-burst]");
      } catch {
        hovering = false;
      }
      isHovering = hovering;
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      spawnRipple(e.clientX, e.clientY);
    };
    document.addEventListener("pointerdown", onDown, { passive: true });

    // ── Animation loop ─────────────────────────────────────────────────────
    let rafId = 0;
    let lastTime: number | null = null;
    let running = true;
    const hueBase = THEME_HUE;

    const step = (timestamp: number) => {
      if (!running) return;
      if (lastTime === null) lastTime = timestamp;
      let dt = (timestamp - lastTime) / (1000 / 60);
      dt = Math.min(Math.max(dt, 0), MAX_DELTA);
      lastTime = timestamp;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      if (hasMoved) {
        // Spring physics: orb chases the real pointer with damped elasticity.
        const ax = (targetX - orbX) * STIFFNESS;
        const ay = (targetY - orbY) * STIFFNESS;
        orbVX = (orbVX + ax * dt) * Math.pow(DAMPING, dt);
        orbVY = (orbVY + ay * dt) * Math.pow(DAMPING, dt);
        orbX += orbVX * dt;
        orbY += orbVY * dt;

        // Sample into the trail ring buffer.
        const slot = trail[trailWrite];
        slot.x = orbX;
        slot.y = orbY;
        slot.active = true;
        trailWrite = (trailWrite + 1) % trail.length;
      }



      // ── Draw comet trail (oldest → newest, growing size/opacity) ─────────
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < trail.length; i++) {
        // Read oldest-first starting at the current write head.
        const idx = (trailWrite + i) % trail.length;
        const p = trail[idx];
        if (!p.active) continue;

        const progress = (i + 1) / trail.length; // 0 (oldest) → 1 (newest)
        const radius = 1.5 + progress * (isHovering ? ORB_RADIUS_HOVER : ORB_RADIUS);
        const alpha = Math.pow(progress, 1.6) * 0.5;
        const hue = (hueBase + progress * HUE_SPREAD) % 360;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        gradient.addColorStop(0, `hsla(${hue}, ${SATURATION}%, ${LIGHTNESS}%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${hue}, ${SATURATION}%, ${LIGHTNESS}%, 0)`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ── Draw click ripples ────────────────────────────────────────────────
      for (const r of ripples) {
        if (!r.active) continue;
        r.radius += RIPPLE_SPEED * dt;
        r.alpha -= 0.018 * dt;
        if (r.alpha <= 0 || r.radius >= RIPPLE_MAX_RADIUS) {
          r.active = false;
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${hueBase}, ${SATURATION}%, ${LIGHTNESS}%, ${Math.max(0, r.alpha)})`;
        ctx.lineWidth = 1.5;
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // ── Draw the core orb ───────────────────────────────────────────────
      if (hasMoved) {
        const radius = isHovering ? ORB_RADIUS_HOVER : ORB_RADIUS;
        const glow = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, radius * 2.2);
        glow.addColorStop(0, `hsla(${hueBase}, ${SATURATION}%, ${LIGHTNESS + 8}%, 0.9)`);
        glow.addColorStop(0.5, `hsla(${hueBase}, ${SATURATION}%, ${LIGHTNESS}%, 0.35)`);
        glow.addColorStop(1, `hsla(${hueBase}, ${SATURATION}%, ${LIGHTNESS}%, 0)`);

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(orbX, orbY, radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `hsla(${hueBase}, ${SATURATION}%, ${LIGHTNESS + 15}%, 1)`;
        ctx.arc(orbX, orbY, radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafId = requestAnimationFrame(step);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
      } else {
        running = true;
        lastTime = null;
        rafId = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    rafId = requestAnimationFrame(step);

    return () => {
      running = false;
      window.removeEventListener("resize", onResize);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeHandle) cancelAnimationFrame(resizeHandle);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}