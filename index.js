const express = require("express");
const { default: PlanilhaRepository } = require("./repository");
const app = express();
const port = process.env.PORT || 3000;

app.get("/init", (req, res) => {
  return res.json({
    message: "ok",
  });
});

app.post("/create-sheet", (req, res) => {
  try {
    const sheet = new PlanilhaRepository();
    sheet.desenhar(req.body);
  } catch (error) {
    console.log("Não foi possível criar");
  }
});

app.listen(port, () => {
  console.log("server rodando na porta: ", port);
});
