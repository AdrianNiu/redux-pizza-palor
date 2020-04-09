import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class CustomerInfo extends Component {

state = {
    newCustomer: {
        name: '',
        address: '',
        city: '',
        zip: '',
        type: '',
    }
}

handleChangeFor = ( propertyName, event ) => {
    this.setState({
      newCustomer: {
        ...this.state.newCustomer,
        [propertyName]: event.target.value
      }
    })
}

handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Adding customer`, this.state.newCustomer);
    // POST request to add new customer
    axios.post('/orders', this.state.newCustomer)
      .then(response => {
      console.log('Added successfully');
      })
      .catch (error => {
      console.log('Error adding customer', error);
      })
      this.props.dispatch({type: 'SET_CUSTOMER', payload: this.state.newCustomer})
  }

  render() {
    return (
      <div>
        <header>
                <h1>Prime Pizza</h1>
                {/*Shopping cart icon will go here*/}
                <p>Total: </p>
            </header>
            <main>
                <h2>Step 2: Customer Information</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Name" value={this.state.newCustomer.name} 
                    onChange={(event) => this.handleChangeFor('name', event)}/>
                    <input type="text" placeholder="Street Address" value={this.state.newCustomer.address}
                    onChange={(event) => this.handleChangeFor('address', event)}/>
                    <input type="text" placeholder="City" value={this.state.newCustomer.city}
                    onChange={(event) => this.handleChangeFor('city', event)}/>
                    <input type="text" placeholder="Zip Code" value={this.state.newCustomer.zip}
                    onChange={(event) => this.handleChangeFor('zip', event)}/>
                    <label>
                        <input type="radio" value="yes" defaultChecked name="Pickup" 
                        value={this.state.newCustomer.type} onChange={(event) => this.handleChangeFor('type', event)}/>
                        Pickup
                    </label>
                    <label>
                        <input type="radio" value="yes" name="Delivery" 
                        value={this.state.newCustomer.type} onChange={(event) => this.handleChangeFor('type', event)}/>
                        Delivery
                    </label>
                </form>
                <button type="submit">Next</button>
            </main>
      </div>
    );
  }
}

export default connect()(CustomerInfo);