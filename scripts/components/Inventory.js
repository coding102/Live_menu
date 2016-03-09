/*
  Inventory
  <Inventory/>
*/

import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';
import Firebase from 'firebase';
// const = variable that cannot be overwritten
const ref = new Firebase('https://crackling-fire-7238.firebaseio.com/');

@autobind
class Inventory extends React.Component {
  
        constructor() {
    super();
    
    this.state = {
        uid : ''
    }
}

// build authenticate method for line 32,33
authenticate(provider) {
    console.log("trying to " + provider);
    ref.authWithOAuthPopup(provider, this.authHandler);
}

componentWillMount() {
    console.log("checking to see if we can log them in");
    var token = localStorage.getItem('token');
    if(token) {
        ref.authWithCustomToken(token,this.authHandler);
    }
}    

logout () {
    ref.unauth();
    localStorage.removeItem('token');
    this.setState({
        uid : null
    });
}    
    
authHandler(err, authData) {
    if(err) {
        console.err(err);
        return;
    }
    
    // save the login token in the browser
    localStorage.setItem('token', authData.token);
    
    const storeRef = ref.child(this.props.params.storeId);
    storeRef.on('value', (snapshot)=> {
        var data = snapshot.val() || {};
        
        if(!data.owner) {
            // claim store as your own if no owner exists for it
            storeRef.set({
                owner : authData.uid
            });
        }
        
        // update our state to reflect the current store owner/user
        this.setState({
            uid : authData.uid,
            owner : data.owner || authData.uid
            
        })
    });
}    
    
renderLogin () {
    return (
    <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={this.authenticate.bind(this, 'github')}>Log In with Github</button>
        <button className="facebook" onClick={this.authenticate.bind(this, 'facebook')}>>Log In with Facebook</button>
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
    let logoutButton = <button onClick={this.logout}>Log Out!</button>  
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