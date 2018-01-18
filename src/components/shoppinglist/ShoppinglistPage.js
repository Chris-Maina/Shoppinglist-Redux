import React, { Component } from 'react'
import CustHeader from '../common/CustHeader'
import AnimatedButton from '../common/AnimatedButton'
import CustButton from '../common/Button'
import CustomLists from './CustLists'
import { Grid, Loader, Card } from 'semantic-ui-react'
import { connect } from 'react-redux';
import * as shoppinglistActions from '../../actions/shoppinglistActions';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import ShoplistForm from './ShoppinglistForm'
import NavigationBar from '../common/NavigationBar';

class ShoppinglistPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { shoppinglistId: '', shoppinglistName: '' }
    }

    componentWillMount() {
        // dispatch get shoppinglist request action
        this.props.getShoppinglist();

    }

    onFormSubmit = evt => {
        evt.preventDefault();
        if (this.state.shoppinglistId) {
            // If an id is present its an update request
            // method call to dispatch edit a shoppinglist
            return this.props.editShoppinglist({ name: this.state.shoppinglistName, id: this.state.shoppinglistId }, () => {
                this.props.getShoppinglist();
            })

        }
        // Create request
        // method call to dispatch create a shoppinglist
        return this.props.createShoppinglist(this.state.shoppinglistName, () => {
            this.props.getShoppinglist();
        });

    }
    onPlusClick = evt => {
        evt.preventDefault();
        // method call to dispatch form open action
        this.props.formOpen();
        // dispatch method to set editClicked to False
        this.props.editClickOff()
        // Set state of id empty.
        this.setState({ shoppinglistId: '', shoppinglistName: '' });

    }
    onInputChange = evt => {
        evt.preventDefault();
        this.setState({ shoppinglistName: evt.target.value });

    }
    onCancelClick = evt => {
        evt.preventDefault();
        // method call to dispatch form close action
        this.props.formClose();
    }

    onEditClick = (evt, shoppinglistId, shoppinglistName) => {
        evt.preventDefault();
        // method call to dispatch form open action
        this.props.formOpen();
        // dispatch method to set editClicked to True
        this.props.editClickOn()

        this.setState({ shoppinglistId, shoppinglistName });
    }
    onDeleteClick = (oneshoppinglist) => {
        // method call to dispatch delete request
        this.props.deleteShoppinglist(oneshoppinglist, () => {
            // method call to get all shoppinglist
            this.props.getShoppinglist();
        });
    }
    render() {
        if (!this.props.shoppinglists) {
            return <Loader active content='Loading' />
        }

        return (
            <div>
                { /**
                Navigation bar
              */}
                <div className='ui container'>
                    <ToastContainer />
                    {this.props.loading ?

                        <Loader active content='Loading' /> :
                        /** Page contents */
                        <Grid columns="equal" padded stackable>
                            <Grid.Row>
                                <Grid.Column>
                                    <CustHeader
                                        header="Shoppinglist"
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <NavigationBar />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                {this.props.isFormOpen ?
                                    <Grid.Column textAlign="center">
                                        <ShoplistForm
                                            onSubmit={this.onFormSubmit}
                                            onCancelClick={this.onCancelClick}
                                            name="shoppinglistname"
                                            value={this.state.shoppinglistName}
                                            onChange={this.onInputChange}
                                            width={14}
                                            type="text"
                                            placeholder="Shoppinglist name"
                                            isEditClicked={this.props.isEditClicked}
                                        />
                                    </Grid.Column>
                                    :
                                    <Grid.Column textAlign="right">
                                        <AnimatedButton
                                            onClick={this.onPlusClick}
                                            color='blue'
                                            size='huge'
                                            content="Create list"
                                            iconName="plus"
                                        />
                                    </Grid.Column>
                                }

                            </Grid.Row>
                            {/** Shoppinglists */}

                            {typeof (this.props.shoppinglists) === 'string' ?
                                <Grid.Column >
                                    <Card raised fluid>
                                        <Card.Content >
                                            <Card.Header content="Message" />
                                            <Card.Meta content="shop with a smile" />
                                            <Card.Description content={this.props.shoppinglists} />
                                        </Card.Content >
                                    </Card>
                                </Grid.Column>
                                :
                                this.props.shoppinglists.map(oneshoppinglist =>
                                    <Grid.Row
                                        key={oneshoppinglist.id}
                                        centered
                                    >
                                        <Grid.Column >
                                            <CustomLists
                                                onEditClick={(e) => this.onEditClick(e, oneshoppinglist.id, oneshoppinglist.name)}
                                                onDeleteClick={() => this.onDeleteClick(oneshoppinglist)}
                                                oneshoppinglist={oneshoppinglist}
                                            />
                                        </Grid.Column>

                                    </Grid.Row>)}
                            <Grid.Row>
                                <Grid.Column textAlign="center">
                                    <CustButton
                                        color="blue"
                                        size="medium"
                                        buttonName="Next" />
                                </Grid.Column>
                                <Grid.Column>
                                    <CustButton
                                        color="blue"
                                        size="medium"
                                        buttonName="Previous" />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    }
                </div>
            </div >
        );
    };
}

ShoppinglistPage.propTypes = {
    isFormOpen: PropTypes.bool,
    loading: PropTypes.bool,
    redirect: PropTypes.bool,
    shoppinglist: PropTypes.object,
    params: PropTypes.object
}
function mapStateToProps(state, ownProps) {
    // destructure shoppinglist object
    let { loading, redirect, shoppinglists, isFormOpen, isEditClicked } = state.shoppinglist;
    return {
        loading, redirect, shoppinglists, isFormOpen, isEditClicked
    };
}
export default connect(mapStateToProps, { ...shoppinglistActions })(ShoppinglistPage);
