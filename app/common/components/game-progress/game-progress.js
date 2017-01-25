import { h } from 'preact';

import './game-progress.styl';

function getMarkClass(index, currentRoundIndex) {
    if (index < currentRoundIndex) {
        return '-past';
    }

    if (index > currentRoundIndex) {
        return '-future';
    }

    return '-current';
}

function getMarkText(index, currentRoundIndex) {
    if (index < currentRoundIndex) {
        return '\uf00c';
    }

    return index + 1;
}

function getProgressFactor(currentRoundIndex, totalRounds) {
    return currentRoundIndex / (totalRounds - 1);
}

// TODO: split into several sub-components for faster re-rendering
export default function GameProgress({ rounds, currentRoundIndex }) {
    const marks = rounds.map((round, index) => {
        return(
            <div className={getMarkClass(index, currentRoundIndex)}>{getMarkText(index, currentRoundIndex)}</div>
        );
    });

    return (
        <div className="game-progress">
            <div className="progress-bar" style={{ transform: `scaleX(${getProgressFactor(currentRoundIndex, rounds.length)})` }}></div>
            <div className="round-mark-container">
                {marks}
            </div>
        </div>
    );
}
