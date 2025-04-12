import Count from "./Count.jsx";
export default function CountdownTimer() {
    function handleTimeFinish() {
        console.log(
            "Once the timer is finished I want to make an api call and save some data in database "
        );
    }

    return (
        <div className="countdown-container">
            <h3>CountDown Timer </h3>
            <Count initialTime={10} onTimeFinish={handleTimeFinish} />
        </div>
    );
}
