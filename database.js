require("dotenv").config();

const mongoose = require("mongoose");

const connectDatabase = async () => {
  const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  const con = await mongoose.connect(
    url,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
      }
    }
  );
  console.log(`database connected on port ${process.env.DB_PORT}`);
  return con;
};

module.exports = connectDatabase;
