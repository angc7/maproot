import React from 'react';
import { useSiteState } from "../context/SiteContext";
import Home from "../pages/sites/Home";

export default function Restaurant(props) {
  const { menu} = useSiteState();

  let comp;
  switch(menu) {
  	case 'home':
  	  comp = (
		<div>
			<Home {...props}/>	    	
		</div>
  	  )
 	  break;
 	case 'about':
 	  comp = (
		<div>
	    	<pre>{ JSON.stringify(props.site.about, null, 2) }</pre>
		</div>
 	  )
 	  break;
 	case 'catalog':
 	  comp = (
		<div>
	    	<pre>{ JSON.stringify(props.site.catalog, null, 2) }</pre>
		</div>
 	  )
 	  break;
 	case 'reservation':
 	  comp = (
		<div>
	    	<pre>{ JSON.stringify(props.site.catalog, null, 2) }</pre>
		</div>
 	  )
 	  break;
    case 'blog':
      comp = (
		<div>
	    	<pre>{ JSON.stringify(props.site.catalog, null, 2) }</pre>
		</div>
      )
      break;
    case 'contact':
      comp = (
		<div>
	    	<pre>{ JSON.stringify(props.site.catalog, null, 2) }</pre>
		</div>
      )
      break;
    default:
      console.log("wrong menu ", menu);
      break;
  }
  return (
    <div className="App">
      {comp}
    </div>
  );
}
