import { useEffect, useRef, useState } from "react";

export default function Count({ initialTime, onTimeFinish }) {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(true);
    const intervalReference = useRef();

    useEffect(() => {
        if (isRunning) {
            //interval
            intervalReference.current = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(intervalReference.current);
                        setIsRunning(false);
                        if (onTimeFinish) onTimeFinish();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalReference.current);
        }

        return () => {
            clearInterval(intervalReference.current);
        };
    }, [isRunning, onTimeFinish]);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function handlePauseAndResume() {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    }
    function handleReset() {
        clearInterval(intervalReference.current);
        setTime(0);
        setIsRunning((prevIsRunning) => false);
    }

    return (
        <div className="timer">
            <p className="running-timer" >
                {String(minutes).padStart(2, "0")} :
                {String(seconds).padStart(2, "0")}
            </p>
            <div className="timer-buttons">
                <button className="resume" onClick={handlePauseAndResume}>
                    {isRunning ? "Pause" : "Resume"}
                </button>
                &nbsp;
                <button className="reset" onClick={handleReset}> 
                    Reset
                </button>
                &nbsp;
            </div>
        </div>
    );
}
