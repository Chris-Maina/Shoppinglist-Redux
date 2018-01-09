import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import AnimatedButton from '../common/AnimatedButton'

class CustomLists extends Component {
    constructor(props, context) {
        super(props, context)
    }
    render() {
        return (
            <Card raised fluid>
                <Card.Content >
                    <Card.Header>{this.props.header}</Card.Header>
                    <Card.Meta>{this.props.meta} </Card.Meta>
                    <Card.Description>{this.props.description}</Card.Description>
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
}

export default CustomLists;
