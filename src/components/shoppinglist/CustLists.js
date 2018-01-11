import React from 'react'
import { Card } from 'semantic-ui-react'
import AnimatedButton from '../common/AnimatedButton'


const CustomLists = props => {
    return (
        <Card raised fluid>
            <Card.Content >
                <Card.Header>{props.header}</Card.Header>
                <Card.Meta>{props.meta} </Card.Meta>
                <Card.Description>{props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <AnimatedButton
                    color='green'
                    size='tiny'
                    content="Edit"
                    iconName="edit"
                />
                <AnimatedButton
                    color='red'
                    size='tiny'
                    content="Delete"
                    iconName="trash"
                />
                <AnimatedButton
                    color='blue'
                    floated="right"
                    size='tiny'
                    content="Add item"
                    iconName="plus"
                />
            </Card.Content>
        </Card>
    );
}


export default CustomLists;
