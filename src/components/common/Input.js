import React from 'react'
import {Form} from 'semantic-ui-react'

const CustFormInput = (props) => {
    return(
    <Form.Input
    onChange={props.onChange}
    name={props.name}
    value={props.value}
    type={props.type}
    fluid={props.fluid}
    icon={props.icon}
    iconPosition={props.iconPosition}
    placeholder={props.placeholder}
    />
);

}
export default CustFormInput;