// current question
// score
// selected options
// show result

import { useState } from "react";
import questions from "./questions.json";
import bg_img from "./kbc.jpeg";
// import bg_img from "./kbc2.webp";

import "./quiz.css";

export default function QuizApp() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState(
        new Array(questions.length).fill(null)
    );
    const [showResult, setShowResult] = useState(false);

    function handlePrevQuestion() {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }
    function handleNextQuestion() {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    }
    function handleRestart() {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedOptions(new Array(questions.length).fill(null));
        setShowResult(false);
    }
    function handleSelectedOption(optionItem) {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[currentQuestion] = optionItem;
        setSelectedOptions(updatedSelectedOptions);
        console.log(selectedOptions);
        console.log(score);
    }

    return (
        <div className="quiz">
            <div className="title">11. Quiz App </div>
            <div
                className="bg-img"
                style={{ backgroundImage: `url(${bg_img})` }}>
                {!showResult ? (
                    <div className="home-quiz" >
                        <h2>Question {currentQuestion + 1} </h2>
                        <div className="question-container">
                        <p>{questions[currentQuestion].question}</p>
                        </div>
                        <div className="options">
                            {questions[currentQuestion].options.map(
                                (optionItem) => {
                                    return (
                                        <button
                                            key={optionItem}
                                            className={`option ${
                                                selectedOptions[
                                                    currentQuestion
                                                ] === optionItem
                                                    ? "selected"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleSelectedOption(optionItem)
                                            }>
                                            {optionItem}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                        <div className="btn-container">
                            <button
                                onClick={handlePrevQuestion}
                                disabled={currentQuestion === 0}
                                className="prev-btn">
                                Prev
                            </button>
                            <button
                                // disabled={selectedOptions[currentQuestion] === null}
                                onClick={handleNextQuestion}
                                className="next-btn">
                                {currentQuestion < questions.length - 1
                                    ? "Next"
                                    : "Finish"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="result">
                        <h3>Quiz Completed</h3>
                        <p>
                            Your Score:{" "}
                            {selectedOptions.reduce(
                                (acc, selected, index) =>
                                    selected === questions[index].correctAnswer
                                        ? acc + 1
                                        : acc,
                                0
                            )}
                        </p>
                        <button
                            className="restart-button"
                            onClick={handleRestart}>
                            Restart Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
