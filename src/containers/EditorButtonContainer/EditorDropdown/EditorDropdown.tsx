import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { EditorState } from 'draft-js';

interface PropTypes {
    options: any[];
    fn: any;
    type: string;
    default: string;
    editorState: EditorState;
    styleType: string;
}

const EditorDropdown = (props: PropTypes) => {
    const [value, setValue] = useState(props.default);
    const [selection, setSelection] = useState(props.editorState.getSelection());

    const setSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    };

    const checkInlineStyles = useCallback((editorState: EditorState) => {
        for (let option of props.options) {
            // Currently font size is the only inline dropdown
            if (editorState.getCurrentInlineStyle().has(`${option}-FONTSIZE`)) {
                setValue(option);
                return;
            } else {
                setValue(props.default);
            }
        }
    }, [props.options, props.default]);

    const checkBlockStyles = useCallback((editorState: EditorState, selection: any) => {
        const anchorKey = editorState.getCurrentContent().getBlockForKey(selection.getAnchorKey());
        for (let option of props.options) {
            if (anchorKey && anchorKey.getType() === option) {
                setValue(option);
                return;
            } else {
                setValue('');
            }
        }
    }, [props.options]);

    useEffect(() => {
        checkInlineStyles(props.editorState);
        setSelection(props.editorState.getSelection());
    }, [props.editorState, checkInlineStyles]);

    useEffect(() => {
        if (props.styleType === 'block') checkBlockStyles(props.editorState, selection);
    }, [selection, props.editorState, checkBlockStyles, props.styleType]);


    return (
        <select aria-label={props.type.toLowerCase()} value={value} onChange={setSelectValue}>
            <option value=''>---</option>
            {props.options.map(selectOption => {
                return <option
                    key={selectOption}
                    onClick={() => props.fn(selectOption)}
                    value={selectOption}
                >{selectOption}</option>
            })}
        </select>
    );
};

export default EditorDropdown;
