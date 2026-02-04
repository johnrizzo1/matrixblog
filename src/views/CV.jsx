import React from 'react';
import PageLayout from '../components/PageLayout';

const CV = () => {
    return (
        <PageLayout title="CV">
            <div className="cv-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '4rem' }}>

                {/* Left Column: Experiences & Education */}
                <div className="main-column">
                    <section style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem', color: '#fff' }}>Experiences</h2>

                        <div className="experience-item" style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-color)' }}>Founding Partner, CTO</h3>
                            <div style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: '0.5rem' }}>Human-Centered AI for a Smarter Future</div>
                            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                                Technology Leadership, Development, Infrastructure and Security Operations.
                            </p>
                        </div>

                        <div className="experience-item" style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>CTO Security Architect</h3>
                            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                                Developed and executed a Vision and Strategy as Product Owner for Compute Access Control, Endpoint Security Tooling, and Identity and Access Management. These tools supported over 10k+ people geographically distributed around the globe improving the security of our endpoints, ease of accessing resources, and supporting advanced authentication and authorization scenarios.
                            </p>
                        </div>

                        <div className="experience-item" style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Head of Public Cloud / DevOps</h3>
                            <div style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: '0.5rem' }}>Caxton Associates</div>
                            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                                Built an infrastructure practice focused on cloud technologies and cloud native software architecture for the flagship hedge fund founded by Bruce Kovner.
                            </p>
                        </div>

                        <div className="experience-item" style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Director of Technology</h3>
                            <div style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: '0.5rem' }}>Caxton Alternative Management</div>
                            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                                Created an independent technology team and infrastructure that supported the family office and the Kovner Family directly.
                            </p>
                        </div>

                        <div className="experience-item" style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Practice Director</h3>
                            <div style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: '0.5rem' }}>Salesforce.com</div>
                            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                                Hired to support aggressive growth targets by providing leadership and helping to build and manage a part of their services offerings in the northeast US.
                            </p>
                        </div>

                        <div className="experience-item" style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Chief Technology Officer</h3>
                            <div style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: '0.5rem' }}>The CMA</div>
                            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                                Provided leadership and product vision for market-leading software assisting clients with price discovery, independent valuations, and consensus-based pricing of OTC credit instruments.
                            </p>
                        </div>

                        <div className="experience-item" style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>President & CEO</h3>
                            <div style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: '0.5rem' }}>Credit Desk</div>
                            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                                Founder for designing and implementing corporate strategy around credit life cycle management. Acquired by Paladyne Systems, Inc.
                            </p>
                        </div>

                        <div className="experience-item" style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>Chief Technology Officer</h3>
                            <div style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: '0.5rem' }}>Global Multi-Strategy Hedge Fund</div>
                            <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                                Directed technology and software development across a $7 billion, 250+ employee fund. Held autonomous decision-making authority for all IT development, infrastructure, and security. Managed 40+ professionals globally.
                            </p>
                        </div>

                    </section>

                    <section>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem', color: '#fff' }}>Education</h2>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '1.2rem', color: '#eee' }}>MS in Computer Science, Machine Learning</h4>
                            <div style={{ opacity: 0.7 }}>Stevens Institute of Technology | 2024 - Present</div>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '1.2rem', color: '#eee' }}>BS in Computer Science</h4>
                            <div style={{ opacity: 0.7 }}>New Jersey Institute of Technology | 1998 - 2002</div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Skills, Info, Languages */}
                <div className="sidebar-column">
                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Skills</h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>Technical</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {[
                                    'Python', 'Ruby', 'PHP', 'Node.js',
                                    'C#', 'ASP.NET',
                                    'JavaScript', 'Angular', 'React',
                                    'PostgreSQL', 'MySQL', 'SQL Server',
                                    'Redis', 'Kafka', 'NoSQL',
                                    'Linux', 'Unix', 'Windows', 'Mac',
                                    'RAG', 'ML', 'NumPy', 'Pandas', 'PyTorch',
                                    'AWS', 'Azure', 'GCP', 'Elastic'
                                ].map(skill => (
                                    <span key={skill} style={{ background: '#222', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid #333' }}>{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>Professional</h4>
                            <ul style={{ listStyle: 'none', padding: 0, opacity: 0.9, lineHeight: 1.6 }}>
                                <li>Exceptional Management Skills</li>
                                <li>Team Player</li>
                                <li>Strong Problem Solver</li>
                                <li>Collaborative & Innovative</li>
                                <li>Visionary Leadership</li>
                            </ul>
                        </div>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Information</h3>
                        <div style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.8 }}>
                            <p style={{ marginBottom: '1rem' }}>
                                <strong>Reviewer:</strong> 'Learn Algorithmic Trading' by Sebastian Donadio
                            </p>
                            <p>
                                <strong>Author:</strong> Bank Debt Deals Post Operational Risk (Wall Street & Technology, 2010)
                            </p>
                        </div>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Languages</h3>
                        <ul style={{ listStyle: 'none', padding: 0, opacity: 0.9 }}>
                            <li style={{ marginBottom: '0.5rem' }}>English (Native)</li>
                            <li>Spanish (Beginner)</li>
                        </ul>
                    </section>

                    <section>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Interests</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {['Travel', 'Photography', 'Hiking', 'Nature', 'Science', 'Family'].map(i => (
                                <span key={i} style={{ border: '1px solid #444', padding: '0.2rem 0.5rem', borderRadius: '100px', fontSize: '0.8rem' }}>{i}</span>
                            ))}
                        </div>
                    </section>
                </div>

            </div>

            {/* CSS for responsive grid */}
            <style>{`
                @media (max-width: 900px) {
                    .cv-container {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                }
            `}</style>
        </PageLayout>
    );
};

export default CV;
