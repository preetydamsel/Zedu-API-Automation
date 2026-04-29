
#  Zedu API Automation Test Suite

## Project Overview

This project is an **API automation test framework** built to validate the functionality, reliability, and security of the Zedu platform APIs.

It was developed as part of an automation engineering assessment to demonstrate:

* API testing using Mocha, Chai, and Axios
* Authentication handling
* Negative and edge case testing
* Test structure and maintainability
* Clean project organization

---

## Tech Stack

* Node.js
* Mocha (Test Framework)
* Chai (Assertions)
* Axios (HTTP Client)
* dotenv (Environment Variables)

---

## Project Structure

```text
project-root/
│
├── tests/
│   ├── auth.test.js
│   ├── users.test.js
│   ├── organisations.test.js
│   └── negative.test.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/preetydamsel/Zedu-API-Automation.git
cd Zedu-API-Automation
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
BASE_URL=https://api.staging.zedu.chat/api/v1
EMAIL=your_email@example.com
PASSWORD=your_password
```

---

##  How to Run Tests

Run the full test suite:

```bash
npm test
```

---

## Test Coverage

This project includes **25+ automated test cases**, covering:

### Authentication Tests

* Valid login
* Invalid login credentials
* Missing fields
* Magic link request
* Edge cases (empty input, long input)

### User Tests

* Fetch user profile
* Get user organisations
* Access protected routes with/without token
* Invalid token handling

### 🏢 Organisation Tests

* Create organisation (validation)
* Fetch organisation data
* Invalid organisation ID handling
* Unauthorized access to protected routes

---

##  Negative Testing

The suite includes **10+ negative test cases**, such as:

* Incorrect login credentials
* Missing required fields
* Invalid tokens
* Unauthorized access attempts
* Invalid endpoints or IDs

---

## Edge Case Testing

The suite includes **5+ edge cases**, such as:

* Very long input values
* Empty or whitespace inputs
* Rapid repeated requests
* Boundary validation checks

---

## Authentication Handling

* Authentication tokens are generated dynamically using the login endpoint
* No hardcoded tokens are used
* Tokens are reused across protected routes via helper functions

---

## Key Design Principles

* ✔ Independent tests (no dependencies between tests)
* ✔ Clean separation of concerns (auth, users, organisations)
* ✔ Reusable authentication logic
* ✔ Environment-based configuration
* ✔ Idempotent test execution (safe to run multiple times)

---

## Important Notes

* `.env` file is excluded from version control for security
* `node_modules` is not committed (installed via `npm install`)
* Tests are designed to run on a **clean clone environment**


