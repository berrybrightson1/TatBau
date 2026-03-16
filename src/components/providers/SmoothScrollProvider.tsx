"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.15, 
      wheelMultiplier: 1, 
      smoothWheel: true,
      touchMultiplier: 2
    }}>
      {children}
    </ReactLenis>
  );
}
