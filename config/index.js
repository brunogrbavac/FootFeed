//ovo je file za naš config koji nan izvlači iz .env i slaže
const envRequired=require("dotenv").config(); // dohvaćamo .env datoteku pomoću dotenv paketa koji ju čita W

if (envRequired.error) {
  throw new Error("Could not find the .env file.");
}

module.exports={
    database_url:process.env.DATABASE_URL,
    port:process.env.PORT,
    rapid_api_key:process.env.RAPID_API_KEY,
    bcrypt:{
      saltRounds: parseInt(process.env.SALT_ROUNDS)
    },
}