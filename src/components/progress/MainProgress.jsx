import ProgressBar from "./ProgressBar";
import { useState } from "react";

export default function MainProgress() {
    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];
    return (
        <div className="step-progress-bar-container">
            <h3>Step Progress Bar</h3>
            <ProgressBar
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
            />
        </div>
    );
}
