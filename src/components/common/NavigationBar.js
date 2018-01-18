import React, { Component } from 'react';
import { Input, Menu, Dropdown } from 'semantic-ui-react';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: "" }
    }
    handleItemClick = (e, name) => {
        this.setState({ activeItem: name })
    }
    render() {
        const { activeItem } = this.state;
        let token = window.localStorage.getItem('token')
        if(!token){
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
                href="/shoppinglist"></Menu.Item>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Dropdown item text='User' pointing='top right'>
                    <Dropdown.Menu>
                        <Dropdown.Item icon='user circle outline' text="Profile"/>
                        <Dropdown.Item icon='log out' text="Logout"/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu >
        );
    }
}
export default NavigationBar;