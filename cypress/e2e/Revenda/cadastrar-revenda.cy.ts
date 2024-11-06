//ESTÁ FALTANDO A PARTE DE CHAMAR A ROTA DE DELETAR A INFORMÇÃO

import { usuarios, dadosRevenda } from '../../fixtures';
import { MenuLateralPage, RevendaPage } from '../../page-objects';

const menuLateralPage = new MenuLateralPage();
const revendaPage = new RevendaPage();

describe('Quando todas as informações obrigatórias forem preenchidas ao criar o cadastro de uma revenda, o sistema deve salvar a revenda com sucesso', () => {
    context('Cadastrar revenda', () => {
        before(() => {
            cy.login(usuarios.sistema.email, usuarios.sistema.senha);
            menuLateralPage.irParaCadastroRevenda();
        });
        it('Validar se o cadastro foi realizado com sucesso', () => {
            revendaPage.cadastrarRevenda(dadosRevenda);
        });
    });
    
});
