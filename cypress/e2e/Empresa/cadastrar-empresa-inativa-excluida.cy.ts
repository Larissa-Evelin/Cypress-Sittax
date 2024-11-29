import { EmpresaPage, SwalPage, TablePage, Toaster, MenuLateralPage, RevendaPage, EscritorioPage, HeaderPage, UsuarioPage } from '../../page-objects';
import { usuarios, empresasInativarExcluir as inativarExcluirempresas } from "../../fixtures";

const empresaPage = new EmpresaPage();
const swalPage = new SwalPage();
const tablePage = new TablePage();
const toaster = new Toaster();
const menuLateralPage = new MenuLateralPage();
const revendaPage = new RevendaPage();
const escritorioPage = new EscritorioPage();
const headerPage = new HeaderPage();
const usuarioPage = new UsuarioPage();

before(() => {
    cy.login(usuarios.sistema.email, usuarios.sistema.senha);
    revendaPage.cadastrarRevenda(inativarExcluirempresas.preRevenda);
    menuLateralPage.irParaCadastroEscritorio();
    inativarExcluirempresas.preEscritorio.forEach((escritorio) => {
        escritorioPage.cadastrarEscritorio(escritorio);
    });
    
    headerPage.abrirEscritorioHeader();
    escritorioPage.clicarAbaUsuario();
    escritorioPage.clicarCadastrarNovoUsuarioButtonAbaUsuario();
    usuarioPage.cadastrarAlterarUsuario(inativarExcluirempresas.preCadastroUsuario);
    escritorioPage.clicarSalvar();
    swalPage.clicarOk();
    cy.wait(600);
    escritorioPage.clicarGerarSenha(inativarExcluirempresas.preLogin.email);
    cy.wait(600);
    escritorioPage.getSenhaGerada().then(($text) => {
        const senhaGerada = $text
        //TENTAR LOGAR COM A EMPRESA COM A SENHA NOVA
        cy.logout();
        cy.primeiroLogin(inativarExcluirempresas.preCadastroUsuario, senhaGerada);
    });
    menuLateralPage.irParaCadastroDeEmpresas();
});

describe('Cadastrar empresas, Inativar empresa A e Excluir empresa B, Tentar cadastrar empresas novamente', () => {
    inativarExcluirempresas.empresas.forEach(empresa => {
        it(`Cadastrar CNPJ ${empresa.cnpj}`, () => {
            empresaPage.cadastrarEmpresa(empresa.cnpj);
            swalPage.clicarOk();
        });

        it(`Pesquisar CNPJ ${empresa.cnpj} na grade`, () => {
            empresaPage.getTable().should('contain.text', empresa.cnpj);
        });
    });

    it('Inativar CNPJ ' + inativarExcluirempresas.empresas[1].cnpj, () => {
        tablePage.clicarNoElementoDaGradeQueContemOTexto(inativarExcluirempresas.empresas[1].cnpj);

        //INATIVAR EMPRESA
        empresaPage.clicarInativarEmpresa();
        empresaPage.confirmarInativarEmpresa(inativarExcluirempresas.empresas[1].cnpj);
        swalPage.clicarSim();
        toaster.verificaMensagemDoToaster("Alteração realizada!");

        //VERIFICAR SE FOI INATIVADA
        tablePage.digitarPesquisarField(inativarExcluirempresas.empresas[1].cnpj);
        tablePage.getItensDaGrade().should("contain", "Nenhum registro encontrado");
    });

    it('Excluir CNPJ ' + inativarExcluirempresas.empresas[0].cnpj, () => {
        //SOMENTE ADM TEM A OPÇÃO DE EXCLUIR
        cy.logout();

        cy.login(usuarios.sistema.email, usuarios.sistema.senha);

        menuLateralPage.irParaCadastroDeEmpresas();
        cy.wait(300); //ESPERAR CARREGAR TABELA
        tablePage.digitarPesquisarField(inativarExcluirempresas.empresas[0].cnpj);
        tablePage.clicarNoElementoDaGradeQueContemOTexto(inativarExcluirempresas.empresas[0].cnpj);

        //EXCLUIR EMPRESA
        empresaPage.clicarExcluirEmpresa();
        empresaPage.confirmarExcluirEmpresa(inativarExcluirempresas.empresas[0].cnpj);
        swalPage.clicarSim();

        //VERIFICAR SE FOI EXCLUIDA
        toaster.verificaMensagemDoToaster("Empresa excluida com sucesso");
        tablePage.digitarPesquisarField(inativarExcluirempresas.empresas[0].cnpj);
        cy.wait(300);
        tablePage.getItensDaGrade().should("contain", "Nenhum registro encontrado");
    });

    it(`Excluir CNPJ ${inativarExcluirempresas.empresas[2].cnpj}, atribuir escritorio`, () => {
        tablePage.digitarPesquisarField(inativarExcluirempresas.empresas[2].cnpj);
        tablePage.clicarNoElementoDaGradeQueContemOTexto(inativarExcluirempresas.empresas[2].cnpj);

        //EXCLUIR EMPRESA
        empresaPage.clicarExcluirEmpresa();
        empresaPage.confirmarExcluirEmpresa(inativarExcluirempresas.empresas[2].cnpj);
        swalPage.clicarSim();

        //VERIFICAR SE FOI EXCLUIDA
        toaster.verificaMensagemDoToaster("Empresa excluida com sucesso");

        //REMOVER FILTRO
        empresaPage.clicarRemoverFiltroAtivo();

        //ABRIR MODAL DA EMPRESA EXCLUIDA
        tablePage.digitarPesquisarField(inativarExcluirempresas.empresas[2].cnpj);
        tablePage.clicarNoElementoDaGradeQueContemOTexto(inativarExcluirempresas.empresas[2].cnpj);

        //ATRIBUIR ESCRITÓRIO
        empresaPage.selecionarEscritorioModal(inativarExcluirempresas.empresas[2].escritorio);
        toaster.verificaMensagemDoToaster("Escritório alterado");
    });

    context('Tentar cadastrar empresas novamente', () => {
        before(() => {
            cy.logout();
            cy.login(usuarios.lobeAdmEscritorio.email, usuarios.lobeAdmEscritorio.senha);
        });

        it("Tentar cadastrar CNPJ excluido -> DEVE CADASTRAR", () => {
            menuLateralPage.irParaCadastroDeEmpresas();
            empresaPage.cadastrarEmpresa(inativarExcluirempresas.empresas[0].cnpj);
            swalPage.clicarOk();

            //VERIFICAR SE FOI CADASTRADA
            tablePage.digitarPesquisarField(inativarExcluirempresas.empresas[0].cnpj);
            tablePage.getItensDaGrade().should("contain", inativarExcluirempresas.empresas[0].cnpj);
        });

        it("Tentar cadastrar CNPJ inativo -> DEVE DAR ERRO", () => {
            empresaPage.cadastrarEmpresa(inativarExcluirempresas.empresas[1].cnpj);
            swalPage.getMensagem().should("contain.text", "Não foi possível cadastrar a empresa. Motivo: A empresa só poderá ser ativada novamente dia");
            swalPage.clicarOk();
        });

        it(`Tentar cadastrar ${inativarExcluirempresas.empresas[2].cnpj} em outro escritório -> DEVE DAR ERRO`, () => {
            empresaPage.cadastrarEmpresa(inativarExcluirempresas.empresas[2].cnpj);
            swalPage.getMensagem().should("contain.text", "Não é possível adicionar esta empresa ao seu escritório. Entre em contato com o suporte!");
        });
    });
});