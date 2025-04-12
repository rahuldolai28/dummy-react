import { useState } from "react";
import "./App.css";
import PaginationTest from "./components/pagination/PaginationTest";
import Clock from "./components/digital_clock/Clock_index"
import CountdownTimer from "./components/stopwatch/CountdownTimer";
import MainProgress from "./components/progress/MainProgress"

function App() {

    return (
        <div className="App" >
            <h1 className="title">Let,s do this</h1>
            {/* <PaginationTest/>
            <hr />
            <Clock />
            <hr />
            <CountdownTimer/>
            <hr /> */}
            <MainProgress/>
        </div>
    );
}

export default App;
