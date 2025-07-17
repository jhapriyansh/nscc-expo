"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: { value: "#0A0912" }, // match your dark theme
        },
        particles: {
          number: {
            value: 60,
            density: { enable: true, area: 800 },
          },
          color: {
            value: ["#43DCBD", "#4BBDC6", "#5C96DA", "#ffffff", "#FE9B62", "#E66F5C"],
          },
          shape: { type: "circle" },
          opacity: {
            value: 0.7,
          },
          size: {
            value: { min: 3, max: 6 },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            outModes: { default: "out" },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
