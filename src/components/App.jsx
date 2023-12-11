import { Component } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) this.setState({ contacts: JSON.parse(localData) });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  checkNameForRepeat = contactName => {
    return this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contactName.toLowerCase()
    );
  };

  handleFilter = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleAddContact = obj => {
    /*Перевірка чи існує контакт*/
    if (this.checkNameForRepeat(obj.name)) {
      Notiflix.Notify.warning(`${obj.name} is already in contacts`, {
        position: 'center-top',
        distance: '50px',
        fontSize: '40px',
        width: '600px',
      });
      return;
    }

    this.setState(prev => {
      return {
        contacts: [...prev.contacts, obj],
      };
    });
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(c =>
      c.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <>
        <h1 className="title">Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />

        <section className="contacts-wrapper">
          <h1 className="title">Contacts</h1>
          <Filter handleFilter={this.handleFilter} />
          <ContactList
            contactsArray={this.getVisibleContacts()}
            handleDelete={this.handleDelete}
          />
        </section>
      </>
    );
  }
}
