import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import CodeBox from 'common/components/code-box/code-box';
import CodeEditor from '../code-editor/code-editor';

import { verifyUserSolution } from '../../action-creators/puzzle-flow';

import './game-input.styl';

class GameInput extends Component {
    render({ result, dispatch, currentRoundIndex }) {
        return (
            <div className="game-input">
                <CodeEditor onChange={bindActionCreators(verifyUserSolution, dispatch)} currentRoundIndex={currentRoundIndex} />
                <div className="separator"></div>
                <CodeBox value={result} />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        result: state.currentRound.currentSolutionResult,
        currentRoundIndex: state.game.currentRoundIndex,
    };
})(GameInput);
