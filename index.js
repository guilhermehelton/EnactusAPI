const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/init", (req, res) => {
  return res.json({
    message: "ok",
  });
});

app.listen(port, () => {
  console.log("server rodando na porta: ", port);
});
