
const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs/promises");

async function getListContacts() {
   try {
       return JSON.parse(await fs.readFile("./db/contacts.json", 'utf-8'));
   } catch (error) {
       throw error;
   }
};

async function getContactById(contactId) {

    try {
        const listContacts = await getListContacts();
        const contactById = listContacts.find(contact => contact.id === contactId);
        if(!contactById) {
            return null;
        }
        return contactById;

    } catch (error) {
        throw error;
    };
};

async function addContact(contactData) {
 try {
    const listContacts = await getListContacts();
    const newContact = { id: v4(), ...contactData };
    const updateContacts = [...listContacts, newContact];
    const filePath = path.join("./db", "contacts.json");
    await fs.writeFile(filePath, JSON.stringify(updateContacts));
    return updateContacts;
 } catch (error) {
     throw error;
 }
};

async function removeContact(contactId) {
try {
    const listContacts = await getListContacts();
    const updateContacts = listContacts.filter(contact => contact.id !== contactId);
    const filePath = path.join("./db", "contacts.json");
    await fs.writeFile(filePath, JSON.stringify(updateContacts));
    return updateContacts;
} catch (error) {
    throw error;
}
};

module.exports = { getListContacts, getContactById, addContact, removeContact };
