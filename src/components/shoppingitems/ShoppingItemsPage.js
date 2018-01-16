import React, { Component } from 'react';
import { Table, Loader, Grid, Card } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import CustButton from './../common/Button';
import CustHeader from './../common/CustHeader'
import * as shoppingItemActions from './../../actions/shoppingitemActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ShoppingItemsPage extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentWillMount() {
        // console.log(this.props.match.params.id)
        this.props.getShoppingitems(this.props.match.params.id)
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
                                            {this.props.shoppingitems.map( oneshoppingitem => 
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
                                                            circular
                                                        />
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <CustButton
                                                            size="tiny"
                                                            color="red"
                                                            icon="trash"
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
    let { shoppingitems, loading } = state.shoppingitem
    return {
        loading, shoppingitems
    }
}

export default connect(mapStateToProps, { ...shoppingItemActions })(ShoppingItemsPage);