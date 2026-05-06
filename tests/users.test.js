const axios = require("axios");
const { expect } = require("chai");
const { getToken } = require("../utils/auth");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

describe("User Tests", () => {
  let token;

  before(async () => {
    token = await getToken();
  });
// Positive Test cases
  it("should get user profile with valid token", async () => {
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data.data.user).to.be.an("object");
  });

  it("Get notification preferences successfully", async () => {
    const response = await axios.get(`${BASE_URL}/users/notification-preferences`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data.status).to.be.a("string");
  });

  it("Get user media preferences ", async () => {
    const response = await axios.get(`${BASE_URL}/users/media-preferences`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data.status).to.be.a("string");
  });
// Negative test cases 
  
  it("Get profile with invalid token", async function () {
  try {
    await axios.get(`${BASE_URL}/users/me`, {
      headers: { Authorization: "Bearer invalidtoken" }
    });
  } catch (err) {
    expect(err.response.status).to.equal(401);
  }
}); 

it("Get profile without token", async function () {
  try {
    await axios.get(`${BASE_URL}/users/me`);
  } catch (err) {
    expect(err.response.status).to.equal(401);
  }
});

it("Get organisations without token", async function () {
  try {
    await axios.get(`${BASE_URL}/users/organisations`);
  } catch (err) {
    expect(err.response.status).to.equal(401);
  }
});

//Edge test cases

it("should fail when using excessively long user ID", async () => {
  const longId = "a".repeat(100);

  try {
    await axios.get(`${BASE_URL}/users/${longId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    throw new Error("Expected failure but succeeded");
  } catch (err) {
    expect(err.response.status).to.equal(400);
  }
});

it("should fail when updating profile with null values", async () => {
  try {
    await axios.put(
      `${BASE_URL}/users/me`,
      {
        first_name: null,
        last_name: null,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    throw new Error("Expected failure but succeeded");
  } catch (err) {
    expect(err.response.status).to.equal(422);
  }
});

});

