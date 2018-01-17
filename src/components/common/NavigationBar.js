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
        return (
            <Menu secondary>
                <Menu.Item name="mylists" active={activeItem === 'mylists'} onClick={this.handleItemClick}></Menu.Item>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Dropdown item text='User'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item name="logout" active={activeItem === 'logout'}></Menu.Item>
            </Menu >
        );
    }
}
export default NavigationBar;