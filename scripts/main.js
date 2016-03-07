var React = require('react');
var ReactDOM  = require('react-dom');
/*routing*/

var ReactRouter = require('react-router'); 
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var createBrowserHistory = require('history/lib/createBrowserHistory')

// Firebase
var Rebase = require('re-base');
var base = Rebase.createClass('https://crackling-fire-7238.firebaseio.com');

// react catalyst allows for two way binding for nested attributes which link-state doesn't allow for
var h = require('./helpers');

// react catalyst allows for two way binding for nested attributes which link-state doesn't allow for
var Catalyst = require('react-catalyst');

/*
    Import Components
*/
import NotFound from './components/NotFound' ;
import StorePicker from './components/StorePicker' ;
import Header from './components/Header' ;
import Fish from './components/Fish' ;
import Order from './components/Order' ;
import AddFishForm from './components/AddFishForm' ;

///////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    App "main component
*/
var App = React.createClass({
    mixins : [Catalyst.LinkedStateMixin],
    getInitialState : function() {
        return {
            // we will be syncing 'fishes' state to firebase not the 'order' 
            fishes : {},  
            order : {}
        };
    },

    // syncing 'fishes' state to firebase backend  
    componentDidMount : function() {
        base.syncState(this.props.params.storeId + '/fishes', {
            context : this, 
            state : 'fishes'
        });     
    
    
        var localStorageRef  = localStorage.getItem('order-' + this.props.params.storeId);
    
        if(localStorageRef) {
            // update component state to what locaStorage has
            this.setState({
                order : JSON.parse(localStorageRef)
            }); 
        }
    },
    
    // pass new props or new state when data changes "event listener"
    componentWillUpdate : function(nexProps, nextState) {
        // Resources, Local Storage 
        localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
    },
    
    addToOrder : function(key) {
        this.state.order[key] = this.state.order[key] + 1 || 1;
        this.setState({ order : this.state.order });
    },
    
    removeFromOrder : function(key) {
         delete this.state.order[key];
        this.setState({
            order : this.state.order
        });
    },
    
    addFish : function(fish) {
        var timestamp = (new Date()).getTime();
        // update the state object
        this.state.fishes['fish-' + timestamp] = fish;
        // set the state, pass an object of what has changed
        this.setState({ fishes : this.state.fishes });
    },
    
// remove item action
removeFish : function(key) {
    if(confirm("are you sure you want to remove this item?")) {
    
        this.state.fishes[key] = null;
        this.setState({
        fishes :this.state.fishes
        });
    }
},
    
loadSamples : function() {
    this.setState({
        fishes : require('./sample-fishes')
    })
},
    renderFish :function(key) {
        return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
    },
    render : function() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className ="list-of-fishes">
                        {Object.keys(this.state.fishes).map(this.renderFish)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples}
                    fishes={this.state.fishes} linkState={this.linkState} removeFish={this.removeFish} />
            </div>
        )
    }
})

/*
    Inventory "subcomponent"
    <Order/>
*/

var Inventory = React.createClass({
    renderInventory : function(key) {
        var linkState = this.props.linkState;
        return (
            <div className="fish-edit" key={key}>
                <input type="text" valueLink={linkState('fishes.'+ key +'.name')}/>
                <input type="text" valueLink={linkState('fishes.'+ key +'.price')}/>
                
                <select valueLink={linkState('fishes.' + key + '.status')}>
                    <option value="unavailable">Sold Out!</option>
                    <option value="available">Fresh!</option>
                </select>
        
                <textarea valueLink={linkState('fishes.' + key + '.desc')}></textarea>
                
                <input type="text" valueLink={linkState('fishes.' + key +'.image')} />                  
                
                <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
                
            </div>
       ) 
    },
    render : function() {
        
        return (
            <div>
                <h2>Inventory</h2>
            
                {Object.keys(this.props.fishes).map(this.renderInventory)}

                <AddFishForm {...this.props} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    },
    propTypes : {
        addFish : React.PropTypes.func.isRequired,
        loadSamples : React.PropTypes.func.isRequired,
        fishes : React.PropTypes.object.isRequired,
        linkState : React.PropTypes.func.isRequired,
        removeFish : React.PropTypes.func.isRequired,
    }
})

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