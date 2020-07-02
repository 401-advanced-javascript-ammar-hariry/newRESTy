import React from 'react';
import ReactJson from 'react-json-view'
import { Route } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form/form.js';
import History from './components/history/history';
import { IfRenderer, Then, Else } from './components/if/if';

import './app.scss';

class App extends React.Component {

constructor(props) {
	super(props);
	this.state = {
	loading: false,
	header : [],
	results: []
	};
 }
 toggleLoading = () => {

		 this.setState({loading:!this.state.loading})
		 console.log("this.state.loading: ",this.state.loading)
}
  handleForm = (results,header) => {

	this.setState( {results,header});
 }
 handelHistory = (method, url, data) => {
	let bodyData= JSON.stringify(data);
	this.setState({ method, url, body: { bodyData } });
}

  render() {
    return (
      <React.Fragment>
        <Header />
        <Route path="/" exact>
        <Form title="button text" toggleLoading={this.toggleLoading} handler={this.handleForm} method={this.state.method} url={this.state.url} body={this.state.body}  /> 
        <IfRenderer condition={!this.state.loading} >
        <Then> 
	<h2>Headers:</h2>
        <ReactJson src={this.state.header} />
         <h2>Results:</h2>
        <ReactJson src={this.state.results} />
        </Then>
      <Else>
      <div className={`loading-${this.state.loading}`}>
      
      </div>
      </Else>
      </IfRenderer>
        </Route>
        <Route path="/history">
          <History handel={this.handelHistory}/>
        </Route>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
