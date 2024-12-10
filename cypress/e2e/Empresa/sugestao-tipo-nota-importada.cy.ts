import { EmpresaPage, EscritorioPage, HeaderPage, ImportacaoPage, MenuLateralPage, NotasFiscaisEntradaPage, RevendaPage, SwalPage } from "../../page-objects";
import { usuarios, sugestaoTipoNotaImportada as empresa } from "../../fixtures";

const empresaPage = new EmpresaPage();
const headerPage = new HeaderPage();
const importacaoPage = new ImportacaoPage();
const notasFiscaisDeEntradaPage = new NotasFiscaisEntradaPage();
const revendaPage = new RevendaPage();
const menuLeralPage = new MenuLateralPage();
const escritorioPage = new EscritorioPage();
const swalPage = new SwalPage();

//PARA REALIZAR É NECESSÁRIO EXECUTAR A PROCEDURE AtualizarTipoDaNotaEItem
//ATUALMENTE SÓ ESTÁ SENDO POSSÍVEL EXECUTAR MANUALMENTE
//ESPERAR A CRIAÇÃO DA ROTA

describe.skip("Testes sugestão notas NF-e e Ct-e", () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        revendaPage.cadastrarRevenda(empresa.preRevenda);
        menuLeralPage.irParaCadastroEscritorio();
        escritorioPage.cadastrarEscritorio(empresa.preEscritorio);
        menuLeralPage.irParaCadastroDeEmpresas();
        empresaPage.cadastrarEmpresa(empresa.PreEmporesa.cnpj, empresa.preEscritorio.razaoSocial);
        swalPage.clicarOk();


        headerPage.selecionarEmpresa(empresa.empresaSelecionada.cnpj);
        headerPage.selecionarPeriodo("2024", "Maio");
    });

    beforeEach(()=> {
        cy.intercept("POST", "**adicionar**").as("salvarSugestao");
        cy.intercept("GET", "**pagina**").as("listarSugestoes");
        cy.intercept("POST", "**/importar-arquivo").as("importarArquivo");
    });

    empresa.fornecedores.forEach((sugestao) => {
        it("Adicionar sugestão", () => {
            headerPage.abrirEmpresaHeader();
            
            //CADASTRAR SUGESTAO
            empresaPage.clicarAbaSugestaoTipoNota();
            empresaPage.clicarBotaoAdicionarSugestaoTipoNota();
            cy.wait(300); //ESPERAR MODAL ABRIR
            empresaPage.digitarNoInputSugestaoTipoNota("CNPJ do fornecedor", sugestao.cnpjFornecedor);
            empresaPage.digitarNoInputSugestaoTipoNota("Nome do fornecedor", sugestao.nomeFornecedor);
            empresaPage.abrirSelecionarOpcaoDropdown("Tipo da Nota Fiscal", sugestao.notaFiscal.tipo);
            empresaPage.clicarBotaoSalvarSugestaoTipoNota();
            cy.wait("@salvarSugestao");
            cy.wait("@listarSugestoes");
            empresaPage.clicarFechar();
        });

        it("Importar nota", () => {
            importacaoPage.irParaUrl();
            importacaoPage.importarNotaFiscal(sugestao.notaFiscal.arquivo.path);
            importacaoPage.clicarEnviarUltimoArquivoButton();

            cy.wait("@importarArquivo")
            .its("response.body")
            .then((body) => {
              expect(body).to.have.property("sucesso");
              expect(body.sucesso).to.true;
            });
        });

        it("Verificar se a nota importada está classificada", () => {
            //ANTES DESSE PONTO EXECUTAR AtualizarTipoDaNotaEItem

            notasFiscaisDeEntradaPage.irParaUrl();
            notasFiscaisDeEntradaPage.pesquisarNumeroNota(sugestao.notaFiscal.numero);
            notasFiscaisDeEntradaPage.verificarTipoNota(0, sugestao.notaFiscal.numero); //LINHA, VALOR
        });  
    });
});