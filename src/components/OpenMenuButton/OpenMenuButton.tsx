import classes from './OpenMenuButton.module.css';

interface PropTypes {
    menuClass: string;
    click: (e: any) => void;
}

const OpenMenuButton = (props: PropTypes) => {
    return (
        <button onClick={props.click} className={[classes.OpenMenuButton, props.menuClass].join(' ')}>
            <svg viewBox="0 0 515.555 515.555" aria-labelledby="menuTitle menuDesc" role="menu">
                <title id="menuTitle">Menu Button</title>
                <desc id="menuDesc">Opens menu for the corresponding item</desc>
                <path d="M303.347 18.875c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 212.209c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0M303.347 405.541c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0" />
            </svg>
        </button>
    );
};

export default OpenMenuButton;
