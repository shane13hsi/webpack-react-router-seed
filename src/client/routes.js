import App from './App';
import SampleTable from './SampleTable/SampleTable';
import React from 'react';
import { Route } from 'react-router';

export default (
  <Route handler={App} name='app' path='/'>
    <Route handler={SampleTable} name='sampleTable' path='/sampleTable'/>
  </Route>
);
