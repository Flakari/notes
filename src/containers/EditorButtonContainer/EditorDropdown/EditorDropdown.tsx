interface PropTypes {
    options: any[];
    fn: any;
    type: string;
    default: string;
}

const EditorDropdown = (props: PropTypes) => {
    return (
        <select aria-label={props.type.toLowerCase()} value={props.default}>
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
