import React, { Component } from 'react'
import { Grid, GridColumn, Header, Form, Segment, Message, Loader } from 'semantic-ui-react'
import CustFormInput from '../common/Input'
import CustButton from '../common/Button'
import { loginUser } from '../../actions/loginAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {
                email: '',
                password: ''
            }
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onInputChange(evt) {
        evt.preventDefault();
        let fields = this.state.user;
        fields[evt.target.name] = evt.target.value;
        this.setState(fields);
    }
    handleSubmit(evt) {
        evt.preventDefault();

        // method call to login a user
        this.props.loginUser(this.state.user, () => {
            // Redirect on successful log in
            if (this.props.redirect) {
                this.context.router.history.push('/shoppinglists/');
            }
        });
        // set states to empty
        this.setState({
            user: {
                email: '',
                password: ''
            }
        });

    }
    render() {
        let { email, password } = this.state.user;
        return (
            <div className="ui container ">
                <ToastContainer />
                <Grid className="wrapper"
                    textAlign='center'
                    verticalAlign='middle' >
                    <GridColumn style={{ maxWidth: 500 }}>
                        <Header as='h2' textAlign='center'>
                            Sign into your Account
                        </Header>
                        <Form size='huge' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <CustFormInput
                                    onChange={this.onInputChange}
                                    name='email'
                                    value={email}
                                    fluid={true}
                                    type='email'
                                    icon='mail'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    required={true}>

                                </CustFormInput>
                                <CustFormInput
                                    onChange={this.onInputChange}
                                    name='password'
                                    value={password}
                                    fluid={true}
                                    type='password'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    required={true}>

                                </CustFormInput>

                                {this.props.loading ?

                                    <Loader active content='Loading' />
                                    :
                                    <CustButton size='large' color='green' fluid={true} buttonName="Login" />}
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
// Get the Router context so router is available on this.context.router.
LoginPage.contextTypes = {
    router: PropTypes.object
};

LoginPage.propTypes = {
    loading: PropTypes.bool,
    redirect: PropTypes.bool
}

function mapStateToProps(state, ownProps) {
    // destructure loadingStatus object
    let { loading, redirect } = state.login
    return {
        loading, redirect
    }
}

export default connect(mapStateToProps, { loginUser })(LoginPage);