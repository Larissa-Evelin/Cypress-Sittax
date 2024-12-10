import { EmpresaPage, EscritorioPage, MenuLateralPage, RevendaPage, SwalPage } from '../../page-objects';
import { usuarios, empresasParaCadastrarPorCNPJ as empresa } from "../../fixtures";

const empresaPage = new EmpresaPage();
const swalPage = new SwalPage();
const revendaPage = new RevendaPage();
const menuLeralPage = new MenuLateralPage();
const escritorioPage = new EscritorioPage();

before(() => {
    cy.login(usuarios.sistema.email, usuarios.sistema.senha);
    revendaPage.cadastrarRevenda(empresa.preRevenda);
    menuLeralPage.irParaCadastroEscritorio();
    escritorioPage.cadastrarEscritorio(empresa.preEscritorio);
    menuLeralPage.irParaCadastroDeEmpresas();
});

describe('Testar cadastrar empresa por CNPJ', () => {
    it('Testar cadastrar CNPJ ' + empresa.cnpj, () => {
        empresaPage.cadastrarEmpresa(empresa.cnpj, empresa.escritorio);
        swalPage.clicarOk();
    });

    it(`Pesquisar a empresa ${empresa.cnpj} na grade`, () => {
        empresaPage.digitarPesquisaField(empresa.cnpj);
        empresaPage.getTable().should('contain.text', empresa.cnpj);
    });
})