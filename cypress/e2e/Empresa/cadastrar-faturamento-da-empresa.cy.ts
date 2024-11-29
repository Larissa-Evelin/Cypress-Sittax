
import { TablePage, EmpresaPage, SwalPage, MenuLateralPage, RevendaPage, EscritorioPage } from "../../page-objects";
import { usuarios, empresaParaFaturamento } from "../../fixtures";

const tablePage = new TablePage();
const empresaPage = new EmpresaPage();
const swalPage = new SwalPage();
const menuLeralPage = new MenuLateralPage();
const revendaPage = new RevendaPage();
const escritorioPage = new EscritorioPage();

before(() => {
  cy.login(usuarios.sistema.email, usuarios.sistema.senha);
  revendaPage.cadastrarRevenda(empresaParaFaturamento.preRevenda);
  menuLeralPage.irParaCadastroEscritorio();
  escritorioPage.cadastrarEscritorio(empresaParaFaturamento.preEscritorio);
  menuLeralPage.irParaCadastroDeEmpresas();
  empresaPage.cadastrarEmpresa(empresaParaFaturamento.cnpj, empresaParaFaturamento.preEscritorio.razaoSocial);
  swalPage.clicarOk();
  tablePage.digitarPesquisarField(empresaParaFaturamento.cnpj);
});

beforeEach(() => {
  cy.intercept("POST", "**/adicionar-faturamento").as("adicionarFaturamento");
  cy.intercept("POST", "**/alterar-faturamento").as("alterarFaturamento");
  cy.intercept("GET", "**/faturamento/listar-cnpjs-faturamento**").as("listarFaturamento");
   
  tablePage.clicarNoElementoDaGradeQueContemOTexto(empresaParaFaturamento.cnpj);
  empresaPage.clicarAbaFaturamento();
});

afterEach(()=> {
  empresaPage.clicarFechar();
});

describe("Teste que adiciona faturamento", () => {
  it(`Adicionar faturamento no valor de ${empresaParaFaturamento.valor}`, () => {
    empresaPage.clicarNoBotaoAdicionarFaturamento();
    empresaPage.digitarValorDoFaturamentoNoInput(empresaParaFaturamento.valor);
    empresaPage.clicarNoBotaoDeSalvarFaturamento();
    cy.wait('@adicionarFaturamento');
  });

  it(`Validar se a grade tem faturamento com o valor ${empresaParaFaturamento.valor}`, () => {
    tablePage.getItensDaGrade('app-faturamento-da-empresa:visible ').contains(empresaParaFaturamento.valor);
  });
  
  it("editando o valor", () => {
    cy.wait("@listarFaturamento");
    cy.wait(1000);
    tablePage.clicarNoElementoDaGradeQueContemOTexto(empresaParaFaturamento.valorClicar);
    empresaPage.digitarValorDoFaturamentoNoInput(empresaParaFaturamento.valorParaEditar);
    empresaPage.clicarNoBotaoDeSalvarFaturamento();
    cy.wait('@alterarFaturamento');
  });

  it("validando o valor editado", () => {
    tablePage.getItensDaGrade('app-faturamento-da-empresa:visible ').contains(empresaParaFaturamento.valorParaEditar);
  });

  it("Selecionando o item da tabela e removendo-o ", () => {
    cy.wait("@listarFaturamento");
    cy.wait(1000);
    tablePage.clicarNoElementoDaGradeQueContemOTexto(empresaParaFaturamento.valorParaEditar);
    empresaPage.clicarNoBotaoDeRemoverFaturamento();
    swalPage.clicarSim();
  });
});
