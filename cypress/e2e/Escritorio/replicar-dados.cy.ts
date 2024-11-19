import { TablePage, EscritorioPage, MenuLateralPage, HeaderPage, RevendaPage, EmpresaPage, SwalPage } from "../../page-objects";
import { usuarios, dadosParaReplicacao as empresa } from "../../fixtures";

const tablePage = new TablePage();
const escritorioPage = new EscritorioPage();
const menuLateralPage = new MenuLateralPage();
const headerPage = new HeaderPage();
const revendaPage = new RevendaPage();
const empresaPage = new EmpresaPage();
const swalPage = new SwalPage();


describe('Replicar data de transmissão',() =>{

    before(() =>{
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        revendaPage.cadastrarRevenda(empresa.preRevenda);
        menuLateralPage.irParaCadastroEscritorio();
        escritorioPage.cadastrarEscritorio(empresa.preEscritorio);
        menuLateralPage.irParaCadastroDeEmpresas();
        empresaPage.cadastrarEmpresa(empresa.preEmpresa.cnpj, empresa.preEmpresa.escritorio);
        swalPage.clicarOk();
    });

    beforeEach(() => {
        cy.intercept("GET", "**/listar-empresas-para-replicar-dados**").as("listarEmpresasParaReplicar");
    });

    it('Testar replicar data de transmissão', () =>{
        headerPage.abrirEscritorioHeader();
        escritorioPage.clicarReplicacoes();
        escritorioPage.digitarDadosReplicar(empresa.apuracao);
        escritorioPage.digitarDiaReplicar(empresa.diaParaTransmissao);
        tablePage.selecionarTodosItensDaGrade("app-dados-do-escritorio:visible");
        tablePage.selecionarBulkAction(empresa.acao);
        tablePage.clicarRealizarOperacaoLoteButton("app-tabela-padrao-paginada");
        cy.wait('@listarEmpresasParaReplicar');
    });

    it('Validar data de transmissão', () =>{
        tablePage.getItensDeUmDeterminadoIndiceDoTd(empresa.colunaTransmissao,'app-replicacao:visible').then(data => {
            expect(data).to.contain(empresa.diaParaTransmissao);
        });
    })

    it('Testar replicar data de calculo', () =>{
        escritorioPage.digitarDadosReplicar(empresa.calculo);
        escritorioPage.digitarDiaReplicar(empresa.diaParaCalculo);
        tablePage.selecionarTodosItensDaGrade("app-dados-do-escritorio:visible");
        tablePage.selecionarBulkAction(empresa.acao);
        tablePage.clicarRealizarOperacaoLoteButton("app-tabela-padrao-paginada");
        cy.wait('@listarEmpresasParaReplicar');
    });

    it('Validar data de cálculo', () =>{
        tablePage.getItensDeUmDeterminadoIndiceDoTd(empresa.colunaCalculo,'app-replicacao:visible').then(data => {
            expect(data).to.contain(empresa.diaParaCalculo);
        });
    });

    it('Testar replicar data de envio', () =>{
        escritorioPage.digitarDadosReplicar(empresa.envio);
        escritorioPage.digitarDiaReplicar(empresa.diaParaEnvio);
        tablePage.selecionarTodosItensDaGrade("app-dados-do-escritorio:visible");
        tablePage.selecionarBulkAction(empresa.acao);
        tablePage.clicarRealizarOperacaoLoteButton("app-tabela-padrao-paginada");
        cy.wait('@listarEmpresasParaReplicar');
    });

    it('Validar data de envio', () =>{
        tablePage.getItensDeUmDeterminadoIndiceDoTd(empresa.colunaEnvio,'app-replicacao').then(data => {
            expect(data).to.contain(empresa.diaParaEnvio);
        });
    });
});
