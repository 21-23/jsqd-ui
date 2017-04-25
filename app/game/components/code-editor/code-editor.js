import { h, Component } from 'preact';
import CodeMirror from 'codemirror';
import { isNewLineEvent, isValidSymbol } from './helpers';
import config from '../../config.json';

//imports specific language mode for codeEditor
import 'codemirror/mode/javascript/javascript';
//imports addons for hinting/autocomplete
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'common/styles/code-theme.styl';
import './code-editor.styl';

const TEXT_LIMIT = config['user-input']['limit'] || Infinity;

//TODO: Fix autocomplete issues
export default class CodeEditor extends Component {
    constructor(props) {
        super(props);
        this.boundOnChange = this.onChange.bind(this);
        this.boundOnBeforeChange = this.onBeforeChange.bind(this);
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
        this.codeEditor.on('beforeChange', this.boundOnBeforeChange);
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

    limitInput(input) {
        return input.substring(0, TEXT_LIMIT);
    }

    componentWillReceiveProps(nextProps) {
        const { isReadOnly } = nextProps;
        let { playerInput } = nextProps;

        if (this.props.isReadOnly !== isReadOnly) {
            this.setReadOnly(isReadOnly);
        }

        playerInput = this.limitInput(playerInput);

        if (this.codeEditor.getValue() !== playerInput) {
            const doc = this.codeEditor.getDoc();
            doc.setValue(playerInput);
        }
    }

    componentWillUnmount() {
        this.codeEditor.off('change', this.boundOnChange);
        this.codeEditor.off('beforeChange', this.boundOnBeforeChange);
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

    onBeforeChange(editor, event) {
        const valueLength = editor.getValue().length;
        const textLength = event.text.join(editor.lineSeparator()).length;

        if ((valueLength + textLength) > TEXT_LIMIT) {
            event.canceled = true;
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
