require('dotenv').config();
require('../utils/cloneRepo.js');
const { default: axios } = require('axios');

const axiosAndKey = axios.create({
  headers: { Authorization: `Bearer ${process.env.KEY}` },
});

module.exports = {
  PORT: 3000,
  axios: axiosAndKey,
};
