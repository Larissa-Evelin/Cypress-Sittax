import { EmpresaPage, MenuLateralPage, SwalPage } from '../../page-objects';
import { usuarios, dadosEmpresaPorCnpj as empresa } from "../../fixtures";

const empresaPage = new EmpresaPage();
const swalPage = new SwalPage();
const menuLateralPage = new MenuLateralPage();


describe('Quando for realizado o cadastro da empresa deve realizar o cadastro com sucesso', () => {
    before(() => {
        menuLateralPage.irParaCadastroDeEmpresas();
    });

    it('Validar cadastro por CNPJ da empresa: ' + empresa.cnpj, () => {
        empresaPage.cadastrarEmpresa(empresa.cnpj, empresa.escritorio);
        swalPage.clicarOk();
    });

    it(`Pesquisar a empresa ${empresa.cnpj} na grade`, () => {
        cy.wait(600);
        empresaPage.digitarPesquisaField(empresa.cnpj);
        empresaPage.getTable().should('contain.text', empresa.cnpj);
    });

})