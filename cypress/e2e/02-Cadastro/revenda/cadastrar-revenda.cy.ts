import { usuarios, dadosRevenda } from '../../../fixtures';
import { MenuLateralPage, RevendaPage } from '../../../page-objects';

const menuLateralPage = new MenuLateralPage();
const revendaPage = new RevendaPage();

describe('Quando todas as informações obrigatórias forem preenchidas ao criar o cadastro de uma revenda, o sistema deve salvar a revenda com sucesso', () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
    });
    context('Cadastrar revenda', () => {
        it('Validar se o cadastro foi realizado com sucesso', () => {
            menuLateralPage.irParaCadastroRevenda();
            revendaPage.clicarBotaoNovaRevenda();
            revendaPage.preencherFormulario(dadosRevenda);
            revendaPage.salvarNovaRevenda();
        });
    });
    
});
