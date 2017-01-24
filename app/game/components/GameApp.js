import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import UserPanel from 'common/components/user-panel/user-panel';
import CodeEditor from './code-editor/code-editor';
import CodeBox from 'common/components/code-box/code-box';

//DATA FOR TEST
const CONTENT = [
    { name: 'Johnie', surname: 'Walker', age: 14 },
    { name: 'Johnie', surname: 'Walker', age: 20 },
    { name: 'Adam', surname: 'Smith', age: 99 },
    { name: 'Jack', surname: 'Daniels', age: 18 },
];

class GameApp extends Component {
    render({ userPanel }) {
        return (
            <div>
                <UserPanel {...userPanel} />
                <div className='flex-justify-center'>
                    <CodeBox value={JSON.stringify(CONTENT)}/>
                    <CodeBox value={CodeEditor.toString()}/>
                </div>
                <CodeEditor/>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        userPanel: state.userPanel
    };
})(GameApp);
