function toDataURL(path) {
    return fetch(path).then((response) => {
        return response.blob();
    }).then(blob => {
        return URL.createObjectURL(blob);
    });
}

export async function downloadFile(file) {
    const a = document.createElement("a");
    a.href = await toDataURL(file.path);
    a.download = file.displayName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}