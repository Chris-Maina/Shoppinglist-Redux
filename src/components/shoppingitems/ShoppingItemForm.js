import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import CustFormInput from '../common/Input';


const ShoppingItemForm = props => {
        let button_text_name = props.isEditClicked ? 'Update' : 'Create';
        return (
            <Form onSubmit={props.onSubmit}>
                <Form.Group >
                    <CustFormInput
                        width={props.width}
                        type="text"
                        placeholder="Shopping item name"
                        name="name"
                        value={props.item.name}
                        onChange={props.onChange}
                    />
                    <CustFormInput
                        width={props.width}
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        value={props.item.quantity}
                        onChange={props.onChange}
                    />
                    <CustFormInput
                        width={props.width}
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={props.item.price}
                        onChange={props.onChange}
                    />
                    <Button size="large" color="blue" content={button_text_name} />
                    <Button size="large" color="red" content="Cancel" onClick={props.onCancelClick}/>
                </Form.Group>
            </Form>
        );
}

export default ShoppingItemForm;
