import Tooltip from "./index";
import "./Tooltip.css";

export default function TooltipTest() {
    let q = "you no bugs, just hugs 🐛❤️";
    return (
        <div className="main-wrapper">
            <h1 className="title tool-title">5. ToolTip Component</h1>
            <div className="main">
                <Tooltip delay={600} content={q} children={"Hover me !"} />
            </div>
        </div>
    );
}
