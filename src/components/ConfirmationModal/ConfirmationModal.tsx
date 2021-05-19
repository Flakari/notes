import { SyntheticEvent } from "react";

import classes from './ConfirmationModal.module.css';

interface PropTypes {
    children: string;
    modalClass: string;
    bodyFunction?: (e: SyntheticEvent) => void;
    confirmFunction: (e: SyntheticEvent) => void;
    cancelFunction: (e: SyntheticEvent) => void;
}

const ConfirmationModal = (props: PropTypes) => {
    return (
        <div onClick={props.bodyFunction} className={[classes.ConfirmationModal, props.modalClass].join(' ')}>
            <p>{props.children}</p>
            <button onClick={props.confirmFunction}>Yes</button>
            <button onClick={props.cancelFunction}>No</button>
        </div>
    );
};

export default ConfirmationModal;
