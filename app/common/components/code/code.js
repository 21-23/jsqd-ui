import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import './code.styl';

import { h, Component } from 'preact';
import CodeMirror from 'codemirror';
import Beautifier from 'js-beautify';

//imports specific language mode for editor
import 'codemirror/mode/javascript/javascript';

export default class Code extends Component {
    componentDidMount() {
        const config = {
            mode: 'javascript',
            handleMouseEvents: false,
            scrollbarStyle: null,
            lint: true,
            indentUnit: 4,
            readOnly: true,
        };
        Object.assign(config, this.props.config);

        this.codeBlock = CodeMirror.fromTextArea(this.textarea, config);
        this.setCode(this.props.value);
    }

    componentDidUpdate() {
        if (this.value !== this.props.value) {
            this.setCode(this.props.value);
        }
    }

    setCode(value = '') {
        this.value = Beautifier.js_beautify(value);
    }

    get value() {
        return this.codeBlock.getValue();
    }

    set value(value) {
        this.codeBlock.getDoc().setValue(value);
    }

    render() {
        return (
            <div className="codemirror-code">
                { /* preact doesn't support refs */}
                <textarea readOnly ref={ component => this.textarea = component }/>
            </div>
        );
    }
}
