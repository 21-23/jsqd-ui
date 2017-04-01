import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { startRound, stopRound } from '../../action-creators/round';

import './game-controls.styl';

class GameControls extends Component {
    render({ startRound, stopRound }) {
        return (
            <div className="game-controls">
                <button className="game-control start" onClick={startRound}>Start</button>
                <button className="game-control stop" onClick={stopRound}>Stop</button>
            </div>
        );
    }
}

export default connect(null, {
    startRound,
    stopRound,
})(GameControls);
