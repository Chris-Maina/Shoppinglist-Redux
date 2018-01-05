import React from 'react';
import CustButton from '../common/Button';

const HomePage = (props) => {
    return (
        <div>
            <header>
                <div className="header-content">
                    <div className="header-content-inner">
                        <h1 id="homeHeading"> Shoppinglist Application </h1>
                        <hr />
                        <p>Shopping list application helps you create, edit or delete shopping list. It allows you to record things or items you want to spend money on, meeting your needs and
				        keeping track of your shopping lists.
			      </p>
                        <div>
                            <a href="/auth/register/"><CustButton size="huge" color="yellow" buttonName="Register"/></a>
                            <a href="/auth/login/">  <CustButton size="huge" color="yellow" buttonName="Login"/></a>
                        </div>
                    </div>
                </div>]
            </header>

        </div>
    );
}
export default HomePage;
