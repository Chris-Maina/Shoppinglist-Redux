import React, { Component } from 'react'
import CustHeader from '../common/CustHeader'
import AnimatedButton from '../common/AnimatedButton'
import CustButton from '../common/Button'
import CustomLists from './CustLists'
<<<<<<< HEAD
import { Grid, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getShoppinglist } from '../../actions/shoppinglistActions'
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

=======
import { Grid, Loader, Card } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getShoppinglist, formOpen, createShoppinglist } from '../../actions/shoppinglistActions'
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import ShoplistForm from './ShoppinglistForm'
>>>>>>> [feature #154081230] Add shopping list page component.

class ShoppinglistPage extends Component {
    constructor(props, context) {
        super(props, context);
<<<<<<< HEAD
    }
=======
        this.state = { shoppinglistName: '' }
        this.onPlusClick = this.onPlusClick.bind(this);
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

>>>>>>> [feature #154081230] Add shopping list page component.
    componentWillMount() {
        // dispatch get shoppinglist request action
        this.props.getShoppinglist();

    }
<<<<<<< HEAD
    render() {
        if (!this.props.shoppinglists) {
            return <Loader active content='Loading' />

        }
        console.log(this.props.shoppinglists)
=======
    onCreateSubmit(evt) {
        evt.preventDefault();
        // method call to dispatch create a shoppinglist
        this.props.createShoppinglist(this.state.shoppinglistName, () =>{
            this.props.getShoppinglist();
        });
    }
    onPlusClick(evt) {
        evt.preventDefault();
        // method call to dispatch form open action
        this.props.formOpen();

    }
    onInputChange(evt) {
        evt.preventDefault();
        this.setState({ shoppinglistName: evt.target.value });

    }
    render() {
        if (!this.props.shoppinglists) {
            return <Loader active content='Loading' />
        }

>>>>>>> [feature #154081230] Add shopping list page component.
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
                            </Grid.Row>
                            <Grid.Row>
                                {this.props.isFormOpen ?
                                    <Grid.Column textAlign="center">
                                        <ShoplistForm
                                            onSubmit={this.onCreateSubmit}
                                            name="shoppinglistname"
                                            value={this.state.shoppinglistName}
                                            onChange={this.onInputChange}
                                            width={14}
                                            type="text"
                                            placeholder="Shoppinglist name"
                                            create_update_btn="Create"
                                            cancel_btn="Cancel"
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
                                            <Card.Header content="Message"/>
                                            <Card.Meta content="shop with a smile" />
                                            <Card.Description content={this.props.shoppinglists}/>
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
                                                header={oneshoppinglist.name}
                                                meta="shop with a smile"
                                                description={"Created at " + oneshoppinglist.date_created} />
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
<<<<<<< HEAD
    loading: PropTypes.bool,
    redirect: PropTypes.bool,
    shoppinglist: PropTypes.object,
    map: PropTypes.func
}
function mapStateToProps(state, ownProps) {
    // destructure shoppinglist object
    let { loading, redirect, shoppinglists } = state.shoppinglist;
    return {
        loading, redirect, shoppinglists
    };
}
export default connect(mapStateToProps, { getShoppinglist })(ShoppinglistPage);
=======
    isFormOpen: PropTypes.bool,
    loading: PropTypes.bool,
    redirect: PropTypes.bool,
    shoppinglist: PropTypes.object
}
function mapStateToProps(state, ownProps) {
    // destructure shoppinglist object
    let { loading, redirect, shoppinglists, isFormOpen } = state.shoppinglist;
    return {
        loading, redirect, shoppinglists, isFormOpen
    };
}
export default connect(mapStateToProps, { getShoppinglist, formOpen, createShoppinglist })(ShoppinglistPage);
>>>>>>> [feature #154081230] Add shopping list page component.
