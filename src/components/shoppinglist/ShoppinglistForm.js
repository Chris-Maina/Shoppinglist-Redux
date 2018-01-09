import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import CustFormInput from '../common/Input'

const ShoppinglistForm = (props) => {
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
                <Button size="large" color="blue" content={props.create_update_btn} />
                <Button size="large" color="red" content={props.cancel_btn} />
            </Form.Group>
        </Form>
    );
}
export default ShoppinglistForm;
