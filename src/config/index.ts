import dotenv from 'dotenv'
import defaults from 'axios'
dotenv.config()

const axiosAndKey = defaults.create({
  headers: { Authorization: `Bearer ${process.env.SWAGGER_KEY}` },
});

const PORT: number = 3000;
const axios = axiosAndKey;

export { PORT, axios };
