import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { formatScoreTime } from 'common/utils/formatters';
import { SolutionCorrect } from 'common/constants/solution';

import { openParticipantInputPopUp } from '../../action-creators/view-state';

import './round-score.styl';

function onEntryClick(entry, openParticipantInputPopUp) {
    openParticipantInputPopUp(entry);
}

function generateEntries(score, openParticipantInputPopUp) {
    return score.map((entry) => {
        const rootClasses = {
            'score-entry': true,
            '-solved': entry.correct === SolutionCorrect.CORRECT,
            '-partial': entry.correct === SolutionCorrect.PARTIAL,
        };
        return (
            // TODO: event delegation
            <div key={entry.participantId} className={rootClasses} onClick={onEntryClick.bind(null, entry, openParticipantInputPopUp)}>
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

class RoundScore extends Component {
    render({ score, openParticipantInputPopUp }) {
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
                    {generateEntries(score, openParticipantInputPopUp)}
                </div>
            </div>
        );
    }
}

export default connect(null, {
    openParticipantInputPopUp
})(RoundScore);
