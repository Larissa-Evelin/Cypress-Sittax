const ano = ".current";
const listaAnos = ".years";

export default class PeriodoComponent {
    selecionarPeriodo(ano: string, mes: string) {
        this.clicarAno();

        this.getListaAnos().contains(ano).click();
        cy.contains(mes).click();
    }

    clicarAno() {
        cy.get(ano).should('be.visible').last().click();
    }

    getListaAnos() {
        return cy.get(listaAnos).should('be.visible');
    }

    selecionarData(ano: string, mes: string, dia: string) {
        this.clicarAno();

        this.getListaAnos().contains(ano).click();
        cy.contains(mes).should('be.visible').click();
        cy.contains(dia).should('be.visible').click();
    }
}