import React, { Component } from 'react';
import { Table, Loader, Grid, Card, Segment, Header } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import CustButton from './../common/Button';
import CustHeader from './../common/CustHeader'
import CustomConfirm from './../common/CustomConfirm'
import * as shoppingItemActions from './../../actions/shoppingitemActions'
import {getUserProfile} from '../../actions/userProfileActions'
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
            },
            open: false
        }
    }
    componentWillMount() {
        this.props.getShoppingitems(this.props.match.params.id)
        // get the shoppinglist it belongs to
        this.props.getSingleShoppinglist(this.props.match.params.id)
        // dispatch an action to get the loagged in user
        this.props.getUserProfile()
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
            this.props.editShoppingItem(this.state.item, this.props.match.params.id)
            // dispatch an action to close the form
            return this.props.formClose();
        }
        // method call to dispatch create a shopping items
        this.props.createShoppingItem(this.state.item, this.props.match.params.id);
        return this.props.formClose();
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
    onDeleteClick = (item) => {
        // method call to delete an item
        this.props.deleteShoppingItem(item, this.props.match.params.id)
        this.setState({ open: false })
    }
    onPrevClick = () => {
        // dispatch a call to get prev page shopping items
        this.props.getPrevPageItems(this.props.prevPage)
    }
    onNextClick = () => {
        // dispatch a call to get next page shopping items
        this.props.getNextPageItems(this.props.nextPage)
    }
    showConfirm = () => {
        this.setState({ open: true })
    }
    handleCancel = () => {
        this.setState({ open: false })
    }

    render() {
        let items;

        if (!this.props.shoppingitems || !this.props.user) {
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
                                    user={this.props.user}
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
                                            className="plusIconStyle"
                                            size="massive"
                                            color="yellow"
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
                                                            onClick={this.showConfirm}
                                                            circular
                                                        />
                                                        <CustomConfirm
                                                            open={this.state.open}
                                                            onCancel={this.handleCancel}
                                                            content='Are you sure you want to delete this item?'
                                                            size='small'
                                                            onConfirm={() => this.onDeleteClick(oneshoppingitem)} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>

                                    </Table>
                                </Grid.Column>
                            </Grid.Row>
                        }
                        <Grid.Row>

                            <Grid.Column>
                                {this.props.prevPage === 'None' ? '' :
                                    <CustButton
                                        color="blue"
                                        size="medium"
                                        buttonName="Previous"
                                        floated="right"
                                        onClick={this.onPrevClick} />
                                }
                            </Grid.Column>
                            <Grid.Column>
                                {this.props.nextPage === 'None' ? '' :
                                    <CustButton
                                        color="blue"
                                        size="medium"
                                        buttonName="Next"
                                        onClick={this.onNextClick} />
                                }
                            </Grid.Column>

                        </Grid.Row>
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
    let { shoppingitems, loading, isFormOpen, isEditClicked, singleShoppinglist, prevPage, nextPage } = state.shoppingitem
    let { searchResults } = state.search
    let { user } = state.userprofile

    return {
        loading, shoppingitems, isFormOpen, isEditClicked, singleShoppinglist, searchResults, prevPage, nextPage, user
    }
}

export default connect(mapStateToProps, { ...shoppingItemActions, getUserProfile })(ShoppingItemsPage);