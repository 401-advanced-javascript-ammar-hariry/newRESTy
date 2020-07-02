import React from 'react';
import { IfRenderer, Then, Else } from './if/if';
import './loader.scss'

const Loader = (props) => {
	console.log(props.loading);
    return (
	<>	
	<IfRenderer condition={props.loading ==='true'} >
	  <Then>
	  <div className={`loading-true`}>
	</div>
	</Then>
	<Else>
	
	</Else>
	</IfRenderer>
      </>
    );
  }


export default Loader;
