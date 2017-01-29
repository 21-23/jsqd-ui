import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import CodeBox from 'common/components/code-box/code-box';
import CodeEditor from '../code-editor/code-editor';

import './game-input.styl';

class GameInput extends Component {
    render({ result }) {
        return (
            <div className="game-input">
                <CodeEditor />
                <div className="separator"></div>
                <CodeBox value={result} />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        result: ''
    };
})(GameInput);
