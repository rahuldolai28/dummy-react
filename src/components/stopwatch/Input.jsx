import { useState } from "react";

export default function Input({ input }) {
    const [inputValue, setInputValue] = useState(input);

    function handleInputChange(event) {
        const value = event.target.value;
        setInputValue(value);
        onTimeChange(value);
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
        </div>
    );
}