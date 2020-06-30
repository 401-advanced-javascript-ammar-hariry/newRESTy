import React from 'react';
import ReactJson from 'react-json-view'
import './app.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form/form.js';

class App extends React.Component {

constructor(props) {
	super(props);
	this.state = {
	header : [],
	results: []
	};
 }
  handleForm = (results,header) => {
	this.setState( {results,header});
	
 }
 
	  
  render() {
    return (
      <React.Fragment>
        <Header />
        <Form title="button text" handler={this.handleForm} />  
        <ReactJson src={this.state.header} />
        <ReactJson src={this.state.results} />
          <Footer />
      </React.Fragment>
    );
  }
}

export default App;
