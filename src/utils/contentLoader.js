
/**
 * Simple Frontmatter Parser (No dependencies)
 * Parses YAML-like frontmatter from a markdown string.
 */
const parseFrontmatter = (fileContent) => {
    // Normalize newlines and trim start
    const cleanContent = fileContent.trimStart();
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/;
    const match = frontmatterRegex.exec(cleanContent);

    if (!match) {
        return {
            metadata: {},
            content: cleanContent
        };
    }

    const frontmatterBlock = match[1];
    const content = match[2].trim(); // Trim leading/trailing whitespace from content
    const metadata = {};

    frontmatterBlock.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            // Value is the rest of the string
            let value = parts.slice(1).join(':').trim();

            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }

            // Handle arrays [tag1, tag2]
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(item => item.trim().replace(/^['"]|['"]$/g, ''));
            }

            metadata[key] = value;
        }
    });

    return { metadata, content };
};

/**
 * Loads markdown content from a specified directory key (posts or projects).
 * Note: import.meta.glob must be static, so we can't genericize the directory path string directly in the glob call easily without keeping the glob explicit.
 */
export const loadContent = async (type) => {
    let modules;
    // We must define globs statically for Vite
    if (type === 'posts') {
        modules = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' });
    } else if (type === 'projects') {
        modules = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default' });
    } else {
        return [];
    }

    const results = [];
    for (const path in modules) {
        const rawContent = await modules[path]();
        const { metadata, content } = parseFrontmatter(rawContent);

        // Infer ID from filename if not in frontmatter
        const slug = path.split('/').pop().replace('.md', '');

        results.push({
            id: metadata.id || slug,
            ...metadata,
            content
        });
    }

    // Sort by date if present (descending)
    return results.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date) - new Date(a.date);
    });
};
