import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import profileImg from '../assets/profile_focus.png';

const SECTIONS = [
    { id: 'about', label: 'About Me', path: '/about', color: '#333' },
    { id: 'cv', label: 'CV', path: '/cv', color: '#2a2a2a' },
    { id: 'projects', label: 'Projects', path: '/projects', color: '#333' },
    { id: 'blog', label: 'Blog', path: '/blog', color: '#2a2a2a' },
];

// Helper to calculate SVG path for an arc
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
        "M", x, y,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", x, y
    ].join(" ");
    return d;
};

const SpinWheel = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const rotation = useMotionValue(0);

    const isHome = location.pathname === '/';

    // State to track hovered/active segment for pop-out effect
    const [activeSegment, setActiveSegment] = useState(null);

    const segmentAngle = 360 / SECTIONS.length;

    const handlePan = (event, info) => {
        // Disable drag if not home (mini-wheel) - optional choice
        // if (!isHome) return; 

        const velocity = info.velocity.x + info.velocity.y;
        rotation.set(rotation.get() + velocity * 0.2);
    };

    // Snap logic helper
    const snapToNearest = (currentRotation, velocity = 0) => {
        const offset = -90 - (segmentAngle / 2);
        const projectedRotation = currentRotation + velocity * 0.5; // Project based on velocity
        const snaps = Math.round((projectedRotation - offset) / segmentAngle);
        const targetRotation = offset + (snaps * segmentAngle);

        animate(rotation, targetRotation, {
            type: "spring", damping: 20, stiffness: 80 // Crisp snap
        });
    };

    const handlePanEnd = (event, info) => {
        const velocity = info.velocity.x + info.velocity.y;
        snapToNearest(rotation.get(), velocity);
    };

    // Auto-rotate to active segment when not at homebounce snap
    useEffect(() => {
        if (!isHome) return;

        let snapTimeout;
        const handleWheel = (e) => {
            const delta = e.deltaY;
            rotation.set(rotation.get() + delta * 0.5);

            // Clear existing timeout
            clearTimeout(snapTimeout);
            // Set new timeout to snap
            snapTimeout = setTimeout(() => {
                snapToNearest(rotation.get(), 0);
            }, 500);
        };

        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
            clearTimeout(snapTimeout);
        };
    }, [rotation, isHome, segmentAngle]);

    // Auto-rotate to active segment when not at home
    useEffect(() => {
        if (!isHome) {
            const activeSectionIndex = SECTIONS.findIndex(s => location.pathname.startsWith(s.path));
            if (activeSectionIndex !== -1) {
                // Aim for 3 o'clock (Right)
                const currentSegmentAngle = (activeSectionIndex * segmentAngle) + (segmentAngle / 2);
                const targetRotation = -currentSegmentAngle;

                animate(rotation, targetRotation, {
                    type: "spring", damping: 20, stiffness: 80, duration: 0.8
                });
            }
        }
    }, [isHome, location.pathname, rotation, segmentAngle]);

    const isMobile = useMediaQuery('(max-width: 768px)');
    const wheelSize = isMobile ? 350 : 600;
    const hubSize = isMobile ? 120 : 200;

    return (
        <motion.div
            initial={false}
            animate={isHome ? "center" : "corner"}
            variants={{
                center: {
                    top: isMobile ? "60%" : "55%", // Pushed down to clear the header
                    left: "50%",
                    scale: 1,
                    x: "-50%",
                    y: "-50%",
                    transition: { type: "spring", duration: 0.8 }
                },
                corner: {
                    top: isMobile ? "70px" : "90px",
                    left: isMobile ? "70px" : "90px",
                    scale: isMobile ? 0.3 : 0.35,
                    x: "-50%",
                    y: "-50%",
                    transition: { type: "spring", duration: 0.8 }
                }
            }}
            style={{
                position: 'fixed',
                zIndex: 100,
            }}
        >
            <div className="wheel-container" style={{
                position: 'relative',
                width: `${wheelSize}px`,
                height: `${wheelSize}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* The Wheel Body (Made of Sectors) */}
                <motion.div
                    onPanEnd={handlePanEnd}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        rotate: rotation,
                        cursor: 'grab',
                        // Slight luminous shadow "under" the wheel to separate from dark background
                        filter: 'drop-shadow(0 15px 25px rgba(255, 255, 255, 0.08))'
                    }}
                >
                    <svg width={wheelSize} height={wheelSize} viewBox={`0 0 ${wheelSize} ${wheelSize}`} style={{ transform: 'rotate(0deg)' }}>
                        <defs>
                            {/* Shadow filter for depth */}
                            <filter id="inset-shadow">
                                <feOffset dx="0" dy="0" />
                                <feGaussianBlur stdDeviation="5" result="offset-blur" />
                                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                                <feFlood floodColor="black" floodOpacity="1" result="color" />
                                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                            </filter>
                        </defs>

                        {SECTIONS.map((section, index) => {
                            const startAngle = index * segmentAngle;
                            const endAngle = (index + 1) * segmentAngle;
                            const isSelected = activeSegment === section.id || location.pathname === section.path || location.pathname.startsWith(section.path + '/');

                            const popOutDistance = isMobile ? 25 : 40;
                            // Calculate center angle to determine translation vector
                            const midAngle = (startAngle + endAngle) / 2;
                            const midRad = (midAngle - 90) * Math.PI / 180;
                            const tx = isSelected ? Math.cos(midRad) * popOutDistance : 0;
                            const ty = isSelected ? Math.sin(midRad) * popOutDistance : 0;

                            const radius = wheelSize / 2;

                            return (
                                <g key={section.id}
                                    onClick={(e) => { e.stopPropagation(); navigate(section.path); }}
                                    onMouseEnter={() => setActiveSegment(section.id)}
                                    onMouseLeave={() => setActiveSegment(null)}
                                    style={{ cursor: 'pointer', transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
                                    transform={`translate(${tx}, ${ty})`}
                                >
                                    <path
                                        d={describeArc(radius, radius, radius, startAngle, endAngle)}
                                        fill={section.color}
                                        stroke="#111"
                                        strokeWidth="2"
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* Curved Text Labels Overlay - Separated from sectors to keep text aligned but sectors popping */}
                    <svg width="100%" height="100%" viewBox={`0 0 ${wheelSize} ${wheelSize}`} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', transform: 'rotate(90deg)' }}>
                        <defs>
                            <path id="textCircle" d={`M ${wheelSize / 2}, ${wheelSize / 2} m -${wheelSize / 2 - 80}, 0 a ${wheelSize / 2 - 80},${wheelSize / 2 - 80} 0 1,1 ${wheelSize - 160},0 a ${wheelSize / 2 - 80},${wheelSize / 2 - 80} 0 1,1 -${wheelSize - 160},0`} fill="none" />
                        </defs>
                        {SECTIONS.map((section, index) => {
                            const offset = ((index * segmentAngle) + (segmentAngle / 2)) / 360 * 100;
                            return (
                                <text key={section.id} fill="#e0e0e0" fontSize={isMobile ? "18" : "24"} fontWeight="600" letterSpacing="2px" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                    <textPath href="#textCircle" startOffset={`${offset}%`} textAnchor="middle" alignmentBaseline="middle">
                                        {section.label.toUpperCase()}
                                    </textPath>
                                </text>
                            );
                        })}
                    </svg>
                </motion.div>

                {/* Center Hub */}
                <button
                    className="hub"
                    onClick={() => navigate('/')}
                    style={{
                        position: 'relative',
                        width: `${hubSize}px`,
                        height: `${hubSize}px`,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        zIndex: 10,
                        border: '6px solid #111',
                        boxShadow: '0 0 30px rgba(0,0,0,0.9)',
                        cursor: 'pointer',
                        padding: 0,
                        background: '#000',
                    }}
                >
                    <img
                        src={profileImg}
                        alt="Profile"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center 15px', // Raised up 10px from 25px
                            transform: 'scale(1.2)'
                        }}
                    />
                </button>

                {/* Indicator */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    zIndex: 20,
                    width: 0,
                    height: 0,
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderTop: '15px solid var(--accent-color)',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                }} />
            </div>
        </motion.div>
    );
};

export default SpinWheel;
