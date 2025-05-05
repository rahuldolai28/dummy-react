import { useState } from "react";
import "./App.css";
import PaginationTest from "./components/pagination/PaginationTest";
import Clock from "./components/digital_clock/Clock_index";
import CountdownTimer from "./components/stopwatch/CountdownTimer";
import MainProgress from "./components/progress/MainProgress";
import RandomQuote from "./components/random-quote/index";
import TooltipTest from "./components/Tooltip/test";
import CurrencyConverter from "./components/currency-converter/index";
import FilterProducts from "./components/filter-products/index";
import MusicPlayer from "./components/MusicPlayer/index";
import ProgressPercent from "./components/progress-percent/index";
import FileUpload from "./components/file-upload/index";
import QuizApp from "./components/quiz-app/Quiz-App.jsx";
import FirebaseTodo from "./components/firebase-todo/index";
function App() {
    return (
        <div className="App">
            {/* something wrong in <MainProgress/> */}
            {/* <p className="main-title">15 React Projects</p>
            <PaginationTest />
            <Clock />
            <CountdownTimer />
            <RandomQuote />
            <TooltipTest />
            <CurrencyConverter />
            <ProgressPercent />
            <FilterProducts />
            <MusicPlayer />
            <FileUpload/> */}
            {/* <QuizApp/> */}
            <FirebaseTodo />
        </div>
    );
}

export default App;
