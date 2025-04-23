import { useState } from "react";

export default function ProgressBar({ steps, activeStep, setActiveStep }) {
    function handlePreviousStep() {
        setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    }
    function handleNextStep() {
        setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    }

    function calculateCurrentStepWidth() {
        return `${(100 / (steps.length - 1)) * activeStep} %  `;
    }

    return (
        <div>
            <div className="steps">
                {steps && steps.length > 0
                    ? steps.map((stepItem, index) => (
                          <div
                              style={{ width: calculateCurrentStepWidth() }}
                              key={index}>
                              {stepItem}
                              {console.log(calculateCurrentStepWidth())}
                          </div>
                      ))
                    : null}
            </div>
            <div className="step-buttons-wrapper">
                <button
                    disabled={activeStep === 0}
                    onClick={handlePreviousStep}>
                    Previous Step
                </button>
                <button onClick={handleNextStep}>Next Step</button>
            </div>
        </div>
    );
}
