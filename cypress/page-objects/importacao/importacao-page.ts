import { MenuLateralPage } from "../../page-objects";

const importacaoButton = "#file-input";
const enviarTodosButton = "Enviar todos";
const enviarUltimoArquivoButton = ".btn-success";

export default class ImportacaoPage {
  irParaUrl() {
    new MenuLateralPage().irParaImportacaoDocumentosFiscais();
  }

  importarNotaFiscal(arquivo) {
    cy.fixture(arquivo, "base64").then((data) => {
      cy.get(importacaoButton).attachFile({
        filePath: arquivo,
        fileContent: data,
        fileName: arquivo,
        encoding: "base64",
        mimeType: "application/octet-stream",
      });
    });
  }

  clicarEnviarTodosButton(){
    cy.contains(enviarTodosButton).click();
  }

  clicarEnviarUltimoArquivoButton(){
    cy.get(enviarUltimoArquivoButton).last().click();
  }
}
