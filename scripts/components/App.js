/*
    App "main component
*/

import React from 'react';
import Header from './Header' ;
import Fish from './Fish' ;
import Order from './Order' ;
import AddFishForm from './AddFishForm' ;
import Inventory from './Inventory' ;

// react catalyst allows for two way binding for nested attributes which link-state doesn't allow for
import Catalyst from 'react-catalyst';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://crackling-fire-7238.firebaseio.com');
////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        fishes : require('../sample-fishes')
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
});

export default App;
