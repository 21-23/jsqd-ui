import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';

import './game-controls.styl';

class GameControls extends Component {
    render() {
        return (
            <div className="game-controls">
                <button className="game-control start" onClick={() => {}}>Start</button>
                <button className="game-control stop" onClick={() => {}}>Stop</button>
            </div>
        );
    }
}

export default GameControls;
