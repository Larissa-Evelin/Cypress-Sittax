import { cadastroUsuario } from "../../fixtures";


interface iCadastroUsuario {

    nome: string,
    sobrenome: string,
    email: string,
    telefone: string,
    perfilDeAcesso: string
}

export default class UsuarioPage {

    private validRolesReplicador = ['ADMINISTRADOR', 'ADMINISTRADOR_REVENDA', 'DESENVOLVEDOR'];
    private roleText = '';

    selecionarPerfil(perfil) {
        cy.get("app-modal-do-usuario:visible ngx-select[placeholder='Selecione um perfil']")
            .click()
            .type(`${perfil}{enter}`);
    }

    cadastrarAlterarUsuario(cadastroUsuario: iCadastroUsuario) {
        cy.get('span.user-block-role').invoke('text').then(text => {
            this.roleText = text.trim();
        });

        cy.get("app-modal-cadastrar-alterar-usuario:visible").within(() => {
            cy.wait(300); //ESPERAR MODAL ABRIR
            cy.get("input[formcontrolname='nome']").clearThenType(cadastroUsuario.nome);
            cy.get("input[formcontrolname='sobrenome']").clearThenType(cadastroUsuario.sobrenome);

            if (cadastroUsuario.email) {
                cy.get("input[formcontrolname='email']").clearThenType(cadastroUsuario.email);
            }

            cy.get("input[formcontrolname='telefone']").clearThenType(cadastroUsuario.telefone);

            if (this.validRolesReplicador.includes(this.roleText)) {
                cy.get("ng-select[formcontrolname='ehReplicador']").click().type("Não{enter}");
                cy.get("ng-select[formcontrolname='ehReplicador']").should("contain", "NÃO");
            }

            cy.get("ng-select[formcontrolname='role']").click().type(cadastroUsuario.perfilDeAcesso + "{enter}");
            cy.get("ng-select[formcontrolname='role']").should("contain", cadastroUsuario.perfilDeAcesso);
        });
    }

    selecionarEscritorio(escritorio: string) {
        cy.get("app-modal-do-usuario:visible ngx-select[placeholder='Selecione um escritório']")
            .click()
            .type(`${escritorio}{enter}`);
    }

    selecionarRevenda(revenda: string) {
        cy.get("app-modal-do-usuario:visible ngx-select[placeholder='Selecione uma revenda']")
            .click()
            .type(`${revenda}{enter}`);
    }

    pesquisarPermissoes(permissao: string) {
        cy.get("app-acessos-usuarios:visible input[placeholder='Pesquisar']").type(permissao);
    }

    removerPermissao(permissao: string) {
        cy.contains("td", permissao).parent().find("input[type='checkbox']").should("be.checked");
        cy.contains("td", permissao).parent().find("span").click();
        cy.contains("td", permissao).parent().find("input[type='checkbox']").should("not.be.checked");
    }

    adicionarPermissao(permissao) {
        cy.contains("td", permissao).parent().find("input[type='checkbox']").should("not.be.checked");
        cy.contains("td", permissao).parent().find("span").click();
        cy.contains("td", permissao).parent().find("input[type='checkbox']").should("be.checked");
    }

    verificarEscritorios(escritorio: string, qtd: number) {
        cy.get("#selectHeaderEscritorios div[role='option']")
            .should("have.length", qtd)
            .and("contain", escritorio);
    }

    verificarBotao() {
        return cy.contains("button", "Nova Empresa");
    }

    clicarFechar() {
        cy.get("div.modal-footer").last().scrollIntoView();
        cy.get("app-modal-do-usuario:visible button:visible")
            .should('be.visible')
            .contains('Fechar')
            .click();
        cy.wait(300);
    }
}