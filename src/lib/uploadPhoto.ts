export async function uploadPhoto(file: File, type: string, id: string) {
    const res = await fetch(`/api/upload?type=${type}&id=${id}&filetype=${file.name.split(".").slice(-1)}`);
    if (!res.ok) return;
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
        fetch(`/api/confirmUpload?type=${type}&id=${id}&filetype=${file.name.split(".").slice(-1)}`)
    } else {
        console.error('Upload failed.');
    }
}
