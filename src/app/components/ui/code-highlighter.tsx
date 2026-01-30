import React from 'react';
import { cn } from "./utils";
import { Copy, Check } from "lucide-react";

interface CodeHighlighterProps {
    code: string;
    language?: 'javascript' | 'typescript' | 'bash' | 'css';
    className?: string;
}

export const CodeHighlighter = ({ code, language = 'typescript', className }: CodeHighlighterProps) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        // Use fallback for clipboard API since it's blocked in iframe
        try {
            const textarea = document.createElement('textarea');
            textarea.value = code;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textarea);
            
            if (successful) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const highlightCode = (source: string) => {
        if (!source) return [];
        
        // Simple tokenization logic
        const tokens: { type: string, content: string }[] = [];
        let remaining = source;

        while (remaining.length > 0) {
            // Comments (// ...)
            const commentMatch = remaining.match(/^(\/\/.*$)/m) || remaining.match(/^(\/\*[\s\S]*?\*\/)/);
            if (commentMatch && remaining.startsWith(commentMatch[0])) {
                tokens.push({ type: 'comment', content: commentMatch[0] });
                remaining = remaining.slice(commentMatch[0].length);
                continue;
            }

            // Bash comments (# ...)
            if (language === 'bash') {
                 const bashComment = remaining.match(/^(#.*$)/m);
                 if (bashComment && remaining.startsWith(bashComment[0])) {
                    tokens.push({ type: 'comment', content: bashComment[0] });
                    remaining = remaining.slice(bashComment[0].length);
                    continue;
                 }
            }

            // Strings
            const stringMatch = remaining.match(/^(['"`])(?:(?=(\\?))\2.)*?\1/);
            if (stringMatch) {
                tokens.push({ type: 'string', content: stringMatch[0] });
                remaining = remaining.slice(stringMatch[0].length);
                continue;
            }

            // Keywords
            const keywordMatch = remaining.match(/^(const|let|var|import|from|export|default|return|if|else|function|interface|type|extends|implements|class|npm|npx|echo|mkdir|touch|cat|cd)\b/);
            if (keywordMatch) {
                tokens.push({ type: 'keyword', content: keywordMatch[0] });
                remaining = remaining.slice(keywordMatch[0].length);
                continue;
            }
            
            // Booleans/Null
            const atomMatch = remaining.match(/^(true|false|null|undefined)\b/);
            if (atomMatch) {
                tokens.push({ type: 'atom', content: atomMatch[0] });
                remaining = remaining.slice(atomMatch[0].length);
                continue;
            }

            // Numbers
            const numberMatch = remaining.match(/^\d+/);
            if (numberMatch) {
                 tokens.push({ type: 'number', content: numberMatch[0] });
                 remaining = remaining.slice(numberMatch[0].length);
                 continue;
            }
            
             // CSS Properties (basic heuristic: word followed by colon)
             if (language === 'css') {
                const propMatch = remaining.match(/^([\w-]+)(?=:)/);
                if (propMatch) {
                    tokens.push({ type: 'property', content: propMatch[0] });
                    remaining = remaining.slice(propMatch[0].length);
                    continue;
                }
            }

            // Default: consume 1 char
            tokens.push({ type: 'text', content: remaining[0] });
            remaining = remaining.slice(1);
        }

        // Merge adjacent text tokens for performance (optional but good practice)
        const merged: { type: string, content: string }[] = [];
        tokens.forEach(t => {
            if (merged.length > 0 && merged[merged.length - 1].type === t.type && (t.type === 'text' || t.type === 'whitespace')) {
                merged[merged.length - 1].content += t.content;
            } else {
                merged.push(t);
            }
        });

        return merged;
    };

    const tokens = highlightCode(code);

    const getColor = (type: string) => {
        switch (type) {
            case 'comment': return 'text-zinc-500 italic';
            case 'string': return 'text-green-400';
            case 'keyword': return 'text-purple-400 font-medium';
            case 'atom': return 'text-orange-400';
            case 'number': return 'text-blue-400';
            case 'property': return 'text-blue-300';
            default: return 'text-zinc-100';
        }
    };

    return (
        <div className={cn("relative rounded-md bg-zinc-950 border border-zinc-800 font-mono text-sm overflow-hidden group", className)}>
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto">
                <code>
                    {tokens.map((token, i) => (
                        <span key={i} className={getColor(token.type)}>{token.content}</span>
                    ))}
                </code>
            </pre>
        </div>
    );
};