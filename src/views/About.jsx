import React from 'react';
import PageLayout from '../components/PageLayout';

const About = () => {
    return (
        <PageLayout title="About Me">
            <div style={{ lineHeight: 1.8, fontSize: '1.1rem', opacity: 0.9 }}>
                <p style={{ marginBottom: '1.5rem' }}>
                    Hello! I'm J. Rizzo, a software engineer with a passion for building elegant, user-centric interfaces.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                    I specialize in full-stack development, with a deep interest in distributed systems, frontend architecture, and creative coding.
                    The intersection of design and engineering is where I thrive.
                </p>
                <p>
                    When I'm not coding, you can find me exploring new coffee shops, reading sci-fi, or tinkering with hardware projects.
                </p>
            </div>
        </PageLayout>
    );
};

export default About;
