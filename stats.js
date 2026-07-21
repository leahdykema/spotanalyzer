function computeStats(data) {
    const stats = {
        totalMs: 0,
        plays: 0,
        tracks: {},
        artists: {},
        playsByYear: {},
        years: {},
        uniqueTracks: new Set(),
        uniqueTracksByYear: {}
    };
    data.forEach(entry => {
        if (!entry.master_metadata_track_name) return;
        const track = entry.master_metadata_track_name;
        const artist = entry.master_metadata_album_artist_name;
        const year = new Date(entry.ts).getFullYear();
        const trackKey = `${track} - ${artist}`;
        stats.totalMs += entry.ms_played;
        stats.plays++;
        stats.playsByYear[year] = (stats.playsByYear[year] || 0) + 1;
        // Track counts
        const key = `${track} - ${artist}`;
        stats.tracks[key] = (stats.tracks[key] || 0) + 1;
        // Artist counts
        stats.artists[artist] = (stats.artists[artist] || 0) + 1;
        // Yearly minutes
        stats.years[year] = (stats.years[year] || 0) + entry.ms_played;
        // total unique tracks
        stats.uniqueTracks.add(trackKey);
        // yearly unique tracks
        if (!stats.uniqueTracksByYear[year]) {
            stats.uniqueTracksByYear[year] = new Set();
        }
        stats.uniqueTracksByYear[year].add(trackKey);
    });
    stats.uniqueTracks = stats.uniqueTracks.size;
    Object.keys(stats.uniqueTracksByYear).forEach(year => {
        stats.uniqueTracksByYear[year] = stats.uniqueTracksByYear[year].size;
    });
    return stats;
}
