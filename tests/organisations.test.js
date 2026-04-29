const axios = require("axios");
const { expect } = require("chai");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

let token;
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

  // VALIDATION TEST
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

    expect([400, 422]).to.include(err.response.status);
  }
});

  
  // 2. NEGATIVE TEST - INVALID ORG ID
  
 it("should fail to fetch organisation with invalid ID", async function () {
  try {
    await axios.get(
      `${BASE_URL}/organisations/invalid-id`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    throw new Error("Expected failure but succeeded");

  } catch (err) {
    if (!err.response) throw err;

    expect([400, 404]).to.include(err.response.status);
  }
});
  // 3. NEGATIVE TEST - NO TOKEN
 
  it("should not allow access without token", async function () {
  try {
    await axios.get(`${BASE_URL}/users/organisations`);

    throw new Error("Expected failure but succeeded");

  } catch (err) {
    if (!err.response) throw err;

    expect(err.response.status).to.equal(401);
  }
});

});
