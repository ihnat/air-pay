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
            margin: '0 auto'
        }
        let form = (
            <Col md={4}>
            <Card
              className={cardStyle}
              number={this.state.number}
              expiry={this.state.expiry}
              cvc={this.state.cvc}
              name={this.state.name}
              focused={this.state.focused}/>
            <CardForm
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}/>
          </Col>
        )
        let thanks = (
            <Col md={4}>
            <h2>Thanks for using our service!</h2>
          </Col>
        )
        let wrong = (
            <Col md={4}>
            <h2>Opps, something went wrong!</h2>
            <Button onClick={this.goBack}>Try again</Button>
          </Col>
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
                {content}
              </Row>
            </div>
        );
    }
}

export default App;
