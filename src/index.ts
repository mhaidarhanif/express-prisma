import express from "express";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { dataContacts } from "./data/contacts";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors<Request>());
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/contacts", async (req, res) => {
  const contacts = await prisma.contact.findMany({
    orderBy: { name: "asc" },
  });

  res.json(contacts);
});

app.get("/contacts/:contactId", async (req, res) => {
  const id = req.params.contactId;

  const contact = await prisma.contact.findUnique({
    where: { id },
  });

  if (!contact) {
    return res.status(404).json({});
  }

  return res.status(200).json(contact);
});

app.post("/contacts/multiple", async (req, res) => {
  const contact = await prisma.contact.createMany({
    data: dataContacts,
    skipDuplicates: true,
  });

  return res.json(contact);
});

app.post("/contacts", async (req, res) => {
  const contact = await prisma.contact.create({
    data: {
      contacted: true,
      name: req.body.name ?? "No name",
      email: req.body.email ?? "No email",
    },
  });

  return res.json(contact);
});

app.put("/contacts/:contactId", async (req, res) => {
  const id = req.params.contactId;
  const contact = await prisma.contact.update({
    where: { id },
    data: req.body,
  });

  return res.json(contact);
});

app.delete("/contacts", async (req, res) => {
  await prisma.contact.deleteMany();

  return res.send({
    status: "ok",
    message: "All contacts have been deleted",
  });
});

app.delete("/contacts/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.contact.delete({
    where: { id },
  });

  return res.send({
    status: "ok",
    message: `One contact by id ${id} has been deleted`,
  });
});

app.get("/", async (req, res) => {
  res.send(
    `
  <h1>REST API</h1>
  <h2>Available Routes</h2>
  <pre>
    GET, POST /contacts
    GET, PUT, DELETE /contacts/:id
  </pre>
  `.trim()
  );
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`REST API listening at http://localhost:${port}`);
});
