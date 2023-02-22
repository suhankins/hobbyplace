'use client';

import { InputSuggestions } from 'react-input-suggestions';

export function Searchbar(params?: { className?: string }) {
    // TODO: Make it actually work
    return (
        <InputSuggestions
            className={`input ${params ? params.className : ''}`}
            suggestions={['this', 'is', 'a', 'test'].map((word) => (
                <span>{word}</span>
            ))}
        />
    );
}
