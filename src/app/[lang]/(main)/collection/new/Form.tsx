'use client';

import React, { useRef, useState } from 'react';
import { Categories } from '@/components/MVC/Collection/Categories';
import { FieldType, FieldTypes } from '@/components/MVC/Field/FieldIndex';
import { Cross } from '@/components/ViewOnly/Icons/Icons';
import { uploadPhoto } from '@/lib/uploadPhoto';
import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { MDEInput } from '@/components/ViewOnly/MDEInput/MDEInput';
import {
    ImageUploader,
    ImageUploaderDictionary,
} from '@/components/ViewOnly/ImageUploader/ImageUploader';

export function Form({
    dictionary,
    imageUploaderDictionary,
}: {
    dictionary: {
        collection_name: string;
        add_field: string;
        create_button: string;
        field_name: string;
    };
    imageUploaderDictionary: ImageUploaderDictionary;
}) {
    const [fields, setFields] = useState([] as FieldType[]);

    const fileUploaderRef = useRef(undefined as any);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        shouldUnregister: true,
    });

    const router = useRouter();

    const onSubmit = (
        data: FieldValues,
        e: React.BaseSyntheticEvent | undefined
    ) => {
        let collectionId: string;
        e!.preventDefault();
        fetch('/api/collection/', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((collection) => {
                collectionId = collection._id as string;
                return uploadPhoto(
                    fileUploaderRef.current,
                    'collection',
                    collection.id
                );
            })
            .then(() => {
                router.push(`/collection/${collectionId}`);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <figure className="p-4 rounded-lg bg-base-200 h-min">
                    <ImageUploader
                        dictionary={imageUploaderDictionary}
                        fileUploaderRef={fileUploaderRef}
                    />
                </figure>
                <div className="flex flex-col gap-2 w-full">
                    <input
                        type="text"
                        placeholder={dictionary.collection_name}
                        className="input input-ghost hover:border-gray-500 w-full card-title pl-0"
                        {...register('name', { required: true })}
                    />
                    <MDEInput
                        {...register('description')}
                        setValue={setValue}
                    />
                    <select
                        className="select w-full bg-base-200"
                        {...register('category', { required: true })}
                    >
                        {Categories.map((category) => (
                            <option key={category}>{category}</option>
                        ))}
                    </select>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn w-full">
                            {dictionary.add_field}
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu w-full p-2 shadow bg-base-300 rounded-box"
                        >
                            {FieldTypes.map((value) => (
                                <li key={value}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFields([...fields, value])
                                        }
                                    >
                                        {value}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {fields.map((value, index) => (
                        <div
                            key={index}
                            className="card flex flex-col lg:flex-row gap-4 bg-base-300"
                        >
                            <div className="card-body">
                                <h2 className="card-title">{value}</h2>
                                <div className="flex flex-col">
                                    <input
                                        className="hidden"
                                        value={value}
                                        {...register(`fields[${index}].type`)}
                                    />
                                    <label className="label">
                                        <span className="label-text">
                                            {dictionary.field_name}
                                        </span>
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
                                    }
                                >
                                    <Cross />
                                </button>
                            </div>
                        </div>
                    ))}
                    <input
                        type="submit"
                        className="btn btn-primary w-1/2 self-center"
                        value={dictionary.create_button}
                    />
                </div>
            </div>
        </form>
    );
}
