const {
  getAllContacts,
  getById,
  createContact,
  deleteContact,
  updatingContact,
  updatingStatusContact,
} = require("../service");

const listContacts = async (req, res, next) => {
  try {
    const response = await getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: response,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  try {
    const response = await getById(contactId);
    if (response) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: response },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await deleteContact(contactId);
    res.status(200).json({
      status: "deleted",
      code: 200,
      data: { message: response },
    });
  } catch (e) {
    res.status(404).json({
      status: "failed",
      code: 404,
      data: { message: e.message },
    });
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = req.body;
    const response = await createContact(contact);

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: response },
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      code: 400,
      data: { message: e.message },
    });
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const newContact = req.body;

    const response = await updatingContact(contactId, newContact);
    res.status(200).json({
      status: "updated",
      code: 200,
      data: { message: response },
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      code: 400,
      data: { message: e.message },
    });
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const newStatus = req.body;

  try {
    if (newStatus) {
      await updatingStatusContact(contactId, newStatus);
      const response = await getById(contactId);

      res.status(200).json({
        status: "updated",
        code: 200,
        data: { contact: response },
      });
    } else {
      res.status(400).json({
        status: "failed",
        code: 400,
        data: { message: "missing field favorite" },
      });
    }
  } catch (e) {
    res.status(404).json({
      status: "failed",
      code: 404,
      data: { message: "Not found" },
    });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
