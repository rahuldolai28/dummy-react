import { useState } from "react";
import Count from "./Count.jsx";
export default function CountdownTimer() {
    function handleTimeFinish() {
        console.log(
            "Once the timer is finished I want to make an api call and save some data in database "
        );
    }

    const [inputValue, setInputValue] = useState(0);
    const [initialTime, setInitialTime] = useState(inputValue);
    function input() {
        function handleInputChange(event) {
            const value = event.target.value;
            if (value.includes(".") || parseInt(value) <= 0) return;
            setInputValue(value);
        }
        return (
            <div className="input-container">
                <label htmlFor="time-input">Set Time (in seconds):</label>
                <input
                    type="number"
                    id="time-input"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                &nbsp;&nbsp;
                <button
                    onClick={() => {
                        console.log("inputValue", inputValue);
                        setInitialTime(inputValue);
                    }}>
                    Go
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
