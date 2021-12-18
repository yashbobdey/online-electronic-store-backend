require("dotenv").config();

const mongoose = require("mongoose");

const connectDatabase = async () => {
  const url = `mongodb+srv://yashbobdey:yash8275@mern.l6dhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
