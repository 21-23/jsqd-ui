import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import UserPanel from 'common/components/user-panel/user-panel';
import OverlayWelcome from 'common/components/overlay-welcome/overlay-welcome';
import ViewContent from './view-content/view-content';

class GameApp extends Component {
    render({ participant, connected, puzzles, currentRound, currentRoundIndex }) {
        const main = (
            <div>
                <UserPanel displayName={participant.displayName} role={participant.role} />
                <ViewContent puzzles={puzzles} round={currentRound} roundIndex={currentRoundIndex}/>
            </div>
        );
        const overlay = <OverlayWelcome />;

        return (
            <div className="game-view">
                {connected ? main : overlay}
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
        currentRound: state.currentRound
    };
})(GameApp);
