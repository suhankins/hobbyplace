'use client';

import { ChangeEventHandler, FocusEventHandler, LegacyRef, useMemo } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import 'github-markdown-css/github-markdown-dark.css';

export function MDEInput({ onChange, onBlur, name, ref, setValue }: {
    onChange: ChangeEventHandler,
    onBlur: FocusEventHandler,
    name: string,
    ref: LegacyRef<HTMLInputElement>,
    setValue: UseFormSetValue<FieldValues>
}) {
    const options = useMemo(() => {
        return {
            hideIcons: ['side-by-side', 'fullscreen'],
            spellChecker: false,
            previewClass: ['markdown-body', 'p-4'],
            status: false,
        } as EasyMDE.Options;
    }, []);

    return (
        <>
            <input onChange={onChange} onBlur={onBlur} name={name} ref={ref} className="hidden" />
            <SimpleMDE
                options={options}
                onChange={(value) => setValue(name, value)}
            />
        </>
    );
}
