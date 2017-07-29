import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import GameProgress from 'common/components/game-progress/game-progress';
import Timer from 'common/components/timer/timer';
import Puzzle from 'common/components/puzzle/puzzle';
import PlaceholderCountdown from 'common/components/placeholder-countdown/placeholder-countdown';
import { SolutionCorrect } from 'common/constants/solution';
import GameInput from '../game-input/game-input';


function chooseTaskPlaceholder(phase, input,expected, countdownRemaining) {
    if (phase === 'countdown') {
        return <PlaceholderCountdown value={countdownRemaining}/>;
    }

    return <Puzzle input={input} expected={expected}/>;
}

function calculateTimerValue(correct, solutionTime, remaining) {
    if (correct === SolutionCorrect.CORRECT) {
        return solutionTime;
    }

    return remaining;
}

export default class ViewContent extends Component {
    render({ puzzles, round, roundIndex }) {
        const {
            remaining,
            duration,
            name,
            input,
            expected,
            phase,
            countdownRemaining,
            solutionTime,
            correct
        } = round;

        const taskPlaceholder = chooseTaskPlaceholder(phase, input, expected, countdownRemaining);

        return (
            <div className="view-content">
                <GameProgress rounds={puzzles} currentRoundIndex={roundIndex}/>
                <div className="round-header">
                    <div className="round-name">{name}</div>
                    <Timer radius={30} strokeWidth={3} value={calculateTimerValue(correct, solutionTime, remaining)}
                        maxValue={duration} cssClasses={[correct]} />
                </div>
                {taskPlaceholder}
                <GameInput />
            </div>
        );
    }
}
