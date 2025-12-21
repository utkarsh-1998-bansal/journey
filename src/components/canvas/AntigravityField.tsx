'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Configuration
const GRID_SIZE = { x: 50, y: 30 };
const PARTICLE_COUNT = GRID_SIZE.x * GRID_SIZE.y;
const MOUSE_RADIUS = 5; // Three.js units
const REPULSION_STRENGTH = 0.5;
const RETURN_SPEED = 0.05; // Slow, "inevitable" return
const MAX_DISPLACEMENT = 0.8; // Max Three.js units (~12px equivalent)

function ParticleGrid() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport, mouse } = useThree();

    // 1. Initialize original positions
    const particles = useMemo(() => {
        const temp = [];
        const stepX = viewport.width / (GRID_SIZE.x - 1);
        const stepY = viewport.height / (GRID_SIZE.y - 1);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const ix = i % GRID_SIZE.x;
            const iy = Math.floor(i / GRID_SIZE.x);

            // Center the grid
            const x0 = (ix * stepX) - (viewport.width / 2);
            const y0 = (iy * stepY) - (viewport.height / 2);

            temp.push({
                x0, y0,
                x: x0, y: y0,
                vx: 0, vy: 0
            });
        }
        return temp;
    }, [viewport]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame(() => {
        if (!meshRef.current) return;

        // Convert screen mouse to world mouse
        const mx = (mouse.x * viewport.width) / 2;
        const my = (mouse.y * viewport.height) / 2;

        particles.forEach((p, i) => {
            // 1. Vector from mouse to particle
            const dx = p.x - mx;
            const dy = p.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // 2. Repulsion Logic
            if (dist < MOUSE_RADIUS) {
                const force = (1 - dist / MOUSE_RADIUS) * REPULSION_STRENGTH;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
            }

            // 3. Return to origin logic (Inevitability)
            const rx = p.x0 - p.x;
            const ry = p.y0 - p.y;
            p.vx += rx * RETURN_SPEED;
            p.vy += ry * RETURN_SPEED;

            // 4. Apply Friction
            p.vx *= 0.9;
            p.vy *= 0.9;

            // 5. Update Position
            p.x += p.vx;
            p.y += p.vy;

            // 6. Hard constraint (Restraint)
            const totalDistFromOrigin = Math.sqrt((p.x - p.x0) ** 2 + (p.y - p.y0) ** 2);
            if (totalDistFromOrigin > MAX_DISPLACEMENT) {
                const ratio = MAX_DISPLACEMENT / totalDistFromOrigin;
                p.x = p.x0 + (p.x - p.x0) * ratio;
                p.y = p.y0 + (p.y - p.y0) * ratio;
            }

            // 7. Apply to Instance
            dummy.position.set(p.x, p.y, 0);
            dummy.updateMatrix();
            meshRef.current?.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
            <circleGeometry args={[0.012, 8]} />
            <meshBasicMaterial color="#B6FF3B" transparent opacity={0.25} />
        </instancedMesh>
    );
}

export default function AntigravityField() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                dpr={[1, 2]} // Performance: limit to 2x pixel density
                gl={{ antialias: false }} // Performance: dots don't need antialiasing
            >
                {/* <ParticleGrid /> */}
            </Canvas>
        </div>
    );
}
