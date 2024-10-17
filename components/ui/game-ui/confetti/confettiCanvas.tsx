import React from "react";
import { ConfettiParticle, FadingMode } from "./confetti";
import "./style.css";

interface Props {
  active?: boolean;
  fadingMode?: FadingMode;
  stopAfterMs?: number;
}

export const ConfettiCanvas: React.FC<Props> = ({
  active = true,
  fadingMode = "OFF",
  stopAfterMs = 20000,
}) => {
  const [running, setRunning] = React.useState(active);
  const [hide, setHide] = React.useState(false);
  const canvasRef = React.useRef(null);
  const runningRef = React.useRef(running);
  let width = 20;
  let height = 20;
  if (typeof window !== "undefined") {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  let particles: ConfettiParticle[] = [];
  runningRef.current = running;

  function createParticles() {
    if (!canvasRef || !canvasRef.current) {
      return;
    }
    const context = (canvasRef.current as any).getContext("2d");
    particles = [];
    let total = 100;

    if (width > 1080) {
      total = 400;
    } else if (width > 760) {
      total = 300;
    } else if (width > 520) {
      total = 200;
    }
    for (let i = 0; i < total; ++i) {
      particles.push(new ConfettiParticle(context, width, height, fadingMode));
    }
  }

  function animationFunc() {
    if (!canvasRef || !canvasRef.current) {
      return;
    }
    const context = (canvasRef.current as any).getContext("2d");
    requestAnimationFrame(animationFunc);
    context && context.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.width = width;
      p.height = height;
      p.update();
      p.draw();
    }
  }

  React.useEffect(() => {
    createParticles();
    animationFunc();
    if (stopAfterMs) {
      setTimeout(() => {
        setRunning(false);
      }, stopAfterMs - 1000);
      setTimeout(() => {
        setHide(true);
      }, stopAfterMs);
    }
  }, []);

  React.useEffect(() => {
    setRunning(active);
  }, [active]);

  return (
    <React.Fragment>
      {!hide && (
        <div
          className={`${
            running ? "react-confetti-canvas" : "react-confetti-canvas fade-out"
          } absolute  z-50 pointer-events-none`}
        >
          <canvas
            id="confetti-canvas"
            width={width}
            height={height}
            ref={canvasRef}
          />
        </div>
      )}
    </React.Fragment>
  );
};
