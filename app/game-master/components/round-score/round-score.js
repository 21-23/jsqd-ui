import { h } from 'preact';

import { formatScoreTime } from 'common/utils/formatters';
import { SolutionCorrect } from 'common/constants/solution';

import './round-score.styl';

function generateEntries(score) {
    return score.map((entry) => {
        const rootClasses = {
            'score-entry': true,
            '-solved': entry.correct === SolutionCorrect.CORRECT,
            '-partial': entry.correct === SolutionCorrect.PARTIAL,
        };
        return (
            <div key={entry.participantId} className={rootClasses}>
                <div className="-name">{entry.displayName}</div>
                <div className="-time">{formatScoreTime(entry.time, (entry.correct === SolutionCorrect.INCORRECT))}</div>
                <div className="-length">{entry.length}</div>
            </div>
        );
    });
}

function getJoinedCount(score) {
    return score.length;
}

function getSolvedCount(score) {
    return score.reduce((solved, entry) => {
        if (entry.correct === SolutionCorrect.CORRECT) {
            return solved + 1;
        }

        return solved;
    }, 0);
}

export default function RoundScore({ score }) {
    return (
        <div className="round-score">
            <div className="header">
                <div className="stats">
                    <div className="-joined">
                        <div className="value">{getJoinedCount(score)}</div>
                        <div className="meta">
                            <div className="icon"></div>
                            <div className="text">Joined</div>
                        </div>
                    </div>
                    <div className="separator"></div>
                    <div className="-solved">
                        <div className="value">{getSolvedCount(score)}</div>
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
