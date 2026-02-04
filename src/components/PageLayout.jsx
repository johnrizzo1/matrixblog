import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

const PageLayout = ({ title, children }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <motion.div
            className="page-container"
            style={{
                padding: '2rem',
                paddingLeft: isMobile ? '20px' : '120px', // Adjusted for smaller wheel
                paddingTop: '4rem', // Add top padding to clear wheel area
                textAlign: 'left',
                maxWidth: '1000px',
                margin: '0 auto',
                minHeight: '100vh'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <nav style={{ marginBottom: '3rem', opacity: 0 }}>
                {/* Placeholder to keep layout consistent if needed, but wheel handles nav now */}
                <Link to="/" style={{ display: 'none' }}>Back</Link>
            </nav>
            <h1 style={{ marginBottom: '2rem', fontSize: '3rem', fontWeight: 700, background: 'linear-gradient(90deg, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{title}</h1>
            <div className="content">
                {children}
            </div>
        </motion.div>
    );
};

export default PageLayout;
