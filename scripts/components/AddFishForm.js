/*
Add Product Form
<AddFishForm/>
*/
import React from 'react' ;


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
});


export default AddFishForm;