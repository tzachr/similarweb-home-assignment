const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const assert = require("chai").assert;
const Videos = require('../data/videos/videos');

describe("app", () => {
    let io, serverSocket, clientSocket;

    before((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });

    after(() => {
        io.close();
        clientSocket.close();
    });

    it("should get data from client", (done) => {
        clientSocket.once("add-video", data => {
            assert.equal(data.videoId, "6wbnwsKrnYU");
            done();
        });
        serverSocket.emit("add-video", {
            id: "1",
            videoId: "6wbnwsKrnYU",
            url: "https://www.youtube.com/watch?v=6wbnwsKrnYU&list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ&index=11&ab_channel=TheNetNinja",
            title: "some title",
            duration: "07:36"
        });
    });

    it("should fill videos list", (done) => {
        clientSocket.once("add-video", data => {
            const videos = new Videos();
            videos.addVideo(data);
            assert.equal(videos.data.length, 1);
            done();
        });
        serverSocket.emit("add-video", {
            id: "1",
            videoId: "6wbnwsKrnYU",
            url: "https://www.youtube.com/watch?v=6wbnwsKrnYU&list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ&index=11&ab_channel=TheNetNinja",
            title: "some title",
            duration: "07:36"
        });
    });

    it("should remove video from list", (done) => {
        clientSocket.once("video-remove", data => {
            const videos = new Videos();
            videos.addVideo({
                id: "1",
                videoId: "6wbnwsKrnYU",
                url: "https://www.youtube.com/watch?v=6wbnwsKrnYU&list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ&index=11&ab_channel=TheNetNinja",
                title: "some title",
                duration: "07:36"
            });
            videos.removeVideo(data.id);
            assert.equal(videos.data.filter(video => video.id === data.id), 0);
            done();
        });
        serverSocket.emit("video-remove", {
            id: "1",
            videoId: "6wbnwsKrnYU",
            url: "https://www.youtube.com/watch?v=6wbnwsKrnYU&list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ&index=11&ab_channel=TheNetNinja",
            title: "some title",
            duration: "07:36"
        });
    });

    it("should reorder playlist", (done) => {
        const video1 = {
            id: "1",
            videoId: "123",
            url: "https://www.youtube.com/watch?v=6wbnwsKrnYU&list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ&index=11&ab_channel=TheNetNinja",
            title: "some title1",
            duration: "07:36"
        };

        const vide02 = {
            id: "2",
            videoId: "456",
            url: "https://www.youtube.com/watch?v=6wbnwsKrnYU&list=PL4cUxeGkcC9gm4_-5UsNmLqMosM-dzuvQ&index=11&ab_channel=TheNetNinja",
            title: "some title2",
            duration: "15:09"
        };

        clientSocket.once("playlist-reorder", data => {
            const videos = new Videos();


            videos.addVideo(video1);
            videos.addVideo(vide02);

            assert.equal(videos.data[0].id, 1);
            assert.equal(videos.data[1].id, 2);

            videos.updateVideos(data);

            assert.equal(videos.data[0].id, 1);
            assert.equal(videos.data[1].id, 2);
            done();
        });
        serverSocket.emit("playlist-reorder", [video1, vide02]);
    });
});