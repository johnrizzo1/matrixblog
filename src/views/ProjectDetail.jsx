import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import MarkdownRenderer from '../components/MarkdownRenderer'; // Use renderer for project content too
import { loadContent } from '../utils/contentLoader';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const projects = await loadContent('projects');
            const found = projects.find(p => p.id === id);
            setProject(found);
            setLoading(false);
        };
        load();
    }, [id]);

    if (loading) return <PageLayout title="Loading..."></PageLayout>;

    if (!project) {
        return (
            <PageLayout title="Project Not Found">
                <p>Sorry, the project you are looking for does not exist.</p>
                <Link to="/projects" style={{ marginTop: '1rem', display: 'inline-block' }}>← Back to Projects</Link>
            </PageLayout>
        );
    }

    return (
        <PageLayout title={project.title}>
            <div style={{ marginBottom: '2rem' }}>
                <span style={{
                    background: project.color,
                    color: '#000',
                    padding: '0.2rem 0.8rem',
                    borderRadius: '100px',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                }}>
                    Featured Project
                </span>
            </div>

            <div className="project-content" style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.9, maxWidth: '800px' }}>
                <p style={{ fontSize: '1.3rem', marginBottom: '2rem' }}>{project.description}</p>

                {/* Markdown Content */}
                <div style={{ marginTop: '2rem' }}>
                    <MarkdownRenderer content={project.content} />
                </div>

                <div style={{ marginTop: '3rem', borderTop: '1px solid #333', paddingTop: '2rem' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Technologies Used:</h4>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {project.tags.map(tag => (
                            <span key={tag} style={{ border: '1px solid #444', padding: '0.3rem 0.8rem', borderRadius: '4px' }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default ProjectDetail;
