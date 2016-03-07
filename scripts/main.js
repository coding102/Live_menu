import React from 'react';
import ReactDOM from 'react-dom';
/*routing*/

import { Router, Route } from 'react-router';

//var createBrowserHistory = require('history/lib/createBrowserHistory')
import { createHistory } from 'history';
// react catalyst allows for two way binding for nested attributes which link-state doesn't allow for

/*
    Import Components
*/
import NotFound from './components/NotFound' ;
import StorePicker from './components/StorePicker' ;
import App from './components/App';

///////////////////////////////////////////////////////////////////////////////////////////////////////


/*
    Routes
*/

var routes = (
    <Router history={createHistory()}>
        <Route path="/" component={StorePicker}/>
        <Route path="/store/:storeId" component={App}/>
        <Route path="*" component={NotFound}/> 
    </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));