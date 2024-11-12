import { EscritorioPage, MenuLateralPage } from '../../page-objects';
import { usuarios, dadosConsultarCnpj } from '../../fixtures';

const escritorioPage = new EscritorioPage();
const menuLateralPage = new MenuLateralPage();

describe('Testar consulta de CNPJ', () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        menuLateralPage.irParaCadastroEscritorio();
    });
    
    it('Validar consulta do escritório ' + dadosConsultarCnpj.razaoSocial, () => {
        escritorioPage.clicarNovoEscritorio();
        escritorioPage.digitarCnpjField(dadosConsultarCnpj.cnpj);
        escritorioPage.clicarLupa();
        escritorioPage.validarDadosDoEscritorio(dadosConsultarCnpj);
    });
});