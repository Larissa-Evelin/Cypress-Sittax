const titulo = "#swal2-title";
const modal = ".swal2-popup";
const okButton = ".swal2-confirm:visible";
const cancelButton = ".swal2-cancel:visible";
const mensagem = "div[id='swal2-html-container']";

export default class SwalPage {
  clicarOk() {
    cy.get(okButton).should("be.visible").contains(/Ok/i).click();
  }

  clicarConfirmar() {
    cy.get(okButton).should("be.visible").contains(/Confirmar/i).click();
  }

  clicarSim() {
    cy.get(okButton).should("be.visible").contains(/Sim/i).click();
  }
  
  clicarAvancar() {
    cy.get(okButton).should("be.visible").contains(/Avançar/i).click();
  }

  clicarNão() {
    cy.get(cancelButton).should("be.visible").contains(/Não/i).click();
  }

  getTitulo() {
    return cy.get(titulo, { timeout: 30000 });
  }

  verificarTitulo(texto: string) {
    this.getTitulo().should("contain.text", texto)
  }

  getMensagem() {
    return cy.get(mensagem);
  }

  modalEstaAberto() {
    return Cypress.$(modal).length > 0;
  }
}


