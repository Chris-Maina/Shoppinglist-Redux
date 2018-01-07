import React, { Component } from 'react'
import CustHeader from '../common/CustHeader'
import AnimatedButton from '../common/AnimatedButton'
import CustomLists from './CustLists'


class ShoppinglistPage extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                { /**
                Navigation bar
              */}
                <div className='ui container'>
                    {/** Page contents */}
                    <CustHeader
                        header="Shoppinglist"
                    />
                   
                    <AnimatedButton
                        color='blue'
                        size='huge'
                        floated="right"
                        circular="circular"
                        content="Create list"
                        iconName="plus"
                    />
                    

                    <CustomLists
                        header="Back to school"
                        meta="shop with a smile"
                        description="Created in Jan 2018" />



                </div>
            </div>
        );
    };
}

export default ShoppinglistPage;
