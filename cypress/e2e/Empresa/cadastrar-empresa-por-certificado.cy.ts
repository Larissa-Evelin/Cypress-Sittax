import { EmpresaPage, TablePage, Toaster, SwalPage, MenuLateralPage } from "../../page-objects";
import { usuarios, dadosEmpresaPorCertificados as empresa } from "../../fixtures";

const empresaPage = new EmpresaPage();
const tablePage = new TablePage();
const toaster = new Toaster();
const swalPage = new SwalPage();
const menuLateral = new MenuLateralPage();

describe("Validar o cadastro de empresa pelo Certificado digital", () => {
    before(() => {
        // cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        menuLateral.irParaCadastroDeEmpresas();
    });

    it("Cadastrar empresa por Certificado", () => {
        empresaPage.cadastrarEmpresaPorCertificado(empresa.caminhoDoArquivo);
        swalPage.getMensagem().should("contain.text", "sucesso");
        swalPage.clicarOk();
        empresaPage.clicarFechar();
    });

    it("Validar se irá cadastar a empresa novamente -> DEVE DAR ERRO", () => {
        empresaPage.cadastrarEmpresaPorCertificado(empresa.caminhoDoArquivo);
        swalPage.clicarOk();
        empresaPage.clicarFechar();
        tablePage.digitarPesquisarField(empresa.cnpj);
        tablePage.getItensDaGrade().should('have.length', 1);
    });

    it("Validar os dados da empresa", () => {
        tablePage.pesquisarEAbrirItemDaGrade(empresa.cnpj);
        empresaPage.validarDadosDaEmpresa(empresa);
        empresaPage.clicarFechar();
    });
});
