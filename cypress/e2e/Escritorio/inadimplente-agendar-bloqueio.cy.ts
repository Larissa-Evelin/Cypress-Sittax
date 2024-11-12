import { MenuLateralPage, HeaderPage, EscritorioPage, Toaster, SwalPage, RevendaPage, EmpresaPage, UsuarioPage } from "../../page-objects";
import { usuarios, inadimplenteBloqueio } from "../../fixtures";

const menuLateralPage = new MenuLateralPage();
const headerPage = new HeaderPage();
const escritorioPage = new EscritorioPage();
const toaster = new Toaster();
const swalPage = new SwalPage();
const revendaPage = new RevendaPage();
const empresaPage = new EmpresaPage();
const usuarioPage = new UsuarioPage();

describe("Marcar inadimplente, verificar mensagem de aviso, agendar bloqueio e verificar se usuário foi bloqueado", () => {
    context("Cadastrar escritório e usuário para testes", () => {
        before(() => {
            cy.login(usuarios.sistema.email, usuarios.sistema.senha);
            revendaPage.cadastrarRevenda(inadimplenteBloqueio.preRevenda);
            menuLateralPage.irParaCadastroEscritorio();
        });

        it(`Cadastrar escritório ${inadimplenteBloqueio.escritorio.razaoSocial}`, () => {
            escritorioPage.cadastrarEscritorio(inadimplenteBloqueio.escritorio);
            escritorioPage.clicarFechar();
            toaster.verificaMensagemDoToaster("Escritório cadastrado!");
        });

        it(`Cadastrar usuário ${inadimplenteBloqueio.usuario.nome} no escritório e gerar senha de acesso`, () => {
            //CADASTRAR USUÁRIO
            headerPage.selecionarEscritorio(inadimplenteBloqueio.escritorio.cnpj);
            headerPage.abrirEscritorioHeader();

            escritorioPage.clicarAbaUsuario();
            escritorioPage.clicarCadastrarNovoUsuarioButtonAbaUsuario();
            usuarioPage.cadastrarAlterarUsuario(inadimplenteBloqueio.usuario);
            escritorioPage.clicarSalvar();
            swalPage.clicarOk();

            //GERAR SENHA
            escritorioPage.clicarGerarSenha(inadimplenteBloqueio.usuario.email);
            escritorioPage.getSenhaGerada().then(($text) => {
                Cypress.env('senhaGerada', $text); //ARMAZENAR SENHA 
            });
            swalPage.clicarOk();
        });
    });

    context("Marcar inadimplência e agendar bloqueio", () => {
        it("Marcar inadimplência para 5 dias", () => {
            const dataInadimplencia = escritorioPage.setDataInadimplenciaBloqueioDias(5);

            escritorioPage.clicarAbaDadosDoEscritorio();
            escritorioPage.clicarAbaFinanceiro();
            escritorioPage.ativarInadimplencia(dataInadimplencia);
            toaster.verificaMensagemDoToaster("Alterado com sucesso");
            escritorioPage.clicarFechar();

            cy.logout();
        });

        it("Logar com o usuário e verificar mensagem de aviso de inadimplência", () => {
            const senhaGerada = Cypress.env('senhaGerada');

            cy.primeiroLogin(inadimplenteBloqueio.usuario, senhaGerada);

            swalPage.getMensagem().should("contain.text", "O escritório encontra-se em inadimplência e será bloqueado em 5 dias.");
            swalPage.clicarOk();

            cy.logout();
        });

        it("Agendar bloqueio do escritório", () => {
            const dataBloqueio = escritorioPage.setDataInadimplenciaBloqueioDias(0); //DIA ATUAL

            cy.login(usuarios.sistema.email, usuarios.sistema.senha);

            headerPage.selecionarEscritorio(inadimplenteBloqueio.escritorio.cnpj);
            headerPage.abrirEscritorioHeader();

            escritorioPage.clicarAbaAgendarBloqueio();
            escritorioPage.agendarBloqueio(dataBloqueio);
            toaster.verificaMensagemDoToaster("Alterado com sucesso");

            cy.logout();
        });

        it("Tentar logar com usuário do escritório que foi bloqueado -> NÃO DEVE LOGAR", () => {
            cy.login(inadimplenteBloqueio.usuario.email, inadimplenteBloqueio.usuario.senha);
            toaster.verificaMensagemDoToaster("Seu plano não está mais vigente. Entre em contato com o comercial.");
        });
    });
});