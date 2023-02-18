import { PrismaClient } from "@prisma/client";
import express from "express";
import { Request } from "express";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors<Request>());
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/contacts", async (req, res) => {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(contacts);
});

app.post("/contacts", async (req, res) => {
  const contact = await prisma.contact.create({
    data: {
      contacted: false,
      name: req.body.name ?? "No name",
      email: req.body.email ?? "No email",
    },
  });

  return res.json(contact);
});

app.get("/contacts/:contactId", async (req, res) => {
  const id = req.params.contactId;
  const contact = await prisma.contact.findUnique({
    where: { id },
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

app.delete("/contacts/:id", async (req, res) => {
  const id = req.params.id;
  await prisma.contact.delete({
    where: { id },
  });

  return res.send({ status: "ok" });
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
