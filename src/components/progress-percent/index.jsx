import { useState } from "react";
import "./progress_percent.css";

export default function ProgressPercent() {
    const [progressPercent, setProgressPercent] = useState(30);

    function handleProgressPercent(event){
        if(event.target.value > 100){
            alert("Please enter a value less than 100");
        }
        else if(event.target.value < 0){
            alert("Please enter a value greater than 0");
        }
        else{
            setProgressPercent(event.target.value);
        }
    }

    return (
        <div className="progress-percent__container">
            <h1 className="title">7. Custom Progress Bar</h1>
            <div className="progress_bar">
                <div className="wrapper">
                    {
                        <div className="innerWrapper"
                        style={{width: `${progressPercent}%`}}>
                            {progressPercent}
                        </div>
                    }
                </div>
            </div>
            <div className="input-container">
                <label htmlFor="percent">Input Percentage : </label>
                <input
                    type="number"
                    value={progressPercent}
                    id="percent"
                    min={0}
                    max={100}
                    onChange={handleProgressPercent}
                />
            </div>
        </div>
    );
}
