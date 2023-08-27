const { PORT } = require("./config/index");
const app = require("./app");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
