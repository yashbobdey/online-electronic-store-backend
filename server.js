require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message, err.stack);
  console.log("Uncaught Exception ! \n Shutting Down ....");
  process.exit(1);
});

const app = require("./app");
const connectDatabase = require("./database");

const startServer = async () => {
  await connectDatabase();

  return app.listen(process.env.SERVER_PORT || 5000, () => {
    console.log(`Server started on port ${process.env.SERVER_PORT}`);
  });
};

const server = startServer();

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection ! \n Shutting Down ....");
  server.close(() => {
    process.exit(1);
  });
});
