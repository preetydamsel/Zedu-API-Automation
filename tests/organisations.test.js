const axios = require("axios");
const { expect } = require("chai");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

let token;

// 🔐 Reusable login
async function login() {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    email: process.env.EMAIL,
    password: process.env.PASSWORD
  });

  return res.data.data.access_token;
}

describe("Organisations Tests", function () {

  // Get token before tests
  before(async function () {
    token = await login();
  });

  // ❌ VALIDATION TEST (missing required field)
  it("should fail to create organisation without name", async function () {
    try {
      await axios.post(
        `${BASE_URL}/organisations`,
        { description: "Test org" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      throw new Error("Expected failure but succeeded");

    } catch (err) {
      if (!err.response) throw err;

      expect(err.response.status).to.equal(422); 
      expect(err.response.data).to.have.property("message");
    }
  });


  // ❌ NEGATIVE TEST - INVALID ORG ID
  it("Invalid organisation ID", async function () {
    try {
      await axios.get(
        `${BASE_URL}/organisations/123-invalid-id`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      throw new Error("Expected failure but succeeded");

    } catch (err) {
      if (!err.response) throw err;

      expect(err.response.status).to.equal(400); 
    }
  });


  // ❌ NEGATIVE TEST - NO TOKEN
  it("should not allow access to organisations without token", async function () {
    try {
      await axios.get(`${BASE_URL}/users/organisations`);

      throw new Error("Expected failure but succeeded");

    } catch (err) {
      if (!err.response) throw err;

      expect(err.response.status).to.equal(401); // ✅ strict
    }
  });

});