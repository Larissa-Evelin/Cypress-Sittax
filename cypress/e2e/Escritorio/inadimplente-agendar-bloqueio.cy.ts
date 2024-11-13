import { MenuLateralPage, HeaderPage, EscritorioPage, Toaster, SwalPage, RevendaPage, EmpresaPage, UsuarioPage, TablePage } from "../../page-objects";
import { usuarios, inadimplenteBloqueio } from "../../fixtures";
import { forEach } from "cypress/types/lodash";

const menuLateralPage = new MenuLateralPage();
const headerPage = new HeaderPage();
const escritorioPage = new EscritorioPage();
const toaster = new Toaster();
const swalPage = new SwalPage();
const revendaPage = new RevendaPage();
const usuarioPage = new UsuarioPage();
const tablePage = new TablePage();

describe("Marcar inadimplente, verificar mensagem de aviso, agendar bloqueio e verificar se usuário foi bloqueado", () => {
    context("Cadastrar escritório e usuário para testes", () => {
        before(() => {
            cy.login(usuarios.sistema.email, usuarios.sistema.senha);
            revendaPage.cadastrarRevenda(inadimplenteBloqueio.preRevenda);
            menuLateralPage.irParaCadastroEscritorio();
        });

        it(`Cadastrar escritório ${inadimplenteBloqueio.escritorio.razaoSocial}`, () => {
            escritorioPage.cadastrarEscritorio(inadimplenteBloqueio.preEscritorio);
            escritorioPage.clicarFechar();
            toaster.verificaMensagemDoToaster("Escritório cadastrado!");
        });

        it(`Cadastrar usuário com perfil financeiro e administrador do escritório`, () => {
            //CADASTRAR USUÁRIO
            headerPage.abrirEscritorioHeader();
            inadimplenteBloqueio.preUsuario.forEach((usuario) => {
                escritorioPage.clicarAbaUsuario();
                escritorioPage.clicarCadastrarNovoUsuarioButtonAbaUsuario();
                usuarioPage.cadastrarAlterarUsuario(usuario);
                escritorioPage.clicarSalvar();
                swalPage.clicarOk();

                // Gerar senha
                escritorioPage.clicarGerarSenha(usuario.email);
                escritorioPage.getSenhaGerada().then(($text) => {
                    Cypress.env(`senhaGerada${usuario.nome}`, $text);
                });
                swalPage.clicarOk();
            });
            escritorioPage.clicarFecharBotao();
            menuLateralPage.irParaCadastroUsuario();
            tablePage.digitarPesquisarField(inadimplenteBloqueio.preUsuario[0].email);
            tablePage.clicarNoElementoDaGradeQueContemOTexto(inadimplenteBloqueio.preUsuario[0].email);
            usuarioPage.selecionarPerfil("FINANCEIRO");
            toaster.verificaMensagemDoToaster("Perfil adicionado com sucesso!");
            usuarioPage.clicarFechar();
        });
    });

    context("Marcar inadimplência e agendar bloqueio", () => {
        it("Marcar inadimplência para 5 dias", () => {
            const dataInadimplencia = escritorioPage.setDataInadimplenciaBloqueioDias(5);
            const nomeUsuario = inadimplenteBloqueio.preUsuario[0].nome;
            const senhaFinanceiro = Cypress.env(`senhaGerada${nomeUsuario}`);

            cy.logout();
            cy.primeiroLogin(inadimplenteBloqueio.preUsuario[0], senhaFinanceiro);

            headerPage.abrirEscritorioHeader();
            escritorioPage.clicarAbaDadosDoEscritorio();
            escritorioPage.clicarAbaFinanceiro();
            escritorioPage.ativarInadimplencia(dataInadimplencia);
            toaster.verificaMensagemDoToaster("Alterado com sucesso");
            escritorioPage.clicarFechar();

            cy.logout();
        });

        it("Logar com o usuário e verificar mensagem de aviso de inadimplência", () => {
            const nomeUsuario = inadimplenteBloqueio.preUsuario[1].nome;
            const senhaInadimplente = Cypress.env(`senhaGerada${nomeUsuario}`);

            cy.primeiroLogin(inadimplenteBloqueio.preUsuario[1], senhaInadimplente);

            swalPage.getMensagem().should("contain.text", "O escritório encontra-se em inadimplência e será bloqueado em 5 dias.");
            swalPage.clicarOk();

            cy.logout();
        });

        it("Agendar bloqueio do escritório", () => {
            const dataBloqueio = escritorioPage.setDataInadimplenciaBloqueioDias(0); //DIA ATUAL
            cy.login(usuarios.sistema.email, usuarios.sistema.senha);
            headerPage.abrirEscritorioHeader();
            escritorioPage.clicarAbaAgendarBloqueio();
            escritorioPage.agendarBloqueio(dataBloqueio);
            toaster.verificaMensagemDoToaster("Alterado com sucesso");
            cy.logout();
        });

        it("Tentar logar com usuário do escritório que foi bloqueado -> NÃO DEVE LOGAR", () => {
            cy.login(inadimplenteBloqueio.preUsuario[1].email, inadimplenteBloqueio.preUsuario[1].senha);
            toaster.verificaMensagemDoToaster("Seu plano não está mais vigente. Entre em contato com o comercial.");
        });
    });
});