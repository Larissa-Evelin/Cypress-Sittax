import { EmpresaPage, EscritorioPage, MenuLateralPage, RevendaPage, SwalPage } from "../../page-objects";
import { usuarios, empresasParaConsultarCNPJ as empresa } from "../../fixtures"

const empresaPage = new EmpresaPage();
const revendaPage = new RevendaPage();
const menuLeralPage = new MenuLateralPage();
const escritorioPage = new EscritorioPage();
const swalPage = new SwalPage();

describe("Testar consulta de CNPJ", () => {
  before(() => {
    cy.login(usuarios.sistema.email, usuarios.sistema.senha);
    revendaPage.cadastrarRevenda(empresa.preRevenda);
    menuLeralPage.irParaCadastroEscritorio();
    escritorioPage.cadastrarEscritorio(empresa.preEscritorio);
    menuLeralPage.irParaCadastroDeEmpresas();
    empresaPage.cadastrarEmpresa(empresa.cnpj, empresa.preEscritorio.razaoSocial);
    swalPage.clicarOk();
  });

  it("Testar consultar empresa " + empresa.razaoSocial, () => {
    empresaPage.clicarNovaEmpresa();
    empresaPage.getTituloDoModal().contains("Dados da Empresa");
    empresaPage.digitarCnpjdAbaGeral(empresa.cnpj);
    empresaPage.clicarLupaAbaGeral();
    empresaPage.validarDadosDaEmpresa(empresa);
  });
});
