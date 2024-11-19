import { MenuLateralPage } from "../../page-objects";

const paginaApuracao = "sittax-apuracao sittax-anexo-apuracao ";

const cardDeValores = paginaApuracao +"div[class='valor']";
const valorDAS = paginaApuracao + "div.d-flex > span.valor.py-3";
const valorTotalIcms = paginaApuracao + "div[class='item-indicador pt-2']";
const ValorIcmsProdutosXServicos = paginaApuracao + "table.item-indicador-chart.text-center.h-100";
const valorTotalPisCofins = paginaApuracao + "div[class='item-indicador pt-3 mt-1'] div[class='d-flex justify-content-between']";
const valorTotalIrpjCsllCpp = "div[class='item-indicador pt-3 mt-1'] div[class='d-flex justify-content-between']";
const valorTotalIpi = "div[class='item-indicador pt-3 mt-1'] div[class='d-flex justify-content-between']";
const valorTotalIss = "div[class='item-indicador pt-3 mt-1'] div[class='d-flex justify-content-between']";
const anexosDaApuracao = "sittax-apuracao ul[role='menu'] li[role='menuitem'] a[class='nav-link']";

const quebraSequenciaEmOutrasAcoes = "Relatório quebra de sequência";

//Botao fechar modal
const FecharButton = "app-modal-relatorio-inconsistencia-simples-nacional > app-modal > #lgModal > .modal-dialog > .modal-content > .modal-footer > .btn-secondary";

export default class ApuracaoPage{
    irParaUrl(){
        new MenuLateralPage().irParaGerarApuracao();
    }

    clicarAbrirApuracao() {
        this.clicarOutrasAcoes();
        cy.contains("Abrir Apuração").click();
    }

    clicarFecharApuracao() {
        this.clicarOutrasAcoes();
        cy.contains("Fechar Apuração").click();
    }

    abrirQuebraSequenciasEmOutrasOpcoes(){
        this.clicarAcoes();
        this.clicarQuebraSequenciaEmOutrasAcoes();
    }

    clicarQuebraSequenciaEmOutrasAcoes(){
        cy.contains(quebraSequenciaEmOutrasAcoes).click()
    }

    clicarAcoes(){
        cy.get('sittax-apuracao div.actions #button-dropup:visible').click();
    }

    clicarOutrasAcoes() {
        cy.get('sittax-apuracao div.actions #button-dropup').last().click();
    }

    clicarFechar() {
        cy.get(FecharButton).contains("Fechar").click();
    }

    getReceitaProduto(){
        return cy.get(cardDeValores).eq(0);
    }

    getReceitaServico(){
        return cy.get(cardDeValores).eq(1);
    }

    getReceitaDevolucao(){
        return cy.get(cardDeValores).eq(2);
    }

    getReceitaLiquida(){
        return cy.get(cardDeValores).eq(3);
    }

    getRbt12(){
        return cy.get(cardDeValores).eq(4);
    }

    getValorReceitaDoAnoMercadoriaRBA(){
        return cy.get(cardDeValores).eq(5);
    }

    getValorReceitaDoAnoServicosRBA(){
        return cy.get(cardDeValores).eq(6);
    }

    verificarPercentualFatorR(anexo, percentualFatorR) {
        this.getAnexosDaApuracao().contains(anexo).click();
        cy.contains("sittax-anexo-apuracao:visible span", "Percentual do fator R").parent().within(() => {
            cy.get("div.valor").should("contain.text", percentualFatorR);
        }); 
    }

    getValorDAS() {
        return cy.get(valorDAS).eq(0);
    }

    getPorcentagemValorDAS() {
        return cy.get(valorDAS).eq(2);
    }

    getValorIcmsDAS() {
        return cy.get(valorTotalIcms).eq(0).find("span").eq(1);
    }

    getValorTotalIcms(){
        return cy.get(valorTotalIcms).eq(1);
    }

    getValorIcmsProdutosXServicos() {
        return cy.get(ValorIcmsProdutosXServicos).find("tr").eq(5).find("div");
    }

    getValorTotalPisCofins(){
        return cy.get(valorTotalPisCofins).eq(3).find("span").eq(1);
    }

    verificarValorPisCofins(valorPisCofins) {
        this.getValorTotalPisCofins().invoke("text").then(($text) => {
            const value = $text.split('|')[0].replace(/\u00a0/g, ' ').trim();
            expect(value).to.deep.eq(valorPisCofins);
        });
    }

    getValorTotalIrpjCsllCpp(){
        return cy.get(valorTotalIrpjCsllCpp).eq(4).find("span").eq(1);
    }

    verificarValorIrpjCsllCpp(valorIrpjCsllCpp) {
        this.getValorTotalIrpjCsllCpp().invoke("text").then(($text) => {
            const value = $text.split('|')[0].replace(/\u00a0/g, ' ').trim();
            expect(value).to.deep.eq(valorIrpjCsllCpp);
        });
    }

    getValorTotalIpi(){
        return cy.get(valorTotalIpi).eq(5);
    }

    getValorTotalIss(){
        return cy.get(valorTotalIss).eq(6).find("span").eq(1);
    }

    verificarValorIss(valorIss) {
        this.getValorTotalIss().invoke("text").then(($text) => {
            const value = $text.split('|')[0].replace(/\u00a0/g, ' ').trim();
            expect(value).to.deep.eq(valorIss);
        });
    }

    getAnexosDaApuracao(){
        return cy.get(anexosDaApuracao);
    }

    getApuracaoFechada() {
        return cy.contains("div", "Apuração Fechada");
    }
}