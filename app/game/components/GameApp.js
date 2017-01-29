import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import UserPanel from 'common/components/user-panel/user-panel';

import GameProgress from 'common/components/game-progress/game-progress';
import Timer from 'common/components/timer/timer';
import GameTask from 'common/components/game-task/game-task';
import GameInput from './game-input/game-input';

class GameApp extends Component {

    render({ userPanel, rounds, currentRoundIndex, roundRemaining, roundDuration, roundName, roundSource, roundTarget }) {
        return (
            <div className="game-view">
                <UserPanel {...userPanel} />
                <div className="view-content">
                    <GameProgress rounds={rounds} currentRoundIndex={currentRoundIndex} />
                    <div className="round-header">
                        <div className="round-name">{roundName}</div>
                        <Timer radius={30} strokeWidth={3} value={roundRemaining} maxValue={roundDuration}  />
                    </div>
                    <GameTask source={roundSource} target={roundTarget} />
                    <GameInput />
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        userPanel: state.userPanel,
        rounds: state.game.rounds,
        currentRoundIndex: state.game.currentRoundIndex,
        roundDuration: state.currentRound.duration,
        roundRemaining: state.currentRound.remaining,
        roundName: state.currentRound.name,
        roundSource: state.currentRound.taskSource,
        roundTarget: state.currentRound.tasktarget
    };
})(GameApp);
