async function parseFiles(files) {
    let allData = [];
    for (const file of files) {
        const text = await file.text();
        const json = JSON.parse(text);
        allData = allData.concat(json);
    }
    return allData;
}
