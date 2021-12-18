require("dotenv").config();

const mongoose = require("mongoose");

const connectDatabase = async () => {
  const url = process.env.URL;
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
  console.log(`database connected on port ${process.env.DPORT}`);
  return con;
};

module.exports = connectDatabase;
