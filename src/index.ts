import app from "./server.js";
import config from "./config/index.js";

app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});