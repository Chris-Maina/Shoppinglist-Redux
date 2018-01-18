import React from 'react'
import { Card } from 'semantic-ui-react'
import AnimatedButton from '../common/AnimatedButton'
import { Link } from 'react-router-dom'

const CustomLists = props => {
    return (
        <Card raised fluid>
            <Card.Content >
                <Card.Header>{props.oneshoppinglist.name}</Card.Header>
                <Card.Meta content="shop with a smile" />
                <Card.Description>{props.oneshoppinglist.date_created}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <AnimatedButton
                    onClick={props.onEditClick}
                    shopId={props.shopId}
                    color='green'
                    size='tiny'
                    content="Edit"
                    iconName="edit"
                />
                <AnimatedButton
                    onClick={props.onDeleteClick}
                    color='red'
                    size='tiny'
                    content="Delete"
                    iconName="trash"
                />
                <Link to={`${props.oneshoppinglist.id}/items`} as="button"
                    className="ui blue right floated animated large button">
                    <div className="hidden content">Add item</div>
                    <div className="visible content">
                        <i aria-hidden="true" className="plus icon"></i>
                    </div>
                </Link>
            </Card.Content>
        </Card>
    );
}


export default CustomLists;
