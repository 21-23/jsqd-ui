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
        const defaultConfig = {
            mode: 'javascript',
            lineNumbers: true,
            scrollbarStyle: null,
            autofocus: true,
            lint: true,
            indentUnit: 4,
            theme: 'lodash',
        };
        const { config, playerInput, isReadOnly } = this.props;
        const selectedConfig = Object.assign({}, defaultConfig, config);

        this.codeEditor = CodeMirror.fromTextArea(this.textarea, selectedConfig);
        this.codeEditor.on('change', this.boundOnChange);
        this.codeEditor.getDoc().setValue(playerInput);
        this.setReadOnly(isReadOnly);
    }

    shouldComponentUpdate() {
        return false;
    }

    setReadOnly(isReadOnly) {
        this.codeEditor.setOption('readOnly', isReadOnly);
        if (isReadOnly) {
            this.wrapper.classList.add('readonly');
        } else {
            this.wrapper.classList.remove('readonly');
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            isReadOnly,
            playerInput,
            currentRoundIndex,
        } = nextProps;

        if (this.props.isReadOnly !== isReadOnly) {
            this.setReadOnly(isReadOnly);
        }

        if (this.props.currentRoundIndex !== currentRoundIndex) {
            const doc = this.codeEditor.getDoc();
            doc.setValue(playerInput || '');
        } else if (this.codeEditor.getValue() !== playerInput) {
            const doc = this.codeEditor.getDoc();
            doc.setValue(playerInput);
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
        const baseEditorClass = 'code-editor';
        const editorClass = this.props.isReadOnly ? `${baseEditorClass} readonly` : baseEditorClass;

        return (
            <div ref={ elem => this.wrapper = elem } className={editorClass}>
                <textarea ref={ elem => this.textarea = elem } readOnly/>
            </div>

        );
    }
}
