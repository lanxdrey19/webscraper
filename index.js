const app = require("./server");
require("dotenv/config");

app.listen(process.env.PORT, () =>
  console.log(`server running on PORT ${process.env.PORT}`)
);
