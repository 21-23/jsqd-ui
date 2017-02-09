import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import UserPanel from 'common/components/user-panel/user-panel';

class GameApp extends Component {
    render({ userName, userRole, rounds, currentRoundIndex }) {
        return (
            <div className="game-master-view">
                <UserPanel displayName={userName} role={userRole} />
                <div className="view-content">
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        userName: state.userInfo.displayName,
        userRole: state.userInfo.role,
    };
})(GameApp);
