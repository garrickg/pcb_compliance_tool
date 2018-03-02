import React, { Component } from 'react';
import { Button, Form, Input, Header, TextArea } from 'semantic-ui-react';
import { APIKEY } from './env';
import $ from 'jquery';

class App extends Component {
  state = {
    partNumber: '',
    details: ''
  };

  onSubmit = async () => {
    const { partNumber } = this.state;
    let url = `http://octopart.com/api/v3/parts/match?`;
    url += `&queries=[{"mpn":"${partNumber}"}]`;
    url += `&apikey=${APIKEY}`;
    url += `&callback=?`;
    url += `&include[]=compliance_documents`;
    const response = await $.getJSON(url, function(response) {
      return response;
    });
    const details = JSON.stringify(
      response['results'][0]['items'][0]['compliance_documents']
    );
    console.log(details);
    this.setState({
      details: details,
      partNumber: ''
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { partNumber, details } = this.state;
    return (
      <Form>
        <Form.Field>
          <Header>Part Number</Header>
          <Input
            fluid
            placeholder="Part Number"
            name="partNumber"
            value={partNumber}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button type="submit" onClick={this.onSubmit}>
          Submit
        </Button>
        <code class="codeblock">{details}</code>
      </Form>
    );
  }
}

export default App;
