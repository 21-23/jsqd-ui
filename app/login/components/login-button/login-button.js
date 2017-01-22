import { h } from 'preact';

import './login-button.styl';

export default function LoginButton({ type, path, icon }) {
    return (
        <a href={path} className={`login-button login-${type}`}>{icon}</a>
    );
}
