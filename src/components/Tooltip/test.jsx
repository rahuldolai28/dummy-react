import Tooltip from "./index";
import "./Tooltip.css";

export default function TooltipTest() {
    let q = "You are a very good developer👍";
    return (
        <div>
            <Tooltip
                delay={600}
                content={q}
                children={"Hover me !"}
            />
        </div>
    );
}
