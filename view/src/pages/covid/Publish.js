import React from 'react';
import { useApiGet } from '../../hooks/useApiGet';
import { useUserState } from "../../context/UserContext";
import CircularProgress from '@material-ui/core/CircularProgress';
import FormDispatcher from './FormDispatcher';

// This is the publish entry point for users to update his/her website after logging in.

export default function Publish(props) {
  const { email } = useUserState();
  const statusCmd = {
    host: 'lightapi.net',
    service: 'covid',
    action: 'getWebsiteByEmail',
    version: '0.1.0',
    data: { email }
  }
  var url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(statusCmd));
  var headers = {};
  var siteLoading = false;
  var site = null;
  var siteError = null;
  var { isLoading : siteLoading, data : site, error : siteError } = useApiGet({url, headers});
  //console.log("siteLoading", siteLoading, site, siteError);
  const entityCmd = {
    host: 'lightapi.net',
    service: 'covid',
    action: 'getEntity',
    version: '0.1.0',
    data: { email }
  }
  var url = '/portal/query?cmd=' + encodeURIComponent(JSON.stringify(entityCmd));
  var headers = {};
  var entityLoading = false;
  var entity = null;
  var { isLoading : entityLoading, data : entity, error } = useApiGet({url, headers});
  //console.log("entity = ", entityLoading, entity, error);

  let wait;
  if(siteLoading || entityLoading) {
    wait = <div><CircularProgress/></div>;
  } else {
    // loading completed here.
    if(error) {
      wait = (      
        <div>
          <h2>Failure</h2>
        <pre>{ JSON.stringify(error, null, 2) }</pre>
        </div>
      )  
    } else {
      wait = (
        <FormDispatcher {...props} category={entity.category} subcategory={entity.subcategory} site = {site || {}}/>
      )
    }
  }

  return (
    <div className="App">
      {wait}
    </div>
  );
}
