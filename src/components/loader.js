import React from 'react';
import { IfRenderer, Then, Else } from './if/if';


const Loader = (props) => {
    return (
	<>
	<h2>asdasd</h2>
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
