import { EmpresaPage, MenuLateralPage, SwalPage, TablePage, HeaderPage, RevendaPage, EscritorioPage } from "../../page-objects";
import { usuarios, sugestaoTipoNota } from "../../fixtures";

const headerPage = new HeaderPage();
const tablePage = new TablePage();
const empresaPage = new EmpresaPage();
const swalPage = new SwalPage();
const revendaPage = new RevendaPage();
const menuLeralPage = new MenuLateralPage();
const escritorioPage = new EscritorioPage();

describe("Sugestão Tipo Nota", () => {
    before(()=> {
        cy.intercept("GET", "**listar-empresas-paginacao**").as("listarPaginacao");
        
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        revendaPage.cadastrarRevenda(sugestaoTipoNota.preRevenda);
        menuLeralPage.irParaCadastroEscritorio();
        escritorioPage.cadastrarEscritorio(sugestaoTipoNota.preEscritorio);
        menuLeralPage.irParaCadastroDeEmpresas();
        empresaPage.cadastrarEmpresa(sugestaoTipoNota.PreEmporesa.cnpj, sugestaoTipoNota.preEscritorio.razaoSocial);
        swalPage.clicarOk();

        headerPage.selecionarEmpresa(sugestaoTipoNota.cnpjEmpresa);
        headerPage.abrirEmpresaHeader();
        empresaPage.clicarAbaSugestaoTipoNota();
    });

    beforeEach(()=> {
        cy.intercept("POST", "**adicionar**").as("salvarSugestao");
        cy.intercept("GET", "**remover**").as("excluirSugestao");
        cy.intercept("GET", "**pagina**").as("listarSugestoes");
        cy.intercept("POST", "**/importar-arquivo").as("importarArquivo");
    });

    context("Teste de Sugestão Tipo Nota", ()=> {
        it("Cadastrar Sugestão Tipo Nota", ()=> {
            empresaPage.clicarBotaoAdicionarSugestaoTipoNota();
            cy.wait(300); //ESPERAR MODAL ABRIR
            empresaPage.digitarNoInputSugestaoTipoNota(sugestaoTipoNota.cnpjDoFornecedor, sugestaoTipoNota.cnpj);
            empresaPage.digitarNoInputSugestaoTipoNota(sugestaoTipoNota.nomeDoFornecedor, sugestaoTipoNota.nome);
            empresaPage.abrirSelecionarOpcaoDropdown(sugestaoTipoNota.tipoDaNotaFiscal, sugestaoTipoNota.notaFiscal);
            empresaPage.abrirSelecionarOpcaoDropdown(sugestaoTipoNota.tipoDaClassificacao, sugestaoTipoNota.classificacao);
            empresaPage.digitarNoInputSugestaoTipoNota(sugestaoTipoNota.informeOCodigo, sugestaoTipoNota.codigo);
            empresaPage.abrirSelecionarOpcaoDropdown(sugestaoTipoNota.tipoDoItem, sugestaoTipoNota.item);
            empresaPage.clicarBotaoAdicionarItemSugestaoTipoNota();
            empresaPage.clicarBotaoSalvarSugestaoTipoNota();
            cy.wait("@salvarSugestao");
            cy.wait("@listarSugestoes");
        });

        it("Verificar dados da Sugestão Tipo Nota", ()=> {
            tablePage.getItemDaGrade(sugestaoTipoNota.cnpj, "app-sugestao-tipo-nota:visible").find("td").then($element => {
                cy.wrap($element).eq(0).should("contain", sugestaoTipoNota.cnpj);
                cy.wrap($element).eq(1).should("contain", sugestaoTipoNota.nome);
                cy.wrap($element).eq(2).should("contain", sugestaoTipoNota.notaFiscal);
            });

            tablePage.clicarNoElementoDaGradeQueContemOTexto(sugestaoTipoNota.cnpj);
            
            tablePage.getItemDaGrade(sugestaoTipoNota.codigo, "app-modal-adicionar-sugestao-tipo-nota:visible").find("td").then($element => {
                cy.wrap($element).eq(0).should("contain", sugestaoTipoNota.codigo);
                cy.wrap($element).eq(1).should("contain", sugestaoTipoNota.classificacao);
                cy.wrap($element).eq(2).should("contain", sugestaoTipoNota.item);
            });
            empresaPage.clicarFechar();
        });

        it("Remover Sugestões cadastradas", () => {
            tablePage.clicarBotaoExcluirItemDaTabela(sugestaoTipoNota.cnpj, "app-sugestao-tipo-nota:visible");
            swalPage.clicarSim();
            cy.wait("@excluirSugestao");
            empresaPage.clicarFechar();
        });
    });
});