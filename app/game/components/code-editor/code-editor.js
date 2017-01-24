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
    componentDidMount() {
        const config = {
            mode: 'javascript',
            lineNumbers: true,
            scrollbarStyle: null,
            autofocus: true,
            lint: true,
            indentUnit: 4,
            theme: 'monokai',
        };
        Object.assign(config, this.props.config);
        this.codeEditor = CodeMirror.fromTextArea(this.textarea, config);

        // beta autocomplete. off by default
        if (this.props.enableAutocomplete) {
            this.codeEditor.on('change', this.onChange.bind(this));
        }
    }

    componentDidUpdate() {
        if (this.value !== this.props.value) {
            this.value = this.props.value;
        }
    }

    componentWillUnmount() {
        if (this.props.enableAutocomplete) {
            this.codeEditor.off('change', this.onChange.bind(this));
        }
    }

    onChange(editor, event) {
        const isValidChange = event.origin !== 'complete';
        const isNewLine = isNewLineEvent(event);
        const isValidChar = isValidSymbol(event.text[0]);

        if (isValidChange && !isNewLine && isValidChar) {
            CodeMirror.commands.autocomplete(editor, null, { completeSingle: false });
        }

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event, this.value);
        }
    }

    get value() {
        return this.codeEditor.getValue();
    }

    set value(value) {
        this.codeEditor.getDoc().setValue(value);
    }

    render() {
        return (
            <div className="code-editor">
                { /* preact doesn't support refs */}
                <textarea ref={ component => this.textarea = component } value={this.props.value} readOnly/>
            </div>

        );
    }
}
