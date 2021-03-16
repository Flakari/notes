import { useState, ChangeEvent } from 'react';

interface PropTypes {
    options: any[];
    fn: any;
    type: string;
    default: string;
}

const EditorDropdown = (props: PropTypes) => {
    const [value, setValue] = useState(props.default);

    const setSelectValue = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    };

    return (
        <select aria-label={props.type.toLowerCase()} value={value} onChange={setSelectValue}>
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
