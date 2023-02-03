const fs = require("fs/promises");
const path = require("path");
const { addContactSchema, updateContactSchema } = require("./schema");

const currentPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const response = await fs.readFile(currentPath);
    return response;
  } catch (e) {
    return e.message;
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await JSON.parse(await fs.readFile(currentPath));
    const contact = await contactsList.filter((item) => item.id === contactId);

    if (contact.length === 1) {
      return contact;
    } else {
      const error = new Error("Not found!");
      error.status = 404;
      throw error;
    }
  } catch (e) {
    return e;
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await JSON.parse(await fs.readFile(currentPath));
    const newContactsList = await contactsList.filter(
      (item) => item.id !== contactId
    );

    if (newContactsList.length === contactsList.length - 1) {
      await fs.writeFile(currentPath, JSON.stringify(newContactsList, null, 2));

      return { message: "contact deleted" };
    } else {
      const error = new Error("Not found!");
      error.status = 404;
      throw error;
    }
  } catch (e) {
    return e;
  }
};

const addContact = async (body) => {
  try {
    const contact = await addContactSchema.validateAsync(body);
    const contactsList = await JSON.parse(await fs.readFile(currentPath));
    contactsList.push(contact);

    await fs.writeFile(currentPath, JSON.stringify(contactsList, null, 2));
    const response = contactsList.filter((item) => item.id === body.id);
    return response;
  } catch (e) {
    return e;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await updateContactSchema.validateAsync(body);

    const listContacts = await JSON.parse(await fs.readFile(currentPath));
    let contact = listContacts.find((item) => item.id === contactId);

    if (contact) {
      contact = { ...contact, ...updatedContact };

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
  } catch (e) {
    return e;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
