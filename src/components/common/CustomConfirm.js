import React from 'react';
import { Confirm } from "semantic-ui-react";

const CustomConfirm = props => {
    return(
        <Confirm
        open={props.open}
        onCancel={props.onCancel}
        onConfirm={props.onConfirm}
        size={props.size}
        content={props.content}/>
    );
}

export default CustomConfirm;