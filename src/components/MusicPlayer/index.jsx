import tracks from "./tracks.json";
import "./music.css";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";

export default function MusicPlayer() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);

    const progressBarRef = useRef(null);

    useEffect(() => {
        let animationFrameId;

        const updateProgress = () => {
            if (audioRef.current && progressBarRef.current && isPlaying) {
                const duration = audioRef.current.duration || 0;
                const currentTime = audioRef.current.currentTime;
                const progress = (currentTime / duration) * 100;

                // Update progress bar width directly without using React state
                progressBarRef.current.style.width = `${progress}%`;

                animationFrameId = requestAnimationFrame(updateProgress);
            }
        };

        if (isPlaying) {
            animationFrameId = requestAnimationFrame(updateProgress);
        }

        return () => cancelAnimationFrame(animationFrameId);
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
        } else if (direction === "forward-10") {
            audioRef.current.currentTime = Math.min(
                audioRef.current.currentTime + 10,
                audioRef.current.duration
            );
        } else if (direction === "backward-10") {
            audioRef.current.currentTime = Math.max(
                audioRef.current.currentTime - 10,
                0
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
            <h1 className="title">9. Music Player</h1>
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
                        ref={progressBarRef}
                        style={{
                            width: `${trackProgress}%`,
                            backgroundColor: isPlaying ? "#4caf50" : "red",
                        }}></div>
                </div>
                <div className="track-controls">
                    <button onClick={() => handleSkipTrack("backward")}>
                        <FaBackwardStep size={20} />
                    </button>
                    <button onClick={() => handleSkipTrack("backward-10")}>
                        <FaBackward size={20} />
                    </button>
                    <button onClick={handlePauseAndPlay}>
                        {isPlaying ? (
                            <FaPause size={18} />
                        ) : (
                            <FaPlay size={18} />
                        )}
                    </button>
                    <button onClick={() => handleSkipTrack("forward-10")}>
                        <FaForward size={20} />
                    </button>
                    <button onClick={() => handleSkipTrack("forward")}>
                        <FaForwardStep size={20} />
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
