import React from 'react'
import {Header, Icon} from 'semantic-ui-react'

const CustHeader = (props) => {
    return(
        <Header as='h2'>
            <Icon name="shop"/>
            <Header.Content>
                {props.header}
                <Header.Subheader>
                    Manage your shopping
                </Header.Subheader>
            </Header.Content>
        </Header>
    );
}

export default CustHeader;
