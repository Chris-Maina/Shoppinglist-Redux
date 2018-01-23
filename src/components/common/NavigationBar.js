import React, { Component } from 'react';
import { Menu, Dropdown, Form } from 'semantic-ui-react';
import CustFormInput from './Input';
import { connect } from 'react-redux';
import * as searchActions from '../../actions/searchActions';
import PropTypes from 'prop-types';

class NavigationBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { activeItem: "", searchText: '' }
    }
    handleItemClick = (e, name) => {
        this.setState({ activeItem: name })
    }
    onInputChange = (evt) => {
        evt.preventDefault();
        this.setState({ searchText: evt.target.value });
    }
    onSearchSubmit = (evt) => {
        // method call to search for a text
        this.props.searchShoppinglistOrItem(this.props.url, this.state.searchText);
        return this.setState({ searchText: '' });
    }
    onLogoutClick = () => {
        window.localStorage.removeItem('token');
        this.context.router.history.push('/auth/login/');
    }
    render() {
        const { activeItem } = this.state;
        let token = window.localStorage.getItem('token')
        if (!token) {
            return (
                <Menu secondary stackable floated="right">
                    <Menu.Item name="register" active={activeItem === 'register'} onClick={this.handleItemClick}
                        href="/auth/register/"></Menu.Item>
                    <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleItemClick}
                        href="/auth/login/"></Menu.Item>
                </Menu >
            );
        }
        return (
            <Menu secondary stackable floated="right">
                <Menu.Item name="mylists" active={activeItem === 'mylists'} onClick={this.handleItemClick}
                    href="/shoppinglists/"></Menu.Item>
                <Menu.Item>
                    <Form onSubmit={this.onSearchSubmit}>
                        <CustFormInput icon='search' placeholder='Search...' name="search" value={this.state.searchText} onChange={this.onInputChange} />
                    </Form>
                </Menu.Item>
                <Dropdown item text='User' pointing='top right'>
                    <Dropdown.Menu>
                        <Dropdown.Item href="/profile/"icon='user circle outline' text="Profile" />
                        <Dropdown.Item onClick={this.onLogoutClick} icon='log out' text="Logout" />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu >
        );
    }
}
// Get the Router context so router is available on this.context.router.
NavigationBar.contextTypes = {
    router: PropTypes.object
};
NavigationBar.propTypes = {
    search: PropTypes.object
}
function mapStateToProps(state, ownProps){
    return state.search
}
export default connect(mapStateToProps, { ...searchActions })(NavigationBar);