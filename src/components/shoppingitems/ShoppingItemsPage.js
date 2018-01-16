import React, { Component } from 'react';
import { Table, Loader, Grid, Card, Segment } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import CustButton from './../common/Button';
import CustHeader from './../common/CustHeader'
import * as shoppingItemActions from './../../actions/shoppingitemActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShoppingItemForm from './ShoppingItemForm';

class ShoppingItemsPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            item: {
                id: '',
                name: '',
                price: '',
                quantity: ''
            }
        }
        /** Try assigning the state to a variable and use it everywhere else*/
        // let shoppinglistId = this.props.match.params.id
    }
    componentWillMount() {
        // console.log(this.props.match.params.id)
        this.props.getShoppingitems(this.props.match.params.id)
    }
    onPlusClick = () => {
        // dispatch an action to open the form
        this.props.formOpen();
        // dispatch method to set editClicked to False
        this.props.editClickOff()
        // set state to empty
        this.setState({ item: {id: '',name: '',price: '',quantity: ''}  })
    }
    onCancelClick = (evt) => {
        evt.preventDefault();
        // dispatch an action to close the form
        this.props.formClose();
    }
    onInputChange = (evt) => {
        evt.preventDefault();
        let itemfilled = this.state.item;
        itemfilled[evt.target.name]= evt.target.value;
        this.setState(itemfilled);
    }
    onFormSubmit = (evt) =>{
        evt.preventDefault();
        // Check if id is present in state. If true its a call to edit/update else create
        if(this.state.item.id){
            return this.props.editShoppingItem(this.state.item, this.props.match.params.id, ()=>{
                // get all shopping items
                this.props.getShoppingitems(this.props.match.params.id);
            })
        }
        // method call to dispatch create a shopping items
        return this.props.createShoppingItem(this.state.item, this.props.match.params.id, ()=>{
            this.props.getShoppingitems(this.props.match.params.id)
        });

        /**  try set state of item to empty here */
    }
    onEditClick = (evt, item)=>{
        evt.preventDefault();
        // method call to dispatch form open action
        this.props.formOpen();
        // dispatch method to set editClicked to True
        this.props.editClickOn()
        // set state to item clicked
        this.setState({item: item})
    }
    onDeleteClick(item){
        // method call to delete an item
    }
    render() {
        if (!this.props.shoppingitems) {
            return <Loader active content='Loading' />
        }
        return (
            /**
                Navigation bar
              */

            /** Page contents */

            <div className="ui container">
                <ToastContainer />
                {this.props.loading ?
                    <Loader active content='Loading' />
                    :
                    <Grid columns="equal" padded stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <CustHeader
                                    header="Shoppingitems"
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {this.props.isFormOpen ?
                                    <Segment >
                                        <ShoppingItemForm
                                            onSubmit={this.onFormSubmit}
                                            width={12}
                                            item={this.state.item}
                                            onChange={this.onInputChange}
                                            onCancelClick={this.onCancelClick}
                                            isEditClicked={this.props.isEditClicked} />
                                    </Segment>
                                    :
                                    <CustButton
                                        size="massive"
                                        color="blue"
                                        icon="plus"
                                        onClick={this.onPlusClick}
                                        circular />}
                            </Grid.Column>
                        </Grid.Row>
                        {typeof (this.props.shoppingitems) === 'string' ?
                            <Grid.Row>
                                <Grid.Column >
                                    <Card raised fluid>
                                        <Card.Content >
                                            <Card.Header content="Message" />
                                            <Card.Meta content="shop with a smile" />
                                            <Card.Description content={this.props.shoppingitems} />
                                        </Card.Content >
                                    </Card>
                                </Grid.Column>
                            </Grid.Row> :
                            <Grid.Row>
                                <Grid.Column>
                                    <Table stackable>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell> Item Name</Table.HeaderCell>
                                                <Table.HeaderCell> Quantity</Table.HeaderCell>
                                                <Table.HeaderCell> Price </Table.HeaderCell>
                                                <Table.HeaderCell> Edit </Table.HeaderCell>
                                                <Table.HeaderCell> Delete </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {this.props.shoppingitems.map(oneshoppingitem =>
                                                <Table.Row
                                                    key={oneshoppingitem.id}>
                                                    <Table.Cell>{oneshoppingitem.name}</Table.Cell>
                                                    <Table.Cell>{oneshoppingitem.quantity}</Table.Cell>
                                                    <Table.Cell>{oneshoppingitem.price}</Table.Cell>
                                                    <Table.Cell>
                                                        <CustButton
                                                            size="tiny"
                                                            color="green"
                                                            icon="edit"
                                                            onClick={ (evt)=> this.onEditClick(evt, oneshoppingitem)}
                                                            circular
                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <CustButton
                                                            size="tiny"
                                                            color="red"
                                                            icon="trash"
                                                            onClick={ () => this.onDeleteClick(oneshoppingitem)}
                                                            circular
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>

                                    </Table>
                                </Grid.Column>
                            </Grid.Row>
                        }
                    </Grid>
                }

            </div>
        );
    }
}
ShoppingItemsPage.propTypes = {
    params: PropTypes.object,
    shoppingitem: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
    let { shoppingitems, loading, isFormOpen, isEditClicked } = state.shoppingitem
    return {
        loading, shoppingitems, isFormOpen, isEditClicked
    }
}

export default connect(mapStateToProps, { ...shoppingItemActions })(ShoppingItemsPage);