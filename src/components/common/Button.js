import React from 'react';
import { Button } from 'semantic-ui-react';

const CustButton = (props) =>{
    return(
        <Button 
        style={props.style}
        fluid={props.fluid} 
        size={props.size} 
        color={props.color}
        icon={props.icon}
        circular={props.circular}
        onClick={props.onClick}
        floated={props.floated}        
        >{props.buttonName}</Button>
    );
}
export default CustButton;