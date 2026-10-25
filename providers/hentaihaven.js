// HentaiHaven adapter scaffold for Nuvio.
// Intentionally returns no streams: no unauthorized video scraping.
async function getStreams(_params) { return []; }
function onSettings() { return []; }
module.exports = { getStreams, onSettings };
