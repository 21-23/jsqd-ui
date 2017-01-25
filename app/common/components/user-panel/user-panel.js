import { h } from 'preact';

import './user-panel.styl';

export default function UserPanel({ iconCharCode, displayName }) {
    return (
        <div className="user-panel">
            <div className="logo">Lodash Quick Draw</div>
            <div className="user-info">
                <span className="user-info-logo">{iconCharCode}</span>
                <span className="user-info-name">{displayName}</span>
            </div>
            <a className="log-out" href="/auth/logout">Log out</a>
        </div>
    );
}
