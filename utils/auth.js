const axios = require("axios");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;

async function getToken() {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  });

  return response.data.data.access_token;
}
module.exports = { getToken };