import { h } from 'preact';

import './round-score.styl';

function generateEntries(score) {
    return score.map((entry) => {
        const rootClasses = {
            'score-entry': true,
            '-solved': entry.correct
        };
        return (
            <div key={entry.participantId} className={rootClasses}>
                <div className="-name">{entry.displayName}</div>
                <div className="-time">{entry.time}</div>
                <div className="-length">{entry.length}</div>
            </div>
        );
    });
}

export default function RoundScore({ score }) {
    return (
        <div className="round-score">
            <div className="header">
                <div className="stats">
                    <div className="-joined">
                        <div className="value">10</div>
                        <div className="meta">
                            <div className="icon"></div>
                            <div className="text">Joined</div>
                        </div>
                    </div>
                    <div className="separator"></div>
                    <div className="-solved">
                        <div className="value">4</div>
                        <div className="meta">
                            <div className="icon"></div>
                            <div className="text">Solved</div>
                        </div>
                    </div>
                </div>
                <div className="list-header">
                    <div className="-name">Name</div>
                    <div className="-time">Time</div>
                    <div className="-length">Length</div>
                </div>
            </div>
            <div className="list-container">
                {generateEntries(score)}
            </div>
        </div>
    );
}
