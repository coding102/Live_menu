var React = require('react');
var ReactDOM  = require('react-dom');
/*routing*/

var ReactRouter = require('react-router'); 
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory')
/*
    App "main component
*/

var App = React.createClass({
    
    render : function() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order/>
                <Inventory/>
            </div>
        )
    }
})

/*
    Header "sub component"
    <Header/>
*/

var Header = React.createClass({
    render : function() {
        return (
            <header className="top">
            <h1>Catch 
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
            Day</h1>
            <h3 className="tagline"><span>{this.props.tagline}</span></h3>
            </header>
        )
    }
})

/*
    Order "sub component"
    <Order/>
*/

var Order = React.createClass({
    render : function() {
        return (
            <p>Order</p>
        )
    }
})
/*
    Inventory "subcomponent"
    <Order/>
*/

var Inventory = React.createClass({
    render : function() {
        return (
            <p>Inventory</p>
        )
    }
})


/*
    STOREPICKER "sub component
    This will let us make <StorePicker/>
*/

var StorePicker  =React.createClass({

    render : function() {
    var name = "Mark";
        return (
            <form className="store-selector">
                <h2>Please Enter A Store</h2>
                <input type="text" ref="storeId" required />
                <input type="Submit" />
            </form>
        )
    }
    
});


/*
    Page not found component
*/

var Notfound = React.createClass({
    render : function() {
        return <h1>Not Found!</h1>
    }
});


/*
    Routes
*/

var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={StorePicker}/>
        <Route path="/store/:storeId" component={App}/>
        <Route path="*" component={Notfound}/> 
    </Router>
)


ReactDOM.render(routes, document.querySelector('#main'));