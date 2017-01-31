import { h } from 'preact';

import './overlay-welcome.styl';

export default function OverlayWelcome() {
    return (
        <div className="overlay welcome">
            <div className="container">
                <div className="square top left"></div>
                <div className="square top right"></div>
                <div className="square bottom right"></div>
                <div className="square bottom left"></div>
            </div>
        </div>
    );
}
