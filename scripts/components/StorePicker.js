/*
    STOREPICKER "sub component
    This will let us make <StorePicker/>
*/
import React from 'react' ;

import { Navigation } from 'react-router'
import { History } from 'react-router'
import h from '../helpers';

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
                <input type="text" ref="storeId" defaultValue={h.getFunName()}required />
                <input type="Submit" />
            </form>
        )
    }
    
});

export default StorePicker;