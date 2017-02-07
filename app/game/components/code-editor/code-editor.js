import { h, Component } from 'preact';
import CodeMirror from 'codemirror';
import { isNewLineEvent, isValidSymbol } from './helpers';

//imports specific language mode for codeEditor
import 'codemirror/mode/javascript/javascript';
//imports addons for hinting/autocomplete
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'common/styles/code-theme.styl';
import './code-editor.styl';

//TODO: Fix autocomplete issues
export default class CodeEditor extends Component {
    constructor(props) {
        super(props);

        this.boundOnChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const config = {
            mode: 'javascript',
            lineNumbers: true,
            scrollbarStyle: null,
            autofocus: true,
            lint: true,
            indentUnit: 4,
            theme: 'lodash',
        };
        Object.assign(config, this.props.config);
        this.codeEditor = CodeMirror.fromTextArea(this.textarea, config);

        this.codeEditor.on('change', this.boundOnChange);
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentRoundIndex !== nextProps.currentRoundIndex) {
            const doc = this.codeEditor.getDoc();
            doc.setValue('');
        }
    }

    componentWillUnmount() {
        this.codeEditor.off('change', this.boundOnChange);
        this.boundOnChange = null;
        this.codeEditor = null;
    }

    onChange(editor, event) {
        const isValidChange = event.origin !== 'complete';
        const isNewLine = isNewLineEvent(event);
        const isValidChar = isValidSymbol(event.text[0]);
        const value = editor.getValue();

        if (this.props.enableAutocomplete && isValidChange && !isNewLine && isValidChar) {
            CodeMirror.commands.autocomplete(editor, null, { completeSingle: false });
        }

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value, event);
        }
    }

    render() {
        return (
            <div className="code-editor">
                { /* preact doesn't support refs */}
                <textarea ref={ component => this.textarea = component } readOnly/>
            </div>

        );
    }
}
