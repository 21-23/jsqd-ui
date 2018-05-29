import { h, render } from 'preact';

import './login-styles.styl';
import 'common/styles/reset.styl';

import LoginPanel from './components/login-panel/login-panel';
import LoginButton from './components/login-button/login-button';

render((
    <div className="login-view">
        <LoginPanel>
            <LoginButton type="github" path="/auth/github" icon="&#xf09b;" />
            {/* <LoginButton type="facebook" path="/auth/facebook" icon="&#xf09a;" /> */}
            <LoginButton type="twitter" path="/auth/twitter" icon="&#xf099;" />
            <LoginButton type="google" path="/auth/google" icon="&#xf0d5;" />
            <LoginButton type="qd-auto" path="/auth/qd-auto" icon="&#xf1c0;" />
        </LoginPanel>
    </div>
), document.body);
