import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import Rnd from 'react-rnd';

import UserPanel from 'common/components/user-panel/user-panel';

import GameProgress from 'common/components/game-progress/game-progress';
import OverlayWelcome from 'common/components/overlay-welcome/overlay-welcome';
import RoundScore from './round-score/round-score';
import AggregateScore from './aggregate-score/aggregate-score';
import ScoreViewSwitcher from './score-view-switcher/score-view-switcher';
import TaskColumn from './task-column/task-column';
import ParticipantInput from './participant-input/participant-input';

import { selectRound } from '../action-creators/round';
import { closeParticipantInputPopUp } from '../action-creators/view-state';

const RND_DEFAULT = {
    x: 100,
    y: 0,
    width: 500,
    height: 300,
};

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

function renderParticipantInputPopUps(popUps, closeParticipantInputPopUp) {
    return popUps.map((popUp, index) => {
        const rndDefault = Object.assign({}, RND_DEFAULT, {
            y: RND_DEFAULT.y + 40 * index,
            x: RND_DEFAULT.x + 40 * index,
        });

        return (
            <Rnd
                default={rndDefault}
                minWidth={200}
                minHeight={120}
                key={popUp.participantId}
                className="participant-input-pop-up"
                // TODO: codeBox.refresh();
                // onResize={() => { ??? }}
            >
                <button className="close-pop-up" onClick={() => { closeParticipantInputPopUp(popUp.participantId); }}></button>
                <ParticipantInput input={popUp} />
            </Rnd>
        );
    });
}

class GameMasterApp extends Component {
    render({ participant, session, currentRound, score, visibleScore, participantPopUps, selectRound, closeParticipantInputPopUp }) {
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
                                  onSelect={selectRound}
                    />
                    <div className="main-content">
                        <TaskColumn round={currentRound} />
                        <div className={getScoresClasses(visibleScore)}>
                            <RoundScore score={roundScore} />
                            <AggregateScore score={aggregateScore} />
                        </div>
                    </div>
                    <ScoreViewSwitcher visibleScore={visibleScore} />
                    {renderParticipantInputPopUps(participantPopUps, closeParticipantInputPopUp)}
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
        participantPopUps: state.participantPopUps,
    };
}, {
    selectRound,
    closeParticipantInputPopUp,
})(GameMasterApp);
