import { HeaderPage, Toaster, SocioPage, RevendaPage, MenuLateralPage, EscritorioPage } from "../../page-objects";
import { socioDados, usuarios, dadosEscritorio as escritorio } from "../../fixtures";

const headerPage = new HeaderPage();
const socioPage = new SocioPage();
const toaster = new Toaster();
const revendaPage = new RevendaPage();
const menuLateralPage = new MenuLateralPage();
const escritorioPage = new EscritorioPage();

before(() => {
    cy.login(usuarios.sistema.email, usuarios.sistema.senha);
    revendaPage.cadastrarRevenda(escritorio.preRevenda);
    menuLateralPage.irParaCadastroEscritorio();
    escritorioPage.cadastrarEscritorio(escritorio);
});

describe("Testar cadastrar e remover sócio", () => {
    it("Validar se irá cadastrar", () => {
        //ABRIR ABA SOCIOS
        // headerPage.selecionarEscritorio(socioDados.escritorioCnpj);
        headerPage.abrirEscritorioHeader();
        socioPage.irParaSocios();
        socioPage.clicarAdicionarSocio();

        //CADASTRAR SOCIO
        socioPage.cadastrarSocio(socioDados);
        toaster.verificaMensagemDoToaster("Sócio do escritório adicionado com sucesso");
        socioPage.verificarSocioFoiCadastrado(socioDados);
    });

    //EXCLUIR SOCIO
    it("Validar se irá remover o sócio", () => {
        socioPage.excluirSocio();
        toaster.verificaMensagemDoToaster("Sócio do Escritório removido com sucesso")
        socioPage.verificarSocioFoiExcluido(socioDados);
    });
});