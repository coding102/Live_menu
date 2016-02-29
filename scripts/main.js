var React = require('react');
var ReactDOM  = require('react-dom');
/*
    App "main component
*/

var App = React.createClass({
    
    render : function() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header />
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
            <p>Header</p>
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

ReactDOM.render(<App/>, document.querySelector('#main'));