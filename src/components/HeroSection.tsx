"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";
import { X, Flame } from "lucide-react";
import MusicPlayer from "./MusicPlayer";

/* ───────────────────────────────────────────
   Star‑field canvas with mouse parallax
   ─────────────────────────────────────────── */
function StarCanvas({
  playMode,
  onGameOver,
  registerReset,
}: {
  playMode: boolean;
  onGameOver: (score: number) => void;
  registerReset: (resetFn: () => void) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);

  const playModeRef = useRef(playMode);
  useEffect(() => {
    playModeRef.current = playMode;
  }, [playMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const trailCanvas = trailCanvasRef.current;
    if (!canvas || !trailCanvas) return;

    const ctx = trailCanvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let trailWidth = (trailCanvas.width = window.innerWidth);
    let trailHeight = (trailCanvas.height = window.innerHeight);

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 12;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.75);
    dirLight.position.set(5, 10, 8);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x06b6d4, 1.2, 30);
    blueLight.position.set(6, 1, 4);
    scene.add(blueLight);

    // 3D Starfield points
    const isMobileDevice = typeof window !== "undefined" && (window.innerWidth < 768 || navigator.maxTouchPoints > 0);
    const starCount = isMobileDevice ? 85 : 200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSpeeds: number[] = [];

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 45;     // x
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 35; // y
      starPositions[i * 3 + 2] = -Math.random() * 50;        // z (stretches far away)
      starSpeeds.push(0.12 + Math.random() * 0.28);
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // Planets removed by request

    // Procedural Spaceship Group (Sleeker design)
    const spaceship = new THREE.Group();

    // Metallic material
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Slate dark metallic
      metalness: 0.9,
      roughness: 0.12,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan highlights
      metalness: 0.8,
      roughness: 0.2,
    });

    // Glass cockpit
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 1.8,
    });

    // Exhaust fire
    const fireMat = new THREE.MeshBasicMaterial({
      color: 0xff4d00,
    });

    // Sleeker fuselage
    const bodyGeom = new THREE.CylinderGeometry(0.04, 0.18, 1.4, 8);
    const bodyMesh = new THREE.Mesh(bodyGeom, metalMat);
    bodyMesh.rotation.x = Math.PI / 2; // Lie flat along Z
    spaceship.add(bodyMesh);

    // Sleeker cockpit
    const noseGeom = new THREE.ConeGeometry(0.18, 0.6, 8);
    const noseMesh = new THREE.Mesh(noseGeom, glassMat);
    noseMesh.rotation.x = -Math.PI / 2;
    noseMesh.position.z = -0.85;
    spaceship.add(noseMesh);

    // Swept-back wing left
    const wingShape = new THREE.BoxGeometry(0.9, 0.02, 0.35);
    const leftWing = new THREE.Mesh(wingShape, metalMat);
    leftWing.position.set(-0.55, -0.02, 0.1);
    leftWing.rotation.y = -Math.PI / 12; // Swept back
    leftWing.rotation.z = -Math.PI / 24; // Slight dihedral tilt
    spaceship.add(leftWing);

    // Swept-back wing right
    const rightWing = leftWing.clone();
    rightWing.position.x = 0.55;
    rightWing.rotation.y = Math.PI / 12;
    rightWing.rotation.z = Math.PI / 24;
    spaceship.add(rightWing);

    // Twin vertical stabilizer fins
    const finGeom = new THREE.BoxGeometry(0.02, 0.32, 0.22);
    const leftFin = new THREE.Mesh(finGeom, metalMat);
    leftFin.position.set(-0.14, 0.18, 0.4);
    leftFin.rotation.z = -Math.PI / 8; // angled outward
    spaceship.add(leftFin);

    const rightFin = leftFin.clone();
    rightFin.position.x = 0.14;
    rightFin.rotation.z = Math.PI / 8;
    spaceship.add(rightFin);

    // Engine thruster port
    const portGeom = new THREE.CylinderGeometry(0.11, 0.11, 0.15, 8);
    const portMesh = new THREE.Mesh(portGeom, new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 }));
    portMesh.rotation.x = Math.PI / 2;
    portMesh.position.z = 0.72;
    spaceship.add(portMesh);

    // Thruster flame
    const flameGeom = new THREE.ConeGeometry(0.1, 0.7, 8);
    const flameMesh = new THREE.Mesh(flameGeom, fireMat);
    flameMesh.rotation.x = Math.PI / 2;
    flameMesh.position.z = 1.1;
    spaceship.add(flameMesh);

    // Tip guns
    const gunGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 4);
    const leftGun = new THREE.Mesh(gunGeom, accentMat);
    leftGun.rotation.x = Math.PI / 2;
    leftGun.position.set(-1.0, -0.02, 0.0);
    const rightGun = leftGun.clone();
    rightGun.position.x = 1.0;
    spaceship.add(leftGun);
    spaceship.add(rightGun);

    // Position spaceship near center, slightly forward
    spaceship.position.set(0, 0, 7.5);
    scene.add(spaceship);

    // Mouse Tracking for Parallax
    let targetMX = 0;
    let targetMY = 0;
    let currentMX = 0;
    let currentMY = 0;

    const trail: { x: number; y: number }[] = [];

    const onMouseMove = (e: MouseEvent) => {
      targetMX = (e.clientX / width - 0.5) * 2;
      targetMY = (e.clientY / height - 0.5) * 2;

      trail.push({ x: e.clientX, y: e.clientY });
      if (trail.length > 25) {
        trail.shift();
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    let gameActive = true;

    // Shooting Lasers state
    const lasers: { mesh: THREE.Mesh; zSpeed: number; radius: number }[] = [];
    const laserGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 4);
    laserGeom.rotateX(Math.PI / 2);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      toneMapped: false,
    });

    // Upgraded Weapon (Rocket) geometries
    const rocketGeom = new THREE.CylinderGeometry(0.06, 0.06, 1.0, 6);
    rocketGeom.rotateX(Math.PI / 2);
    const rocketMat = new THREE.MeshStandardMaterial({
      color: 0xff3b00,
      emissive: 0xff3b00,
      emissiveIntensity: 2.0,
      roughness: 0.2,
    });

    const shootLaser = () => {
      if (!playModeRef.current || !gameActive) return;
      if (window.scrollY > 100) return;
      const spawnZ = spaceship.position.z - 0.9;
      const spawnY = spaceship.position.y - 0.02;

      if (score >= 500) {
        // Triple rocket upgraded shot
        const leftRocket = new THREE.Mesh(rocketGeom, rocketMat);
        leftRocket.position.set(spaceship.position.x - 1.0, spawnY, spawnZ);
        scene.add(leftRocket);
        lasers.push({ mesh: leftRocket, zSpeed: -1.1, radius: 0.35 });

        const centerRocket = new THREE.Mesh(rocketGeom, rocketMat);
        centerRocket.position.set(spaceship.position.x, spawnY + 0.15, spawnZ);
        scene.add(centerRocket);
        lasers.push({ mesh: centerRocket, zSpeed: -1.1, radius: 0.35 });

        const rightRocket = new THREE.Mesh(rocketGeom, rocketMat);
        rightRocket.position.set(spaceship.position.x + 1.0, spawnY, spawnZ);
        scene.add(rightRocket);
        lasers.push({ mesh: rightRocket, zSpeed: -1.1, radius: 0.35 });
      } else {
        // Standard dual laser shot
        const leftLaser = new THREE.Mesh(laserGeom, laserMat);
        leftLaser.position.set(spaceship.position.x - 1.0, spawnY, spawnZ);
        scene.add(leftLaser);
        lasers.push({ mesh: leftLaser, zSpeed: -0.8, radius: 0.18 });

        const rightLaser = new THREE.Mesh(laserGeom, laserMat);
        rightLaser.position.set(spaceship.position.x + 1.0, spawnY, spawnZ);
        scene.add(rightLaser);
        lasers.push({ mesh: rightLaser, zSpeed: -0.8, radius: 0.18 });
      }
    };

    registerReset(() => {
      score = 0;
      shield = 100;
      gameActive = true;
      spaceship.position.set(0, 0, 7.5);
      spaceship.visible = true;
      vx = 0;
      vy = 0;
      targetVx = 0;
      targetVy = 0;
      targets.forEach(resetTarget);
      lasers.forEach(l => {
        scene.remove(l.mesh);
        l.mesh.geometry.dispose();
        if (Array.isArray(l.mesh.material)) {
          l.mesh.material.forEach(m => m.dispose());
        } else {
          l.mesh.material.dispose();
        }
      });
      lasers.length = 0;

      // Update DOM
      const scoreValEl = document.getElementById("hud-score-val");
      if (scoreValEl) scoreValEl.textContent = "00000";
      const shieldValEl = document.getElementById("hud-shield-val");
      const shieldBarEl = document.getElementById("hud-shield-bar");
      if (shieldValEl && shieldBarEl) {
        shieldValEl.textContent = "100%";
        shieldBarEl.style.width = "100%";
        shieldBarEl.style.backgroundColor = "#06b6d4";
        shieldValEl.style.color = "#06b6d4";
      }
    });

    // Spaceship keys state
    const pressedKeys = { w: false, a: false, s: false, d: false };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playModeRef.current || !gameActive) return;
      if (window.scrollY > 100) return;
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        pressedKeys[key] = true;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        shootLaser();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
        pressedKeys[key] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Spaceship velocities
    let targetVx = 0;
    let targetVy = 0;
    let vx = 0;
    let vy = 0;
    const speedFactor = 0.018;

    // Game stats
    let score = 0;
    let shield = 100;

    // Target Obstacles & Enemies
    interface Target {
      mesh: THREE.Object3D;
      type: "asteroid" | "drone";
      radius: number;
      vz: number;
      rotX: number;
      rotY: number;
    }

    const targets: Target[] = [];
    const maxTargets = isMobileDevice ? 2 : 5;

    const asteroidGeom = new THREE.DodecahedronGeometry(0.45, 1);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0xf97316, // magma orange glowing meteor
      emissive: 0xeab308,
      emissiveIntensity: 1.8,
      roughness: 0.95,
      metalness: 0.05,
    });

    const createDroneMesh = () => {
      const group = new THREE.Group();

      // Main dark metallic chassis
      const darkMetal = new THREE.MeshStandardMaterial({
        color: 0x111827,
        metalness: 0.8,
        roughness: 0.2,
      });

      // Red enemy glow
      const redGlow = new THREE.MeshBasicMaterial({
        color: 0xff0055,
      });

      // Central fuselage
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.9, 8), darkMetal);
      body.rotation.x = Math.PI / 2;
      group.add(body);

      // Red glowing central eye (cockpit)
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), redGlow);
      eye.position.set(0, 0.05, -0.2);
      group.add(eye);

      // Swept-forward left wing
      const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.03, 0.2), darkMetal);
      wingL.position.set(-0.4, 0, -0.1);
      wingL.rotation.y = Math.PI / 8;
      wingL.rotation.z = -Math.PI / 16;
      group.add(wingL);

      // Swept-forward right wing
      const wingR = wingL.clone();
      wingR.position.x = 0.4;
      wingR.rotation.y = -Math.PI / 8;
      wingR.rotation.z = Math.PI / 16;
      group.add(wingR);

      // Wingtip laser pods
      const podGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.25, 4);
      podGeom.rotateX(Math.PI / 2);
      const podL = new THREE.Mesh(podGeom, redGlow);
      podL.position.set(-0.68, 0, -0.2);
      group.add(podL);

      const podR = podL.clone();
      podR.position.x = 0.68;
      group.add(podR);

      // Engine Thruster
      const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.15, 8), darkMetal);
      thruster.rotation.x = Math.PI / 2;
      thruster.position.z = 0.48;
      group.add(thruster);

      // Red thruster flame
      const engineFire = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.35, 8), redGlow);
      engineFire.rotation.x = -Math.PI / 2;
      engineFire.position.z = 0.65;
      group.add(engineFire);

      return group;
    };

    const resetTarget = (t: Target) => {
      t.mesh.position.set(
        (Math.random() - 0.5) * 13,
        (Math.random() - 0.5) * 9,
        -40 - Math.random() * 25
      );
      t.vz = 0.14 + Math.random() * 0.22;
      t.rotX = (Math.random() - 0.5) * 0.05;
      t.rotY = (Math.random() - 0.5) * 0.05;
      t.mesh.visible = true;

      if (t.type === "asteroid") {
        const scale = 0.7 + Math.random() * 0.8;
        t.mesh.scale.set(scale, scale, scale);
        t.radius = 0.45 * scale;
      }
    };

    for (let i = 0; i < maxTargets; i++) {
      const isDrone = i % 2 === 0;
      let mesh: THREE.Object3D;
      let radius = 0.4;

      if (isDrone) {
        mesh = createDroneMesh();
        radius = 0.45;
      } else {
        mesh = new THREE.Mesh(asteroidGeom, asteroidMat);
        const scale = 0.7 + Math.random() * 0.8;
        mesh.scale.set(scale, scale, scale);
        radius = 0.45 * scale;
      }

      scene.add(mesh);

      const tData: Target = {
        mesh,
        type: isDrone ? "drone" : "asteroid",
        radius,
        vz: 0.14 + Math.random() * 0.22,
        rotX: (Math.random() - 0.5) * 0.03,
        rotY: (Math.random() - 0.5) * 0.03,
      };

      resetTarget(tData);
      targets.push(tData);
    }

    // Explosion particles
    const particles: { mesh: THREE.Mesh; vx: number; vy: number; vz: number; life: number }[] = [];
    const partGeom = new THREE.SphereGeometry(0.04, 4, 4);

    const createExplosion = (x: number, y: number, z: number, color: number) => {
      const partMat = new THREE.MeshBasicMaterial({ color, toneMapped: false });
      for (let i = 0; i < 10; i++) {
        const p = new THREE.Mesh(partGeom, partMat);
        p.position.set(x, y, z);
        scene.add(p);
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.03 + Math.random() * 0.07;
        particles.push({
          mesh: p,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          vz: (Math.random() - 0.5) * speed,
          life: 1.0,
        });
      }
    };

    let raf: number;
    const LERP = 0.04;

    const draw = (t: number) => {
      // Clear 2D trail canvas
      ctx.clearRect(0, 0, trailWidth, trailHeight);

      const isScrolledDown = window.scrollY > 100;
      const actualTargetX = isScrolledDown ? 0 : targetMX;
      const actualTargetY = isScrolledDown ? 0 : targetMY;

      currentMX += (actualTargetX - currentMX) * LERP;
      currentMY += (actualTargetY - currentMY) * LERP;

      // Rotate environments based on mouse input
      starPoints.rotation.y = currentMX * 0.06;
      starPoints.rotation.x = currentMY * 0.06;

      // Check document theme to update star color dynamically
      const isLightMode = document.documentElement.classList.contains("light");
      if (isLightMode) {
        starMaterial.color.setHex(0x3730a3); // Dark indigo stars in light mode
        starMaterial.opacity = 0.85;
      } else {
        starMaterial.color.setHex(0xffffff); // White stars in dark mode
        starMaterial.opacity = 0.5;
      }

      // Animate Stars (moving forward)
      const positions = starGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        positions[i * 3 + 2] += starSpeeds[i];
        if (positions[i * 3 + 2] > 12) {
          positions[i * 3 + 2] = -50;
          positions[i * 3] = (Math.random() - 0.5) * 45;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
        }
      }
      starGeometry.attributes.position.needsUpdate = true;

      // Planets animation removed

      const inPlay = playModeRef.current;
      spaceship.visible = inPlay && gameActive;
      targets.forEach(t => {
        t.mesh.visible = inPlay && gameActive;
      });

      if (gameActive) {
        if (isScrolledDown || !inPlay) {
          // Gently center the ship when scrolled down or not in playMode
          spaceship.position.x += (0 - spaceship.position.x) * 0.08;
          spaceship.position.y += (0 - spaceship.position.y) * 0.08;
          spaceship.rotation.set(0, 0, 0);
          vx = 0;
          vy = 0;
          targetVx = 0;
          targetVy = 0;
        } else {
          // Spaceship flight logic using WASD keyboard inputs
          let moveX = 0;
          let moveY = 0;

          if (pressedKeys.a) moveX = -1;
          if (pressedKeys.d) moveX = 1;
          if (pressedKeys.w) moveY = 1;
          if (pressedKeys.s) moveY = -1;

          targetVx += moveX * speedFactor;
          targetVy += moveY * speedFactor;

          vx += (targetVx - vx) * 0.12;
          vy += (targetVy - vy) * 0.12;

          spaceship.position.x += vx;
          spaceship.position.y += vy;

          targetVx *= 0.85;
          targetVy *= 0.85;

          // Boundaries check
          spaceship.position.x = Math.max(-6.0, Math.min(6.0, spaceship.position.x));
          spaceship.position.y = Math.max(-4.0, Math.min(4.0, spaceship.position.y));

          // Spaceship inertial tilt rotations based on velocity
          spaceship.rotation.z = -vx * 1.5;
          spaceship.rotation.x = -vy * 1.2;
          spaceship.rotation.y = vx * 0.6;
        }

        if (!isScrolledDown && inPlay) {
          // Update lasers and check collision
          for (let i = lasers.length - 1; i >= 0; i--) {
            const l = lasers[i];
            l.mesh.position.z += l.zSpeed;

            let laserRemoved = false;

            // Check collision against targets
            for (let j = 0; j < targets.length; j++) {
              const targetObj = targets[j];
              const dx = l.mesh.position.x - targetObj.mesh.position.x;
              const dy = l.mesh.position.y - targetObj.mesh.position.y;
              const dz = l.mesh.position.z - targetObj.mesh.position.z;
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

              if (dist < (targetObj.radius + l.radius)) {
                // Hit explosion!
                const hitColor = targetObj.type === "drone" ? 0xff0055 : 0xf97316;
                createExplosion(targetObj.mesh.position.x, targetObj.mesh.position.y, targetObj.mesh.position.z, hitColor);

                // Scoring
                score += targetObj.type === "drone" ? 100 : 50;
                resetTarget(targetObj);

                // Remove laser
                scene.remove(l.mesh);
                l.mesh.geometry.dispose();
                if (Array.isArray(l.mesh.material)) {
                  l.mesh.material.forEach(m => m.dispose());
                } else {
                  l.mesh.material.dispose();
                }
                lasers.splice(i, 1);
                laserRemoved = true;
                break;
              }
            }

            if (laserRemoved) continue;

            // Clean up out of bounds laser
            if (l.mesh.position.z < -50) {
              scene.remove(l.mesh);
              l.mesh.geometry.dispose();
              if (Array.isArray(l.mesh.material)) {
                l.mesh.material.forEach(m => m.dispose());
              } else {
                l.mesh.material.dispose();
              }
              lasers.splice(i, 1);
            }
          }

          // Update and spin targets
          targets.forEach((t) => {
            t.mesh.position.z += t.vz;
            t.mesh.rotation.x += t.rotX;
            t.mesh.rotation.y += t.rotY;

            // Reset target if it flies past player
            if (t.mesh.position.z > 12) {
              resetTarget(t);
            }

            // Check collision between spaceship and target
            const dx = spaceship.position.x - t.mesh.position.x;
            const dy = spaceship.position.y - t.mesh.position.y;
            const dz = spaceship.position.z - t.mesh.position.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < (t.radius + 0.65)) {
              // Crash explosion
              createExplosion(spaceship.position.x, spaceship.position.y, spaceship.position.z - 0.4, 0xf97316);

              // Shield damage
              shield = Math.max(0, shield - 20);
              resetTarget(t);

              if (shield <= 0) {
                // Spaceship destroyed!
                spaceship.visible = false;
                createExplosion(spaceship.position.x, spaceship.position.y, spaceship.position.z, 0xff0000);
                createExplosion(spaceship.position.x - 0.5, spaceship.position.y, spaceship.position.z - 0.5, 0xffaa00);
                createExplosion(spaceship.position.x + 0.5, spaceship.position.y, spaceship.position.z - 0.5, 0xff5500);

                const heroEl = document.getElementById("hero");
                if (heroEl) {
                  heroEl.style.boxShadow = "inset 0 0 50px rgba(239, 68, 68, 0.5)";
                  setTimeout(() => {
                    heroEl.style.boxShadow = "";
                  }, 600);
                }

                gameActive = false;
                onGameOver(score);
              } else {
                const heroEl = document.getElementById("hero");
                if (heroEl) {
                  heroEl.style.boxShadow = "inset 0 0 25px rgba(239, 68, 68, 0.2)";
                  setTimeout(() => {
                    heroEl.style.boxShadow = "";
                  }, 150);
                }
              }
            }
          });
        }
      }

      if (!isScrolledDown && inPlay) {
        // Update explosion particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.mesh.position.x += p.vx;
          p.mesh.position.y += p.vy;
          p.mesh.position.z += p.vz;
          p.life -= 0.03;
          p.mesh.scale.setScalar(p.life);

          if (p.life <= 0) {
            scene.remove(p.mesh);
            p.mesh.geometry.dispose();
            if (Array.isArray(p.mesh.material)) {
              p.mesh.material.forEach(m => m.dispose());
            } else {
              p.mesh.material.dispose();
            }
            particles.splice(i, 1);
          }
        }
      }

      // Update DOM HUD counters
      const scoreValEl = document.getElementById("hud-score-val");
      if (scoreValEl) {
        scoreValEl.textContent = String(score).padStart(5, "0");
      }

      const shieldValEl = document.getElementById("hud-shield-val");
      const shieldBarEl = document.getElementById("hud-shield-bar");
      if (shieldValEl && shieldBarEl) {
        shieldValEl.textContent = `${shield}%`;
        shieldBarEl.style.width = `${shield}%`;

        if (shield <= 20) {
          shieldBarEl.style.backgroundColor = "#ef4444";
          shieldValEl.style.color = "#ef4444";
        } else if (shield <= 50) {
          shieldBarEl.style.backgroundColor = "#eab308";
          shieldValEl.style.color = "#eab308";
        } else {
          shieldBarEl.style.backgroundColor = "#06b6d4";
          shieldValEl.style.color = "#06b6d4";
        }
      }

      // Flicker thruster fire
      const flameScale = 1.0 + Math.sin(t * 0.05) * 0.25;
      flameMesh.scale.set(1.0 + Math.sin(t * 0.05) * 0.1, flameScale, 1.0 + Math.sin(t * 0.05) * 0.1);

      // Render 3D WebGL Scene
      renderer.render(scene, camera);

      // Project spaceship 3D position to 2D screen coordinates for the greeting bubble
      const bubbleEl = document.getElementById("hud-greeting-bubble");
      if (bubbleEl) {
        const tempV = new THREE.Vector3();
        spaceship.getWorldPosition(tempV);
        tempV.project(camera);

        const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
        const y = (tempV.y * -0.5 + 0.5) * window.innerHeight;

        bubbleEl.style.left = `${x}px`;
        bubbleEl.style.top = `${y - 70}px`; // offset it nicely above the spaceship model
      }

      // Draw Cursor trail on top 2D Canvas
      if (!isScrolledDown && trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const p1 = trail[i - 1];
          const p2 = trail[i];

          const widthFactor = (i / trail.length) * 4.5;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          const ratio = i / trail.length;
          let color = "transparent";
          if (ratio > 0.7) {
            color = `rgba(6, 182, 212, ${ratio * 0.95})`; // Cyan Head
          } else if (ratio > 0.3) {
            color = `rgba(99, 102, 241, ${ratio * 0.75})`; // Indigo
          } else {
            color = `rgba(236, 72, 153, ${ratio * 0.45})`; // Pink Tail
          }

          ctx.strokeStyle = color;
          ctx.lineWidth = widthFactor;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          if (i > trail.length * 0.6) {
            ctx.shadowBlur = 12;
            ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.stroke();
        }
        ctx.shadowBlur = 0; // Reset
      }

      // Decay trail slowly
      if (trail.length > 0) {
        trail.shift();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      trailWidth = trailCanvas.width = window.innerWidth;
      trailHeight = trailCanvas.height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", onResize);

      // Clean up meshes and geometries
      lasers.forEach(l => scene.remove(l.mesh));
      targets.forEach(t => scene.remove(t.mesh));
      particles.forEach(p => scene.remove(p.mesh));

      asteroidGeom.dispose();
      asteroidMat.dispose();
      laserGeom.dispose();
      laserMat.dispose();
      rocketGeom.dispose();
      rocketMat.dispose();
      renderer.dispose();
    };
  }, [onGameOver, registerReset]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <canvas
        ref={trailCanvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen"
      />
    </div>
  );
}

/* ───────────────────────────────────────────
   Main Hero Component
   ─────────────────────────────────────────── */
const HERO_STATS = [
  { value: "5+", label: "Projects Delivered" },
  { value: "3yr", label: "Experience" },
  { value: "10+", label: "APIs Built" },
];

const TESTIMONIALS = [
  {
    name: "Gina Sausan Solihah",
    role: "Project Manager",
    relation: "Worked with Yosua on the same team",
    accent: "from-rose-500 to-orange-400",
    quote:
      "I've had the pleasure of working with Yosua in our team, and he has been an excellent developer. Proactive, reliable, and always ready to solve problems with clean and efficient code. A great asset to any tech team!"
  },
  {
    name: "Farah Nadia Putri",
    role: "UI/UX Designer at PT Tabel Data Informatika",
    relation: "Worked with Yosua on the same team",
    accent: "from-amber-200 to-pink-300",
    quote:
      "I had the pleasure of working with Yosua on several mobile app projects, and I can confidently say that he was very responsible, conscientious and dedicated to his work as mobile developer with a strong command of both Android and iOS platforms. What sets Yosua apart is not just technical skills, but also his ability to communicate clearly, collaborate effectively, and solve problems creatively."
  },
  {
    name: "Fahmi Fazlurrahman",
    role: "Lecturer and collaborator",
    relation: "Managed Yosua directly",
    accent: "from-sky-500 to-cyan-300",
    quote:
      "I had the privilege of teaching and working alongside Yosua during his time at Tabel Data Informatika. He quickly distinguished himself through his eagerness to learn, technical proficiency, and dedication to his work. Yosua was proactive in taking on responsibilities beyond his role. I believe Yosua has great potential and will continue to grow and contribute significantly in his future endeavors."
  },
  {
    name: "Mochamad Salman Ramadhan",
    role: "Senior Data Platform Engineer",
    relation: "Managed Yosua directly",
    accent: "from-emerald-500 to-lime-300",
    quote:
      "He is a highly adaptable professional who consistently meets tight deadlines and demonstrates a strong sense of responsibility. I have been particularly impressed by his critical thinking abilities and the confident manner in which he approaches and manages tasks."
  }
];

export default function HeroSection({
  playMode,
  setPlayMode,
  playMusicOnStart = false
}: {
  playMode: boolean;
  setPlayMode: (val: boolean) => void;
  playMusicOnStart?: boolean;
}) {
  const [showGreeting, setShowGreeting] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const resetGameRef = useRef<(() => void) | null>(null);
  const [scrollY, setScrollY] = useState(0);

  const playModeRef = useRef(playMode);
  useEffect(() => {
    playModeRef.current = playMode;
    if (playMode) {
      if (resetGameRef.current) {
        resetGameRef.current();
      }
      const timer = setTimeout(() => {
        setShowGreeting(true);
        const hideTimer = setTimeout(() => {
          setShowGreeting(false);
        }, 6000);
        return () => clearTimeout(hideTimer);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowGreeting(false);
        setIsGameOver(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [playMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGameOver = useCallback((score: number) => {
    setFinalScore(score);
    setIsGameOver(true);
  }, []);

  const registerGameReset = useCallback((resetFn: () => void) => {
    resetGameRef.current = resetFn;
  }, []);

  const handleRestart = () => {
    if (resetGameRef.current) {
      resetGameRef.current();
    }
    setIsGameOver(false);
  };

  const stats = HERO_STATS;
  const testimonials = TESTIMONIALS;

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const currentTestimonial = testimonials[activeTestimonial];

  const nextTestimonial = () => {
    setActiveTestimonial((index) => (index + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setActiveTestimonial((index) => (index - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((index) => (index + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  /* ── Name ref (static, no magnetic effect) ── */

  /* ── Scroll‑based blur / scale / opacity ── */
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;

      if (window.innerWidth <= 900) {
        el.style.filter = "blur(0px)";
        el.style.transform = "scale(1)";
        el.style.opacity = "1";
        return;
      }

      const triggerStart = window.innerHeight * 0.1;       /* 10vh */
      const triggerEnd = window.innerHeight * 0.7;       /* full effect range */
      const scrollY = window.scrollY;

      if (scrollY <= triggerStart) {
        el.style.filter = "blur(0px)";
        el.style.transform = "scale(1)";
        el.style.opacity = "1";
        return;
      }

      const progress = Math.min((scrollY - triggerStart) / (triggerEnd - triggerStart), 1);
      const blur = progress * 24;                        /* max 24px */
      const scale = 1 - progress * 0.04;                 /* min 0.96 */
      const opacity = 1 - progress * 1.0;                 /* min 0.0 */

      el.style.filter = `blur(${blur}px)`;
      el.style.transform = `scale(${scale})`;
      el.style.opacity = `${opacity}`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Inline CSS animations ────────────────────── */}
      <style>{`
        /* ── Fonts (Google) ───────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&family=Montserrat:wght@900&display=swap');

        /* ── Spinning rings ──────────────────────────── */
        @keyframes spinRing   { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes counterSpin{ 0%{transform:rotate(0deg)} 100%{transform:rotate(-360deg)} }

        /* ── Floating wave for YOSUA letters ─────────── */
        @keyframes floatWave {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }

        /* ── Pulsing green dot ───────────────────────── */
        @keyframes pulseDot {
          0%, 100% { opacity:1; box-shadow:0 0 0 0 rgba(34,197,94,.6); }
          50%      { opacity:.85; box-shadow:0 0 0 6px rgba(34,197,94,0); }
        }

        /* ── Gradient text animation ─────────────────── */
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* ── Hero wrapper (sticky + scroll‑blur) ─────── */
        .hero-sticky-wrap {
          position: sticky;
          top: 0;
          z-index: 1;
        }

        /* ── Hero root ───────────────────────────────── */
        .hero-root {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #030305;
          overflow: hidden;
          will-change: filter, transform, opacity;
        }

        /* ── Floating blobs for professional mesh background ── */
        @keyframes floatBlob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(30px, -50px) scale(1.1); }
          66%      { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes floatBlob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-40px, 40px) scale(1.15); }
        }

        .mesh-grid-bg {
          position: absolute;
          inset: 0;
          background: #030305;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .mesh-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(circle at center, black 40%, transparent 95%);
          z-index: 1;
        }
        .blob-1 {
          position: absolute;
          top: 10%;
          left: 15%;
          width: 45vw;
          height: 45vw;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(60px);
          animation: floatBlob1 20s infinite ease-in-out;
          z-index: 0;
        }
        .blob-2 {
          position: absolute;
          bottom: 10%;
          right: 15%;
          width: 40vw;
          height: 40vw;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(50px);
          animation: floatBlob2 18s infinite ease-in-out;
          z-index: 0;
        }

        /* ── Ambient glows ───────────────────────────── */
        .glow-left {
          position: absolute;
          top: 20%;
          left: -10%;
          width: 50vw;
          height: 60vh;
          background: radial-gradient(circle, rgba(99,102,241,.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .glow-right {
          position: absolute;
          bottom: 10%;
          right: -10%;
          width: 50vw;
          height: 60vh;
          background: radial-gradient(circle, rgba(167,139,250,.10) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Content wrapper ─────────────────────────── */
        .hero-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 100px 5vw 90px;
          width: 100%;
          gap: 48px;
          position: relative;
          z-index: 2;
        }
        .hero-left  { flex: 1; min-width: 0; }
        .hero-right {
          flex: 0 0 auto;
          width: 100%;
          max-width: 300px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 20px;
          transform: translateY(-40px);
        }

        /* ── Label mono ──────────────────────────────── */
        .label-mono {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          color: #64748b;
          margin-bottom: 12px;
          letter-spacing: .5px;
        }

        /* ── Name ─────────────────────────────────────── */
        

        /* ── Description ──────────────────────────────── */
        .hero-desc {
          font-size: 16px;
          line-height: 1.7;
          color: #94a3b8;
          max-width: 520px;
          margin-bottom: 28px;
        }
        .hero-desc em {
          font-style: italic;
          color: #cbd5e1;
        }

        /* ── Tech pills ──────────────────────────────── */
        .tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 36px;
        }
        .tech-pill {
          padding: 6px 18px;
          border-radius: 9999px;
          border: 1px solid rgba(99,102,241,.35);
          color: #a78bfa;
          font-size: 13px;
          font-family: 'JetBrains Mono', monospace;
          background: transparent;
          transition: all .25s ease;
          cursor: default;
        }
        .tech-pill:hover {
          background: rgba(99,102,241,.12);
          border-color: rgba(99,102,241,.6);
          color: #c4b5fd;
          transform: translateY(-2px);
        }

        /* ── CTA buttons ─────────────────────────────── */
        .cta-group {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .cta-solid {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #a78bfa);
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          border: none;
          cursor: pointer;
          transition: all .3s ease;
          text-decoration: none;
        }
        .cta-solid:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99,102,241,.4);
        }
        .cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 12px;
          background: transparent;
          color: #a78bfa;
          font-weight: 600;
          font-size: 15px;
          border: 1px solid rgba(167,139,250,.35);
          cursor: pointer;
          transition: all .3s ease;
          text-decoration: none;
        }
        .cta-ghost:hover {
          background: rgba(167,139,250,.08);
          border-color: rgba(167,139,250,.6);
          transform: translateY(-2px);
        }

        /* ── Profile photo + rings ───────────────────── */
        .profile-ring-wrap {
          position: relative;
          width: 220px;
          height: 220px;
        }
        .ring-outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px dashed rgba(99,102,241,.45);
          animation: spinRing 18s linear infinite;
        }
        .ring-inner {
          position: absolute;
          inset: 14px;
          border-radius: 50%;
          border: 2.5px solid rgba(167,139,250,.5);
          animation: counterSpin 12s linear infinite;
        }
        .profile-img-wrap {
          position: absolute;
          inset: 28px;
          border-radius: 50%;
          overflow: hidden;
          background: #1e1b4b;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Replace the placeholder below with: <img src="/your-photo.jpg" alt="Yosua" style="width:100%;height:100%;object-fit:cover;" /> */
        .profile-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e1b4b, #312e81);
        }
        .profile-placeholder svg {
          width: 56%;
          height: 56%;
          color: rgba(167,139,250,.5);
        }

        /* ── Floating YOSUA ──────────────────────────── */
        .floating-name {
          display: flex;
          gap: 4px;
          user-select: none;
        }
        .floating-letter {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(42px, 5vw, 64px);
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(99,102,241,.45);
          text-stroke: 1.5px rgba(99,102,241,.45);
          animation: floatWave 3s ease-in-out infinite;
          transition: text-shadow .3s ease, -webkit-text-stroke-color .3s ease;
          cursor: default;
          line-height: 1;
        }
        .floating-letter:hover {
          animation-play-state: paused;
          -webkit-text-stroke-color: rgba(167,139,250,.9);
          text-shadow: 0 0 24px rgba(167,139,250,.6), 0 0 48px rgba(167,139,250,.3);
        }

        /* ── Stat cards ──────────────────────────────── */
        .stat-cards {
          display: flex;
          gap: 12px;
          width: 100%;
        }
        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px 10px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.03);
          backdrop-filter: blur(8px);
          transition: all .3s ease;
          cursor: default;
          flex: 1;
          min-width: 0;
        }
        .stat-card:hover {
          border-color: rgba(99,102,241,.35);
          background: rgba(99,102,241,.06);
          transform: translateY(-3px);
        }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 24px;
          color: #f1f5f9;
          line-height: 1;
        }
        .stat-label {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ── Footer strip ────────────────────────────── */
        .hero-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 16px 5vw;
          border-top: 1px solid rgba(255,255,255,.05);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: #64748b;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(3, 3, 5, 0.75);
          backdrop-filter: blur(8px);
          z-index: 10;
        }
        .hero-footer .footer-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulseDot 2s ease-in-out infinite;
        }

        /* ── Light Mode Overrides inside Hero ── */
        html.light .hero-footer {
          background: rgba(255, 255, 255, 0.92) !important;
          border-top-color: rgba(15, 23, 42, 0.12) !important;
          color: #0f172a !important;
        }
        html.light .testimonial-dot:not(.active) {
          background-color: rgba(15, 23, 42, 0.18) !important;
        }
        html.light .testimonial-dot:not(.active):hover {
          background-color: rgba(15, 23, 42, 0.35) !important;
        }
        html.light .border-slate-800 {
          border-color: rgba(15, 23, 42, 0.18) !important;
        }
        html.light .hero-testimonial .relative {
          background-color: rgba(255, 255, 255, 0.88) !important;
          border-color: rgba(15, 23, 42, 0.18) !important;
        }

        /* ── Game HUD Light Mode Overrides ── */
        html.light .game-panel {
          background-color: rgba(255, 255, 255, 0.88) !important;
          border-color: rgba(15, 23, 42, 0.14) !important;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08) !important;
        }
        html.light .game-panel .bg-white\/10 {
          background-color: rgba(15, 23, 42, 0.12) !important;
        }
        html.light .game-panel .bg-indigo-500\/10 {
          background-color: rgba(79, 70, 229, 0.12) !important;
          border-color: rgba(79, 70, 229, 0.22) !important;
        }

        /* ── Game Left Column Keyboard Visuals and Greeting Bubble Overrides ── */
        html.light .game-controls-card {
          background-color: rgba(255, 255, 255, 0.88) !important;
          border-color: rgba(15, 23, 42, 0.14) !important;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08) !important;
        }
        html.light .game-controls-card div.w-7.h-7,
        html.light .game-controls-card div.w-16 {
          background-color: #e2e8f0 !important;
          border-color: rgba(15, 23, 42, 0.18) !important;
          color: #0f172a !important;
        }
        html.light #hud-greeting-bubble {
          background-color: rgba(255, 255, 255, 0.94) !important;
          border-color: rgba(15, 23, 42, 0.16) !important;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15) !important;
        }
        html.light #hud-greeting-bubble span,
        html.light #hud-greeting-bubble p {
          color: #334155 !important;
        }
        html.light #hud-greeting-bubble button {
          background-color: rgba(15, 23, 42, 0.05) !important;
          border-color: rgba(15, 23, 42, 0.1) !important;
          color: #334155 !important;
        }
        html.light #hud-greeting-bubble > div:last-child {
          border-top-color: rgba(255, 255, 255, 0.94) !important;
        }

        /* ── Scroll spacer ───────────────────────────── */
        .hero-scroll-spacer {
          height: 100vh;
          position: relative;
          z-index: 0;
          pointer-events: none;
        }

        /* ── Height-based media queries for desktop to prevent clipping ── */
        @media (min-width: 901px) and (max-height: 950px) {
          .hero-content {
            padding: 70px 5vw 85px;
            gap: 32px;
          }
          .hero-right {
            transform: translateY(-20px);
          }
          .hero-testimonial {
            margin-top: 16px;
          }
          .hero-testimonial-quote {
            min-height: 140px;
          }
        }
        @media (min-width: 901px) and (max-height: 850px) {
          .hero-content {
            padding: 60px 5vw 80px;
            gap: 24px;
          }
          .hero-desc {
            margin-bottom: 16px;
          }
          .hero-right {
            transform: translateY(0);
            max-width: 260px;
          }
          .profile-tech-stack,
          .profile-tech-divider {
            display: none !important;
          }
          .floating-letter {
            font-size: clamp(36px, 4vw, 54px);
          }
          .hero-testimonial {
            margin-top: 12px;
          }
          .hero-testimonial-quote {
            min-height: 120px;
          }
        }
        @media (min-width: 901px) and (max-height: 760px) {
          .hero-content {
            padding: 50px 5vw 75px;
            gap: 16px;
          }
          .hero-right {
            max-width: 230px;
          }
          .hero-footer {
            padding: 10px 5vw;
          }
          .floating-letter {
            font-size: clamp(30px, 3.5vw, 44px);
          }
          .hero-testimonial {
            margin-top: 8px;
          }
          .hero-testimonial-quote {
            min-height: 100px;
          }
        }

        /* ── Responsive ──────────────────────────────── */
        @media (max-width: 900px) {
          .hero-sticky-wrap {
            position: relative;
          }
          .hero-root {
            height: auto;
            min-height: 100svh;
            overflow: visible;
          }
          .hero-content {
            flex-direction: column;
            align-items: stretch;
            padding: 96px 24px 32px;
            gap: 28px;
            text-align: left;
            justify-content: flex-start;
          }
          .hero-left {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-desc {
            text-align: left;
          }
          .tech-pills {
            justify-content: flex-start;
          }
          .cta-group {
            justify-content: flex-start;
          }
          .profile-ring-wrap {
            width: 180px;
            height: 180px;
          }
          .ring-inner { inset: 12px; }
          .profile-img-wrap { inset: 24px; }
          .stat-cards {
            gap: 10px;
            width: 100%;
          }
          .stat-card {
            padding: 12px 8px;
            min-width: 0;
            flex: 1;
          }
          .hero-right {
            transform: translateY(0);
            max-width: 100%;
          }
          .hero-footer {
            position: relative;
            bottom: auto;
            left: auto;
            width: 100%;
            background: transparent;
            backdrop-filter: none;
            justify-content: center;
            flex-wrap: wrap;
            padding: 14px 24px;
            gap: 12px;
          }
          .hero-scroll-spacer {
            height: 0;
          }
        }
      `}</style>

      {/* Sticky wrapper — hero pins to top while scrolling */}
      <div className="hero-sticky-wrap">
        <section className="hero-root" id="hero" ref={heroRef}>
          {/* Background switcher based on playMode */}
          {playMode ? (
            <StarCanvas playMode={playMode} onGameOver={handleGameOver} registerReset={registerGameReset} />
          ) : (
            <div className="mesh-grid-bg">
              <div className="mesh-grid-pattern" />
              <div className="blob-1" />
              <div className="blob-2" />
            </div>
          )}

          {/* Ambient glows (always active for nice visual blending) */}
          <div className="glow-left" />
          <div className="glow-right" />

          {/* Floating Greeting Bubble Projected above the Spacecraft */}
          {showGreeting && (
            <div
              id="hud-greeting-bubble"
              className="fixed z-50 pointer-events-auto bg-[#0c0d16]/90 backdrop-blur-md border border-cyan-500/80 rounded-2xl p-4 shadow-[0_0_25px_rgba(6,182,212,0.3)] select-none w-full max-w-[280px] -translate-x-1/2 -translate-y-full flex flex-col gap-1 transition-opacity duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 text-left">
                  <span className="block text-sm font-black text-cyan-400 tracking-wide font-sans">
                    Yos&apos;z
                  </span>
                  <p className="text-xs text-slate-200 leading-normal font-medium font-sans">
                    Hey, let&apos;s fly and shoot some space targets together! 🚀💥
                  </p>
                </div>
                <button
                  onClick={() => setShowGreeting(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer bg-white/5 p-1 rounded-lg border border-white/5 flex items-center justify-center shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* Tail pointing down */}
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-cyan-500/80"></div>
            </div>
          )}

          {/* ── Main content ────────────────────────────── */}
          <div className="hero-content">
            {/* LEFT COLUMN */}
            <div className="hero-left">
              {playMode ? (
                <div className="space-y-6">
                  {/* Game Status Tag */}
                  <div className="space-y-1">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 font-bold">
                      MISSION CONSOLE INITIATED
                    </span>
                    <div className="h-[2px] w-12 bg-cyan-400 rounded-full animate-pulse" />
                  </div>

                  <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans leading-tight">
                    Intercept the Anomalies.
                  </h2>

                  <p className="text-sm text-slate-400 font-light leading-relaxed max-w-md">
                    Steer your spacecraft to clear space debris and glowing drones. Protect system integrity at all costs. Use keyboard keys to operate weapon systems and navigation thrusters.
                  </p>

                  {/* Keyboard Visual Controls */}
                  <div className="game-controls-card bg-black/30 border border-white/5 p-4 rounded-xl max-w-sm space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="flex flex-col items-center gap-1 font-mono shrink-0 scale-90">
                        <div className="w-7 h-7 flex items-center justify-center bg-[#151726] border border-white/15 rounded-md text-[10px] font-bold text-white shadow-md">W</div>
                        <div className="flex gap-1">
                          <div className="w-7 h-7 flex items-center justify-center bg-[#151726] border border-white/15 rounded-md text-[10px] font-bold text-white shadow-md">A</div>
                          <div className="w-7 h-7 flex items-center justify-center bg-[#151726] border border-white/15 rounded-md text-[10px] font-bold text-white shadow-md">S</div>
                          <div className="w-7 h-7 flex items-center justify-center bg-[#151726] border border-white/15 rounded-md text-[10px] font-bold text-white shadow-md">D</div>
                        </div>
                      </div>
                      <div className="text-left">
                        <span className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Steer Ship</span>
                        <span className="text-[10px] text-slate-500 font-mono">WASD KEYS</span>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="w-16 py-1.5 bg-[#151726] border border-white/15 rounded-md text-[9px] font-bold text-cyan-400 uppercase tracking-wider font-mono text-center shadow-md scale-90">
                        Space
                      </div>
                      <div className="text-left">
                        <span className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Fire Laser</span>
                        <span className="text-[10px] text-slate-500 font-mono">SPACEBAR</span>
                      </div>
                    </div>
                  </div>

                  {/* Exit Game Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => setPlayMode(false)}
                      className="inline-flex items-center gap-2.5 px-6 py-3 bg-red-950/20 hover:bg-red-950/45 border border-red-500/35 hover:border-red-500/60 text-red-400 hover:text-red-300 font-bold text-xs uppercase tracking-widest rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-red-500/5 hover:shadow-red-500/15"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                      Close Console
                    </button>
                  </div>
                </div>
              ) : (
                <>

                  {/* Monospace label */}
                  <p className="label-mono">{"Hi, I'm"}</p>

                  {/* Name with video mask background following jesky.dev */}
                  <div className="relative w-full max-w-2xl select-none mb-4 overflow-visible">
                    <svg viewBox="0 0 600 150" width="100%" height="100%" className="overflow-visible">
                      <defs>
                        <mask id="video-text-mask" x="0" y="0" width="100%" height="100%">
                          <rect x="0" y="0" width="100%" height="100%" fill="black" />
                          <text
                            x="0"
                            y="50%"
                            fill="white"
                            fontFamily="Montserrat, sans-serif"
                            fontWeight="900"
                            fontSize="115"
                            textAnchor="start"
                            dominantBaseline="central"
                            letterSpacing="-4"
                          >
                            YOSUA
                          </text>
                        </mask>
                      </defs>
                      <g mask="url(#video-text-mask)">
                        <foreignObject x="0" y="0" width="100%" height="100%">
                          <video
                            className="w-full h-full object-cover"
                            src="/assets/videos/landscape.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        </foreignObject>
                      </g>
                    </svg>
                  </div>

                  {/* Professional Headline & Subtitle */}
                  <div className="text-left space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-400 tracking-wide uppercase font-sans leading-none">
                      Fullstack Software Engineer
                    </h2>
                    <p className="text-slate-400 font-light leading-relaxed max-w-lg text-sm sm:text-base">
                      I build scalable backend systems and modern web applications using Java, Spring Boot, Golang, Next.js, and TypeScript. Experienced in developing business applications, database workflows, and clean user interfaces.
                    </p>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-4 items-center mt-6">
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-indigo-500/15 hover:shadow-indigo-500/25 active:scale-95 duration-300"
                    >
                      View Projects
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </a>
                    <a
                      href="/assets/documents/cv/Yosua Reynaldi Manurun-resume.pdf"
                      download
                      className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer shadow-lg active:scale-95 duration-300"
                    >
                      Download CV
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer shadow-lg active:scale-95 duration-300"
                    >
                      Hire Me
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                    </a>
                  </div>


                  {/* Testimonial & Social Proof */}
                  <div className="hero-testimonial mt-5 hidden sm:block max-w-lg select-none text-left">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-4 shadow-2xl shadow-black/20 backdrop-blur-md">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent pointer-events-none" />
                      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">
                            LinkedIn Recommendations
                          </span>
                          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {activeTestimonial + 1} of {testimonials.length} received reviews
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={previousTestimonial}
                            aria-label="Previous recommendation"
                            className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition-colors hover:border-indigo-400/50 hover:text-white"
                          >
                            <span aria-hidden="true">&lt;</span>
                          </button>
                          <button
                            type="button"
                            onClick={nextTestimonial}
                            aria-label="Next recommendation"
                            className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition-colors hover:border-indigo-400/50 hover:text-white"
                          >
                            <span aria-hidden="true">&gt;</span>
                          </button>
                        </div>
                      </div>

                      <div className="hero-testimonial-quote relative min-h-[140px]">
                        <div className="min-w-0">
                          <span className="block text-sm font-extrabold leading-tight text-white">
                            {currentTestimonial.name}
                          </span>
                          <span className="mt-0.5 block truncate text-[10px] font-medium text-slate-400">
                            {currentTestimonial.role}
                          </span>
                          <span className="mt-1 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                            {currentTestimonial.relation}
                          </span>
                        </div>

                        <p className="mt-4 text-[12px] sm:text-xs text-slate-300 leading-relaxed font-light">
                          &ldquo;{currentTestimonial.quote}&rdquo;
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        {testimonials.map((testimonial, index) => (
                          <button
                            key={testimonial.name}
                            type="button"
                            onClick={() => setActiveTestimonial(index)}
                            aria-label={`Show recommendation from ${testimonial.name}`}
                            className={`testimonial-dot h-1.5 rounded-full transition-all ${
                              activeTestimonial === index
                                ? "active w-8 bg-indigo-400"
                                : "w-2 bg-white/15 hover:bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="hero-right">
              {/* Mission Console HUD (Only when playMode is active) */}
              {playMode && (
                <div className="game-panel w-full bg-[#050508]/60 backdrop-blur-xl border border-white/5 p-4 rounded-xl flex flex-col gap-3 select-none shadow-[0_10px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyan-500/80"></div>
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cyan-500/80"></div>
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-cyan-500/80"></div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyan-500/80"></div>

                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-cyan-400 font-bold tracking-widest font-mono uppercase">
                      SYSTEM STATUS: ONLINE
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse"></span>
                  </div>

                  {/* Separator */}
                  <div className="w-full h-px bg-white/5"></div>

                  {/* Focus Project Info */}
                  <div className="flex flex-col gap-0.5 font-mono text-left">
                    <span className="text-[8px] text-slate-500 uppercase tracking-wider">Focus Project</span>
                    <span className="text-[11px] text-slate-200 font-bold">Lapor Kos</span>
                  </div>

                  {/* Shipped Projects */}
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider">Projects Shipped:</span>
                    <span className="text-[11px] font-bold text-white bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20 rounded">5+</span>
                  </div>

                  {/* Availability progress bar */}
                  <div className="flex flex-col gap-1 font-mono text-left">
                    <div className="flex items-center justify-between text-[9px]">
                      <span className="text-slate-500 uppercase tracking-wider">System Integrity:</span>
                      <span id="hud-shield-val" className="font-bold text-cyan-400">100%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
                      <div id="hud-shield-bar" className="h-full bg-cyan-500 transition-all duration-300 w-full"></div>
                    </div>
                  </div>

                  {/* Score represented as anomalies cleared */}
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider">Anomali Diatasi:</span>
                    <span id="hud-score-val" className="text-xs font-bold text-slate-200 font-mono tracking-widest">00000</span>
                  </div>
                </div>
              )}

              {/* Developer Info Card */}
              {playMode ? (
                /* High-Tech Developer ID Card for Gaming Mode */
                <div className="game-panel w-full bg-[#070814]/75 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-5 select-none relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
                  <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-500/70 rounded-tl-sm"></div>
                  <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-500/70 rounded-tr-sm"></div>
                  <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-500/70 rounded-bl-sm"></div>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-500/70 rounded-br-sm"></div>

                  {/* Grid layout for Avatar and Text */}
                  <div className="flex gap-5 items-center">
                    <div className="w-20 h-20 rounded-xl border-2 border-cyan-500/40 relative overflow-hidden bg-cyan-950/20 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                      <Image
                        src="/assets/images/profile/yosua-profile.png"
                        alt="Yosua Reynaldi"
                        fill
                        sizes="80px"
                        priority
                        className="object-cover object-[center_25%] brightness-110 contrast-105"
                      />
                    </div>

                    <div className="flex flex-col text-left font-mono min-w-0">
                      <span className="text-[9px] text-cyan-400 font-extrabold uppercase tracking-widest">DEVELOPER PROFILE</span>
                      <h3 className="text-lg font-black text-white tracking-wide truncate font-sans mt-1">Yosua Reynaldi M.</h3>
                      <span className="text-xs text-slate-300 mt-1 font-sans font-medium flex items-center gap-1">
                        Bandung, Indonesia
                      </span>
                      <span className="text-[10px] text-indigo-400 font-extrabold mt-1 tracking-wider uppercase">Fullstack Developer / SE</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-white/10"></div>

                  <div className="grid grid-cols-2 gap-3 text-left font-mono text-[10px] text-slate-400">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-500 uppercase tracking-widest text-[8px] font-bold">Expertise</span>
                      <span className="text-slate-200 font-bold font-sans">Web & Mobile</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-500 uppercase tracking-widest text-[8px] font-bold">Status</span>
                      <span className="text-emerald-400 font-bold font-sans flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Open for Work
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Sleek Professional Profile Card for Branding Mode */
                <div className="w-full bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[24px] p-5 flex flex-col gap-4 relative shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden group">
                  {/* Subtle Top Glow Accent */}
                  <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                  {/* Large Vertical Image Frame */}
                  <div className="relative aspect-[1/1] w-full overflow-hidden rounded-2xl border border-white/5 bg-slate-950/20 shadow-inner">
                    <Image
                      src="/assets/images/profile/yosua-profile.png"
                      alt="Yosua Reynaldi Manurun"
                      fill
                      sizes="(max-width: 900px) 90vw, 300px"
                      priority
                      className="object-cover object-[center_15%] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    {/* Dynamic Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent" />

                    {/* Status badge embedded inside the picture corner */}
                    <div className="absolute top-3 left-3 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">Active Status</span>
                    </div>
                  </div>

                  {/* Persona Details */}
                  <div className="text-left space-y-1">
                    <h3 className="text-xl font-black text-white tracking-wide uppercase font-sans leading-none">
                      Yosua Reynaldi M.
                    </h3>
                    <p className="text-xs font-bold text-indigo-400 tracking-wider uppercase font-mono">
                      Fullstack Software Engineer
                    </p>
                  </div>

                  {/* Small Divider */}
                  <div className="w-full h-px bg-white/5 profile-tech-divider" />

                  {/* Tech Stack Groups */}
                  <div className="space-y-3 text-left select-none profile-tech-stack">
                    <span className="text-[8px] text-slate-500 font-mono font-bold uppercase tracking-widest block">Tech Stack</span>
                    <div className="flex flex-col gap-2.5 font-sans text-[11px] text-slate-400">
                      {[
                        { category: "Frontend", items: ["Next.js", "Angular", "TypeScript", "Tailwind CSS"] },
                        { category: "Backend", items: ["Java", "Spring Boot", "Golang"] },
                        { category: "Database & Cloud", items: ["SQL Server", "PostgreSQL", "MySQL"] },
                        { category: "Tools", items: ["Git", "Docker", "REST API", "Postman"] }
                      ].map((group, idx) => (
                        <div key={idx} className="space-y-1">
                          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider block">{group.category}</span>
                          <div className="flex flex-wrap gap-1.5">
                            {group.items.map((item) => (
                              <span key={item} className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[9px] font-medium rounded-md">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Cards (moved from left column) */}
              <div className="flex gap-3 w-full">
                {stats.map((s) => (
                  <div key={s.label} className="flex-1 flex flex-col items-center justify-center p-3 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md hover:border-indigo-500/35 hover:bg-indigo-500/5 transition-all duration-300 transform hover:-translate-y-1">
                    <span className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans leading-none">{s.value}</span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-1.5 text-center leading-tight">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Footer strip ────────────────────────────── */}
          <div className="hero-footer flex items-center justify-between w-full pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="footer-dot" />
              <span className="text-slate-400 text-xs font-light">Open to freelance &amp; full-time opportunities | Bandung, ID</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="mailto:reyyosua29@gmail.com"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/35 hover:border-indigo-500/50 rounded-full text-[10px] font-mono font-bold text-indigo-400 hover:text-indigo-300 transition-all uppercase tracking-wider"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                Email Me
              </a>
              <MusicPlayer playOnStart={playMusicOnStart} playMode={playMode} setPlayMode={setPlayMode} inline={true} />
            </div>
          </div>
        </section>
      </div>

      {/* ── Scroll spacer (200vh) for sticky+blur effect ── */}
      <div className="hero-scroll-spacer" />

      {/* Game Over Floating Panel */}
      {isGameOver && (
        <div className={`fixed top-24 left-1/2 z-[150] p-4 pointer-events-auto transition-all duration-300 ${scrollY > 100 ? "opacity-0 pointer-events-none -translate-x-1/2 -translate-y-4" : "opacity-100 -translate-x-1/2 translate-y-0"
          }`}>
          <div className="bg-[#0c0d19]/90 border border-red-500/60 rounded-xl p-4 w-72 text-center relative shadow-[0_0_30px_rgba(239,68,68,0.3)] backdrop-blur-md font-mono select-none overflow-hidden">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-red-500/80"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-500/80"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-500/80"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-red-500/80"></div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/40 flex items-center justify-center animate-pulse">
                <Flame className="w-3.5 h-3.5 text-red-500" />
              </div>
              <h2 className="text-sm font-black text-red-500 tracking-wider uppercase">
                MISSION FAILED
              </h2>
            </div>

            <div className="bg-black/40 border border-white/5 p-2.5 rounded-lg flex flex-col gap-1.5 mb-3 text-left font-sans">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500 uppercase">ANOMALIES CLEARED</span>
                <span className="text-white font-bold">{finalScore} PTS</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500 uppercase">WEAPON STATUS</span>
                <span className="text-indigo-400 font-bold">{finalScore >= 500 ? "UPGRADED" : "STANDARD"}</span>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest text-[10px] rounded-lg shadow-md shadow-red-600/20 transition-all cursor-pointer active:scale-95"
            >
              Restart Mission
            </button>
          </div>
        </div>
      )}
    </>
  );
}
