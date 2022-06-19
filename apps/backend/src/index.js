import dotenv from "dotenv";
import server from "./server.js";

dotenv.config();

const message = "Express server started on port: ",
  port = process.env.PORT || 8080;

// Start api server
server.listen(port, () => {
  console.log(message + port);
});
