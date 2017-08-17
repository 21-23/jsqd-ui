import { h } from 'preact';

import './game-progress.styl';

function getMarkClasses(index, currentRoundIndex, isSelectable, selectedRoundIndex) {
    const classes = {
        'mark': true,
        '-past': false,
        '-future': false,
        '-current': false,
        '-selected': false,
    };

    if (index < currentRoundIndex) {
        classes['-past'] = true;
    } else if (index > currentRoundIndex) {
        classes['-future'] = true;
    } else {
        classes['-current'] = true;
    }

    if (isSelectable && index === selectedRoundIndex) {
        classes['-selected'] = true;
    }

    return classes;
}

function getMarkText(index, currentRoundIndex) {
    if (index < currentRoundIndex) {
        return '\uf00c';
    }

    return index + 1;
}

function getProgressFactor(currentRoundIndex, totalRounds) {
    if (currentRoundIndex < 0) {
        return 0;
    }

    return currentRoundIndex / (totalRounds - 1);
}

function getRootClasses(isSelectable) {
    return {
        'game-progress': true,
        '-selectable': isSelectable
    };
}

function onMarkClick(onSelect, index) {
    onSelect(index);

    return false;
}

// TODO: split into several sub-components for faster re-rendering
export default function GameProgress({ rounds, currentRoundIndex, selectedRoundIndex, onSelect }) {
    const isSelectable = (typeof onSelect === 'function');
    const marks = rounds.map((round, index) => {
        return(
            <div onClick={isSelectable ? onMarkClick.bind(null, onSelect, index) : null} className={getMarkClasses(index, currentRoundIndex, isSelectable, selectedRoundIndex)}>{getMarkText(index, currentRoundIndex)}</div>
        );
    });

    return (
        <div className={getRootClasses(isSelectable)}>
            <div className="progress-bar" style={{ transform: `scaleX(${getProgressFactor(currentRoundIndex, rounds.length)})` }}></div>
            <div className="round-mark-container">
                {marks}
            </div>
        </div>
    );
}
