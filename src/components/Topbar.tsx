import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const NUM_DOTS = Math.floor(Math.random() * (14 - 6 + 1)) + 6;
const REPULSION_RADIUS = 80;
const MAX_FORCE = 2.1;
const DAMPING = 0.95;
const BOUNCE_LOSS = 0.8;
const WALL_PUSH_FORCE = 0.3;
const RANDOM_BOUNCE_DELAY = 1000;
const RESET_INTERVAL = 30000;
const FRAME_RATE = 12; // Targeting ~60fps

const getRandomDot = () => ({
  x: Math.random() * window.innerWidth * 0.9,
  y: Math.random() * 60,
  vx: 0,
  vy: 0,
  size: Math.random() * 6 + 5,
  lastBounceTime: Date.now(),
});

function Topbar() {
  const [dots, setDots] = useState(() => Array.from({ length: NUM_DOTS }, getRandomDot));
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const animationRef = useRef<number | null>(null);
  const lastUpdateTime = useRef(performance.now());

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const updateDots = () => {
      const now = performance.now();
      const deltaTime = now - lastUpdateTime.current;

      // Limit updates to ~60fps
      if (deltaTime < FRAME_RATE) {
        animationRef.current = requestAnimationFrame(updateDots);
        return;
      }
      lastUpdateTime.current = now;

      setDots((prevDots) =>
        prevDots.map((dot) => {
          let { x, y, vx, vy, lastBounceTime } = dot;
          const dx = x - mousePos.x;
          const dy = y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Apply repulsion if cursor is too close
          if (distance < REPULSION_RADIUS) {
            const angle = Math.atan2(dy, dx);
            const force = Math.max(MAX_FORCE * (1 - distance / REPULSION_RADIUS), 0);
            vx += Math.cos(angle) * force;
            vy += Math.sin(angle) * force;
          }

          // Apply momentum decay
          vx *= DAMPING;
          vy *= DAMPING;

          // Update position
          x += vx;
          y += vy;

          const maxX = window.innerWidth - dot.size;
          const maxY = 60 - dot.size;

          // Bounce off walls
          if (x <= 0) {
            x = 0;
            vx = Math.abs(vx) * BOUNCE_LOSS;
            lastBounceTime = Date.now();
          }
          if (x >= maxX) {
            x = maxX;
            vx = -Math.abs(vx) * BOUNCE_LOSS;
            lastBounceTime = Date.now();
          }
          if (y <= 0) {
            y = 0;
            vy = Math.abs(vy) * BOUNCE_LOSS;
            lastBounceTime = Date.now();
          }
          if (y >= maxY) {
            y = maxY;
            vy = -Math.abs(vy) * BOUNCE_LOSS;
            lastBounceTime = Date.now();
          }

          // Delayed small bounce if near wall
          if (Date.now() - lastBounceTime > RANDOM_BOUNCE_DELAY && mousePos.x === -999) {
            const randomBounceDist = Math.random() * 3 + 3;
            if (x <= 0) x += randomBounceDist;
            if (x >= maxX) x -= randomBounceDist;
            if (y <= 0) y += randomBounceDist;
            if (y >= maxY) y -= randomBounceDist;
            lastBounceTime = Date.now();
          }

          return { ...dot, x, y, vx, vy, lastBounceTime };
        })
      );

      animationRef.current = requestAnimationFrame(updateDots);
    };

    animationRef.current = requestAnimationFrame(updateDots);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mousePos]);

  // Reset dot velocities every 30 seconds
  useEffect(() => {
    const resetVelocity = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          vx: 0,
          vy: 0,
        }))
      );
    };

    const resetInterval = setInterval(resetVelocity, RESET_INTERVAL);
    return () => clearInterval(resetInterval);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        height: "60px",
        zIndex: 1000,
        background: "linear-gradient(135deg, #E8E8E8, #B0C4DE, #9EAC99)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: "1px",
            color: "#FAFAFA",
            textShadow: "1px 1px 3px rgba(0,0,0,0.15)",
          }}
        >
          🏎️ Ultra Optimized Floating Dots
        </Typography>
      </Toolbar>

      {/* Animated Red Dots */}
      {dots.map((dot, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: "#C94C4C",
            borderRadius: "50%",
            opacity: 0.7,
            transform: `translate(${dot.x}px, ${dot.y}px)`,
          }}
        />
      ))}
    </AppBar>
  );
}

export default Topbar;
