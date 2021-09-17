const { Command } = require('commander');
const program = new Command();
const contactsOperations = require("./contacts");
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      try {
        return console.table(await contactsOperations.getListContacts());
      } catch (error) {
        throw error;
      };

    case 'get':
      try {
        return console.table(await contactsOperations.getContactById(id));
      } catch (error) {
        throw error;
      };
 
    case 'add':
      try {
        return console.table(await contactsOperations.addContact({ name, email, phone }))
      } catch (error) {
        throw error;
      };

    case 'remove':
    try {
      return console.table(await contactsOperations.removeContact(id));
    } catch (error) {
      throw error;
    }

    default:
      console.warn('\x1B[31m Unknown action type!');
  };
};

invokeAction(argv);
    
