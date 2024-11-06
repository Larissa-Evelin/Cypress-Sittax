import { HeaderPage, TablePage, ImportacaoPage, RevendaPage, MenuLateralPage, EscritorioPage, EmpresaPage, SwalPage } from "../../page-objects";
import { dadosNotasImportacao as empresaParaTestar, usuarios, dadosEmpresaPorCnpj as empresa, dadosFaturamento } from "../../fixtures";

const headerPage = new HeaderPage();
const tablePage = new TablePage();
const importacaoPage = new ImportacaoPage();
const revendaPage = new RevendaPage();
const menuLateralPage = new MenuLateralPage();
const escritorioPage = new EscritorioPage();
const empresaPage = new EmpresaPage();
const swalPage = new SwalPage();


describe("Testar importação de declaração da empresa", () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        revendaPage.cadastrarRevenda(dadosFaturamento.preRevenda);
        menuLateralPage.irParaCadastroEscritorio();
        escritorioPage.cadastrarEscritorio(dadosFaturamento.preEscritorio);
        menuLateralPage.irParaCadastroDeEmpresas();
        empresaPage.cadastrarEmpresa(dadosFaturamento.preEmpresa.cnpj, dadosFaturamento.preEmpresa.escritorio);
        swalPage.clicarOk();
        headerPage.selecionarEmpresa(dadosFaturamento.preEmpresa.cnpj);
        headerPage.abrirEmpresaHeader();
    });

    it("Verificar se a grade está vazia", () => {
        empresaPage.clicarAbaFaturamento();
        tablePage.validarSeGradeEstaVazia();
        empresaPage.clicarFechar();
    });

    context("Importar declaração", () => {
        before(() => {
            cy.intercept("POST", "**/importar-arquivo").as("importarArquivo");
            menuLateralPage.irParaImportacaoDocumentosFiscais();
        });

        it("Importar arquivos", () => {
            importacaoPage.importarNotaFiscal(dadosFaturamento.arquivo.path);
            importacaoPage.clicarEnviarUltimoArquivoButton();
            cy.wait("@importarArquivo")
                .its("response.body")
                .then((body) => {
                    expect(body).to.have.property("sucesso");
                    expect(body.sucesso).to.true;
                });

        });

        it("Validar se as informações do arquivo de declaração estão corretas", () => {
            headerPage.abrirEmpresaHeader();
            empresaPage.clicarAbaFaturamento();
            empresaPage.checkOsValoresDaDeclaracao(dadosFaturamento.dados);
        });
    });

});
