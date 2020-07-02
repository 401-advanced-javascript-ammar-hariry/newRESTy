import React from 'react';

const render = (condition = false , children = null) => {
    return condition ? children : null;
};

export const IfRenderer = props => 
    React.Children.map(props.children, child =>
    React.cloneElement(child, {condition: props.condition})
); 
export const Then = props => render(props.condition, props.children);
export const Else = props => render(!props.condition, props.children);