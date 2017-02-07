import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import UserPanel from 'common/components/user-panel/user-panel';

import GameProgress from 'common/components/game-progress/game-progress';
import Timer from 'common/components/timer/timer';
import GameTask from 'common/components/game-task/game-task';
import OverlayWelcome from 'common/components/overlay-welcome/overlay-welcome';
import PlaceholderCountdown from 'common/components/placeholder-countdown/placeholder-countdown';
import GameInput from './game-input/game-input';

function chooseOverlay(connected) {
    if (!connected) {
        return <OverlayWelcome />;
    }

    return null;
}

function chooseTaskPlaceholder(roundPhase, roundSource, roundTarget, countdownRemaining) {
    if (roundPhase === 'countdown') {
        return <PlaceholderCountdown value={countdownRemaining} />;
    }

    return <GameTask source={roundSource} target={roundTarget} />;
}

class GameApp extends Component {
    render({ userName, userRole, rounds, currentRoundIndex, connected, roundRemaining, roundDuration, roundName, roundSource, roundTarget, roundPhase, countdownRemaining }) {
        const overlay = chooseOverlay(connected);
        const taskPlaceholder = chooseTaskPlaceholder(roundPhase, roundSource, roundTarget, countdownRemaining);

        return (
            <div className="game-view">
                <UserPanel displayName={userName} role={userRole} />
                <div className="view-content">
                    <GameProgress rounds={rounds} currentRoundIndex={currentRoundIndex} />
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
        userName: state.userInfo.displayName,
        userRole: state.userInfo.role,
        rounds: state.game.rounds,
        currentRoundIndex: state.game.currentRoundIndex,
        connected: state.game.connected,
        roundDuration: state.currentRound.duration,
        roundRemaining: state.currentRound.remaining,
        roundName: state.currentRound.name,
        roundSource: state.currentRound.taskSource,
        roundTarget: state.currentRound.taskTarget,
        roundPhase: state.currentRound.phase,
        countdownRemaining: state.currentRound.countdownRemaining
    };
})(GameApp);
