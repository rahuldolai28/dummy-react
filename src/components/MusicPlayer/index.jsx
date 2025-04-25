import tracks from "./tracks.json";
import "./music.css";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function MusicPlayer() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                if (audioRef.current) {
                    const progress =
                        (audioRef.current.currentTime /
                            audioRef.current.duration) *
                        100;
                    setTrackProgress(progress);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
        
    }, [isPlaying]);

    function handlePauseAndPlay() {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    function handleSkipTrack(direction) {
        if (direction === "forward") {
            setCurrentTrack((prevTrack) =>
                prevTrack === tracks.length - 1 ? 0 : prevTrack + 1
            );
        } else if (direction === "backward") {
            setCurrentTrack((prevTrack) =>
                prevTrack === 0 ? tracks.length - 1 : prevTrack - 1
            );
        }
        setTrackProgress(0);
    }
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load(); // Reload the new track
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentTrack]);
    

    return (
        <div className="music-player">
            <h1 className="title">8. Music Player</h1>
            <div className="music-player-container">
                <h2>{tracks[currentTrack].title}</h2>
                <div className="cover-img">
                <img
                    src={tracks[currentTrack].image}
                    alt={tracks[currentTrack].title}
                />
                </div>
                <audio ref={audioRef} src={tracks[currentTrack].source}></audio>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{
                            width: `${trackProgress}%`,
                            backgroundColor: isPlaying ? "#4caf50" : "red",
                        }}>
                    </div>
                </div>
                <div className="track-controls">
                    <button onClick={() => handleSkipTrack("backward")}>
                        <FaBackward size={20} />
                    </button>
                    <button onClick={handlePauseAndPlay}>
                        {isPlaying ? (
                            <FaPause size={20} />
                        ) : (
                            <FaPlay size={20} />
                        )}
                    </button>
                    <button onClick={() => handleSkipTrack("forward")}>
                        <FaForward size={20} />
                    </button>
                </div>
            </div>
            <div className="controls"></div>
        </div>
    );
}

// export default function MusicPlayer() {
//   const box = useRef(0); // make a box and put 0 inside

//   function changeValue() {
//     box.current = box.current + 1; // change the value
//     console.log("Box now has:", box.current); // show it in console
//   }

//   return <button onClick={changeValue}>Click Me</button>;
// }
