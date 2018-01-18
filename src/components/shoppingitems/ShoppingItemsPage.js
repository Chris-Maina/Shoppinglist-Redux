import React, { Component } from 'react';
import { Table, Loader, Grid, Card, Segment, Header } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import CustButton from './../common/Button';
import CustHeader from './../common/CustHeader'
import * as shoppingItemActions from './../../actions/shoppingitemActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShoppingItemForm from './ShoppingItemForm';
import NavigationBar from '../common/NavigationBar';

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
    }
    componentWillMount() {
        this.props.getShoppingitems(this.props.match.params.id)
        // get the shoppinglist it belongs to
        this.props.getSingleShoppinglist(this.props.match.params.id)
    }
    onPlusClick = () => {
        // dispatch an action to open the form
        this.props.formOpen();
        // dispatch method to set editClicked to False
        this.props.editClickOff()
        // set state to empty
        this.setState({ item: { id: '', name: '', price: '', quantity: '' } })
    }
    onCancelClick = (evt) => {
        evt.preventDefault();
        // dispatch an action to close the form
        this.props.formClose();
    }
    onInputChange = (evt) => {
        evt.preventDefault();
        let itemfilled = this.state.item;
        itemfilled[evt.target.name] = evt.target.value;
        this.setState(itemfilled);
    }
    onFormSubmit = (evt) => {
        evt.preventDefault();
        // Check if id is present in state. If true its a call to edit/update else create
        if (this.state.item.id) {
            return this.props.editShoppingItem(this.state.item, this.props.match.params.id)
        }
        // method call to dispatch create a shopping items
        return this.props.createShoppingItem(this.state.item, this.props.match.params.id);
    }
    onEditClick = (evt, item) => {
        evt.preventDefault();
        // method call to dispatch form open action
        this.props.formOpen();
        // dispatch method to set editClicked to True
        this.props.editClickOn()
        // set state to item clicked
        this.setState({ item: item })
    }
    onDeleteClick(item) {
        // method call to delete an item
        this.props.deleteShoppingItem(item, this.props.match.params.id)
    }
    render() {
        let items;

        if (!this.props.shoppingitems) {
            return <Loader active content='Loading' />
        } else {
            items = this.props.shoppingitems;
        }

        if (this.props.searchResults) {
            if (this.props.searchResults.length > 0) {
                items = this.props.searchResults;
            }
        }
        
        return (
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
                            <Grid.Column>
                                <NavigationBar
                                    url={this.props.match.url} />
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
                                    <div>
                                        <Header as='h2' inverted color='yellow' floated="left">
                                            {this.props.singleShoppinglist ? this.props.singleShoppinglist.name : 'Shoppinglist name'}
                                        </Header>
                                        <CustButton
                                            size="massive"
                                            color="blue"
                                            icon="plus"
                                            floated="right"
                                            onClick={this.onPlusClick}
                                            circular />
                                    </div>
                                }
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
                                            {items.map(oneshoppingitem =>
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
                                                            onClick={(evt) => this.onEditClick(evt, oneshoppingitem)}
                                                            circular
                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <CustButton
                                                            size="tiny"
                                                            color="red"
                                                            icon="trash"
                                                            onClick={() => this.onDeleteClick(oneshoppingitem)}
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
    let { shoppingitems, loading, isFormOpen, isEditClicked, singleShoppinglist } = state.shoppingitem
    let { searchResults } = state.search

    return {
        loading, shoppingitems, isFormOpen, isEditClicked, singleShoppinglist, searchResults
    }
}

export default connect(mapStateToProps, { ...shoppingItemActions })(ShoppingItemsPage);