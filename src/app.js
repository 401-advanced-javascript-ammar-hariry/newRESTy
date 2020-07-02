import React from 'react';
import ReactJson from 'react-json-view'
import { Route } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form/form.js';
import History from './components/history/history';
import Loader from './components/loader';

import './app.scss';

class App extends React.Component {

constructor(props) {
	super(props);
	this.state = {
	loading: '',
	header : [],
	results: []
	};
 }
 toggleLoading = () => {
	 if(this.state.loading===''){
		 let loading = false;
		 this.setState({loading : !loading})
		 console.log("this.state.loading: ", !loading)
	 }else{
		let loading = true;
		this.setState({loading : !loading})
		 console.log("this.state.loading: ", !loading) 
	 }
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
	<Loader loading={this.state.loading} />
      <h2>Headers:</h2>
        <ReactJson src={this.state.header} />
         <h2>Results:</h2>
        <ReactJson src={this.state.results} />

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
