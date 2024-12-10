import { MenuLateralPage, PeriodoComponent } from "../";

const fecharButton = "app-dados-da-nota";
const gradeNotaFiscalEntrada = "app-tabela-padrao-paginada:visible table:visible tr:visible";
const alterarDataField = "app-modal-data-entrada:visible input[placeholder='Selecionar Período']:visible";
const confirmarDataField = "app-modal-data-entrada:visible .modalFooter button:visible";
const dataDeEntradaDentroDaNota = 'input[placeholder="Data de Entrada"]:visible';
const tipoDeNotaDentroDaNota = "app-dados-da-nota:visible div[role='combobox'] input[type='text']:visible";

export default class NotasFiscaisEntradaPage {
  irParaUrl() {
    new MenuLateralPage().irParaDocumentosFiscaisNotaFiscalDeEntrada();
  }

  clicarFechar() {
    cy.get(fecharButton).last().type("{esc}");
  }

  clicarEnter() {
    cy.get(tipoDeNotaDentroDaNota).last().type("{enter}");
  }

  selecionarData(ano: string, mes: string, dia: string) {
    cy.get(alterarDataField).should('be.visible').click();

    new PeriodoComponent().selecionarData(ano, mes, dia);
  }

  selecionarDataDentroDaNota(ano: string, mes: string, dia: string) {
    cy.get(dataDeEntradaDentroDaNota).should('be.visible').click();

    new PeriodoComponent().selecionarData(ano, mes, dia);
  }

  clicarConfimar() {
    return cy.get(confirmarDataField).should('contain', 'Confirmar').click();
  }

  getDataDeEntradaDentroDaNota() {
    return cy.get(dataDeEntradaDentroDaNota).should('be.visible');
  }

  selecionarTipoDeNotaDentroDaNota(texto: string) {
    return cy.get(tipoDeNotaDentroDaNota).type(texto);
  }

  getItensDaGradeNotaFiscal() {
    return cy.get("app-tabela-padrao:visible table:visible tbody:visible tr:visible").should('be.visible');
  }

  clicarNoElementoDaGradeContemTextoNotaFiscal(texto) {
    cy.get(gradeNotaFiscalEntrada).should('be.visible').contains("td:visible", texto).dblclick();
  }

  pesquisarNumeroNota(numeroNota: string) {
    cy.get("select").first().select("Número da Nota");
    cy.get("input[placeholder='Número da Nota']").clearThenType(`${numeroNota}{enter}`);
    cy.wait(1000); //AGUARDAR PESQUISA
  }

  verificarTipoNota(linha: number, tipoNota: string) {
    cy.get("app-tabela-padrao-paginada tbody tr")
        .eq(linha)
        .find("td")
        .eq(5)
        .should("contain.text", tipoNota);
  }
}