import React from 'react';
import { IfRenderer, Then, Else } from './if/if';
import '../app.scss'

const Loader = (props) => {
    return (
	<>
	<div><h2>asdasd</h2></div>
	
	<IfRenderer condition={!props.loading} >
	  <Then>
	</Then>
	<Else>
	<div className={`loading-${props.loading}`}>
	
	</div>
	</Else>
	</IfRenderer>
      </>
    );
  }


export default Loader;
