import React, { Component } from 'react'
import { Grid, GridColumn, Header, Form, Segment, Message } from 'semantic-ui-react'
import CustFormInput from '../common/Input'
import CustButton from '../common/Button'

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='login-form'>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <GridColumn style={{ maxWidth: 500 }}>
                        <Header as='h2' textAlign='center'>
                            Sign into your Account
                        </Header>
                        <Form size='huge'>
                            <Segment stacked>
                                <CustFormInput
                                    fluid={true}
                                    type='email'
                                    icon='mail'
                                    iconPosition='left'
                                    placeholder='E-mail address'>

                                </CustFormInput>
                                <CustFormInput
                                    fluid={true}
                                    type='password'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'>

                                </CustFormInput>
                                <CustButton size='large' color='green' fluid={true} buttonName="Login" />
                            </Segment>
                        </Form>
                        <Message>
                            Don't have an account? <a href='/auth/register/'>Register</a>
                        </Message>
                    </GridColumn>
                </Grid>
            </div>
        );
    }
}
export default LoginPage;