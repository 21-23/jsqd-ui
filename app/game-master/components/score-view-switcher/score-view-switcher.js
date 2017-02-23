import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { switchScoreView } from '../../action-creators/view-state';

import './score-view-switcher.styl';

function getClasses(visibleScore) {
    return {
        'score-view-switcher': true,
        [`-${visibleScore}`]: true
    };
}

class ScoreViewSwitcher extends Component {
    render({ dispatch, visibleScore }) {
        return (
            <button className={getClasses(visibleScore)} onClick={bindActionCreators(switchScoreView, dispatch)}></button>
        );
    }
}

export default connect()(ScoreViewSwitcher);
