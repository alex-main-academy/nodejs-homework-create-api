const Contact = require("./schemas/contacts");

const getAllContacts = async () => {
  return Contact.find();
};

const getById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone, favourite }) => {
  return Contact.create({ name, email, phone, favourite });
};

const deleteContact = (id) => {
  return Contact.remove({ _id: id });
};

const updatingContact = (id, newContact) => {
  return Contact.update({ _id: id }, newContact, { upsert: false });
};

const updatingStatusContact = (id, body) => {
  return Contact.update({ _id: id }, body, { upsert: false });
};

module.exports = {
  getAllContacts,
  getById,
  createContact,
  deleteContact,
  updatingContact,
  updatingStatusContact,
};
