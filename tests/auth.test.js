const axios = require("axios");
const { expect } = require("chai");

require("dotenv").config()
 
const BASE_URL = process.env.BASE_URL;
const validEmail = process.env.EMAIL;
const validPassword = process.env.PASSWORD;

describe("Auth Tests", () => {

  // 🔐 Positive Tests
  it("should login successfully with valid credentials", async () => {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });

    expect(response.status).to.equal(200);
    expect(response.data.data).to.have.property("access_token");
    expect(response.data.data.access_token).to.be.a("string");
  });


  it("should register a new user successfully", async () => {
  
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });

    expect(response.status).to.equal(200);
    expect(response.data.data.access_token).to.be.a("string");
  });


  it("should request magic link successfully", async () => {
    const response = await axios.post(`${BASE_URL}/auth/magick-link`, {
      email: process.env.EMAIL,
    });

    expect(response.status).to.equal(200);
    expect(response.data.status).to.equal("success");
    expect(response.data.message).to.include("link");
    expect(response.data.data).to.equal("success")
  });


  // ❌ Negative Tests

  it("should fail login with incorrect password", async () => {
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: validEmail,
        password: "wrongpassword",
      });

      throw new Error("Expected failure but succeeded");

    } catch (err) {
      expect(err.response.status).to.equal(400); // or 401 based on actual API
    }
  });


  it("should fail login with non-existent email", async () => {
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: "fakeuser123@mail.com",
        password: "password123",
      });

      throw new Error("Expected failure but succeeded");

    } catch (err) {
      expect(err.response.status).to.equal(400); 
    }
  });


  it("should fail login with missing email", async () => {
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
  
       password:validPassword,
      });

      throw new Error("Expected failure but succeeded");

    } catch (err) {
      expect(err.response.status).to.equal(400);
    }
  });


  it("should fail login with missing password", async () => {
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: process.env.EMAIL,
      });

      throw new Error("Expected failure but succeeded");

    } catch (err) {
      expect(err.response.status).to.equal(400);
    }
  });


  // ⚠️ Edge Cases
  it("should fail login with very short password", async () => {
  try {
    await axios.post(`${BASE_URL}/auth/login`, {
      email: process.env.EMAIL,
      password: "1",
    });

    throw new Error("Expected failure but succeeded");
  } catch (err) {
    expect(err.response.status).to.equal(400);
  }
});

it("should fail login with invalid email format", async () => {
  try {
    await axios.post(`${BASE_URL}/auth/login`, {
      email: "invalid@@email!!",
      password: process.env.PASSWORD,
    });

    throw new Error("Expected failure but succeeded");
  } catch (err) {
    expect(err.response.status).to.equal(400);
  }
});

it("should fail login with excessively long email", async () => {
  const longEmail = `${"a".repeat(100)}@test.com`;

  try {
    await axios.post(`${BASE_URL}/auth/login`, {
      email: longEmail,
      password: process.env.PASSWORD,
    });

    throw new Error("Expected failure but succeeded");
  } catch (err) {
    expect(err.response.status).to.equal(400);
  }
});

  it("should not allow login with uppercase email", async () => {
  try {
    await axios.post(`${BASE_URL}/auth/login`, {
      email: process.env.EMAIL.toUpperCase(),
      password: process.env.PASSWORD,
    });

    throw new Error("Expected failure but request succeeded");

  } catch (err) {
    expect(err.response.status).to.equal(400);
  }
});

  it("should fail login when email contains leading and trailing spaces", async () => {
  try {
    await axios.post(`${BASE_URL}/auth/login`, {
      email: `  ${process.env.EMAIL}  `,
      password: process.env.PASSWORD,
    });

    throw new Error("Expected failure but succeeded");

  } catch (err) {
    expect(err.response.status).to.equal(400);
  }
});

  it("should fail login with empty body", async () => {
    try {
      await axios.post(`${BASE_URL}/auth/login`, {});

      throw new Error("Expected failure but succeeded");

    } catch (err) {
      expect(err.response.status).to.equal(400);
    }
  });


  it("should fail login with null value input", async () => {
    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: "   ",
        password: "   ",
      });

      throw new Error("Expected failure but succeeded");

    } catch (err) {
      expect(err.response.status).to.equal(400);
    }
  });


  it("should return 404 for invalid endpoint", async () => {
    try {
      await axios.get(`${BASE_URL}/invalid-endpoint`);

      throw new Error("Expected failure but succeeded");

    } catch (err) {
      expect(err.response.status).to.equal(404);
    }
  });


  it("should not allow GET method on login endpoint", async () => {
    try {
      await axios.get(`${BASE_URL}/auth/login`);

      throw new Error("Expected failure but succeeded");

    } catch (err) {
      expect(err.response.status).to.equal(404); 
    }
  });

});