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
      return await contactsOperations.getListContacts()
        .then(data => console.table(data))
        .catch(error => console.table(error));
      
    case 'get':
      return await contactsOperations.getContactById(id)
        .then(data => console.table(data))
        .catch(error => console.table(error));
 
    case 'add':
      return await contactsOperations.addContact({ name, email, phone })
        .then(data => console.table(data))
        .catch(error => console.table(error));
 
    case 'remove':
      return await contactsOperations.removeContact(id)
        .then(data => console.table(data))
        .catch(error => console.table(error));

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
    
