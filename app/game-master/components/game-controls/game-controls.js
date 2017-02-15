import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { startRound, stopRound } from '../../action-creators/round';

import './game-controls.styl';

function onButtonClick(action) {
    action();
}

class GameControls extends Component {
    render({ dispatch }) {
        return (
            <div className="game-controls">
                <button className="game-control start" onClick={onButtonClick.bind(null, bindActionCreators(startRound, dispatch))}>Start</button>
                <button className="game-control stop" onClick={onButtonClick.bind(null, bindActionCreators(stopRound, dispatch))}>Stop</button>
            </div>
        );
    }
}

export default connect()(GameControls);
