'use client';

import React, { useMemo, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import 'github-markdown-css/github-markdown-dark.css';
import { FileUploader } from 'react-drag-drop-files';
import { Categories } from '@/Components/Categories';
import {
    FieldIndex,
    FieldType,
    FieldTypes,
} from '@/Components/Fields/FieldIndex';
import { Cross } from '@/Components/shared/Icons';

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
            previewClass: ['markdown-body', 'p-4'],
            status: false,
            placeholder: 'Description',
        } as EasyMDE.Options;
    }, []);

    const [fields, setFields] = useState([] as FieldType[]);

    return (
        <form>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <figure className="p-4 rounded-lg bg-base-200 h-min">
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
                    <select className="select w-full bg-base-200">
                        {Categories.map((category) => (
                            <option>{category}</option>
                        ))}
                    </select>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn w-full">
                            Add field
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu w-full p-2 shadow bg-base-300 rounded-box">
                            {FieldTypes.map((value) => (
                                <li key={value}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFields([...fields, value])
                                        }>
                                        {value}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {fields.map((value, index) => (
                        <div
                            key={index}
                            className="card flex flex-col lg:flex-row gap-4 bg-base-300">
                            <div className="card-body">
                                <h2 className="card-title">{value}</h2>
                                <div className="flex flex-col">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input bg-base-200"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() =>
                                        setFields(
                                            fields.filter(
                                                (_v, i) => index !== i
                                            )
                                        )
                                    }>
                                    <Cross />
                                </button>
                            </div>
                        </div>
                    ))}
                    <input
                        type="submit"
                        className="btn btn-primary w-1/2 self-center"
                        value="Create"
                    />
                </div>
            </div>
        </form>
    );
}
