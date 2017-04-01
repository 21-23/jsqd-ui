import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import CodeBox from 'common/components/code-box/code-box';
import CodeEditor from '../code-editor/code-editor';

import { verifySolution } from '../../action-creators/round';

import './game-input.styl';

class GameInput extends Component {
    render({ result, playerInput, currentRoundIndex, verifySolution }) {
        return (
            <div className="game-input">
                <CodeEditor
                    onChange={verifySolution}
                    playerInput={playerInput}
                    currentRoundIndex={currentRoundIndex}
                />
                <div className="separator"></div>
                <CodeBox value={result} />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        result: state.currentRound.solutionResult,
        playerInput: state.currentRound.playerInput,
        currentRoundIndex: state.session.currentRoundIndex,
    };
}, {
    verifySolution,
})(GameInput);
