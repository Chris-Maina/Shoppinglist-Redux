import React from 'react';
import { Table } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import CustButton from './../common/Button';

const ShoppingItemsPage = props => {
    return (
        /**
            Navigation bar
          */
        // { props.loading ? '':''}
        /** Page contents */

        <div className="ui container">
            <ToastContainer />
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
                    <Table.Row>
                        <Table.Cell>Eggs</Table.Cell>
                        <Table.Cell>2</Table.Cell>
                        <Table.Cell>24</Table.Cell>
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
                    <Table.Row>
                        <Table.Cell>Milk</Table.Cell>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>50</Table.Cell>
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
                </Table.Body>

            </Table>
        </div>
    );
}
export default ShoppingItemsPage;