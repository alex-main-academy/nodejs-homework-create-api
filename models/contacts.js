const fs = require("fs/promises");
const path = require("path");

const currentPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const response = await fs.readFile(currentPath);
  return response;
};

const getContactById = async (contactId) => {
  const contactsList = await JSON.parse(await fs.readFile(currentPath));
  const contact = await contactsList.filter((item) => item.id === contactId);

  if (contact.length === 1) {
    return contact;
  } else {
    const error = new Error("Not found!");
    error.status = 404;
    throw error;
  }
};

const removeContact = async (contactId) => {
  const contactsList = await JSON.parse(await fs.readFile(currentPath));
  const newContactsList = await contactsList.filter(
    (item) => item.id !== contactId
  );

  if (newContactsList.length === contactsList.length - 1) {
    await fs.writeFile(currentPath, JSON.stringify(newContactsList, null, 2));
  } else {
    const error = new Error();
    error.message = "Not found";
    throw error;
  }
};

const addContact = async (body) => {
  const contactsList = await JSON.parse(await fs.readFile(currentPath));
  contactsList.push(body);

  await fs.writeFile(currentPath, JSON.stringify(contactsList, null, 2));
  const response = contactsList.filter((item) => item.id === body.id);
  return response;
};

const updateContact = async (contactId, body) => {
  const listContacts = await JSON.parse(await fs.readFile(currentPath));
  let contact = listContacts.find((item) => item.id === contactId);

  if (contact) {
    contact = { ...contact, ...body };

    const newContactsList = listContacts.filter(
      (item) => item.id !== contactId
    );
    newContactsList.push(contact);

    await fs.writeFile(currentPath, JSON.stringify(newContactsList, null, 2));

    return contact;
  } else {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
