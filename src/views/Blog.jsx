import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { loadContent } from '../utils/contentLoader';

const Blog = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await loadContent('posts');
            setPosts(data);
        };
        load();
    }, []);

    return (
        <PageLayout title="Blog">
            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {posts.map((post, i) => (
                    <div
                        key={post.id}
                        onClick={() => navigate(`/blog/${post.id}`)}
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
                            e.currentTarget.style.boxShadow = `0 10px 20px -5px rgba(6, 182, 212, 0.2)`; // Cyan glow
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* Card Header Image */}
                        <div style={{
                            height: '140px',
                            background: post.image ? `url(${post.image})` : 'linear-gradient(135deg, #06b6d4 0%, #000 100%)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderBottom: '1px solid #222'
                        }}></div>

                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{post.title}</h3>
                            <div style={{ fontSize: '0.85rem', color: 'var(--accent-color)', marginBottom: '1rem', fontWeight: 500 }}>
                                {post.date}
                            </div>
                            <p style={{ opacity: 0.7, marginBottom: '0', lineHeight: 1.5, fontSize: '0.95rem' }}>
                                {post.summary}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </PageLayout>
    );
};

export default Blog;
