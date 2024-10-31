import TablePage from "../table/tablePage";
import Toaster from "../toaster/toaster";

const tablePage = new TablePage();
// const escritorioPage = new EscritorioPage();
const toaster = new Toaster();

interface IRevenda {
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    email: string,
    telefone: string,
    uf: string,
    apelido: string
    itemUFS: string [], 
    itemUFSInvalido?: string [],
    keyApiSerpro: string,
    keyApiSerproInvalido?: string,
    secretApiSerpro: string,
    secretApiSerproInvalido?: string
}

export default class RevendaPage {
    clicarBotaoNovaRevenda() {
        cy.contains("Nova Revenda").should('be.visible').click();
    }

    preencherFormulario(revenda: IRevenda){
        cy.intercept("GET", "**/empresa/pesquisar-cnpj*").as("pesquisarEmpresa");

        cy.get("app-modal-empresa-revenda:visible").within(() => {
            cy.wait(300); //ESPERAR MODAL ABRIR
            cy.get("input[formcontrolname='cnpj']").type(revenda.cnpj); 
            cy.get("button[title='Clique para pesquisar o CNPJ']").click();
            cy.wait("@pesquisarEmpresa");
            cy.get("input[formcontrolname='razaoSocial']").invoke("val").should("eq", revenda.razaoSocial);
            cy.get("input[formcontrolname='nomeFantasia']").invoke("val").should("eq", revenda.nomeFantasia);
            cy.get("input[formcontrolname='email']").clearThenType(revenda.email).invoke("val").then(($val) => {
                if(!$val.includes('@')) {
                    cy.contains("span.invalid-feedback", "E-mail não é um email válido")
                        .should("be.visible");
                }
            });
            cy.get("input[formcontrolname='telefone']").invoke("val").should("eq", revenda.telefone).then(($val) => {
                if(typeof $val === 'string' && $val.length < 14) {
                    cy.contains("span.invalid-feedback", "Telefone não é um telefone válido!")
                        .should("be.visible");
                }
            });
            cy.get("input[formcontrolname='uf']").invoke("val").should("eq", revenda.uf);
            cy.get("input[formcontrolname='apelido']").type(revenda.apelido).invoke("val").then(($val) => {
                if(!$val) {
                    cy.contains("span.invalid-feedback", "Apelido é obrigatório!")
                        .should("be.visible");
                }
            });

            (revenda.itemUFS || revenda?.itemUFSInvalido).forEach(($item) => { //SE NÃO EXISTIR ITEMUFS EXECUTA O OUTRO
                if($item === "ROR" || $item === "!@#" || $item === "12") {
                    cy.get("input[formcontrolname='item']").type($item + "{enter}");
                    cy.get("tag").should("not.exist");
                    cy.get("input[formcontrolname='keyApiSerpro']").realClick();
                    
                } else {
                    cy.get("input[formcontrolname='item']").click();
                    cy.contains($item).click();
                    cy.get("tag").should("contain.text", $item);
                }
            });

            cy.get("input[formcontrolname='keyApiSerpro']")
                .should("be.visible")
                .type(revenda?.keyApiSerproInvalido || revenda.keyApiSerpro )
                .invoke("val")
                .then(($val) => {
                    if(!$val) {
                        cy.contains("span.invalid-feedback", "Key API Serpro é obrigatório!")
                            .should("be.visible");
                    }
            });
            cy.get("input[formcontrolname='secretApiSerpro']")
                .should("be.visible")
                .type(revenda?.secretApiSerproInvalido || revenda.secretApiSerpro)
                .invoke("val")
                .then(($val) => {
                    if(!$val) {
                        cy.contains("span.invalid-feedback", "Secret API Serpro é obrigatório!")
                            .should("be.visible");
                    }
            });
        });
    }

    editarRevenda(revenda) {
        cy.get("app-modal-empresa-revenda:visible").within(() => {
            cy.wait(300); //ESPERAR ABRIR O MODAL
            cy.get("input[formcontrolname='razaoSocial']").invoke("val").should("eq", revenda.razaoSocial);
             cy.get("input[formcontrolname='email']")
                .clearThenType(revenda.email)
                .invoke("val")
                .then(($val) => {
                    if(!$val.includes('@')) {
                        cy.contains("span.invalid-feedback", "E-mail não é um email válido")
                            .should("be.visible");
                    }
            });
            cy.get("input[formcontrolname='telefone']").clearThenType(revenda.telefone).invoke("val").then(($val) => {
                if($val.length < 14) {
                    cy.contains("span.invalid-feedback", "Telefone não é um telefone válido!")
                        .should("be.visible");
                }
            });
            cy.get("input[formcontrolname='apelido']").clearThenType(revenda.apelido).invoke("val").then(($val) => {
                if(!$val) {
                    cy.contains("span.invalid-feedback", "Apelido é obrigatório!")
                        .should("be.visible");
                }
            });

            cy.contains("tag", "RO").get("delete-icon").first().should("be.visible").click();
            cy.contains("tag", "AM").get("delete-icon").first().should("be.visible").click();

            revenda.itemUFS.forEach(($item) => { 
                cy.get("input[formcontrolname='item']").click();
                cy.contains($item).click();
                cy.get("tag").should("contain.text", $item);
            });

            cy.get("input[formcontrolname='keyApiSerpro']").clearThenType(revenda.keyApiSerpro).invoke("val").then(($val) => {
                if(!$val) {
                    cy.contains("span.invalid-feedback", "Key API Serpro é obrigatório!")
                        .should("be.visible");
                }
            });
            cy.get("input[formcontrolname='secretApiSerpro']").clearThenType(revenda.secretApiSerpro).invoke("val").then(($val) => {
                if(!$val) {
                    cy.contains("span.invalid-feedback", "Secret API Serpro é obrigatório!")
                        .should("be.visible");
                }
            });
        });
    }

    // editarRevendaEscritorio(revenda) {
    //     escritorioPage.selecionarRevenda(revenda.apelido);
    //     toaster.verificaMensagemDoToaster("Revenda alterado com sucesso!");
    //     cy.get("app-dados-do-escritorio:visible").within(() => {
    //         cy.contains("button", "Fechar")
    //         .scrollTo('bottom', { ensureScrollable: false }) //rola a tela pra baixo se o modal for maior que a viewport
    //         .click();
    //     });
    // }

    salvarNovaRevenda() {
        cy.get("app-modal-empresa-revenda:visible").within(() => {
            cy.contains("button", "Salvar")
            .scrollTo('bottom', { ensureScrollable: false }) //rola a tela pra baixo se o modal for maior que a viewport
            .click();
        });
        toaster.verificaMensagemDoToaster("Revenda adicionada com sucesso!");
        tablePage.atualizarTabela();
    }

    salvarRevendaEditada() {
        cy.get("app-modal-empresa-revenda:visible").within(() => {
            cy.contains("button", "Alterar")
            .scrollTo('bottom', { ensureScrollable: false }) //rola a tela pra baixo se o modal for maior que a viewport
            .click();
        });
        toaster.verificaMensagemDoToaster("Alterado com sucesso!");
    }

    // pesquisarRevenda(revenda) {
    //     tablePage.digitarPesquisarField(revenda.cnpj);  
    //     tablePage.getItemDaGrade(revenda.cnpj).should("exist");
    // }

    // pesquisarRevendaAbrirModal(revenda) {
    //     tablePage.digitarPesquisarField(revenda.cnpj);  
    //     tablePage.getItemDaGrade(revenda.cnpj).should("exist").dblclick({force: true});
    // }

    // verificarRevendaNaTabela(revenda) {
    //     tablePage.getItemDaGrade(revenda.cnpj).should("be.visible");
    // }

    // verificarDadosForamEditados(revenda) {
    //     tablePage.clicarNoElementoDaGradeQueContemOTexto(revenda.cnpj);
    //     cy.get("app-modal-empresa-revenda:visible").within(() => {
    //         cy.get("input[formcontrolname='razaoSocial']").invoke("val").should("eq", revenda.razaoSocial);
    //         cy.get("input[formcontrolname='email']").invoke("val").should("eq", revenda.email);
    //         cy.get("input[formcontrolname='telefone']").invoke("val").should("eq", revenda.telefone);
    //         cy.get("input[formcontrolname='apelido']").invoke("val").should("eq", revenda.apelido);

    //         revenda.itemUFS.forEach(($item) => { 
    //             cy.get("tag").should("contain.text", $item);
    //         });

    //         cy.get("input[formcontrolname='keyApiSerpro']").invoke("val").should("eq", revenda.keyApiSerpro);
    //         cy.get("input[formcontrolname='secretApiSerpro']").invoke("val").should("eq", revenda.secretApiSerpro);
    //     });
    // }

    verificarEscritorioTemRevenda(revenda) {
        cy.get("app-dados-do-escritorio:visible").within(() => {
            cy.get("ngx-select[placeholder='Revenda']").should("contain", revenda);
            cy.contains("button", "Fechar")
            .scrollTo('bottom', { ensureScrollable: false }) //rola a tela pra baixo se o modal for maior que a viewport
            .click();
        });
    }

    verificarBotaoSalvarEstaDisabled() {
        cy.get("app-modal-empresa-revenda:visible").within(() => {
            cy.contains("button", "Salvar").should("have.attr", "disabled");
        });
        cy.contains("button:visible", "Fechar").click();
    }
}