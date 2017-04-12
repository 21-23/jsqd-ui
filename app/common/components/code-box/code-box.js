import { h, Component } from 'preact';
import CodeMirror from 'codemirror';
import { js_beautify as beautify } from 'js-beautify';

import 'codemirror/lib/codemirror.css';
import 'common/styles/code-theme.styl';
import './code-box.styl';

//imports specific language mode for code-box
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/scroll/simplescrollbars';

const BEAUTIFYER_DEFAULT_CONFIG = {
    indent_size: 4,
    indent_char: " ",
    indent_with_tabs: false,
    //wrap_line_length: 80, //WTF with primitive arrays formatting
};

const CODE_BOX_DEFAULT_CONFIG = {
    mode: 'javascript',
    handleMouseEvents: false,
    scrollbarStyle: "overlay",
    lint: true,
    indentUnit: 4,
    readOnly: true,
    lineNumbers: false,
    theme: 'lodash',
};

export default class CodeBox extends Component {
    componentDidMount() {
        const { config = {}, beautifyerConfig = {} } = this.props;
        const codeBoxOptions = Object.assign({}, CODE_BOX_DEFAULT_CONFIG, config);

        this.beautifyerOptions = Object.assign({}, BEAUTIFYER_DEFAULT_CONFIG, beautifyerConfig);
        this.codeBox = CodeMirror.fromTextArea(this.textarea, codeBoxOptions);

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
        this.setValue(beautify(formattedCode, this.beautifyerOptions));
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
