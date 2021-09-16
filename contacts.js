
const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs/promises");

async function getListContacts() {
   return JSON.parse(await fs.readFile("./db/contacts.json", 'utf-8'));
};

async function getContactById(contactId) {

    const listContacts = await getListContacts();

    const contactById = listContacts.find(contact => contact.id === contactId);

    if(contactById) {
       return contactById;
    }
    return null;
};

async function addContact(contactData) {
    const listContacts = await getListContacts();
    const newContact = { id: v4(), ...contactData };
    const updateContacts = [...listContacts, newContact];
    const filePath = path.join("./db", "contacts.json");
    fs.writeFile(filePath, JSON.stringify(updateContacts));
    return updateContacts;
};

async function removeContact(contactId) {
    const listContacts = await getListContacts();
    const updateContacts = listContacts.filter(contact => contact.id !== contactId);
    const filePath = path.join("./db", "contacts.json");
    fs.writeFile(filePath, JSON.stringify(updateContacts));
    return updateContacts;
};

module.exports = { getListContacts, getContactById, addContact, removeContact };
