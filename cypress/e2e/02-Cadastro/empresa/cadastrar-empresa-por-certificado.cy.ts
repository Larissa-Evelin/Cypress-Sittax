import { EmpresaPage, TablePage, Toaster, SwalPage, MenuLateralPage } from "../../../page-objects";
import { usuarios, dadosEmpresaPorCertificados as empresa } from "../../../fixtures";

const empresaPage = new EmpresaPage();
const tablePage = new TablePage();
const toaster = new Toaster();
const swalPage = new SwalPage();
const menuLateral = new MenuLateralPage();

describe("Testar o cadastro de empresa pelo Certificado digital", () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        menuLateral.irParaCadastroDeEmpresas();
    });

    afterEach(() => {
        empresaPage.clicarFechar();
    })

    it("Cadastrar empresa por Certificado", () => {
        empresaPage.cadastrarEmpresaPorCertificado(empresa.caminhoDoCertificado);
        swalPage.getMensagem().should("contain.text", "sucesso");
        swalPage.clicarOk();
    });

    it("Tentar cadastar a empresa novamente -> DEVE DAR ERRO", () => {
        empresaPage.cadastrarEmpresaPorCertificado(empresa.caminhoDoCertificado);
        toaster.verificaMensagemDoToaster(`Empresa [${empresa.cnpj}] já cadastrada no Sittax! Por favor, entre em contato com o suporte!`);
    });

    it("Validar os dados da empresa", () => {
        tablePage.pesquisarEAbrirItemDaGrade(empresa.cnpj);
        empresaPage.validarDadosDaEmpresa(empresa);
    });
});
