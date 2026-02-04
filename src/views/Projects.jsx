import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { loadContent } from '../utils/contentLoader';

const Projects = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await loadContent('projects');
            setProjects(data);
        };
        load();
    }, []);

    return (
        <PageLayout title="Projects">
            <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {projects.map((project, i) => (
                    <div
                        key={i}
                        onClick={() => navigate(`/projects/${project.id}`)}
                        style={{
                            background: '#111',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid #222',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = `0 10px 20px -5px ${project.color}44`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ height: '140px', background: `linear-gradient(135deg, ${project.color}22, #000)` }}></div>
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{project.title}</h3>
                            <p style={{ opacity: 0.7, marginBottom: '1.5rem', lineHeight: 1.5, minHeight: '3rem' }}>{project.description}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {project.tags.map(tag => (
                                    <span key={tag} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', border: '1px solid #333', borderRadius: '100px' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </PageLayout>
    );
};

export default Projects;
