var React = require('react');
var ReactDOM  = require('react-dom');
/*routing*/

var ReactRouter = require('react-router'); 
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation; // mixin

var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory')

var h = require('./helpers');
/*
    App "main component
*/

var App = React.createClass({
    getInitialState : function() {
        return {
            fishes : {},
            order : {}
        }
    },
    
    addFish : function(fish) {
        var timestamp = (new Date()).getTime();
        // update the state object
        this.state.fishes['fish-' + timestamp] = fish;
        // set the state, pass an object of what has changed
        this.setState({ fishes : this.state.fishes });
},
    
    render : function() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order/>
                <Inventory addFish={this.addFish} />
            </div>
        )
    }
})

/*
Add Product Form
<AddFishForm/>
*/

var AddFishForm = React.createClass({
    createFish : function(event) {
    // 1 stop the form from submitting
        event.preventDefault();
    // 2 take data from the form to create object
        var fish = {
            name : this.refs.name.value,
            price : this.refs.name.value,
            status : this.refs.name.value,
            desc : this.refs.name.value,
            image : this.refs.name.value,
        }
        
    // 3 add the product to the App State, pass down into </inventory> "props"
        this.props.addFish(fish);
        //on submit clear form, add ref to form
        this.refs.fishForm.reset();
        
    },
    render : function() {
        return (
            <form className="fish-edit" ref="fishForm"onSubmit={this.createFish}>
                <input type="text" ref="name" placeholder="Fish Name" />
                <input type="text" ref="price" placeholder="Fish Price" />
                <select ref="status">
                    <option value="available"> Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" ref="desc" placeholder="Desc"></textarea>
                <input type="text" ref="image" placeholder="URL to Image" />
                <button type="submit">+ Add Item </button>
            </form>    
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
            <div>
            <h2>Inventory</h2>
            <AddFishForm {...this.props} />
            </div>
        )
    }
})


/*
    STOREPICKER "sub component
    This will let us make <StorePicker/>
*/

var StorePicker  =React.createClass({
    mixins : [History],
//  listen to event    
    goToStore : function(event) {
//      prevent default submit from happening and do manually  /  prevent default page refresh
        event.preventDefault();
//      get the input data  "this" method refers to component
        var storeId = this.refs.storeId.value;
//      react router  "Push store name "input" into the URL
        this.history.pushState(null, '/store/' + storeId);
//      on submit move from <StorePicker/> to <App/>
    },
    
    render : function() {
    var name = "Mark";
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
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