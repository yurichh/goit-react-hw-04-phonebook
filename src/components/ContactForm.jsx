import React from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { Component } from 'react';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  createContactObj = e => {
    e.preventDefault();

    /* Перевірка на заповнення полів */
    if (!this.state.name || !this.state.number) {
      Notiflix.Notify.warning('Ooops... Something missed', {
        position: 'center-top',
        distance: '50px',
        fontSize: '40px',
        width: '600px',
      });
      return;
    }

    const newContactObj = {
      name: this.state.name,
      number: this.state.number,
      id: nanoid(),
    };

    this.props.handleAddContact(newContactObj);
    this.setState({ name: '', number: '' });

    // e.target.form.reset();
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form action="submit" className="add-form">
        <label htmlFor="name" className="add-label">
          Name
        </label>
        <input
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          onChange={this.handleChange}
          type="text"
          name="name"
          required
          value={this.state.name}
          className="add-input"
        />
        <label htmlFor="number" className="add-label">
          Number
        </label>
        <input
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          onChange={this.handleChange}
          type="tel"
          name="number"
          required
          value={this.state.number}
          className="add-input"
        />
        <button
          className="add-btn"
          type="submit"
          onClick={this.createContactObj}
        >
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
