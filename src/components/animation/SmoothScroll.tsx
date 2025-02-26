"use client";

import { useEffect } from "react";

type LenisInstance = {
raf: (time: number) => void;
on: (
event: string,
callback: (args: { scroll: number; limit: number }) => void
) => void;
destroy: () => void;
};

type LenisConstructor = new (options: {
duration?: number;
easing?: (t: number) => number;
direction?: "vertical" | "horizontal";
gestureDirection?: "vertical" | "horizontal";
smooth?: boolean;
mouseMultiplier?: number;
smoothTouch?: boolean;
touchMultiplier?: number;
infinite?: boolean;
}) => LenisInstance;

export default function SmoothScroll(): null {
useEffect(() => {
const initLenis = async () => {
try {
const { default: Lenis } = await import("lenis");

        const lenis = new (Lenis as unknown as LenisConstructor)({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });

        lenis.on("scroll", ({}: { scroll: number; limit: number }) => {});

        const raf = (time: number): void => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
          lenis.destroy();
        };
      } catch (error) {
        console.error("Failed to initialize Lenis:", error);
        return () => {};
      }
    };

    const cleanup = initLenis();

    return () => {
      cleanup.then((cleanupFn) => cleanupFn());
    };

}, []);

return null;
}