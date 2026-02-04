import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Matrix characters - Katakana + Latin
        const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charArray = chars.split('');

        let fontSize = 16;
        let columns;
        let drops;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = canvas.width / fontSize;
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
        };

        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            // Black with opacity for trail effect (using Slate 950 base)
            ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Slate 950 with trail opacity
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#06b6d4'; // Cyan 500 text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -2, // Behind everything
                background: '#020617' // Slate 950
            }}
        />
    );
};

export default MatrixRain;
