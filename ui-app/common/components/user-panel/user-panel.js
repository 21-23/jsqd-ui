import { h, Component } from 'preact';

import './user-panel.styl';

export default function UserPanel({ userName }) {
    return (
        <div className="user-panel">
            <div className="logo">Lodash Quick Draw</div>
            <div className="user-info">
                <span className="user-info-logo">&#xf007;</span>
                <span className="user-info-name">{ userName }</span>
            </div>
            <a className="log-out" href="/auth/logout">Log out</a>
        </div>
    );
}
