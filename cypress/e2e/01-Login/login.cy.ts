import {usuarios} from '../../fixtures'

describe('Validar usuário e senha', () => {
    it('Inserir usuário e senha', () => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
    });
});

