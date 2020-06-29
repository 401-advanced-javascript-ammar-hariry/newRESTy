import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Footer from '../components/footer/index';
import Header from '../components/header/index';
import Form from '../components/form/form';


describe('<footer />', () => {
    it('<footer /> is exists', () => {

        let app = shallow( <Footer /> );
        expect(app.find('footer').exists()).toBeTruthy
        expect(app.find('footer').text()).toContain('Fellows')
         });
});
describe('<header />', () => {
	it('<header /> is exists', () => {
      
	    let app = shallow( <Header /> );
	    expect(app.find('header').exists()).toBeTruthy
	    expect(app.find('header').text()).toContain('RESTy')
	});
 });
 describe('<Form />', () => {
	it('<Form /> is exists', () => {
      
	    let app = shallow( <Form /> );
	    expect(app.find('form').exists()).toBeTruthy

	});
	it(' it stores the users input into state', () => {
		let form = shallow( <Form /> );
		const input1 =form.find('input');
		input1.simulate('change', {target: {value: 'testing'}});
		expect(form.state('url')).toBe('testing');
	});
	it(' it clear the form/state after the form is submitted', () => {
		let form = shallow( <Form /> );
		const button =form.find('button');
		button.simulate('click');
		expect(form.state('url')).toBe('');
	});
	it(' it  renders the correct component', () => {
		const tree = renderer.create(<Form />).toJSON();
		expect(tree).toMatchSnapshot();
	});

      
 });