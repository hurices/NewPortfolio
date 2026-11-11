import React, { useEffect, useRef } from 'react';

/**
 * Moteur cosmique "Deep Universe" hautement animé & immersif
 * Multicouches 3D Parallaxe, nébuleuses en dérive, étoiles scintillantes,
 * constellations actives, et pluies de météores fréquentes.
 */
export default function UniverseCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 1. Étoiles multi-plans pour effet de profondeur spatiale (3D Parallax)
    const starCount = Math.min(Math.floor((width * height) / 3800), 280);
    const stars = [];

    // Palette cosmique variée et agréable
    const starPalette = [
      '#ffffff', // Blanc pur éclatant
      '#a7f3d0', // Vert émeraude boréale
      '#67e8f9', // Cyan nébuleuse
      '#c4b5fd', // Violet galactique
      '#fde047', // Étoile dorée
      '#e2e8f0'  // Poussière stellaire
    ];

    for (let i = 0; i < starCount; i++) {
      const depth = Math.random(); // 0 = loin, 1 = proche
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius: depth > 0.8 ? (Math.random() * 1.6 + 1.0) : (Math.random() * 1.0 + 0.3),
        color: starPalette[Math.floor(Math.random() * starPalette.length)],
        alpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.02 + 0.006,
        twinklePhase: Math.random() * Math.PI * 2,
        speedMultiplier: depth * 0.35 + 0.05,
        vx: (Math.random() - 0.5) * (depth * 0.4 + 0.1),
        vy: (Math.random() - 0.5) * (depth * 0.4 + 0.1),
        isConstellation: Math.random() < 0.25,
        pulseGlow: depth > 0.85
      });
    }

    // 2. Nébuleuses gazeuses cosmiques en dérive lente
    const nebulae = [
      { x: width * 0.2, y: height * 0.3, radius: 280, color: 'rgba(6, 78, 59, 0.12)', vx: 0.03, vy: 0.02 },
      { x: width * 0.8, y: height * 0.6, radius: 320, color: 'rgba(30, 27, 75, 0.15)', vx: -0.02, vy: 0.03 },
      { x: width * 0.5, y: height * 0.8, radius: 250, color: 'rgba(12, 74, 110, 0.10)', vx: 0.02, vy: -0.02 }
    ];

    // 3. Météores & Étoiles filantes
    const meteors = [];
    let lastMeteorSpawn = performance.now();

    const spawnMeteor = () => {
      const startX = Math.random() * width * 1.3 - width * 0.15;
      const startY = Math.random() * height * 0.4;
      const length = Math.random() * 120 + 80;
      const speed = Math.random() * 8 + 9;
      meteors.push({
        x: startX,
        y: startY,
        length,
        speed,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
        alpha: 1,
        decay: Math.random() * 0.016 + 0.01
      });
    };

    // 4. Interaction souris cosmique
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let lastTime = performance.now();

    // Boucle de rendu à haute fluidité 60-120 FPS
    const render = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Lissage inertiel du curseur
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // Dessin des nuages de nébuleuses cosmiques
      for (let n of nebulae) {
        n.x += n.vx * (dt * 60);
        n.y += n.vy * (dt * 60);
        if (n.x < -100) n.x = width + 100;
        if (n.x > width + 100) n.x = -100;
        if (n.y < -100) n.y = height + 100;
        if (n.y > height + 100) n.y = -100;

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Apparition régulière et vivante d'étoiles filantes
      if (currentTime - lastMeteorSpawn > 2200 && Math.random() < 0.45) {
        spawnMeteor();
        lastMeteorSpawn = currentTime;
      }

      const constellationNodes = [];

      // Rendu et animation de chaque étoile
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.x += star.vx * (dt * 60);
        star.y += star.vy * (dt * 60);

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Scintillement dynamique
        star.twinklePhase += star.twinkleSpeed * (dt * 60);
        const twinkleFactor = (Math.sin(star.twinklePhase) + 1) * 0.5;
        let currentAlpha = 0.2 + twinkleFactor * 0.65;
        let currentRadius = star.baseRadius;

        // Gravitation subtile à l'approche du curseur
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const proximity = (mouse.radius - dist) / mouse.radius;
          currentAlpha = Math.min(1, currentAlpha + proximity * 0.6);
          currentRadius += proximity * 0.9;
          // Légère attraction cosmique
          star.x += (dx / dist) * proximity * 0.3;
          star.y += (dy / dist) * proximity * 0.3;
        }

        // Halo lumineux pour les étoiles de premier plan
        if (star.pulseGlow) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, currentRadius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentAlpha * 0.25;
          ctx.fill();
        }

        // Cœur de l'étoile
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        if (star.isConstellation) {
          constellationNodes.push(star);
        }
      }

      // Lignes de constellation vivantes
      ctx.lineWidth = 0.75;
      for (let i = 0; i < constellationNodes.length; i++) {
        for (let j = i + 1; j < constellationNodes.length; j++) {
          const s1 = constellationNodes[i];
          const s2 = constellationNodes[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineOpacity = (1 - dist / 110) * 0.22;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.strokeStyle = '#38bdf8';
            ctx.globalAlpha = lineOpacity;
            ctx.stroke();
          }
        }
      }

      // Traînée des météores & étoiles filantes
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha * 0.95})`);
        grad.addColorStop(0.3, `rgba(52, 211, 153, ${m.alpha * 0.8})`);
        grad.addColorStop(0.7, `rgba(56, 189, 248, ${m.alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = m.alpha;
        ctx.stroke();

        m.x += Math.cos(m.angle) * m.speed * (dt * 60);
        m.y += Math.sin(m.angle) * m.speed * (dt * 60);
        m.alpha -= m.decay * (dt * 60);

        if (m.alpha <= 0 || m.x > width + 150 || m.y > height + 150) {
          meteors.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      style={{ background: 'transparent' }}
    />
  );
}
