import { EscritorioPage, MenuLateralPage, SwalPage, TablePage, Toaster, HeaderPage, EmpresaPage, RevendaPage } from "../../page-objects";
import { usuarios, escritorioGrupoEscritorio as escritorio } from "../../fixtures";

const menuLateral = new MenuLateralPage();
const tablePage = new TablePage();
const toast = new Toaster();
const swalPage = new SwalPage();
const escritorioPage = new EscritorioPage();
const headerPage = new HeaderPage();
const empresaPage = new EmpresaPage();
const revendaPage = new RevendaPage();

describe("Testes para Grupo de Escritório", () => {
    before(()=> {
        cy.intercept("GET", "**listar-escritorios-paginacao**").as("listarEscritorios");
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        revendaPage.cadastrarRevenda(escritorio.preRevenda);
        menuLateral.irParaCadastroEscritorio();
        escritorioPage.cadastrarEscritorio(escritorio.escritorioPai);
        menuLateral.irParaCadastroDeEmpresas();
        empresaPage.cadastrarEmpresa(escritorio.preEmpresa.cnpj, escritorio.preEmpresa.escritorio);
        cy.wait("@listarEscritorios");
    });
    
    beforeEach(()=> {
        cy.intercept("POST", "**cadastrar-alterar-escritorio**").as("moverEscritorioParaOGrupo");
        cy.intercept("POST", "**alterar-dados-escritorio").as("alterarDados");
        cy.intercept("GET", "**lista-escritorios-para-selecionar**").as("listarEscritorioGrupoEscritorio");
        cy.intercept("GET", "**remover-escritorio-do-grupo**").as("removerEscritorioGrupoEscritorio");
        cy.intercept("GET", "**listar-escritorios-grupo-escritorio-paginacao**").as("listarGrupoEscritorio");
        cy.intercept("GET", "**listar-escritorios-paginacao**").as("listarEscritorios");
        cy.intercept("GET", "**listar-grupo-de-escritorios-paginacao**").as("grupoEscritorioPaginacao");
    });

    context("Cadastrar escritório no grupo de escritórios, alterar e excluir", ()=> {
        it("Cadastrar Escritório Pai", () => {
            escritorioPage.cadastrarEscritorio(escritorio.escritorioPai);
            escritorioPage.clicarFechar();
        });

        it("Cadastrar Grupo de Escritórios", ()=> {
            tablePage.pesquisarEAbrirItemDaGrade(escritorio.escritorioPai.cnpj);

            //CADASTRAR GRUPO DE ESCRITÓRIO
            escritorioPage.clicarAbaGrupoDeEscritorios();
            escritorioPage.clicarNoBotaoAdicionarEscritorioAoGrupo();

            escritorioPage.digitarNoInputGrupoDeEscritorios(
                escritorio.grupoEscritorio.cnpj, 
                escritorio.grupoEscritorio.label);

            escritorioPage.clicarPesquisarCNPJ();
            escritorioPage.digitarEmailField(escritorio.email);
            escritorioPage.clicarSalvaModalGrupoDeEscritorios();

            //VERIFICAR SE FOI CADASTRADO
            toast.verificaMensagemDoToaster(escritorio.mensagemToaster);
            tablePage.validarQuantidadeDeItemsNaGrade(1, "app-dados-do-escritorio:visible");
            tablePage.getItemDaGrade(escritorio.grupoEscritorio.cnpj, "app-dados-do-escritorio:visible")
                .should('contain', escritorio.nome)
                .should('contain', escritorio.nomeFantasia);
            escritorioPage.clicarFecharBotao();
        });

        it("Verificar se escritório aparece na grade escritório de grupos", () => {
            escritorioPage.clicarAbaEscritoriosDeGrupo();
            cy.wait("@listarGrupoEscritorio");
            tablePage.digitarPesquisarField(escritorio.grupoEscritorio.cnpj);
            tablePage.getItensDaGrade().should("contain", escritorio.grupoEscritorio.cnpj);
        });

        it("Alterar dados do grupo", () => {
            tablePage.clicarNoElementoDaGradeQueContemOTexto(escritorio.nome);

            //ALTERANDO JSON
            escritorio.email = "candidalterado@teste.com";
            escritorio.nomeFantasia = "SANDUICHERIA KOMIAFLITO";

            //ALTERANDO AS INFORMAÇÕES
            escritorioPage.digitarEmailField(escritorio.email);
            escritorioPage.digitarFantasiaField(escritorio.nomeFantasia);
            escritorioPage.clicarSalvar();
            cy.wait("@alterarDados");

            //IR PARA ABA GRUPO DE ESCRITORIOS
            headerPage.selecionarEscritorio(escritorio.escritorioPai.cnpj);
            headerPage.abrirEscritorioHeader();
            escritorioPage.clicarAbaGrupoDeEscritorios();
            cy.wait("@grupoEscritorioPaginacao");

            //VERIFICAR SE FOI ALTERADO
            tablePage.clicarNoElementoDaGradeQueContemOTexto(escritorio.nome);
            escritorioPage.getEmailField().should("have.value", escritorio.email)
            escritorioPage.getFantasiaField().should("have.value", escritorio.nomeFantasia);
            escritorioPage.clicarFechar();
        });

        it("Remover escritório do grupo de escritórios",()=>{
            //EXCLUIR ESCRITÓRIO
            headerPage.abrirEscritorioHeader();
            escritorioPage.clicarAbaGrupoDeEscritorios();
            tablePage.getItemDaGrade(
                escritorio.grupoEscritorio.cnpj, 
                "app-dados-do-escritorio:visible")
                .find('em[title="Remover"]:visible').click();
            swalPage.clicarSim();

            //VERIFICAR SE FOI REMOVIDO
            cy.wait("@removerEscritorioGrupoEscritorio");
            tablePage.validarSeGradeEstaVazia();
            escritorioPage.clicarFecharBotao();
        });

        it("Verificar se escritório excluído aparece na aba escritorios", () => {
            tablePage.digitarPesquisarField(escritorio.grupoEscritorio.cnpj);
            tablePage.getItensDaGrade().should("contain", escritorio.grupoEscritorio.cnpj);
        });

        it("Verificar se não está na aba escritorios de grupo", () => {
            escritorioPage.clicarAbaEscritoriosDeGrupo();
            tablePage.getItensDaGrade().should("not.contain", escritorio.grupoEscritorio.cnpj);
        });
    });

    context("Testes baseados em desvincular grupo de escritórios do escritório pai", () => {

        before(() => {
            cy.logout();
            //LOGAR COM ADM GRUPO DE ESCRITORIO
            cy.login(
                escritorio.preUsuario[0].email,
                escritorio.preUsuario[0].senha
            );
        });

        it("Cadastrar 5 empresas pelo grupo de escritórios", () => {
            menuLateral.irParaCadastroDeEmpresas();
            empresaPage.cadastrarEmpresaPorExcel(escritorio.empresasArquivo);
            swalPage.getMensagem().should('contain', "5 CNPJ(s) cadastrado(s) com sucesso");
            swalPage.clicarOk();
            empresaPage.clicarFechar();
        });

        it("Mover 2 empresas para escritório pai", () => {

            escritorio.empresasParaMover.forEach((empresa) => {
                tablePage.clicarNoElementoDaGradeQueContemOTexto(empresa);
                empresaPage.selecionarGrupoEscritorioModal(escritorio.escritorioLobe);
                toast.verificaMensagemDoToaster("Alterado com sucesso");
                empresaPage.clicarFechar();
            });

        });

        it("Tentar desvincular grupo -> DEVE DAR ERRO", () => {
            //LOGAR COM ADM 
            //TROCAR PARA LOGAR COM ADM ESCRITORIO APOS ATUALIZAÇÃO DE PERFIS
            cy.logout();
            cy.login(usuarios.sistema.email, usuarios.sistema.senha);

            //TENTAR DESVINCULAR
            headerPage.selecionarEscritorio(escritorio.cnpjLobe);
            headerPage.abrirEscritorioHeader();
            escritorioPage.clicarAbaGrupoDeEscritorios();
            escritorioPage.clicarRemoverGrupoEscritorio(escritorio.cnpjEscritorioDesvincular);
            swalPage.clicarSim();
            toast.verificaMensagemDoToaster(escritorio.mensagemDesvincularNegado);
        });
    });

    context("Testes de login grupo de escritório plano vencido", () => {
        it("Logar com usuário grupo de escritório -> DEVE PASSAR", () => {
            //DEVE PASSAR POIS DEVE OLHAR PARA O PLANO DO ESCRITÓRIO "PAI"
            cy.logout();
            cy.login(escritorio.preUsuario[1].email, escritorio.preUsuario[1].senha);

            headerPage.getRoleUsuarioLogado().should("contain.text", "ADMINISTRADOR DO ESCRITORIO");
        });
    });
});