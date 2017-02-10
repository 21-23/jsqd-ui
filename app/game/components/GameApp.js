import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import UserPanel from 'common/components/user-panel/user-panel';

import GameProgress from 'common/components/game-progress/game-progress';
import Timer from 'common/components/timer/timer';
import Puzzle from 'common/components/puzzle/puzzle';
import OverlayWelcome from 'common/components/overlay-welcome/overlay-welcome';
import PlaceholderCountdown from 'common/components/placeholder-countdown/placeholder-countdown';
import GameInput from './game-input/game-input';

function chooseOverlay(connected) {
    if (!connected) {
        return <OverlayWelcome />;
    }

    return null;
}

function chooseTaskPlaceholder(roundPhase, roundInput, roundExpected, countdownRemaining) {
    if (roundPhase === 'countdown') {
        return <PlaceholderCountdown value={countdownRemaining} />;
    }

    return <Puzzle input={roundInput} expected={roundExpected} />;
}

class GameApp extends Component {
    render({ participant, connected, puzzles, currentRoundIndex, roundRemaining, roundDuration, roundName, roundInput, roundExpected, roundPhase, countdownRemaining }) {
        const overlay = chooseOverlay(connected);
        const taskPlaceholder = chooseTaskPlaceholder(roundPhase, roundInput, roundExpected, countdownRemaining);

        return (
            <div className="game-view">
                <UserPanel displayName={participant.displayName} role={participant.role} />
                <div className="view-content">
                    <GameProgress rounds={puzzles} currentRoundIndex={currentRoundIndex} />
                    <div className="round-header">
                        <div className="round-name">{roundName}</div>
                        <Timer radius={30} strokeWidth={3} value={roundRemaining} maxValue={roundDuration}  />
                    </div>
                    {taskPlaceholder}
                    <GameInput />
                </div>
                {overlay}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        participant: state.participant,
        connected: state.session.connected,
        puzzles: state.session.puzzles,
        currentRoundIndex: state.session.currentRoundIndex,
        roundName: state.currentRound.name,
        roundRemaining: state.currentRound.remaining,
        roundDuration: state.currentRound.duration,
        roundPhase: state.currentRound.phase,
        roundInput: state.currentRound.input,
        roundExpected: state.currentRound.expected,
        countdownRemaining: state.currentRound.countdownRemaining,
    };
})(GameApp);
