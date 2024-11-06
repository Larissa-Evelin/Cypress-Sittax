//ESTÁ FALTANDO A PARTE DE CHAMAR A ROTA DE DELETAR A INFORMÇÃO

import { EmpresaPage, EscritorioPage, MenuLateralPage, RevendaPage, SwalPage } from '../../page-objects';
import { usuarios, dadosEmpresaPorCnpj as empresa } from "../../fixtures";

const empresaPage = new EmpresaPage();
const swalPage = new SwalPage();
const menuLateralPage = new MenuLateralPage();
const revendaPage = new RevendaPage();
const escritorioPage = new EscritorioPage();


describe('Quando for realizado o cadastro da empresa deve realizar o cadastro com sucesso', () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        revendaPage.cadastrarRevenda(empresa.preRevenda);
        menuLateralPage.irParaCadastroEscritorio();
        escritorioPage.cadastrarEscritorio(empresa.preEscritorio);
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