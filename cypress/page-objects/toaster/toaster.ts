const elementoToaster = 'div.overlay-container div#toast-container';

export default class Toaster {
    verificaMensagemDoToaster(mensagem: string) {
        cy.get(elementoToaster).should('be.visible').should('contain', mensagem);
    }
}