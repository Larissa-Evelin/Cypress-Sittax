import { EscritorioPage, MenuLateralPage, TablePage, RevendaPage, EmpresaPage, SwalPage, UsuarioPage, HeaderPage } from "../../page-objects";
import { usuarios, escritorioGrupoEmpresa as escritorio, dadosEmpresaPorCnpj as empresa } from "../../fixtures";

const menuLateral = new MenuLateralPage();
const tablePage = new TablePage();
const escritorioPage = new EscritorioPage();
const revendaPage = new RevendaPage();
const menuLateralPage = new MenuLateralPage();
const empresaPage = new EmpresaPage();
const swalPage = new SwalPage();
const usuarioPage = new UsuarioPage();
const headerPage = new HeaderPage();

describe("Testes para Grupo de Empresas", () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        cy.intercept("GET", "**listar-escritorios-paginacao**").as("listarEscritorios");
        revendaPage.cadastrarRevenda(empresa.preRevenda);
        menuLateralPage.irParaCadastroEscritorio();
        escritorioPage.cadastrarEscritorio(escritorio.preEscritorio);
        menuLateralPage.irParaCadastroDeEmpresas();
        escritorio.preEmpresa.forEach((empresa) => {
            empresaPage.cadastrarEmpresa(empresa.cnpj, empresa.escritorio);
            swalPage.clicarOk();
        });

        menuLateral.irParaCadastroEscritorio();
        cy.wait("@listarEscritorios");
        tablePage.digitarPesquisarField(escritorio.cnpjEscritorio);
        tablePage.clicarNoElementoDaGradeQueContemOTexto(escritorio.cnpjEscritorio);
    });

    beforeEach(() => {
        cy.intercept("GET", "**listar-escritorios-paginacao**").as("listarEscritorios");
        cy.intercept("GET", "**listar-grupo-de-empresas**").as("listarGrupoDeEmpresas");
        cy.intercept("POST", "**criar-grupo-de-empresas**").as("criarNovoGrupo");
        cy.intercept("PUT", "**alterar-dados-grupo-de-empresas**").as("alterarGrupoDeEmpresas");
    });

    context("Cadastrar e alterar grupo de empresas", () => {
        it("Validar cadastro de grupo de empresas", () => {
            escritorioPage.clicarAbaUsuario();
            escritorio.preUsuarios.forEach((usuario) => {
                escritorioPage.clicarCadastrarNovoUsuarioButtonAbaUsuario();
                usuarioPage.cadastrarAlterarUsuario(usuario);
                escritorioPage.clicarSalvar();
                swalPage.clicarOk();
            });

            escritorioPage.clicarAbaGrupoDeEmpresas();
            escritorioPage.clicarNoBotaoAdicionarGrupoDeEmpresas();
            cy.wait("@listarGrupoDeEmpresas");
            escritorioPage.digitarNoInputGrupoDeEmpresas(escritorio.nomeDoGrupo, escritorio.inputNomeDoGrupo);
            escritorioPage.clicarNoItemInputGrupoDeEmpresas(escritorio.nomeDaEmpresa1, escritorio.inputNomeDaEmpresa);
            escritorioPage.clicarNoItemInputGrupoDeEmpresas(escritorio.nomeDoUsuario1, escritorio.inputNomeDoUsuario);
            escritorioPage.clicarSalvaModalGrupoDeEmpresas();
            cy.wait("@criarNovoGrupo");
            cy.wait("@listarGrupoDeEmpresas");
            tablePage.getItemDaGrade(escritorio.nomeDoGrupo, "app-dados-do-escritorio:visible").should('contain', "Sim");
        });

        it("Alterar Grupo de Empresa", () => {
            tablePage.clicarNoElementoDaGradeQueContemOTexto(escritorio.nomeDoGrupo);
            escritorioPage.digitarNoInputGrupoDeEmpresas(escritorio.nomeDoGrupoAlterado, escritorio.inputNomeDoGrupo);
            escritorioPage.clicarNoItemInputGrupoDeEmpresas(escritorio.nomeDaEmpresa2, escritorio.inputAdicionarEmpresa);
            escritorioPage.clicarNoItemInputGrupoDeEmpresas(escritorio.nomeDoUsuario2, escritorio.inputAdicionarUsuario);
            escritorioPage.clicarSwitchModalGrupoDeEmpresas();
            escritorioPage.clicarSalvaModalGrupoDeEmpresas();
            cy.wait("@alterarGrupoDeEmpresas");
            cy.wait("@listarGrupoDeEmpresas");
            tablePage.getItemDaGrade(escritorio.nomeDoGrupoAlterado, "app-dados-do-escritorio:visible").should('contain', "Não");
            // escritorioPage.clicarFecharBotao();
        });

        it('Logar com usuário grupo de empresa e verificar empresas', () => {
            escritorioPage.clicarAbaUsuario();
            escritorioPage.clicarGerarSenha(escritorio.preUsuarios[0].email);
            // swalPage.clicarOk();
            cy.wait(600);
            escritorioPage.getSenhaGerada().then(($text) => {
                const senhaGerada = $text

                //TENTAR LOGAR COM A EMPRESA COM A SENHA NOVA
                cy.logout();
                cy.primeiroLogin(escritorio.preUsuarios[0], senhaGerada);
                // cy.logout();
                // cy.login(escritorio.preUsuarios[0].email, escritorio.preUsuarios[0].senha);

            });

            headerPage.verificarEscritorio(escritorio.escritorioGrupoEmpresaInativo);
            headerPage.verificarQtdEmpresas(escritorio.qtdEmpresasGrupoInativo);
        });

    });

});