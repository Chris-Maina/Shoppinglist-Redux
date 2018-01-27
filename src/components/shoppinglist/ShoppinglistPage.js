import React, { Component } from 'react'
import CustHeader from '../common/CustHeader'
import CustButton from '../common/Button'
import CustomLists from './CustLists'
import { Grid, Loader, Card } from 'semantic-ui-react'
import { connect } from 'react-redux';
import * as shoppinglistActions from '../../actions/shoppinglistActions';
import {getUserProfile} from '../../actions/userProfileActions'
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import ShoplistForm from './ShoppinglistForm'
import NavigationBar from '../common/NavigationBar';

class ShoppinglistPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { shoppinglistId: '', shoppinglistName: '', open: false }
    }

    componentWillMount() {
        // dispatch get shoppinglist request action
        this.props.getShoppinglist();
        // dispatch an action to get the loagged in user
        this.props.getUserProfile()

    }

    onFormSubmit = evt => {
        evt.preventDefault();
        if (this.state.shoppinglistId) {
            // If an id is present its an update request
            // method call to dispatch edit a shoppinglist
            this.props.editShoppinglist({ name: this.state.shoppinglistName, id: this.state.shoppinglistId })
            // method call to dispatch form close action
            return this.props.formClose();

        }
        // Create request
        // method call to dispatch create a shoppinglist
        this.props.createShoppinglist(this.state.shoppinglistName);
        // method call to dispatch form close action
        return this.props.formClose(); 

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
        this.props.deleteShoppinglist(oneshoppinglist);
        // close the confirm dialog
        this.setState({ open: false })
    }
    onNextClick = () => {
        // dispatch a call to get next page
        this.props.getNextPage(this.props.nextPage)
    }
    onPrevClick = () => {
        // dispatch a call to get prev page
        this.props.getPrevPage(this.props.prevPage)
    }
    showConfirm = () => {
        this.setState({ open: true })
    }
    handleCancel = () => {
        this.setState({ open: false })
    }
    render() {
        let item;
        if (!this.props.shoppinglists || !this.props.user) {
            return <Loader active content='Loading' />
        } else {
            item = this.props.shoppinglists;
        }
        if (this.props.searchResults) {
            if (this.props.searchResults.length > 0) {
                item = this.props.searchResults;
            }
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
                                    <NavigationBar
                                        user={this.props.user}
                                        url={this.props.match.url} />
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
                                    <Grid.Column >
                                        <CustButton
                                            className="plusIconStyle"
                                            onClick={this.onPlusClick}
                                            color='yellow'
                                            size='massive'
                                            icon="plus"
                                            floated="right"
                                            circular
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
                                item.map(oneshoppinglist =>
                                    <Grid.Row
                                        key={oneshoppinglist.id}
                                        centered
                                    >
                                        <Grid.Column >
                                            <CustomLists
                                                onEditClick={(e) => this.onEditClick(e, oneshoppinglist.id, oneshoppinglist.name)}
                                                open={this.state.open}
                                                onDeleteClick={this.showConfirm}
                                                onCancel = {this.handleCancel}
                                                onConfirm = {() => this.onDeleteClick(oneshoppinglist)}
                                                oneshoppinglist={oneshoppinglist}
                                            />
                                        </Grid.Column>

                                    </Grid.Row>)}
                            <Grid.Row>
                                <Grid.Column >
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
    let { loading, redirect, shoppinglists, isFormOpen, isEditClicked, nextPage, prevPage } = state.shoppinglist;
    let { searchResults } = state.search;
    let {user} = state.userprofile
    return {
        loading, redirect, shoppinglists, isFormOpen, isEditClicked, searchResults, nextPage, prevPage,user
    };
}
export default connect(mapStateToProps, { ...shoppinglistActions, getUserProfile })(ShoppinglistPage);
