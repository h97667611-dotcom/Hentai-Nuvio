// Hanime.tv adapter scaffold for Nuvio.
// Intentionally returns no streams: this repo does not extract protected media.
// Add only endpoints and playback URLs that you own or are authorized to use.
async function getStreams(_params) { return []; }
function onSettings() { return []; }
module.exports = { getStreams, onSettings };
