<p align="center">
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Open Collective Sponsors" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors in Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate"/></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
<!--[![Open Collective Sponsors](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
[![Open Collective Sponsors](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 🛠️ TechHelpDesk – Technical Support System
REST API built with NestJS for managing the complete lifecycle of technical support tickets.

---

## 📌 Project Description

TechHelpDesk is a REST API that centralizes the management of technical support tickets.

The system includes authentication, role-based access control, ticket assignment, status validation, and history tracking to ensure traceability throughout the support process.

---

## 🚀 Technologies used

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- JWT
- Swagger
- Jest

---

## 📁 Project structure
```
src/
├── auth/
├── users/
├── technicals/
├── clients/
├── categories/
├── tickets/
├── common/
│ ├── decorators/
│ ├── interceptors/
│ ├── exceptions/
│ └── pipes/
└── main.ts
```

---

## 🧩 Main Features

### 🔐 Authentication and Roles
- **Administrator**: Full CRUD operations for users, technicians, clients, categories, and tickets.

- **Technician**: View and update assigned tickets.

- **Client**: Create tickets and view history.

### 🎫 Ticket Management
- Create tickets with client and category validation.

- Mandatory status flow:
**Open → In Progress → Resolved → Closed**
- Maximum of 5 "In Progress" tickets per technician.

- Inquiries by client or technician.

### 🗂️ Data Persistence
- Entities: `User`, `Client`, `Technician`, `Category`, `Ticket`.

- Seeders with initial data.

### 🧹 Validations
- DTOs using `class-validator`.

- Custom pipes.

- Consistent error handling with exception filters.

### 🔄 Global Interceptor
- `TransformInterceptor` that formats each response:
```json
{
"success": true,
"data": {},
"message": "Operation successful"
}
```
---
## Project Setup

## Clone the Repository
```bash
git clone https://github.com/your_username/techhelpdesk.git
cd techhelpdesk
```

## Install Dependencies

```bash
$ npm install
```

## Configure Environment Variables
```
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
JWT_EXPIRATION=
`````

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
