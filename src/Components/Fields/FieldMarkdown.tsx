import { useMemo } from 'react';
import { FieldDefinition } from './FieldDefinition';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import 'github-markdown-css/github-markdown-dark.css';

export const FieldMarkdown: FieldDefinition = {
    input() {
        const options = useMemo(() => {
            return {
                hideIcons: ['side-by-side', 'fullscreen'],
                spellChecker: false,
                previewClass: ['markdown-body', 'p-4'],
                status: false,
            } as EasyMDE.Options;
        }, []);
        return <SimpleMDE options={options} />;
    },
    output(value: string) {
        return <span>{value}</span>;
    },
    value(rawValue: any) {
        return String(rawValue);
    },
};
