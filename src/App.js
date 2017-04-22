import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import { Col, Row, Button } from 'react-bootstrap';

import Card from 'react-credit-card';

import CardForm from './components/card-form';

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            cvc: '',
            name: '',
            number: '',
            expiry: '',
            focused: 'name',
            // status
            status: 'new'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    handleChange(formData) {
        this.setState(Object.assign({}, formData));
    }
    handleSubmit(formData) {
        let self = this;
        axios.post('/pay', formData)
            .then(function (response) {
                self.setState({ status: 'thanks' });
                console.log(response);

            })
            .catch(function (error) {
                self.setState({ status: 'wrong' });
                console.log(error);
            });
    }
    goBack() {
        this.setState({ status: 'new' });
    }
    render() {
        let cardStyle = {
            display: 'inline-block',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
        let form = (
            <div>

            <div style={cardStyle}>
              <Card
                className="test"
                number={this.state.number}
                expiry={this.state.expiry}
                cvc={this.state.cvc}
                name={this.state.name}
                focused={this.state.focused}/>
            </div>
            <CardForm
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}/>
          </div>
        )
        let thanks = (
            <div>
            <h2>Thanks for using our service!</h2>
          </div>
        )
        let wrong = (
            <div>
            <h2>Opps, something went wrong!</h2>
            <Button onClick={this.goBack}>Try again</Button>
          </div>
        )
        let content;
        if (this.state.status === 'new') {
            content = form;
        } else if (this.state.status === 'thanks') {
            content = thanks;
        } else {
            content = wrong;
        }

        return (
            <div className="App">
              <Row>
                <Col sm={2} md={4} lg={4}></Col>
                <Col sm={8} md={4} lg={4}>
                  <Row>
                    {content}
                  </Row>
                </Col>
                <Col sm={2} md={4} lg={4}></Col>
              </Row>

            </div>
        );
    }
}

export default App;
