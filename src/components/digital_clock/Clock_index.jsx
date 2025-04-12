import { useState, useEffect } from "react";

export default function Clock_index() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="Clock_index">
            <h3>Digital Clock</h3>
            <div className="clock">
                {/* {console.log(time)} */}
                <div className="time">
                    <span>{time.getHours().toString().padStart(2, "0")}</span>:
                    <span>{time.getMinutes().toString().padStart(2, "0")}</span>
                    :
                    <span>{time.getSeconds().toString().padStart(2, "0")}</span>
                </div>
                <div className="date">
                    <span>
                        {time.toLocaleDateString(undefined, {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}
