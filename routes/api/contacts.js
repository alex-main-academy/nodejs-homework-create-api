const express = require("express");
const { v4: uuidv4 } = require("uuid");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const {
  addContactSchema,
  updateContactSchema,
} = require("../../models/schema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const response = await listContacts();
    res.status(200).send(response);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const response = await getContactById(req.params.contactId);
    res.status(200).send(response);
  } catch (e) {
    res.status(e.status).send(e.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const id = uuidv4().toString();
    const contact = await addContactSchema.validateAsync({
      id,
      name,
      email,
      phone,
    });

    const response = await addContact(contact);
    res.status(201).send(response);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    await removeContact(req.params.contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (e) {
    res.status(404).json(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length !== 0) {
      const updatedContact = await updateContactSchema.validateAsync(req.body);
      const response = await updateContact(
        req.params.contactId,
        updatedContact
      );
      res.status(200).send(response);
    } else {
      const error = new Error("missing fields");
      error.status = 400;
      throw error;
    }
  } catch (e) {
    res.status(e.status || 400).json({ message: e.message });
  }
});

module.exports = router;
