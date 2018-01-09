import React, { Component } from 'react'
import CustHeader from '../common/CustHeader'
import AnimatedButton from '../common/AnimatedButton'
import CustButton from '../common/Button'
import CustomLists from './CustLists'
import { Grid, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getShoppinglist } from '../../actions/shoppinglistActions'
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';


class ShoppinglistPage extends Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        // dispatch get shoppinglist request action
        this.props.getShoppinglist();

    }
    render() {
        if (!this.props.shoppinglists) {
            return <Loader active content='Loading' />

        }
        console.log(this.props.shoppinglists)
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
                                <Grid.Column textAlign="right">
                                    <AnimatedButton
                                        color='blue'
                                        size='huge'
                                        content="Create list"
                                        iconName="plus"
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            {/** Shoppinglists */}
                            {this.props.shoppinglists.map(oneshoppinglist =>
                                <Grid.Row
                                    key={oneshoppinglist.id}
                                    centered
                                    >
                                    <Grid.Column >
                                        <CustomLists
                                            header={oneshoppinglist.name}
                                            meta="shop with a smile"
                                            description={"Created at "+oneshoppinglist.date_created} />
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
