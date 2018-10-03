import { h } from 'preact';

import './user-panel.styl';

function getLogoClass(role) {
    return {
        'user-info-logo': true,
        [`-${role}`]: true
    };
}

export default function UserPanel({ role, displayName }) {
    return (
        <div className="user-panel">
            <div className="logo">JS Quick Draw</div>
            <div className="user-info">
                <span className={getLogoClass(role)}></span>
                <span className="user-info-name">{displayName}</span>
            </div>
            <a className="log-out" href="/auth/logout">Log out</a>
        </div>
    );
}
