import { useState } from "react";
import Count from "./Count.jsx";
import "./Count.css";
export default function CountdownTimer() {
    function handleTimeFinish() {
        alert("Time up! ");
    }

    const funnyAlerts = [
        "Eta ki re? Number chaichi, r tumi equation likhcho? 😂",
        "Ektu matha thanda kore number dao re bhai 😅",
        "Dekh bhai, timer er shonge maja korish na 😎 Number diye de!",
        "Tumse na ho payega... number toh sahi daal 😭",
    ];

    const randomAlert =
        funnyAlerts[Math.floor(Math.random() * funnyAlerts.length)];

    const [inputValue, setInputValue] = useState("");
    const [initialTime, setInitialTime] = useState(inputValue);
    function input() {
        function handleInputChange(event) {
            const value = event.target.value;
            if (value.includes(".") || parseInt(value) <= 0) return;
            if (value === "" || /^[0-9]+$/.test(value)) {
                setInputValue(value);
            }
        }
        function handleGo() {
            if (inputValue !== "" && !isNaN(inputValue)) {
                const seconds = parseInt(inputValue, 10);
                if (seconds > 0) {
                    setInitialTime(seconds);
                } else {
                    alert(randomAlert);
                }
            } else {
                alert(randomAlert);
            }
            setInitialTime(inputValue);
        }
        return (
            <div className="input-container">
                <label className="input-label" htmlFor="time-input">
                    Set Time (in seconds):
                </label>
                <br />
                <br />
                <input
                    type="number"
                    id="time-input"
                    min="1"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                &nbsp;&nbsp;
                <button
                    className="start"
                    onClick={() => {
                        handleGo();
                    }}>
                    Start
                </button>
                &nbsp;&nbsp;
                <button
                    className="reset"
                    onClick={() => {
                        setInputValue("");
                    }}>
                    Reset
                </button>
            </div>
        );
    }

    return (
        <div className="countdown-container">
            <h3 className="title">CountDown Timer </h3>

            {input()}

            {initialTime > 0 && (
                <Count
                    key={initialTime}
                    initialTime={initialTime}
                    onTimeFinish={handleTimeFinish}
                />
            )}
            {initialTime <= 0 && (
                <div className="timer">
                    <p className="running-timer">00 : 00</p>
                    <p className="set-time">Set a time to start</p>
                </div>
            )}
        </div>
    );
}
