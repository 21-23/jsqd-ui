import { h } from 'preact';

import './placeholder-countdown.styl';

export default function PlaceholderCountdown({ value }) {
    return (
        <div className="placeholder countdown">
            {value}
        </div>
    );
}
