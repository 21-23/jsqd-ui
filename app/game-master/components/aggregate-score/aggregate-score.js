import { h } from 'preact';

import { formatScoreTime } from 'common/utils/formatters';

import './aggregate-score.styl';

function generateEntries(score) {
    return score.map((entry, index) => {
        const rootClasses = {
            'score-entry': true
        };
        return (
            <div key={entry.participantId} className={rootClasses}>
                <div className="-position">{index + 1}</div>
                <div className="-name">{entry.displayName}</div>
                <div className="-time">{formatScoreTime(entry.time)}</div>
            </div>
        );
    });
}

export default function AggregateScore({ score }) {
    return (
        <div className="aggregate-score">
            <div className="list-header">
                <div className="-position">#</div>
                <div className="-name">Name</div>
                <div className="-time">Time</div>
            </div>
            <div className="list-container">
                {generateEntries(score)}
            </div>
        </div>
    );
}
