"use client";

import { useEffect, useRef } from 'react';

interface Leaf {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
}

export default function FallingLeaves() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let leaves: Leaf[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createLeaf = (): Leaf => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height, // Start above
            size: Math.random() * 5 + 3,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 1 + 0.5,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 2 - 1,
            opacity: Math.random() * 0.5 + 0.3,
        });

        const initLeaves = () => {
            leaves = Array.from({ length: 50 }, createLeaf);
        };

        const drawLeaf = (leaf: Leaf) => {
            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate((leaf.rotation * Math.PI) / 180);
            ctx.globalAlpha = leaf.opacity;
            ctx.fillStyle = '#ccaa6c'; // Gold color

            // Draw a simple leaf shape
            ctx.beginPath();
            ctx.moveTo(0, -leaf.size);
            ctx.bezierCurveTo(leaf.size / 2, -leaf.size / 2, leaf.size / 2, leaf.size / 2, 0, leaf.size);
            ctx.bezierCurveTo(-leaf.size / 2, leaf.size / 2, -leaf.size / 2, -leaf.size / 2, 0, -leaf.size);
            ctx.fill();

            ctx.restore();
        };

        const updateLeaves = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            leaves.forEach((leaf) => {
                leaf.y += leaf.speedY;
                leaf.x += leaf.speedX + Math.sin(leaf.y / 50) * 0.5; // Add swaying motion
                leaf.rotation += leaf.rotationSpeed;

                if (leaf.y > canvas.height) {
                    Object.assign(leaf, createLeaf());
                    leaf.y = -20; // Reset to top
                }

                drawLeaf(leaf);
            });

            animationFrameId = requestAnimationFrame(updateLeaves);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        initLeaves();
        updateLeaves();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            aria-hidden="true"
        />
    );
}
