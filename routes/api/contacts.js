const express = require("express");
const { v4: uuidv4 } = require("uuid");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const response = await listContacts();
  res.status(200).send(response);
});

router.get("/:contactId", async (req, res, next) => {
  const response = await getContactById(req.params.contactId);
  res.status(response.status || 200).json(response.message || response);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const id = uuidv4().toString();
  const contact = {
    id,
    name,
    email,
    phone,
  };

  const response = await addContact(contact);
  res
    .status(response.message ? 400 : 201)
    .send(response.message ? { message: response.message } : response);
});

router.delete("/:contactId", async (req, res, next) => {
  const response = await removeContact(req.params.contactId);
  res.status(response.status || 200).json({ message: response.message });
});

router.put("/:contactId", async (req, res, next) => {
  if (Object.keys(req.body).length !== 0) {
    const response = await updateContact(req.params.contactId, req.body);
    res
      .status(response.message ? 400 : 200)
      .send(response.message ? { message: response.message } : response);
  } else {
    res.status(400).json({ message: "missing fields" });
  }
});

module.exports = router;
