import {socket} from "../../services/socket";
import VideoItem from "../VideoItem/VideoItem";
import { usePositionReorder } from '../../hooks/usePositionReorder';
import useVideos from "../../hooks/useVideos";

export default function VideosList({className}) {
    const {videos} = useVideos();

    const [updatedList, updatePosition, updateOrder] = usePositionReorder(videos);
    
    const updatePlaylist = () => {
        socket.emit("playlist-reorder", updatedList);
    }

    return (
        <div className={`${className} rounded overflow-y-scroll shadow-lg bg-white px-6 py-1 divide-y-2 divide-gray-100`}>
            {updatedList.map((video, index) => <VideoItem 
                key={video.id} 
                video={video} 
                index={index} 
                updateOrder={updateOrder}
                updatePosition={updatePosition}
                onPlaylistReorder={updatePlaylist}
            />)}
        </div>
    )
}
