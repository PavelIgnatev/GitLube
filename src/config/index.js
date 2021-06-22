require('dotenv').config();
require('../utils/cloneRepo.js');
const { default: axios } = require('axios');
const { cloneRepoByCommitHash } = require('../utils/cloneRepoByCommitHash.js');
cloneRepoByCommitHash();

const axiosAndKey = axios.create({
  headers: { Authorization: `Bearer ${process.env.KEY}` },
});

module.exports = {
  PORT: 3000,
  axios: axiosAndKey,
};
