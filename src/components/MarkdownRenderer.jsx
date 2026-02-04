import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css'; // Import KaTeX styles

const MarkdownRenderer = ({ content }) => {
    return (
        <div className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props} style={{ fontFamily: 'var(--font-mono)', background: '#222', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                                {children}
                            </code>
                        );
                    },
                    p: ({ children }) => <p style={{ marginBottom: '1.5rem', lineHeight: 1.8 }}>{children}</p>,
                    h1: ({ children }) => <h1 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>{children}</h1>,
                    h2: ({ children }) => <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#eee' }}>{children}</h2>,
                    h3: ({ children }) => <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: '#ddd' }}>{children}</h3>,

                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
