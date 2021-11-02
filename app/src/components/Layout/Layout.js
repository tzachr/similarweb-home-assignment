import { useState, useEffect } from "react";
import {socket} from "../../services/socket";
import _ from "lodash";
import VideoInput from '../VideoInput/VideoInput';
import VideosList from "../VideosList/VideosList";
import YouTubePlayer from "../YouTubePlayer/YouTubePlayer";
import useVideos from "../../hooks/useVideos";

export default function Layout() {
    const [nowPlaying, setNowPlaying] = useState(null);
    const {videos, setVideos} = useVideos();
    const [isShowPlayer, setIsShowPlayer] = useState(false);

    useEffect(() => {
        if (!_.isEmpty(videos)) {
            setNowPlaying(videos[0]);
            setIsShowPlayer(true);
        } else {
            setIsShowPlayer(false);
        }
    }, [videos, isShowPlayer]);
    
    const playNext = () => {
        setVideos(_.drop(videos));
        socket.emit("video-remove", nowPlaying);
    }

    return (
        <div className="w-screen h-screen relative py-16 bg-red-50">
            <div className="center flex items-center justify-between h-558 w-88 justify-items-center">
                <div className="h-full w-480 flex flex-col items-center justify-between">
                    <VideoInput className="w-full" />
                    <VideosList className="w-full h-3/4" />
                </div>
                <YouTubePlayer showPlayer={isShowPlayer} nowPlaying={nowPlaying} playNext={playNext} />
            </div>
        </div>
    )
}
