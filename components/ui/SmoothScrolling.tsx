"use client";
import { ReactLenis } from 'lenis/react';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    // lerp: 0.08 is slightly smoother than 0.1 — more buttery, still responsive
    // duration: 1.2 keeps momentum without feeling laggy
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
