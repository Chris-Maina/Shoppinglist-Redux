import React, { Component } from 'react'
import { Grid, GridColumn, Header, Form, Segment, Message, Loader } from 'semantic-ui-react'
import CustFormInput from '../common/Input'
import CustButton from '../common/Button';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/registerAction';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

class RegisterPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {
                username: '',
                email: '',
                password: '',
                cpassword: ''
            },
            errors: ''
        }
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

        // Create a variable to hold errors. Append the result of validate function
        let errors = '';
        errors = this.validate(this.state.user.username, this.state.user.email, this.state.user.password, this.state.user.cpassword);
        if (errors) {
            toast.error(errors);
            return this.setState({ errors });
        }

        // Dispatch an action to register a user
        this.props.registerUser(this.state.user).then(() => {
            setTimeout(() => {
                // Redirect on successful registration
                if (this.props.redirect) {
                    this.context.router.history.push('/auth/login/');
                }
            }, 5000)
        }
        );

        // Set state to empty
        this.setState({
            user: {
                username: '',
                email: '',
                password: '',
                cpassword: ''
            }
        });
    }
    validate(username, email, password, cpassword) {
        let errors = '';
        if (password !== cpassword) {
            errors = "Password mismatch";
            return errors;
        }
        // Check for length of username. If empty
        if (username.length === 0) {
            errors = "Please provide a username";
            return errors;
        } else {
            // Regular expression to check for special characters
            let re = /^[a-zA-Z0-9_]+$/;
            // console.log(re.test(username))
            if (!re.test(username)) {
                errors = "Username cannot have special characters";
                return errors;
            }
        }
    }
    render() {
        // Destructure state user
        let user = this.state.user;
        let { username, email, password, cpassword } = user
        return (
            <div className='ui container'>
                <ToastContainer />
                <Grid
                    className="wrapper"
                    textAlign='center'
                    verticalAlign='middle'>
                    <GridColumn style={{ maxWidth: 500 }}>
                        <Header as='h2' textAlign='center'>
                            Sign Up for an Account
                        </Header>
                        <Form size='huge' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <CustFormInput
                                    onChange={this.onInputChange}
                                    name='username'
                                    value={username}
                                    fluid={true}
                                    type='text'
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    required={true}>

                                </CustFormInput>
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
                                <CustFormInput
                                    onChange={this.onInputChange}
                                    name='cpassword'
                                    value={cpassword}
                                    fluid={true}
                                    type='password'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirm Password'
                                    required={true}>
                                </CustFormInput>

                                {this.props.loading ?

                                    <Loader active content='Loading' />
                                    :
                                    <CustButton size='large' color='green' fluid={true} buttonName="Register" />}
                            </Segment>
                        </Form>
                        <Message>
                            Already have an account? <a href='/auth/login/'>Login</a>
                        </Message>
                    </GridColumn>
                </Grid>
            </div>
        );
    }
}
// Get the Router context so router is available on this.context.router.
RegisterPage.contextTypes = {
    router: PropTypes.object
};

RegisterPage.propTypes = {
    loadingStatus: PropTypes.bool,
    redirect: PropTypes.bool
}

function mapStateToProps(state, ownProps) {
    // destructure loadingStatus object
    let { loading, redirect } = state.loadingStatus
    return {
        loading, redirect
    };
}

export default connect(mapStateToProps, { registerUser })(RegisterPage);