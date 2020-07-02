import React from 'react';
import superagent from 'superagent';
import './form.scss';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      url: '',
      method: '',
      body:'',
      request:{}
    };
    this.hestoryArray = [];
  }

  handleSubmit = async e => {
    e.preventDefault();
  
    this.props.toggleLoading();
    if ( this.state.url && this.state.method ) { 
	let url = '';
	let method = '';
	let body ='';
	let request ={
		url: this.state.url,
		method : this.state.method,
		body :this.state.body.data,
         }
	body = this.state.body.data 
  	if(this.state.method  === 'post' && this.state.body.data ){

	    await this.postHandler();
		this.saveLocalStorage();
	}else if(this.state.method  === 'put' && this.state.body.data){

	     await this.postHandler();
		 this.saveLocalStorage();
	} else if(this.state.method  === 'delete'){

		const requestOptionsDelete = {
		method: 'DELETE',
  		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({body})
	 };
		await fetch( this.state.url, requestOptionsDelete)

		this.saveLocalStorage();
	} else {

		url= this.state.url;
		method= this.state.method;
		superagent.get(url)
		.then(data=>{
		let people = data.body;
		let headers = data.headers;		
		this.props.handler(people,headers);
	});	
	await this.saveLocalStorage();
	}
      this.setState({request, url, method,body});
      this.props.toggleLoading()
    }else {

      alert('missing information');
   	}
  }
    
  saveLocalStorage(){
	let queryLocalStorage = JSON.parse(localStorage.getItem('query'));
	if(queryLocalStorage){
	  this.hestoryArray = queryLocalStorage;
	}
	// console.log(']]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]>',this.state.method );
	
	let objLocalStorage = { method: this.state.method , url: this.state.url,body: this.state.body}
	let counter = 0;
	this.hestoryArray.forEach(val =>{
	  if(val.method === objLocalStorage.method && val.url === objLocalStorage.url){
	    counter = 1;
	}
	});
	if(counter === 0){
	  this.hestoryArray.push(objLocalStorage);
	  localStorage.setItem('query',JSON.stringify(this.hestoryArray));
        }
  }
  postHandler(){
	const requestOptions = {
		method: this.state.method.toUpperCase(),
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
		'Content-Type': 'application/json'
			},
		redirect: 'follow',
		referrerPolicy: 'no-referrer', 
		body: JSON.stringify( this.state.body.data)
		      };
		 fetch( this.state.url, requestOptions)
		.then(data => this.setState(this.state.body.data))
  }
  handleChangeURL = e => {
	  
    const url = e.target.value;
    this.setState({url});    
  };

  handleChangeMethod = e => {

    const method = e.target.id;
    this.setState({ method });
  };

  bodyHandel = e =>{
	  
	const data =JSON.parse(e.target.value);
	this.setState({ body : {data} });	  
  }
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label >
            <span>URL: </span>
            <input name='url' type='text'  onChange={this.handleChangeURL}  />
            <button type="submit">{this.props.title}</button>
          </label>
          <label className="methods">
            <span className={this.state.method === 'get' ? 'active' : ''} id="get" onClick={this.handleChangeMethod}>GET</span>
            <span className={this.state.method === 'post' ? 'active' : ''} id="post" onClick={this.handleChangeMethod}>POST</span>
            <span className={this.state.method === 'put' ? 'active' : ''} id="put" onClick={this.handleChangeMethod}>PUT</span>
            <span className={this.state.method === 'delete' ? 'active' : ''} id="delete" onClick={this.handleChangeMethod}>DELETE</span>
          </label>
	<textarea name='body' rows="7" cols="50" onChange={this.bodyHandel}> 

         </textarea>
        </form>
        <section className="results">
          <span className="method">{this.state.request.method}</span>
          <span className="url">{this.state.request.url}</span>
        </section>
      </>
    );
  }
}

export default Form;
