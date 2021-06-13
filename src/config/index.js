require('dotenv').config();
require('../utils/cloneRepo.js');
const { default: axios } = require('axios');

global.axios = axios.create({
  headers: { Authorization: `Bearer ${process.env.KEY}` },
});

module.exports = {
  PORT: 3000,
};
