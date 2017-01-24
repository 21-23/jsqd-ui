import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import UserPanel from 'common/components/user-panel/user-panel';

class GameApp extends Component {
    render({ userPanel }) {
        return (
            <UserPanel {...userPanel} />
        );
    }
}

export default connect((state) => {
    return {
        userPanel: state.userPanel
    };
})(GameApp);
