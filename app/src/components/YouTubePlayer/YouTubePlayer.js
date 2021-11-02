import YouTube from "react-youtube";

export default function YouTubePlayer({isShowPlayer, nowPlaying, playNext}) {
    const opts = {
        height: '550',
        width: '800',
        playerVars: {
            autoplay: 1,
            controls: 0
        }
    }

    const fallbackBackgroundStyle = {
        height: "556px",
        width: "800px", 
        background: "#E5E5E5"
    };

    return (
        <div style={fallbackBackgroundStyle}>
            {isShowPlayer && <YouTube videoId={nowPlaying?.videoId} onEnd={playNext} opts={opts} />}
        </div>
    )
}
