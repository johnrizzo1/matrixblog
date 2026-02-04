import React, { useEffect, useRef } from 'react';

const ScratchMask = () => {
    const canvasRef = useRef(null);
    const lastPos = useRef({ x: 0, y: 0 });
    const lastInteraction = useRef(Date.now());
    const isRestored = useRef(true);
    const isDrawing = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            // Capture existing drawing? Complex if resizing. 
            // For now, reset on resize or try to keep scale. Resetting is cleaner.
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Fill with the "Top Layer" background color
            // Matching index.css: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%) (Slate 800 -> 900)
            const radius = Math.hypot(canvas.width / 2, canvas.height / 2);
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, radius
            );
            gradient.addColorStop(0, '#1e293b'); // Slate 800
            gradient.addColorStop(1, '#0f172a'); // Slate 900

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        window.addEventListener('resize', resize);
        resize();

        const getPos = (e) => {
            // Touch support
            if (e.touches && e.touches.length > 0) {
                return { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
            return { x: e.clientX, y: e.clientY };
        };

        const draw = (e) => {
            // We just draw continuously on mousemove
            const { x, y } = getPos(e);
            lastInteraction.current = Date.now();
            isRestored.current = false;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 60, 0, Math.PI * 2); // Brush size
            ctx.fill();

            // Connect lines for fast movement
            if (lastPos.current.x !== 0 && lastPos.current.y !== 0) {
                ctx.beginPath();
                ctx.lineWidth = 120; // 2 * radius
                ctx.lineCap = 'round';
                ctx.moveTo(lastPos.current.x, lastPos.current.y);
                ctx.lineTo(x, y);
                ctx.stroke();
            }

            lastPos.current = { x, y };
        };

        const handleMove = (e) => {
            draw(e);
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);

        // Restoration Loop
        const restore = () => {
            const now = Date.now();
            const delta = now - lastInteraction.current;

            if (delta > 1000 && !isRestored.current) {
                const radius = Math.hypot(canvas.width / 2, canvas.height / 2);
                const gradient = ctx.createRadialGradient(
                    canvas.width / 2, canvas.height / 2, 0,
                    canvas.width / 2, canvas.height / 2, radius
                );

                if (delta > 4000) {
                    // HARD RESET: Draw opaque using a fresh gradient to ensure perfect restoration
                    // CLEAR the canvas first to remove any accumulation/artifacts
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    const solidGradient = ctx.createRadialGradient(
                        canvas.width / 2, canvas.height / 2, 0,
                        canvas.width / 2, canvas.height / 2, radius
                    );
                    solidGradient.addColorStop(0, '#1e293b'); // Slate 800
                    solidGradient.addColorStop(1, '#0f172a'); // Slate 900

                    ctx.globalCompositeOperation = 'source-over';
                    ctx.fillStyle = solidGradient;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    isRestored.current = true;
                } else {
                    // SMOOTH DECAY: Use destination-over to draw BEHIND existing pixels.
                    // This fills the transparent "scratches" without darkening the existing opaque background.
                    ctx.globalCompositeOperation = 'destination-over';

                    gradient.addColorStop(0, 'rgba(30, 41, 59, 0.1)'); // Slate 800 slightly transparent
                    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.1)'); // Slate 900 slightly transparent
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            }
            requestAnimationFrame(restore);
        };
        const animationId = requestAnimationFrame(restore);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // White Rabbit Navigation
    const [showRabbit, setShowRabbit] = React.useState(false);

    // Check coverage periodically
    useEffect(() => {
        const checkCoverage = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const w = canvas.width;
            const h = canvas.height;

            // Optimization: Downscale for performance check
            // We don't need pixel-perfect precision
            const sampleStep = 50;
            let transparentPixels = 0;
            let totalPixels = 0;

            // Get data is still expensive, so we throttle heavily (done via setInterval below)
            // But getting a small slice or using a small offscreen canvas is better. 
            // For simplicity and "good enough" perf on modern devices:
            try {
                const imageData = ctx.getImageData(0, 0, w, h);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4 * sampleStep) {
                    totalPixels++;
                    // content is drawn with destination-out, so we check alpha
                    if (data[i + 3] < 128) { // Less than 50% opacity
                        transparentPixels++;
                    }
                }

                const percentage = (transparentPixels / totalPixels) * 100;
                if (percentage > 85) {
                    setShowRabbit(true);
                } else {
                    setShowRabbit(false);
                }
            } catch (e) {
                // Tainted canvas or context loss
                console.warn("Could not check scratch coverage", e);
            }
        };

        const interval = setInterval(checkCoverage, 1000); // Check every second
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1, // On top of MatrixRain, behind content
                    pointerEvents: 'none' // Important: allow clicks to pass through to content
                }}
            />
            {showRabbit && (
                <a
                    href="/rabbit-hole"
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        fontSize: '2rem',
                        opacity: 0,
                        animation: 'fadeIn 2s forwards',
                        zIndex: 1000,
                        textDecoration: 'none',
                        filter: 'drop-shadow(0 0 10px #fff)',
                        cursor: 'pointer'
                    }}
                    title="Follow the white rabbit"
                >
                    🐇
                    <style>{`
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                    `}</style>
                </a>
            )}
        </>
    );
};

export default ScratchMask;
