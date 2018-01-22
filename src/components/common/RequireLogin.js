import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// High Order Component. Receives components that only logged in users should access
export default function requireLogin(ComponentPassed) {
    class AllowedComponent extends Component {
        componentWillMount() {
            let token = window.localStorage.getItem('token');
            if (!token) {
                this.context.router.history.push("/auth/login/");
            }
        }
        render() {
            // Return the component with its props
            return <ComponentPassed {...this.props} />
        };
    }
    // Get the Router context so router is available on this.context.router.
    AllowedComponent.contextTypes = {
        router: PropTypes.object
    };
    // Return the new Component that requires authorization
    return withRouter(AllowedComponent);
}