---
title: ExpressJS Prisma
description: An ExpressJS server that uses Prisma to connect to a PostgreSQL database
tags:
  - express
  - postgresql
  - prisma
  - typescript
---

# ExpressJS Prisma Example

This is an [ExpressJS](https://expressjs.com/) REST API that uses [Prisma](https://www.prisma.io/) to connect to a Postgres database and CRUD contacts.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/LqCw_O)

## ✨ Features

- Prisma
- Express
- Postgres
- TypeScript

## 💁‍♀️ How to use

- Install dependencies `yarn`
- [Provision a Postgres container on Railway](https://dev.new)
- Connect to your Railway project with `railway link`
- Migrate the database `railway run yarn migrate:dev`
- Run the Server app `railway run yarn dev`

## 📝 Notes

This is a simple REST API for contact items. The available routes are

- `GET /contacts` gets all contacts
- `POST /contacts` creates a new using `text` in the JSON body
- `GET /contacts/:id` gets a contact by id
- `PUT /contacts/:id` updates a contact by id
- `DELETE /contacts/:id` deletes a contact by id
