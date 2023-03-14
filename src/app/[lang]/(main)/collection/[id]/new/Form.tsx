'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { uploadPhoto } from '@/lib/uploadPhoto';
import { FieldValues, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FieldIndex, FieldType } from '@/components/MVC/Field/FieldIndex';

export function Form({
    collectionId,
    fields,
}: {
    collectionId: string;
    fields: { name: string; type: string; _id: string }[];
}) {
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

    const renderedFields = useMemo(
        () => (
            <>
                {fields.map((field, index) => {
                    const CustomInput =
                        FieldIndex[field.type as FieldType].input;
                    register(`fields[${index}].belongsTo`);
                    setValue(`fields[${index}].belongsTo`, field._id);
                    return (
                        <div
                            className="p-4 rounded-lg bg-base-200"
                            key={field._id}>
                            <label className="label">
                                <span className="label-test">{field.name}</span>
                            </label>
                            <CustomInput
                                {...register(`fields[${index}].value`)}
                                setValue={setValue}
                            />
                        </div>
                    );
                })}
            </>
        ),
        []
    );

    const onSubmit = useMemo(
        () => (data: FieldValues, e: React.BaseSyntheticEvent | undefined) => {
            let itemId: string;
            e!.preventDefault();
            console.log(data)
            fetch('/api/item/', {
                method: 'POST',
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((item) => {
                    itemId = item._id as string;
                    return uploadPhoto(fileUploaderRef.current, 'item', itemId);
                })
                .then(() => {
                    router.push(`/item/${itemId}`);
                });
        },
        []
    );

    useEffect(() => {
        register('belongsTo');
        setValue('belongsTo', collectionId);
    }, []);

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
                        placeholder="Item name"
                        className="input input-ghost hover:border-gray-500 w-full card-title pl-0"
                        {...register('name', { required: true })}
                    />
                    <label className="label">
                        <span className="label-test">
                            Tags (comma separated)
                        </span>
                    </label>
                    <input
                        placeholder="cat, dog..."
                        type="text"
                        className="input bg-base-200"
                        {...register('tags')}
                    />
                    {renderedFields}
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
