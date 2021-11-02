const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const { URL } = require('url');
const youtube = require('./services/youtube.service');
const Videos = require('./data/videos/videos');

const app = express();

app.use(cors());
app.use(express.json());

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('Service is live!');
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || "3001");

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const videos = new Videos();

io.on("connection", socket => {
    socket.on("init-client", data => {
        io.to(socket.id).emit("videos-init", videos.data);
    });
    
    socket.on("video-add", async data => {
        const videoId = youtube.extractIdFromUrl(data.url);
        const response = await youtube.getYouTubeVideo(videoId);
        const video = response.data.items.pop(); 

        videos.addVideo({
            id: uuidv4(),
            videoId,
            url: data.url,
            title: video.snippet.title,
            duration: youtube.getYouTubeVideoDuration(video.contentDetails.duration)
        });
        io.emit("videos-update", videos.data);
    });

    socket.on("video-remove", data => {
        videos.removeVideo(data.id);
        io.emit("videos-update", videos.data);
    });

    socket.on("playlist-reorder", data => {
        videos.updateVideos(data);
        io.emit("videos-update", videos.data);
    });
});
