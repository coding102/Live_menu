/*
  Inventory
  <Inventory/>
*/

import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';
import Firebase from 'firebase';
const ref = new Firebase('https://crackling-fire-7238.firebaseio.com/');

@autobind
class Inventory extends React.Component {
  
        constructor() {
    super();
    
    this.state = {
        uid : ''
    }
}

renderLogin () {
    return (
    <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github">Log In with Github</button>
        <button className="facebook">Log In with Facebook</button>
    </nav>
    )
}
    
    
  renderInventory(key) {
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
        <input type="text" valueLink={linkState('fishes.'+ key +'.image')}/>
        <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
        
      </div>
    )
  }

  render() {
    // store button in variable to easily call on later
    let logoutButton = <button>Log Out!</button>  
    // check if they aren't logged in
    if(!this.state.uid) {
        return (
            <div>{this.renderLogin()}</div>
        )
    }
      
    // check to see if they aren't the owner of the current store
    if(this.state.uid !== this.state.owner) {
        return (
            <div>
                <p> Sorry, you aren't the store owner</p>
                {logoutButton}
            </div>
        )
    }
      
    return (
      <div>
        <h2>Inventory</h2>
        {logoutButton}
        
        {Object.keys(this.props.fishes).map(this.renderInventory)}

        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
};

Inventory.propTypes = {
    addFish : React.PropTypes.func.isRequired,
    loadSamples : React.PropTypes.func.isRequired,
    fishes : React.PropTypes.object.isRequired,
    linkState : React.PropTypes.func.isRequired,
    removeFish : React.PropTypes.func.isRequired
}

export default Inventory;