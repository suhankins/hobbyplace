'use client';

import React, { useMemo, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';


import { uploadPhoto } from '@/lib/uploadPhoto';
import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export function Form() {
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
                    <FileUploader
                        handleChange={(file: any) =>
                            (fileUploaderRef.current = file)
                        }
                        classes="w-96 !h-96"
                        maxSize={1}
                        types={['JPG', 'PNG']}
                    />
                </figure>
                <div className="flex flex-col gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Collection name"
                        className="input input-ghost hover:border-gray-500 w-full card-title pl-0"
                        {...register('name', { required: true })}
                    />
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
