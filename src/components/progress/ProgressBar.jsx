import { useState } from "react";

export default function ProgressBar(){
    const[activeStep, setActiveStep] = useState(0);
    const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
    return(
        <div className="step-progress-bar-container" >
            <div className="step-buttons-wrapper">
                <button>
                    Previous Step
                </button>
                <button>
                    Next Step
                </button>
            </div>
        </div>
    )
}