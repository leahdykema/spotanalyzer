document.getElementById("fileInput").addEventListener("change", async (e) => {
    const files = e.target.files;
    const rawData = await parseFiles(files);
    const stats = computeStats(rawData);
    renderSummary(stats);
    renderTopTracks(stats.tracks);
    renderYearList(stats.years, stats.playsByYear, stats.uniqueTracksByYear);
    // Hide upload button after successful load & show bottom section buttons
    document.getElementById("fileUpload").style.display = "none";
    e.target.value = "";
    document.getElementById("fileInput").style.display = "none";
    e.target.value = "";
    document.getElementById("actions").style.display = "block";
});
function renderSummary(stats) {
    const minutes = Math.round(stats.totalMs / 1000 / 60);
    document.getElementById("summary").innerHTML = `
        <p>Total Plays: ${stats.plays} | Total Minutes: ${minutes} | Total Songs: ${stats.uniqueTracks.toLocaleString()}</p>
    `;
}
function renderYearList(years, playsByYear, uniqueTracksByYear) {
    const container = document.getElementById("yearStats");
    container.innerHTML = "";

    Object.keys(years)
        .sort((a, b) => a - b)
        .forEach(year => {
            const item = document.createElement("p");

            const minutes = Math.round(years[year] / 1000 / 60);
            const plays = playsByYear[year];
            const unique = uniqueTracksByYear[year];

            item.textContent =
                `${year} — ${plays} plays, ${unique} songs, ${minutes.toLocaleString()} minutes`;

            container.appendChild(item);
        });
}
function renderTopTracks(tracks) {
    const sorted = Object.entries(tracks)
        .sort((a, b) => b[1] - a[1]);
    const html = sorted.map(([name, count]) =>
        `<div>${name} — ${count} plays</div>`
    ).join("");
    document.getElementById("topTracks").innerHTML = html;
}
