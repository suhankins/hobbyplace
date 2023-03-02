/**
 * Uploads a file to /api/upload
 * @param file file itself
 * @param fileFor what collection or item this file is for
 */
export async function uploadPhoto(file: File, fileFor: string) {
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