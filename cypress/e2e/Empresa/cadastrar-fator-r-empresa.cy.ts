
import { TablePage, EmpresaPage, SwalPage, RevendaPage, MenuLateralPage, EscritorioPage } from "../../page-objects";
import { usuarios, empresaParaCadastrarFatorR } from "../../fixtures";

const tablePage = new TablePage();
const empresaPage = new EmpresaPage();
const swalPage = new SwalPage();
const revendaPage = new RevendaPage();
const menuLateralPage = new MenuLateralPage();
const escritorioPage = new EscritorioPage();

before(() => {
  cy.login(usuarios.sistema.email, usuarios.sistema.senha);
  revendaPage.cadastrarRevenda(empresaParaCadastrarFatorR.preRevenda);
  menuLateralPage.irParaCadastroEscritorio();
  escritorioPage.cadastrarEscritorio(empresaParaCadastrarFatorR.preEscritorio);
  menuLateralPage.irParaCadastroDeEmpresas();
})

beforeEach(() => {
  cy.intercept("PUT", "**/alterar").as("AlterarFatorR");
  cy.intercept("POST", "**/adicionar").as("adicionarFatorR");
});

describe("Teste para cadastrar Fator R", () => {
  it("Cadastrar empresa e adicionando valor fator R", () => {
    empresaPage.cadastrarEmpresa(empresaParaCadastrarFatorR.cnpj, empresaParaCadastrarFatorR.escritorio);
    swalPage.clicarOk();
    tablePage.pesquisarEAbrirItemDaGrade(empresaParaCadastrarFatorR.empresa);
    empresaPage.clicarAbaConfiguracoes();
    empresaPage.clicarSwitchDaTabela("Fator R");
    empresaPage.clicarFechar();

    //ADICIONAR FOLHA FATOR R
    tablePage.clicarNoElementoDaGradeQueContemOTexto(empresaParaCadastrarFatorR.empresa);
    empresaPage.clicarAbaFatorR();
    empresaPage.clicarNoBotaoAdicionarFolha();
    empresaPage.clicarNoInputDeValorDaFolha(empresaParaCadastrarFatorR.valor);
    empresaPage.clicarBotaoSalvarModalFolhaPagamento();
    cy.wait('@adicionarFatorR');
  })

  it("validando valor colocado", () => {
    tablePage
    .getItensDaGrade('app-modal-da-empresa:visible')
    .should('contain.text', empresaParaCadastrarFatorR.valorClicar);
  })

  it("editando o valor", () => {
    tablePage.clicarNoElementoDaGradeQueContemOTexto(empresaParaCadastrarFatorR.valorClicar);
    empresaPage.digitarValorDoFatorRNoInput(empresaParaCadastrarFatorR.valorParaEditar);
    empresaPage.clicarBotaoSalvarModalFolhaPagamento();
    cy.wait('@AlterarFatorR');
  })

  it("validando valor editado", () => {
    tablePage
    .getItensDaGrade('app-modal-da-empresa:visible')
    .should("contain.text", empresaParaCadastrarFatorR.valorParaEditar);
  })

  it("remover", () => {
    empresaPage.clicarNaOpcaoRemover();
    swalPage.clicarSim();
  })
})