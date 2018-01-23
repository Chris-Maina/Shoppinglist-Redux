import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import CustFormInput from '../common/Input'

const UserProfileForm = props => {
    const formStyle = {
        padding: "0.5cm 1cm"
    }
    const buttonStyle = {
        paddingLeft: "1cm"
    }
    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Field style={formStyle}>
                <label >Email</label>
                <CustFormInput
                    onChange={props.onChange}
                    type="email"
                    placeHolder="Email"
                    name="email"
                    value={props.email}
                />
            </Form.Field>
            <Form.Field style={formStyle}>
                <label>Password</label>
                <CustFormInput
                    onChange={props.onChange}
                    type="password"
                    placeHolder="Password"
                    name="password"
                    value={props.password}
                />
            </Form.Field>
            <Button.Group style={buttonStyle}>
            <Button size="large" color="blue" content="Update" />
            <Button.Or />
            <Button size="large" color="red" content="Cancel" onClick={props.onCancelClick} />
            </Button.Group>
        </Form>
    )
}
export default UserProfileForm;