import { HeaderPage, ContadorPage, Toaster, RevendaPage, MenuLateralPage, EscritorioPage, EmpresaPage, SwalPage } from "../../page-objects";
import { dadosContador, usuarios, dadosEscritorio as escritorio, dadosEmpresaPorCnpj as empresa } from "../../fixtures";

const headerPage = new HeaderPage();
const contadorPage = new ContadorPage();
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

//CADASTRAR E VERIFICAR
describe("Testar cadastrar e remover contador", () => {
    it("Validar se irá cadastrar", () => {
        // headerPage.selecionarEscritorio(dadosContador.escritorioCnpj);
        headerPage.abrirEscritorioHeader();
        contadorPage.irParaContador();
        contadorPage.clicarAdicionarContador();
        contadorPage.cadastrarContador(dadosContador);
        toaster.verificaMensagemDoToaster("Dados do contador adicionados com sucesso");
        contadorPage.verificarContadorFoiCadastrado(dadosContador);
    });

    //REMOVER E VERIFICAR
    it("Validar se irá remover contador", () => {
        contadorPage.excluirContador();
        toaster.verificaMensagemDoToaster("Dados do contador removido com sucesso");
        contadorPage.verificarContadorFoiExcluido(dadosContador);
    });
});