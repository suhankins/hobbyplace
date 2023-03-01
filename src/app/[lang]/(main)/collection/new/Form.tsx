'use client';

import React, { useMemo } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import 'github-markdown-css/github-markdown-dark.css';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF', 'WEBP'];

export function Form() {
    const uploadPhoto = async (file: File) => {
        const filename = encodeURIComponent(file.name);
        const res = await fetch(`/api/upload?file=${filename}`);
        const { url, fields } = await res.json();
        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value as any);
        });

        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (upload.ok) {
            console.log('Uploaded successftully!');
        } else {
            console.error('Upload failed.');
        }
    };

    const options = useMemo(() => {
        return {
            hideIcons: ['side-by-side', 'fullscreen'],
            spellChecker: false,
            previewClass: 'markdown-body',
            status: false,
            placeholder: 'Description',
        } as EasyMDE.Options;
    }, []);

    return (
        <form>
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <figure className="p-4 rounded-lg bg-base-200">
                    <FileUploader
                        classes="w-96 !h-96"
                        handleChange={uploadPhoto}
                        maxSize={1}
                        types={fileTypes}
                    />
                </figure>
                <div className="flex flex-col gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Collection name"
                        className="input input-ghost hover:border-gray-500 w-full card-title pl-0"></input>
                    <SimpleMDE options={options} />
                    <div className="self-end">
                        <button className="btn btn-primary">Create</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
