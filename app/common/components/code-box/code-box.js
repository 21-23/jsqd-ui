import { h, Component } from 'preact';
import CodeMirror from 'codemirror';
import Beautifier from 'js-beautify';

import 'codemirror/lib/codemirror.css';
import 'common/styles/code-theme.styl';
import './code-box.styl';

//imports specific language mode for code-box
import 'codemirror/mode/javascript/javascript';

export default class CodeBox extends Component {
    componentDidMount() {
        const config = {
            mode: 'javascript',
            handleMouseEvents: false,
            scrollbarStyle: null,
            lint: true,
            indentUnit: 4,
            readOnly: true,
            lineNumbers: false,
            theme: 'lodash',
        };
        Object.assign(config, this.props.config);

        this.codeBox = CodeMirror.fromTextArea(this.textarea, config);
        this.setCode(this.props.value);
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.value !== nextProps.value) {
            this.setCode(nextProps.value);
        }
    }

    formatValue(value) {
        if (!value) {
            return '';
        } else if (typeof value === 'string') {
            return value;
        } else if (value instanceof Error) {
            return value.toString();
        }

        return JSON.stringify(value);
    }

    setCode(value = '') {
        this.value = value;

        const formattedCode = this.formatValue(value);
        this.setValue(Beautifier.js_beautify(formattedCode));
    }

    getValue() {
        return this.codeBox.getValue();
    }

    setValue(value) {
        this.codeBox.getDoc().setValue(value);
    }

    render() {
        return (
            <div className="code-box">
                <textarea readOnly ref={ component => this.textarea = component }/>
            </div>
        );
    }
}
