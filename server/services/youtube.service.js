const {google} = require('googleapis');
const apiKey = process.env.GOOGLE_API_KEY;

const youtube = google.youtube({
    version: "v3",
    auth: apiKey
});

async function getYouTubeVideo (videoId) {
    return await youtube.videos.list({
        "part": [
            "snippet,contentDetails"
        ],
        "id": [
            videoId
        ]
    });
}

function getYouTubeVideoDuration (durationString) {
    return _getDuration(durationString);
}

function extractIdFromUrl (url) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
}

const _getDuration = durationString => {
    const durationParts = durationString
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "")
        .split(":");

    if (durationParts.length === 3) {
        durationParts[0] = durationParts[0];
        durationParts[1] = parseInt(durationParts[1]) < 10 ? `0${durationParts[1]}` : durationParts[1];
        durationParts[2] = parseInt(durationParts[2]) < 10 ? `0${durationParts[2]}` : durationParts[2];
    }

    if (durationParts.length === 2) {
        durationParts[0] = durationParts[0];
        durationParts[1] = parseInt(durationParts[1]) < 10 ? `0${durationParts[1]}` : durationParts[1];
    }

    if (durationParts.length === 1) {
        durationParts.unshift("0");
        durationParts[1] = parseInt(durationParts[1]) < 10 ? `0${durationParts[1]}` : durationParts[1];
    }

    return durationParts.join(":");
};

module.exports = {
    getYouTubeVideo,
    getYouTubeVideoDuration,
    extractIdFromUrl
};