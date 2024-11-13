import { MenuLateralPage, EscritorioPage, Toaster, TablePage, SwalPage, EmpresaPage, RevendaPage } from '../../page-objects';
import { usuarios, escritorioInativar } from '../../fixtures';

const menuLateralPage = new MenuLateralPage();
const escritorioPage = new EscritorioPage();
const toaster = new Toaster();
const tablePage = new TablePage();
const swalPage = new SwalPage();
const empresaPage = new EmpresaPage();
const revendaPage = new RevendaPage();


describe("Verificar se ao inativar o escritório as empresas vinculadas também inativam", () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
    });     

    it("Cadastrar revenda, escritório e empresas", () => {
        revendaPage.cadastrarRevenda(escritorioInativar.preRevenda);
        menuLateralPage.irParaCadastroEscritorio();
        escritorioPage.cadastrarEscritorio(escritorioInativar);
        toaster.verificaMensagemDoToaster("Escritório cadastrado");

        menuLateralPage.irParaCadastroDeEmpresas();

        escritorioInativar.empresas.forEach((empresa) => {
            empresaPage.cadastrarEmpresa(empresa.cnpj, empresa.escritorio);
            swalPage.clicarOk();
        });
    });

    it("Inativar escritório e verificar se as empresas também foram inativadas", () => {
        menuLateralPage.irParaCadastroEscritorio();
        tablePage.pesquisarEAbrirItemDaGrade(escritorioInativar.cnpj);
        escritorioPage.clicarAtivarInativar();
        swalPage.clicarSim();
        toaster.verificaMensagemDoToaster("Alteração feita com sucesso.");
        escritorioPage.clicarFecharBotao();

        menuLateralPage.irParaCadastroDeEmpresas();

        escritorioInativar.empresas.forEach((empresa) => {
            tablePage.digitarPesquisarField(empresa.cnpj);
            tablePage.getItensDaGrade().should("contain", "Nenhum registro encontrado");
        });
    });
}); 