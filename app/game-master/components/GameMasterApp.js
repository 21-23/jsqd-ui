import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import UserPanel from 'common/components/user-panel/user-panel';

class GameMasterApp extends Component {
    render({ participant }) {
        return (
            <div className="game-master-view">
                <UserPanel displayName={participant.displayName} role={participant.role} />
                <div className="view-content">
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        participant: state.participant,
    };
})(GameMasterApp);
