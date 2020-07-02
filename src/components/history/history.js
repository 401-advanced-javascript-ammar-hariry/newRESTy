import React from 'react';
import { Link } from 'react-router-dom';
import './history.scss'

class History extends React.Component {
    constructor(props) {
        super(props);
        this.handlerClick = this.handlerClick.bind(this);
    }
    handlerClick(e) {
        let array = e.target.value.split('  ');
        
        if (array[5]) {
            let method = array[1];
            let url = array[3];
            let data = array[5];
            this.props.handel(method,url,data);
        }
        else {
            let method = array[1];
            let url = array[3];
            this.props.handel(method,url); 
        }
    }

    getDataLocal() {
        let historyStorage = JSON.parse(localStorage.getItem('history'));
        let searches ;
        if (historyStorage) {
            return searches = historyStorage.map((search, i) => {
                if (search.body) {
		let body = JSON.stringify(search.body);
                    return <input type='text' readOnly='readonly' onClick={this.handlerClick} key={i} value={`method:  ${search.method}  url:  ${search.url}  body:  ${body}`} />
                }
                else {
                    return <input type='text' readOnly='readonly' onClick={this.handlerClick} key={i} value={`method:  ${search.method}  url:  ${search.url}`} />
                }
            });
        }
    }


    render() {
        return (
	 <div className='history-links'> 
            <ul>
                <Link to='/'>
                {this.getDataLocal()}
                </Link>
            </ul>
	  </div>
        )
    }
}
export default History;