import { useState } from "react";
import Count from "./Count.jsx";
export default function CountdownTimer() {
    function handleTimeFinish() {
        console.log(
            "Once the timer is finished I want to make an api call and save some data in database "
        );
    }

    const funnyAlerts = [
        "Eta ki re? Number chaichi, r tumi equation likhcho? 😂",
        "Ektu matha thanda kore number dao re bhai 😅",
        "Dekh bhai, timer er shonge maja korte gele heartbreak hobe 💔",
        "Dekh bhai, timer er shonge maja korish na 😎 Number diye de!",
        "Tumse na ho payega... number toh sahi daal 😭",
    ];

    const randomAlert =
        funnyAlerts[Math.floor(Math.random() * funnyAlerts.length)];

    const [inputValue, setInputValue] = useState(0);
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
                <label htmlFor="time-input">Set Time (in seconds):</label>
                <input
                    type="number"
                    id="time-input"
                    min="1"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                &nbsp;&nbsp;
                <button
                    onClick={() => {
                        handleGo();
                    }}>
                    Go
                </button>
                &nbsp;&nbsp;
                <button
                    onClick={() => {
                        document.getElementById("time-input").value = "";
                    }}>
                    Reset
                </button>
            </div>
        );
    }

    return (
        <div className="countdown-container">
            <h3>CountDown Timer </h3>

            {input()}

            <Count
                key={initialTime} // 🔥 This forces Count to reset
                initialTime={initialTime}
                onTimeFinish={handleTimeFinish}
            />
        </div>
    );
}

// export default function Input({ input }) {
//     const [inputValue, setInputValue] = useState(input);

//     return (

//     );
// }
