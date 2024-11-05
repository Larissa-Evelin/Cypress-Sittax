import { MenuLateralPage, TablePage, SwalPage } from "../../page-objects";


export default class NotasFiscaisSaidaPage {
    irParaUrl(){
        cy.intercept("GET", "**/lista-nota-fiscal-saida-paginacao*").as("listarNotasPaginacao");

        cy.restoreLocalStorage();

        new MenuLateralPage().irParaDocumentosFiscaisNotaFiscalDeSaida();
        cy.wait("@listarNotasPaginacao");
    }

    verificarValorTotalValorProdutosDaNota(valorTotal: number, valorProdutos: number) {
        cy.get("app-tabela-padrao:visible table").within(() => {

            cy.get("tr td:nth-child(11)").invoke("text").then(($text) => {
                const textoTratado = $text.replace(/\u00a0/g, ' ').trim();;
                expect(textoTratado).to.deep.eq(valorTotal);
            });
            
            cy.get("tr td:nth-child(13)").invoke("text").then(($text) => {
                const textoTratado = $text.replace(/\u00a0/g, ' ').trim();;
                expect(textoTratado).to.deep.eq(valorProdutos);
            });
        });
    }

    verificarValorTotalDaNota(valorTotal: number) {
        cy.get("app-tabela-padrao-paginada:visible table").within(() => {

            cy.get("tr td:nth-child(8)").invoke("text").then(($text) => {
                const textoTratado = $text.replace(/\u00a0/g, ' ').trim();;
                expect(textoTratado).to.deep.eq(valorTotal);
            });
        });
    }

    verificarValorDeducaoDaNota(valorDeducao: number) {
        cy.get("app-tabela-padrao:visible table").within(() => {

            cy.get("tr:nth-child(2) td:nth-child(6)").invoke("text").then(($text) => {
                const textoTratado = $text.replace(/\u00a0/g, ' ').trim();;
                expect(textoTratado).to.deep.eq(valorDeducao);
            });
        });
    }

    verificarValorDescontoDaNota(desconto: number) {
        cy.get("app-tabela-padrao:visible table").within(() => {

            cy.get("tr td:nth-child(8)").invoke("text").then(($text) => {
                const textoTratado = $text.replace(/\u00a0/g, ' ').trim();;
                expect(textoTratado).to.deep.eq(desconto);
            });
        });
    }

    verificarValorTotalDoItem(valorTotalItem: number) {
        cy.get("app-tabela-padrao:visible table").within(() => {

            cy.get("tr:nth-child(1) td:nth-child(11)").invoke("text").then(($text) => {
                const textoTratado = $text.replace(/\u00a0/g, ' ').trim();;
                expect(textoTratado).to.deep.eq(valorTotalItem);
            });
        });
    }

    verificarValorDescontoDoItem(descontoItem: number) {
        cy.get("app-tabela-padrao:visible table").within(() => {

            cy.get("tr:nth-child(1) td:nth-child(8)").invoke("text").then(($text) => {
                const textoTratado = $text.replace(/\u00a0/g, ' ').trim();;
                expect(textoTratado).to.deep.eq(descontoItem);
            });
        });
    }

    pesquisarNumeroNota(numeroNota: number) {
        cy.get("select").first().select("Número da Nota");
        cy.get("input[placeholder='Número da Nota']").type(`${numeroNota}{enter}`);
        cy.wait(1500); //AGUARDAR PESQUISA
    }

    alterarCfopDoItem(cfopOrigem, cfopDestino) {
        cy.get(`td[title='${cfopOrigem}']`).should("be.visible").clearThenType(cfopDestino);
    }

    alterarCfopDosItensEmLote(cfopOrigem: number, cfopDestino: number) {
        cy.get("app-dados-da-nota:visible").within(() => {
            new TablePage().selecionarTodosItensDaGrade("app-tabela-padrao:visible");
            cy.get("select").select("Alterar CFOP");
            cy.contains("button", "Realizar operação em Lote").click();
        });

        new SwalPage().clicarSim();
        cy.wait(500);
        cy.get("input[placeholder='CFOP Origem']").type(`${cfopOrigem}{enter}`);
        cy.get("input[placeholder='CFOP Destino']").type(`${cfopDestino}{enter}`);
        cy.contains("button:visible", "Confirmar").click();
    }

    verificarCfopDoItem(cfop: number) {
        cy.get("app-tabela-padrao:visible tbody"). within(() => {
            cy.get(`td[title='${cfop}']`).should("be.visible").find("input").invoke("val").then(($val) => {
                expect($val).to.eq(cfop);
            });
        });
    }

    verificarCfopDoItemEmLote(cfop: number) {
        cy.get("app-tabela-padrao:visible tbody").within(() => {
            cy.get("tr").each(($linha) => {
                cy.wrap($linha).find("td").eq(3).find("input").invoke("val").then(($val) => {
                    expect($val).to.eq(cfop);
                });
            });
        });
    }

    clicarCancelarNota() {
        cy.get("em[title='Cancelar Nota Fiscal']").should("be.visible").click();
    }

    clicarAutorizarNota() {
        cy.get("em[title='Autorizar Nota Fiscal']").should("be.visible").click();
    }

    clicarFechar() {
        cy.get("app-dados-da-nota:visible").contains("button", "Fechar").should("be.visible").click();
    }
}