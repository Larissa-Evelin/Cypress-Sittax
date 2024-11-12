import { PeriodoComponent } from "../../page-objects";

const nomeUsuarioLogado = ".user-block-name";
const roleUsuarioLogado = ".user-block-role";
const nomeEscritorio = ".nome-escritorio";
const selecionarEmpresaInput = "#selectHeaderEmpresas > .ng-select-container > .ng-value-container > .ng-input > input";
const periodoFiscal = "#periodoFiscal";
const iconeEscritorio = "img[src='assets/img/office.svg'";
const modalEscritorio = "app-dados-do-escritorio:visible";
const iconeEmpresa = "img[src='assets/img/view.svg']";
const modalEmpresa = "app-modal-da-empresa:visible";

export default class HeaderPage {
  
  getNomeUsuarioLogado() {
    return cy.get(nomeUsuarioLogado);
  }
  
  getRoleUsuarioLogado() {
    return cy.get(roleUsuarioLogado);
  }
  
  selecionarEscritorio(escritorio: string) {
    cy.get("#selectHeaderEscritorios").should("exist").click().clearThenType(escritorio + "{enter}");
  }

  selecionarEmpresa(empresa: string) {
    cy.get(selecionarEmpresaInput).should('be.visible').type(empresa).type("{enter}");
  }

  selecionarPeriodo(ano: string, mes: string){
    cy.get(periodoFiscal).click();

    new PeriodoComponent().selecionarPeriodo(ano, mes);
  }
  
  getNomeEscritorio(escritorio: string) {
    cy.get("#selectHeaderEscritorios span:nth-child(2)").should("be.visible").and("contain.text", escritorio);
  }

  verificarEscritorio(escritorio: string) {
    cy.get(nomeEscritorio).should("be.visible").and("contain.text", escritorio);
  }

  abrirEscritorioHeader(dadosModalEscritorio?: string) {
    cy.get(iconeEscritorio).should("be.visible").click();

    if(dadosModalEscritorio) {
      cy.get(modalEscritorio).should("contain.text", dadosModalEscritorio);
    }
  }

  fecharModalEscritorio() {
    cy.contains(modalEscritorio, "Fechar")
      .scrollTo('bottom', { ensureScrollable: false }) //rola a tela pra baixo se o modal for maior que a viewport
      .click();
  }

  verificarEmpresa(empresa: string) {
    cy.get("#selectHeaderEmpresas").click().should("contain.text", empresa);
  }

  verificarQtdEmpresas(qtdEmpresas: string) {
    cy.get("#selectHeaderEmpresas").click().find("small").invoke("text").then(($text) => {
      var texto = $text.replace(/\s+/g, ' ').trim();
      expect(texto).to.eq(qtdEmpresas);
    })
  }

  abrirEmpresaHeader(dadosModalEmpresa?: string) {
    cy.get(iconeEmpresa).should("be.visible").click();

    if(dadosModalEmpresa) {
      cy.get(modalEmpresa).should("contain", dadosModalEmpresa);
    }
  }
}
