import { useState } from "react";
import "./App.css";
import PaginationTest from "./components/pagination/PaginationTest";
import Clock from "./components/digital_clock/Clock_index"
import CountdownTimer from "./components/stopwatch/CountdownTimer";

function App() {

    return (
        <div >
            {/* <PaginationTest/> */}
            <Clock />
            <hr />
            <CountdownTimer/>
        </div>
    );
}

export default App;
