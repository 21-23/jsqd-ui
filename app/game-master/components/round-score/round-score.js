import { h } from 'preact';

import './round-score.styl';

export default function RoundScore() {
    return (
        <div className="round-score">
            <div className="header">
                <div className="stats">
                    <div className="-joined">
                        <div className="value">10</div>
                        <div className="meta">
                            <div className="icon"></div>
                            <div className="text">Joined</div>
                        </div>
                    </div>
                    <div className="separator"></div>
                    <div className="-solved">
                        <div className="value">4</div>
                        <div className="meta">
                            <div className="icon"></div>
                            <div className="text">Solved</div>
                        </div>
                    </div>
                </div>
                <div className="list-header">
                    <div className="-name">Name</div>
                    <div className="-time">Time</div>
                    <div className="-length">Length</div>
                </div>
            </div>
            <div className="list-container"></div>
        </div>
    );
}
