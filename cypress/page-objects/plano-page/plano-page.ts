export default class PlanoPage {
    
    alterarPlanoParaRetroagir() {
        cy.get("sittax-input-field:visible ng-select").click();
        cy.contains("div[role='option']", "Retroagir empresas 5 anos").click();
        cy.get("sittax-input-field:visible input[placeholder='Quantidade']").clearThenType("5");

        cy.contains("button", "Incluir").click();

        cy.get("app-modal-detalhes-plano:visible").contains("button", "Alterar Plano").click();
        cy.get("app-modal-confirmacao-do-plano:visible").contains("button", "Confirmar").click();
    }

    alterarPlanoRetroagirPersonalizado(quantidadeRetroagir: string) {
        cy.get("sittax-input-field:visible ng-select").click();
        cy.contains("div[role='option']", "Retroagir Personalizado").click();
        cy.get("sittax-input-field:visible input[placeholder='Quantidade']").clearThenType("5");
        cy.get("sittax-input-field:visible input[placeholder='Qtd. Meses Para Retroagir']").clearThenType(quantidadeRetroagir);

        cy.contains("button", "Incluir").click();

        cy.get("app-modal-detalhes-plano:visible").contains("button", "Alterar Plano").click();
        cy.get("app-modal-confirmacao-do-plano:visible").contains("button", "Confirmar").click();
    }
    
    alterarPlanoPersonalizado(quantidade: string, valor: string) {
        cy.get("sittax-input-field:visible ng-select").click();
        cy.contains("div[role='option']", "Plano Personalizado").click();
        cy.get("sittax-input-field:visible input[placeholder='Quantidade']").clearThenType(quantidade);
        cy.get("sittax-input-field:visible input[placeholder='Valor Personalizado']").clearThenType(valor);
        
        cy.contains("button", "Incluir").click();

        cy.get("app-modal-detalhes-plano:visible").contains("button", "Alterar Plano").click();
        cy.get("app-modal-confirmacao-do-plano:visible").contains("button", "Confirmar").click();
    }

    alterarPlanoParaGratis() {
        cy.get("sittax-input-field:visible ng-select").click();
        cy.contains("div[role='option']", "Grátis").click();
        cy.get("sittax-input-field:visible input[placeholder='Quantidade']").clearThenType("5");

        cy.contains("button", "Incluir").click();

        cy.get("app-modal-detalhes-plano:visible").contains("button", "Alterar Plano").click();
        cy.get("app-modal-confirmacao-do-plano:visible").contains("button", "Confirmar").click();
    }

    verificarPlanoAtivo(index: number, nome: string, tipo: string, quantidade: string, total: string, ativo: string) {
        cy.get("app-plano:visible app-tabela-padrao:visible").within(() => {
            cy.get("tbody tr")
                .eq(index)
                .should("contain", nome)
                .and("contain", tipo)
                .and("contain", quantidade)
                .and("contain", total)
                .and("contain", ativo) 
        });
    }

    fecharDetalhesPlano() {
        cy.get("app-modal-detalhes-plano:visible").contains("button", "Fechar").click();
    }
}