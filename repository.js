const GoogleSpreadsheet = require("google-spreadsheet");
const credentials = require("./credentials.json");

class PlanilhaRepository {
  static getDiasMes(month) {
    month--;

    const actualDate = new Date();
    const year = actualDate.getFullYear();
    const date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  static diasFormatados(dias, mes) {
    const actualDate = new Date();
    const ano = actualDate.getFullYear();
    const diasMes = [];
    for (const dia of dias) {
      const date = new Date(ano, mes, dia);
      const index = date.getDay();

      diasMes.push(`${DIAS_SEMANA[index]} ${dia}/${mes}/${ano}`);
    }
    return diasMes;
  }

  async desenhar(input) {
    const doc = new GoogleSpreadsheet();
    await doc.useServiceAccountAuth(credentials, "guilhermehelton@gmail.com");
    await doc.createNewSpreadsheetDocument({ title: `${input.nomePlanilha}` });
    const sheet1 = await doc.sheetsByIndex[0];
    sheet1.updateProperties({ title: input.listaMembros[0] });
    const diasDoMes = this.getDiasMes(input.mes);
    const listaDiasFormatados = this.diasFormatados(diasDoMes, input.mes);
    for (const membro of input.listaMembros) {
      if (membro === input.listaMembros[0]) {
      } else {
        const newSpread = await doc.addSheet({ title: membro });
        for (const i in diasDoMes) {
          await newSpread.addRow(listaDiasFormatados);
        }
      }
    }
  }
}

module.exports = PlanilhaRepository;
