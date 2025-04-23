import { useState } from "react";

export default function Tooltip({ children, content, delay }) {
    const [isVisible, setIsVisible] = useState(false);
    let timeout;

    function handleShowTooltip() {
        timeout = setTimeout(() => {
            setIsVisible(true);
        }, delay || 500);
    }
    function handleHideTooltip() {
        clearTimeout(timeout);
        setIsVisible(false);
    }

    return (
        <div
            className="tooltip-container"
            onMouseEnter={handleShowTooltip}
            onMouseLeave={handleHideTooltip}>
            <div className="children">
            {children}
            </div>
            {isVisible ? <div className="tooltip">{content}</div> : null}
        </div>
    );
}
