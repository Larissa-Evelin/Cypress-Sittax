//ESCRITÓRIO TEMPORARIO, FUTURAMENTE O TESTE TERÁ QUE CRIAR UM ESCRITÓRIO
//FUTURAMENTE TAMBÉM TERÁ A OPÇÃO DE CADASTRAR PELA ABA USUÁRIOS AO INVÉS DE SOMENTE POR UM ESCRITÓRIO

import { HeaderPage, EscritorioPage, SwalPage, UsuarioPage, RevendaPage, MenuLateralPage  } from '../../page-objects';
import { usuarios, cadastroUsuario } from "../../fixtures";

const headerPage = new HeaderPage();
const escritorioPage = new EscritorioPage();
const swalPage = new SwalPage();
const usuarioPage = new UsuarioPage();
const revendaPage = new RevendaPage();
const menuLateralPage = new MenuLateralPage();

describe("Testes baseados em cadastrar usuários", () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        revendaPage.cadastrarRevenda(cadastroUsuario.preRevenda);
        menuLateralPage.irParaCadastroEscritorio();
        escritorioPage.cadastrarEscritorio(cadastroUsuario.preEscritorio);
        menuLateralPage.irParaCadastroDeEmpresas();
        cy.intercept("GET", "*listar-usuarios-por-escritorio-paginacao*").as("usuarioPaginacao");
    });

    it('Cadastrar usuário adm escritório no escritório UBERCONTA', () => {
        // headerPage.selecionarEscritorio("UBERCONTA UBERABA CONTABILIDADE LTDA");
        headerPage.abrirEscritorioHeader();
        escritorioPage.clicarAbaUsuario();
        cy.wait("@usuarioPaginacao");
        escritorioPage.clicarCadastrarNovoUsuarioButtonAbaUsuario();
        usuarioPage.cadastrarAlterarUsuario(cadastroUsuario);
        escritorioPage.clicarSalvar();
        swalPage.getMensagem().should("contain.text", "Cadastrado com sucesso!");
        swalPage.clicarOk();
    });

    it('Verificar se usuário aparece na tabela', () => {
        escritorioPage.getGradeAbaUsuario()
          .should("contain", cadastroUsuario.nome)
          .and("contain", cadastroUsuario.email)
          .and("contain", "Sim");
    });

    it('Tentar cadastra usuário com mesmo email -> DEVE DAR ERRO', () => {
        cadastroUsuario.nome = "usuarioInvalido";
        escritorioPage.clicarCadastrarNovoUsuarioButtonAbaUsuario();
        usuarioPage.cadastrarAlterarUsuario(cadastroUsuario);
        escritorioPage.clicarSalvar();
        swalPage.getMensagem().should("contain.text", "E-mail já existente em outro cadastro.");
        swalPage.clicarOk();
        escritorioPage.clicarFecharBotao();
    });

    it('Validar se usuário invalido não aparece na tabela', () => {
        escritorioPage.getGradeAbaUsuario().should("not.contain", "usuarioInvalido");
        escritorioPage.clicarFecharBotao();
    });
});