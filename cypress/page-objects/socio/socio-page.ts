export default class SocioPage {
    irParaSocios() {
        cy.contains("app-dados-do-escritorio:visible li a", "Sócios").click();
    }

    clicarAdicionarSocio() {
        cy.contains("app-dados-do-escritorio:visible button", "Adicionar Sócio").click();
    }
    
    cadastrarSocio(socio) {
        cy.get("app-modal-socios:visible").within(() => {
            cy.wait(300); //ESPERAR MODAL ABRIR
            cy.get("input[placeholder='Informe o nome do sócio']").type(socio.nome);
            cy.get("input[placeholder='Informe o CPF do sócio']").type(socio.CPF);
            cy.contains("button", "Salvar").click();
        });
    }

    verificarSocioFoiCadastrado(socio) {
        cy.get("app-tabela-padrao-paginada:visible tbody tr")
            .should("contain", socio.nome)
            .and("contain", socio.CPF);
    }

    excluirSocio() {
        cy.get("app-tabela-padrao-paginada:visible")
            .find("tbody tr:last-child td:last-child")
            .find("em[title='Excluir']")
            .click();
    }

    verificarSocioFoiExcluido(socio) {
        cy.get("app-tabela-padrao-paginada:visible tbody tr")
            .should("not.contain", socio.nome)
            .and("not.contain", socio.CPF);
    }
}