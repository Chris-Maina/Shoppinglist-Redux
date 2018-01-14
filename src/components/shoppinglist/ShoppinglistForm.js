import React, {Component} from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'; 
import CustFormInput from '../common/Input';
import PropTypes from 'prop-types';

class ShoppinglistForm extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const button_text_name = this.props.value ? 'Update' : 'Create'
        return (
            <Form onSubmit={this.props.onSubmit}>
                <Form.Group >
                    <CustFormInput
                        width={this.props.width}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                    <Button size="large" color="blue" content={button_text_name} />
                    <Button size="large" color="red" content="Cancel" onClick={this.props.onCancelClick}/>
                </Form.Group>
            </Form>
        );
    }
}
ShoppinglistForm.propTypes = {
    params: PropTypes.object

}
function mapStateToProps(state, ownProps) {
    return {
        state: state
    }
}
export default connect(mapStateToProps)(ShoppinglistForm);
