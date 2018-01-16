import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import CustFormInput from '../common/Input';


const ShoppinglistForm = props => {
        let button_text_name = props.isEditClicked ? 'Update' : 'Create';
        return (
            <Form onSubmit={props.onSubmit}>
                <Form.Group >
                    <CustFormInput
                        width={props.width}
                        type={props.type}
                        placeholder={props.placeholder}
                        name={props.name}
                        value={props.value}
                        onChange={props.onChange}
                    />
                    <Button size="large" color="blue" content={button_text_name} />
                    <Button size="large" color="red" content="Cancel" onClick={props.onCancelClick}/>
                </Form.Group>
            </Form>
        );
}

export default ShoppinglistForm;
