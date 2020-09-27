
import React from 'react'
import { Offline, Online } from 'react-detect-offline'

import axios from "axios"; 
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class NForm extends React.Component {
 
  
    state = {
      name: '',
      age : '',
      address : ''
    };
  /* This is where the magic happens 
  */
  handleSubmit = event => {
      event.preventDefault();
      const user = {
        name: this.state.name,
        age : this.state.age,
        address : this.state.address
      }
      axios.post('http://localhost:4000/items', { user })
        .then(res=>{
          console.log(res);
          console.log(res.data);
           //This line of code will redirect you once the submission is succeed
        })
    }
  handleChange = event =>{
    console.log("on change");
      
      var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    console.log(idAttr);
    var value = idAttr.nodeValue;
    console.log(value);
    if (value == "name") {
      this.setState({ name: event.target.value});
    } 
    else if(value == "age") {
      this.setState({ age: event.target.value});
    }
    else
    {
      this.setState({ address: event.target.value});

    }
    }
  
    render() {
      return (
        <div>
        
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Enter username</label>
          <input id="name" name="name" type="text" onChange= {this.handleChange}/>
  
          <label htmlFor="age">Enter your age</label>
          <input id="age" name="age" type="text" onChange= {this.handleChange} />
  
          <label htmlFor="address">Enter your address</label>
          <input id="address" name="address" type="text" onChange= {this.handleChange} />
  
          <button>Send data!</button>
        </form>
        </div>
      );
    }
  }
  export default NForm