import React from 'react';

const ContactList = ({ contactsArray, handleDelete }) => {
  return (
    <>
      <ul className="contacts-list">
        {contactsArray.map(({ name, number, id }) => (
          <li id={id} key={id} className="contacts-item">
            <p className="contacts-item-name">
              {name}:<span className="contacts-item-number">{number}</span>
            </p>
            <button
              onClick={() => {
                handleDelete(id);
              }}
              className="delete-btn"
            >
              Delete contact
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
