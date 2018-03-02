import React, { Component } from 'react'
import { Button, Form, Input, Header } from 'semantic-ui-react'
require('dotenv').config({path: '../'});

class App extends Component {
  state = {
    partNumber: '',
    details: {},
  };

  onSubmit = () =>{
    console.log('clicked!')
    const { partNumber } = this.state;
    console.log(partNumber);
    let url = `http://octopart.com/api/v3/parts/match?`;
    url += `&queries=[{"mpn":"${partNumber}"}]`;
    url += `&apikey=${process.env.APIKEY}`;
    url += `&callback=?`;
    url += `&include[]=compliance_documents`;
    console.log(url);
    // fetch(url, {
    //   mode: 'no-cors',
    // })
    //   .then(function(response) {
    //     response.forEach((data) => {
    //       console.log(data)
    //     });
    //   });
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {partNumber, details} = this.state;
    return (
    <Form>
      <Form.Field>
        <Header>Part Number</Header>
        <Input 
        fluid 
        placeholder='Part Number'
        name="partNumber"
        value={partNumber}
        onChange={this.onChange}
        />
      </Form.Field>
      <Button type='submit' onClick={this.onSubmit}>Submit</Button>
    </Form>
    )
  }
}

export default App