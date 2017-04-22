import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import FieldGroup from './field-group';

export default class CardForm extends Component {
    constructor(props) {
        super();
        this.formData = {
            cvc: '',
            name: '',
            number: '',
            expiry: '',
            focused: 'name'
        }
        this.onFormChange = this.onFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }
    onFormChange(e) {
        this.formData[e.target.name] = e.target.value;
        this.props.onChange(this.formData);
    }
    handleSubmit() {
        this.props.onSubmit(this.formData);
    }
    handleFocus(e) {
        this.formData.focused = e.target.name;
        this.props.onChange(this.formData);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
          <FieldGroup
            onChange={this.onFormChange}
            onFocus={this.handleFocus}
            name="number"
            type="text"
            label="Номер карты"
            placeholder="4545 4545 4545 4545"
          />
          <FieldGroup
            onChange={this.onFormChange}
            onFocus={this.handleFocus}
            name="name"
            type="text"
            label="Имя"
            placeholder="Pavel Paulovich"
          />
          <FieldGroup
            onChange={this.onFormChange}
            onFocus={this.handleFocus}
            name="expiry"
            type="text"
            label="Expirity date"
            placeholder="03/22"
          />
          <FieldGroup
            onChange={this.onFormChange}
            onFocus={this.handleFocus}
            name="cvc"
            label="CVC"
            type="cvc"
            placeholder="234"
          />
          <Button onClick={this.handleSubmit}>Оплатить</Button>
      </form>
        )
    }
}
