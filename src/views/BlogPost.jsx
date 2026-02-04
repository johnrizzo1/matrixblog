import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { loadContent } from '../utils/contentLoader';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const posts = await loadContent('posts');
            const found = posts.find(p => p.id === id);
            setPost(found);
            setLoading(false);
        };
        load();
    }, [id]);

    if (loading) {
        return (
            <PageLayout title="Loading...">
            </PageLayout>
        )
    }

    if (!post) {
        return (
            <PageLayout title="Post Not Found">
                <Link to="/blog">← Back to Blog</Link>
            </PageLayout>
        );
    }

    return (
        <PageLayout title={post.title}>
            <div style={{ marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/blog" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--accent-color)' }}>
                    ← Back to Blog
                </Link>
                <time style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{post.date}</time>
            </div>

            <div style={{ maxWidth: '800px' }}>
                <MarkdownRenderer content={post.content} />
            </div>
        </PageLayout>
    );
};

export default BlogPost;
