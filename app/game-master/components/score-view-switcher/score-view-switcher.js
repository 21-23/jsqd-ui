import { h, Component } from 'preact';
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
    render({ visibleScore, switchScoreView }) {
        return (
            <button className={getClasses(visibleScore)} onClick={switchScoreView}></button>
        );
    }
}

export default connect(null, {
    switchScoreView,
})(ScoreViewSwitcher);
