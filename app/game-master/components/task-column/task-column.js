import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import Timer from 'common/components/timer/timer';
import Puzzle from 'common/components/puzzle/puzzle';
import PlaceholderCountdown from 'common/components/placeholder-countdown/placeholder-countdown';
import GameControls from '../game-controls/game-controls';

function chooseTaskPlaceholder(roundPhase, roundInput, roundExpected, countdownRemaining) {
    if (roundPhase === 'countdown') {
        return <PlaceholderCountdown value={countdownRemaining} />;
    }

    return <Puzzle input={roundInput} expected={roundExpected} />;
}

export default class TaskColumn extends Component {
    render({ round }) {
        const {
            phase,
            input,
            expected,
            remaining,
            name,
            duration,
            countdownRemaining,
        } = round;
        const taskPlaceholder = chooseTaskPlaceholder(phase, input, expected, countdownRemaining);

        return (
            <div class="task-column">
                <div className="task-header">
                    <div className="task-controls">
                        <div className="round-name">{name}</div>
                        <GameControls />
                    </div>
                    <Timer radius={40} strokeWidth={5} value={remaining} maxValue={duration} />
                </div>
                {taskPlaceholder}
            </div>

        );
    }
}
