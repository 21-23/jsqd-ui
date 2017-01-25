import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import UserPanel from 'common/components/user-panel/user-panel';

import GameProgress from 'common/components/game-progress/game-progress';
import Timer from 'common/components/timer/timer';
import CodeEditor from './code-editor/code-editor';
import CodeBox from 'common/components/code-box/code-box';

//DATA FOR TEST
const CONTENT = [
    { name: 'Johnie', surname: 'Walker', age: 14 },
    { name: 'Johnie', surname: 'Walker', age: 20 },
    { name: 'Adam', surname: 'Smith', age: 99 },
    { name: 'Jack', surname: 'Daniels', age: 18 },
];

class GameApp extends Component {

    render({ userPanel, rounds, currentRoundIndex, roundRemaining, roundDuration }) {
        return (
            <div>
                <UserPanel {...userPanel} />
                <GameProgress rounds={rounds} currentRoundIndex={currentRoundIndex} />
                <Timer radius={50} strokeWidth={5} value={roundRemaining} maxValue={roundDuration}  />
                <div>
                    <div className="puzzle">
                        <CodeBox value={Component.toString()}/>
                        <CodeBox value={JSON.stringify([1, 2, 3, 4, 5])}/>
                    </div>
                    <div className="editor">
                        <CodeEditor/>
                        <CodeBox value={JSON.stringify(CONTENT)}/>
                    </div>
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

    };
})(GameApp);
