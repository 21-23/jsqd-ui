import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import UserPanel from 'common/components/user-panel/user-panel';

import GameProgress from 'common/components/game-progress/game-progress';
import OverlayWelcome from 'common/components/overlay-welcome/overlay-welcome';
import RoundScore from './round-score/round-score';
import AggregateScore from './aggregate-score/aggregate-score';
import ScoreViewSwitcher from './score-view-switcher/score-view-switcher';
import TaskColumn from './task-column/task-column';

import { selectRound } from '../action-creators/round';

function chooseOverlay(connected) {
    if (!connected) {
        return <OverlayWelcome />;
    }

    return null;
}

function getScoresClasses(visibleScore) {
    return {
        scores: true,
        [`-${visibleScore}`]: true,
    };
}

class GameMasterApp extends Component {
    render({ dispatch, participant, session, currentRound, score, visibleScore }) {
        const {
            connected,
            puzzles,
            currentRoundIndex,
            selectedRoundIndex,
        } = session;
        const roundScore = score.round;
        const aggregateScore = score.aggregate;
        const overlay = chooseOverlay(connected);

        return (
            <div className="game-master-view">
                <UserPanel displayName={participant.displayName} role={participant.role} />
                <div className="view-content">
                    <GameProgress rounds={puzzles}
                                  currentRoundIndex={currentRoundIndex}
                                  selectedRoundIndex={selectedRoundIndex}
                                  onSelect={bindActionCreators(selectRound, dispatch)}
                    />
                    <div className="main-content">
                        <TaskColumn round={currentRound} />
                        <div className={getScoresClasses(visibleScore)}>
                            <RoundScore score={roundScore} />
                            <AggregateScore score={aggregateScore} />
                        </div>
                    </div>
                    <ScoreViewSwitcher visibleScore={visibleScore} />
                </div>
                {overlay}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        participant: state.participant,
        session: state.session,
        currentRound: state.currentRound,
        score: state.score,
        visibleScore: state.viewState.visibleScore,
    };
})(GameMasterApp);
