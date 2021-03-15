interface PropTypes {
    options: any[];
    fn: any
}

const EditorDropdown = (props: PropTypes) => {
    return (
        <select>
            {props.options.map(selectOption => {
                return <option key={selectOption} onClick={() => props.fn(selectOption)} value={selectOption}>{selectOption}</option>
            })}
        </select>
    );
};

export default EditorDropdown;
