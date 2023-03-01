'use client';

import { ChangeEvent } from 'react';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF', 'WEBP'];

export default function Upload() {
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
            console.log('Uploaded successfully!');
        } else {
            console.error('Upload failed.');
        }
    };

    return (
        <>
            <p>Upload your mother lmao gottem</p>
            <FileUploader
                handleChange={uploadPhoto}
                maxSize={1}
                types={fileTypes}
            />
        </>
    );
}
