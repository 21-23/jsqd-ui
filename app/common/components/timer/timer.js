import { h } from 'preact';

import './timer.styl';

function formatValue(value) {
    let seconds = value;
    const minutes = seconds >= 60 ? ((seconds / 60) | 0) : 0;

    seconds = seconds - (60 * minutes);
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
}

function calculateDashArray(value, maxValue, maxDashArray) {
    const remainingPercent = value / maxValue;

    return maxDashArray - Math.round(remainingPercent * maxDashArray);
}

export default function Timer({ value, maxValue, radius, strokeWidth }) {
    const size = 2 * (radius + strokeWidth);
    const sizePx = `${size}px`;
    const centerCoord = size / 2;
    const maxDashArray = Math.round(2 * Math.PI * radius);

    return (
        <div className="timer" style={{ width: sizePx, height: sizePx }}>
            <div className="time-text">{formatValue(value)}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} className="circle-container">
                <circle
                    class="circle-elapsed"
                    cx={centerCoord}
                    cy={centerCoord}
                    r={radius}
                    fill="none"
                    stroke-width={strokeWidth - 1}
                />
                <circle
                    class="circle-remaining"
                    cx={centerCoord}
                    cy={centerCoord}
                    r={radius}
                    fill="none"
                    stroke-width={strokeWidth}
                    stroke-linecap="round"
                    stroke-dasharray={maxDashArray}
                    style={{
                        'stroke-dashoffset': calculateDashArray(value, maxValue, maxDashArray),
                        transition: value === maxValue ? 'none' : null
                    }}
                />
            </svg>
        </div>
    );
}
