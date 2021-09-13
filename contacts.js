
const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs/promises");
const listContacts = require("./db/contacts.json");

 function getListContacts() {
   return  listContacts;
};

function getContactById(contactId) {

    const contactById = listContacts.find(contact => contact.id === contactId);

    if(contactById) {
       return contactById;
    }
    return null;
};

function addContact(contactData) {

    const filePath = path.join("./db", "contacts.json");
    const newContact = { id: v4(), ...contactData };
    updateContacts = [...listContacts, newContact]
    
    fs.writeFile(filePath, JSON.stringify(updateContacts));

    return updateContacts;
};

function removeContact(contactId) {
    const filePath = path.join("./db", "contacts.json");
    const updateContacts = listContacts.filter(contact => contact.id !== contactId);
    fs.writeFile(filePath, JSON.stringify(updateContacts));
    return updateContacts;
};

module.exports = { getListContacts, getContactById, addContact, removeContact };
