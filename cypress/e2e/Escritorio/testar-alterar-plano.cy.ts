import { TablePage, EscritorioPage, Toaster, PlanoPage, SwalPage, MenuLateralPage, HeaderPage, EmpresaPage, ApuracaoPage, RevendaPage, UsuarioPage } from '../../page-objects';
import { usuarios, escritorioPlanos } from '../../fixtures';

const tablePage = new TablePage();
const escritorioPage = new EscritorioPage();
const toaster = new Toaster();
const planoPage = new PlanoPage();
const swalPage = new SwalPage();
const menuLateralPage = new MenuLateralPage();
const headerPage = new HeaderPage();
const empresaPage = new EmpresaPage();
const apuracaoPage = new ApuracaoPage();
const revendaPage = new RevendaPage();
const usuarioPage = new UsuarioPage();

describe.skip("Testes para alteração dos planos", () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        revendaPage.cadastrarRevenda(escritorioPlanos.preRevenda);
        menuLateralPage.irParaCadastroEscritorio();
    });
    beforeEach(() => {
        cy.intercept("GET", "**simples-nacional").as("apuracao");
    });

    context("Cadastro e alteração dos planos", () => {
        it("Cadastrar escritório", () => {
            escritorioPage.cadastrarEscritorio(escritorioPlanos.escritorio);
            //Verificar se cadastrou
            tablePage.digitarPesquisarField(escritorioPlanos.escritorio.cnpj);
            tablePage.getItensDaGrade().should("contain.text", escritorioPlanos.escritorio.cnpj);
        });


        it("Tentar trocar plano Grátis para plano Retroagir ->  DEVE DAR ERRO", () => {
            headerPage.abrirEscritorioHeader();
            escritorioPage.clicarAbaPlano();
            escritorioPage.clicarAlterarPlano();
            planoPage.alterarPlanoParaRetroagir();
            toaster.verificaMensagemDoToaster("Não é permitido adicionar um serviço de retroagir junto com o plano grátis");
            planoPage.fecharDetalhesPlano();
        });

        it("Trocar plano Grátis para plano Personalizado", () => {
            escritorioPage.clicarAlterarPlano();
            planoPage.alterarPlanoPersonalizado("5", "50");
            toaster.verificaMensagemDoToaster("Serviço adicionado ao plano com sucesso");
            planoPage.verificarPlanoAtivo(
                1, //linha a ser pesquisada
                "Plano Personalizado",
                "Cnpj",
                "5",
                "50,00",
                "Sim");
        });

        it("Tentar colocar quantidade no plano menor que número de empresas -> DEVE DAR ERRO", () => {
            tablePage.digitarPesquisarField(escritorioPlanos.escritorio.cnpj);
            escritorioPage.clicarAbaPlano();
            escritorioPage.clicarAlterarPlano();
            planoPage.alterarPlanoPersonalizado("4", "50");
            toaster.verificaMensagemDoToaster("Não foi possível inserir o novo serviço");
            planoPage.fecharDetalhesPlano();
            escritorioPage.clicarFechar();
        });

        it("Tentar voltar para plano Grátis -> DEVE DAR ERRO", () => {
            escritorioPage.clicarAlterarPlano();
            planoPage.alterarPlanoParaGratis();
            toaster.verificaMensagemDoToaster("Não é permitido adicionar um serviço Grátis quando há um serviço de CNPJ vigente");
            planoPage.fecharDetalhesPlano();
        });

        it("Tentar colocar quantidade meses Retroagir inválida -> DEVE DAR ERRO", () => {
            escritorioPage.clicarAlterarPlano();
            planoPage.alterarPlanoRetroagirPersonalizado("1");
            toaster.verificaMensagemDoToaster("Quantidade minima de meses para retroagir é 4 e o máximo é 60");

            planoPage.alterarPlanoRetroagirPersonalizado("70");
            toaster.verificaMensagemDoToaster("Quantidade minima de meses para retroagir é 4 e o máximo é 60");
            planoPage.fecharDetalhesPlano();
        });

        it("Adicionar Retroagir ao plano Personalizado", () => {
            escritorioPage.clicarAlterarPlano();
            planoPage.alterarPlanoParaRetroagir();
            toaster.verificaMensagemDoToaster("Serviço adicionado ao plano com sucesso");
            planoPage.verificarPlanoAtivo(
                2, //linha a ser pesquisada
                "Retroagir empresas 5 anos",
                "Retroagir",
                "5",
                "1,65",
                "Sim");
        });
    });

    context("Cadastrar usuário no Escritório e realizar validações", () => {
        it("Cadastrar usuário no escritório e logar", () => {
            escritorioPage.clicarAbaUsuario();
            escritorioPage.clicarCadastrarNovoUsuarioButtonAbaUsuario();
            usuarioPage.cadastrarAlterarUsuario(escritorioPlanos.usuario);
            escritorioPage.clicarSalvar();
            swalPage.clicarOk();
            cy.wait(300); //ESPERAR SWAL FECHAR

            //GERAR SENHA E LOGAR COM USUARIO
            escritorioPage.clicarGerarSenha(escritorioPlanos.usuario.email);
            escritorioPage.getSenhaGerada().then(($text) => {
                var senhaGerada = $text;

                cy.logout();
                cy.primeiroLogin(escritorioPlanos.usuario, senhaGerada);
            });
        });

        it("Cadastrar empresa", () => {
            menuLateralPage.irParaCadastroDeEmpresas();
            empresaPage.cadastrarEmpresa(escritorioPlanos.empresa.cnpj, escritorioPlanos.escritorio.cnpj);
            swalPage.clicarOk();
        });

        it("Selecionar empresa e testar retroagir periodo valido", () => {
            headerPage.selecionarEmpresa(escritorioPlanos.empresa.razaoSocial);
            headerPage.selecionarPeriodo(escritorioPlanos.periodoApuracao.ano, escritorioPlanos.periodoApuracao.mes);
            headerPage.abrirEmpresaHeader();

            empresaPage.clicarAbaConfiguracoes();
            empresaPage.clicarSwitchDaTabela("Permite Retroagir");
            swalPage.clicarSim();
            empresaPage.clicarFechar();

            menuLateralPage.irParaGerarApuracao();
            cy.wait("@apuracao");
            apuracaoPage.getReceitaProduto().should("contain.text", escritorioPlanos.valorApuracao.valorProduto);
        });

        it("Testar retroagir periodo inválido", () => {
            const date = new Date();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = (date.getFullYear() - 5);

            escritorioPlanos.periodoApuracao.ano = String(year - 2); //SETANDO PARA MAIS DE 5 ANOS

            headerPage.selecionarPeriodo(escritorioPlanos.periodoApuracao.ano, escritorioPlanos.periodoApuracao.mes);
            swalPage.getMensagem().should("contain.text", `De acordo com o seu plano atual, você não pode realizar apurações anteriores ao período [${month}/${year}] de contratação do sistema.`);
        });
    });
});