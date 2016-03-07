var React = require('react');
var ReactDOM  = require('react-dom');
/*routing*/

var ReactRouter = require('react-router'); 
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var createBrowserHistory = require('history/lib/createBrowserHistory')

// react catalyst allows for two way binding for nested attributes which link-state doesn't allow for
var h = require('./helpers');

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
    <Router history={createBrowserHistory()}>
        <Route path="/" component={StorePicker}/>
        <Route path="/store/:storeId" component={App}/>
        <Route path="*" component={NotFound}/> 
    </Router>
)


ReactDOM.render(routes, document.querySelector('#main'));