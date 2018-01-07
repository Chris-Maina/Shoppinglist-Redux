import React from 'react'
import { Button, Icon } from 'semantic-ui-react';

const AnimatedButton = (props) => {
    return(
        <Button animated floated={props.floated} size={props.size} circular={props.circular} color={props.color}>
        <Button.Content visible> {props.content}</Button.Content>
        <Button.Content hidden> 
        <Icon name={props.iconName}/></Button.Content>
        </Button>
    );
}

export default AnimatedButton;
