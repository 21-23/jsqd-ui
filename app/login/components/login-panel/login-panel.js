import { h } from 'preact';

import './login-panel.styl';

export default function LoginPanel({ children }) {
    return (
        <div className="login-panel">{ children }</div>
    );
}
