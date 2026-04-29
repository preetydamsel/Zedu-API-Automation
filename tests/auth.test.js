const axios = require("axios");
const { expect } = require("chai");

require("dotenv").config()
 
const BASE_URL = process.env.BASE_URL;
const validEmail = process.env.EMAIL;
const validPassword = process.env.PASSWORD;

describe("Auth Tests", () => {
  it("should login successfully with valid credentials", async () => {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });
  

    expect(response.status).to.equal(200);
    expect(response.data.data).to.have.property("access_token");
    expect(response.data.data.access_token).to.be.a("string");
  });


  it("Register a new user successfully ", async () => {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });


    expect(response.status).to.equal(200);
    expect(response.data.data).to.have.property("access_token");
    expect(response.data.data.access_token).to.be.a("string");
  });

  it("Request magic link successfully ", async () => {
    const response = await axios.post(`${BASE_URL}/auth/magick-link`, {
      email: process.env.EMAIL,
      
    });


    expect(response.status).to.equal(200);
    expect(response.data.status).to.equal("success");
  expect(response.data.message).to.include("link"); 
  expect(response.data.data).to.equal("success")
  });

it("Login trims email spaces", async function () {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      email: `  ${validEmail}  `,
      password: validPassword
    });

    expect([200, 400]).to.include(res.status);
  } catch (err) {
    expect([400]).to.include(err.response.status);
  }
});

it("Login with null values", async function () {
  try {
    await axios.post(`${BASE_URL}/auth/login`, {
      email: null,
      password: null
    });
  } catch (err) {
    expect([400, 422]).to.include(err.response.status);
  }
});

//Negative test cases
it("Login with incorrect password", async function () {
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: validEmail,
        password: "wrongpassword"
      });

      throw new Error("Expected failure but request succeeded");

    } catch (err) {
      expect([400, 401]).to.include(err.response.status);
    }
  });

  it("Login with non-existent email", async function () {
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: "fakeuser123@gmail.com",
        password: "password123"
      });

      throw new Error("Expected failure but request succeeded");

    } catch (err) {
      expect([400, 404]).to.include(err.response.status);
    }
  });

  it("Login with missing email", async function () {
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        password: validPassword
      });

      throw new Error("Expected failure but request succeeded");

    } catch (err) {
      expect(err.response.status).to.equal(400);
    }
  });

  it("Login with missing password", async function () {
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: validEmail
      });

      throw new Error("Expected failure but request succeeded");

    } catch (err) {
      expect(err.response.status).to.equal(400);
    }
  });
//Edge Test cases
it("Multiple login attempts quickly", async function () {
  const requests = Array(5).fill().map(() =>
    axios.post(`${BASE_URL}/auth/login`, {
      email: validEmail,
      password: validPassword
    })
  );

  const responses = await Promise.all(requests);

  responses.forEach(res => {
    expect(res.status).to.equal(200);
  });
});

  it("Login with very long password", async function () {
  const longPassword = "A".repeat(200);

  try {
    await axios.post(`${BASE_URL}/auth/login`, {
      email: validEmail,
      password: longPassword
    });
  } catch (err) {
    expect([400, 401]).to.include(err.response.status);
  }
});
it("Login with empty request body", async function () {
  try {
    await axios.post(`${BASE_URL}/auth/login`);
  } catch (err) {
    expect([400]).to.include(err.response.status);
  }
});

it("Call invalid endpoint", async function () {
  try {
    await axios.get(`${BASE_URL}/invalid-endpoint`);
  } catch (err) {
    expect(err.response.status).to.equal(404);
  }
});

it("Use wrong HTTP method on login", async function () {
  try {
    await axios.get(`${BASE_URL}/auth/login`);
  } catch (err) {
    expect([404, 405]).to.include(err.response.status);
  }
});

it("Login multiple times rapidly", async function () {
      const requests = Array(3).fill().map(() =>
        axios.post(`${BASE_URL}/auth/login`, {
          email: validEmail,
          password: validPassword
        })
      );

      const responses = await Promise.all(requests);

      responses.forEach(res => {
        expect(res.status).to.equal(200);
      });
    });

    it("Login with whitespace input", async function () {
      try {
        await axios.post(`${BASE_URL}/auth/login`, {
          email: "   ",
          password: "   "
        });
      } catch (err) {
        expect([400, 422]).to.include(err.response.status);
      }
    });

  });


