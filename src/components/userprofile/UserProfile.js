import React, { Component } from 'react';
import { Grid, Card, Loader } from 'semantic-ui-react';
import CustButton from '../common/Button';
import CustHeader from '../common/CustHeader';
import NavigationBar from '../common/NavigationBar';
import { connect } from 'react-redux';
import * as userProfileActions from '../../actions/userProfileActions';
import UserProfileForm from './UserProfileForm';
import { ToastContainer } from 'react-toastify';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' }
    }
    componentWillMount() {
        // dispatch an action to get user profile
        this.props.getUserProfile();
    }
    onEditClick = () => {
        // dispatch an action to open a form to edit email and password
        this.props.formOpen();

    }
    onInputChange = (evt) => {
        evt.preventDefault()
        let fields = {}
        fields[evt.target.name] = evt.target.value
        this.setState(fields)
    }
    onCancelClick = (evt) => {
        evt.preventDefault()
        // dispatch an action to close the form
        this.props.formClose();
    }
    onEmailPasswordSubmit = (evt) => {
        evt.preventDefault()
        // dispatch an action to update password or email
        this.props.updateUserProfile({ email: this.state.email, password: this.state.password })
    }
    render() {
        if (!this.props.user) {
            return <Loader active content='Loading' />
        }
        const userProfileStyle = {
            padding: "0.5cm 2cm",
            wordSpacing: "2.5cm"
        }
        const cardStyle = {
            marginTop: "2cm"
        }
        return (
            <div className='ui container'>
                <ToastContainer />
                {this.props.loading ?

                    <Loader active content='Loading' />:
                    <Grid columns="equal" padded stackable centered>
                        <Grid.Row>
                            <Grid.Column>
                                <CustHeader
                                    header="Shoppinglist"
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <NavigationBar
                                    url={this.props.match.url} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <Card fluid style={cardStyle}>
                                    <Card.Content>
                                        <Card.Header> User Account Information</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            {this.props.isFormOpen ?
                                                <UserProfileForm
                                                    onSubmit={this.onEmailPasswordSubmit}
                                                    email={this.state.email}
                                                    password={this.state.password}
                                                    onChange={this.onInputChange}
                                                    onCancelClick={this.onCancelClick} /> :
                                                <div>
                                                    <p style={userProfileStyle}><b>Email </b> {this.props.user.email}</p>
                                                    <p style={userProfileStyle}><b>Password</b> ************</p>
                                                </div>}

                                        </Card.Description>
                                    </Card.Content>

                                    {this.props.isFormOpen ? '' :
                                        <Card.Content extra>
                                            <CustButton size="large" floated="right" color="green" buttonName="Edit profile" onClick={this.onEditClick} />
                                        </Card.Content>
                                    }

                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
                    let { loading, user, isFormOpen } = state.userprofile;
    return {
                    loading, user, isFormOpen
    };
}
export default connect(mapStateToProps, {...userProfileActions})(UserProfile);