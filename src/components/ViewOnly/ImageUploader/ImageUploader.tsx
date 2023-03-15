import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

export type ImageUploaderDictionary = {
    label: string;
    hover_title: string;
}

export function ImageUploader({
    dictionary,
    fileUploaderRef,
}: {
    dictionary: ImageUploaderDictionary;
    fileUploaderRef: React.MutableRefObject<any>;
}) {
    const [image, setImage] = useState(undefined as string | undefined);
    const handleChange = (file: any) => {
        setImage(URL.createObjectURL(file));
        fileUploaderRef.current = file;
    };
    return (
        <FileUploader
            label={dictionary.label}
            hoverTitle={dictionary.hover_title}
            handleChange={handleChange}
            classes="w-96 !h-96"
            maxSize={1}
            types={['JPG', 'PNG', 'GIF']}
        >
            {image && <img alt="preview of an uploaded image" src={image} />}
        </FileUploader>
    );
}
