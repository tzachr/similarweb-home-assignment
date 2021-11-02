import { useState, useEffect } from 'react';
import {socket} from "../services/socket";

export default function useVideos() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        socket.once("videos-init", data => {
            setVideos(data);
        });
    }, []);

    useEffect(() => {
        socket.on("videos-update", data => {
            setVideos(data);
        });
    }, [setVideos]);

    const addVideo = (url) => {
        socket.emit("video-add", {url});
    }

    const updatePlaylist = (updatedList) => {
        socket.emit("playlist-reorder", updatedList);
    }

    return {addVideo, videos, setVideos, updatePlaylist }

}
