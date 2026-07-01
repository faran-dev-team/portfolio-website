"use client";

import { ViewTransition } from "react";
import type { ReactNode } from "react";

interface PageTransitionWrapperProps {
  children: ReactNode;
}

/**
 * PageTransitionWrapper — wraps page content in React 19's ViewTransition.
 * Maps nav-forward / nav-back transition types to directional CSS animations
 * defined in globals.css. Default is "none" so transitions only fire on
 * explicitly tagged link navigations.
 *
 * Requires experimental.viewTransition: true in next.config.ts.
 */
export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
    >
      {children}
    </ViewTransition>
  );
}
