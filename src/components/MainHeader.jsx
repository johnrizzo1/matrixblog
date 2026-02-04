import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const MainHeader = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <AnimatePresence>
            {isHome && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                    style={{
                        position: 'fixed',
                        top: isMobile ? '10%' : '15%',
                        left: 0,
                        width: '100%',
                        zIndex: 50,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? '1rem' : '1.5rem',
                        pointerEvents: 'none'
                    }}
                >
                    <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: 300, letterSpacing: '4px', margin: 0, textTransform: 'uppercase', marginRight: '-4px' }}>
                            J. Rizzo
                        </h1>

                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', cursor: 'pointer' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                            >
                                <Github size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', cursor: 'pointer' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#0077b5'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                            >
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MainHeader;
