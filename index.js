const express = require("express");
const { default: PlanilhaRepository } = require("./repository");
const app = express();
const port = process.env.PORT || 3000;

app.get("/init", (req, res) => {
  return res.json({
    message: "ok",
  });
});

app.post("/create-sheet", async (req, res) => {
  try {
    const sheet = new PlanilhaRepository();
    await sheet.desenhar(req.body);
    console.log("Planilha criada");
  } catch (error) {
    console.log("Não foi possível criar. ERROR: ", error);
  }
});

app.listen(port, () => {
  console.log("server rodando na porta: ", port);
});
