//ovaj file koristi sequelize za postavke
const envRequired = require("dotenv").config(); // dohvaćamo .env datoteku pomoću dotenv paketa koji ju čita

if (envRequired.error) {
  throw new Error("Could not find the .env file.");
}

module.exports = { // objekt koji mozemo kasnije dohvacat kroz dotenv?
  development: {
    use_env_variable: "DATABASE_URL",
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    logging: console.log, // pomoću koje funkcije logga stvari tu mozemo poslati Winston logger npr.
  },
  production: {
    use_env_variable: "DATABASE_URL",
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};