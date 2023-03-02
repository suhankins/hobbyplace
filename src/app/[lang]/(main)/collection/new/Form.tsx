'use client';

import React, { useMemo, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import 'github-markdown-css/github-markdown-dark.css';
import { FileUploader } from 'react-drag-drop-files';
import { Categories } from '@/Components/Categories';
import { FieldType, FieldTypes } from '@/Components/Fields/FieldIndex';
import { Cross } from '@/Components/shared/Icons';
import { uploadPhoto } from '@/lib/uploadPhoto';
import { FieldValues, useForm } from 'react-hook-form';

export function Form() {
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

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        shouldUnregister: true,
    });

    const onSubmit = (
        data: FieldValues,
        e: React.BaseSyntheticEvent | undefined
    ) => {
        e!.preventDefault();
        fetch('/api/collection/', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(() => console.log('HUH???'));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <figure className="p-4 rounded-lg bg-base-200 h-min">
                    <FileUploader
                        classes="w-96 !h-96"
                        //handleChange={uploadPhoto}
                        maxSize={1}
                        types={['JPG', 'PNG', 'GIF', 'WEBP']}
                    />
                </figure>
                <div className="flex flex-col gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Collection name"
                        className="input input-ghost hover:border-gray-500 w-full card-title pl-0"
                        {...register('name', { required: true })}
                    />
                    <input className="hidden" {...register('description')} />
                    <SimpleMDE
                        options={options}
                        onChange={(value) => setValue('description', value)}
                    />
                    <select
                        className="select w-full bg-base-200"
                        {...register('category', { required: true })}>
                        {Categories.map((category) => (
                            <option key={category}>{category}</option>
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
                                    <input
                                        className="hidden"
                                        value={value}
                                        {...register(`fields[${index}].type`)}
                                    />
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input bg-base-200"
                                        {...register(`fields[${index}].name`)}
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
