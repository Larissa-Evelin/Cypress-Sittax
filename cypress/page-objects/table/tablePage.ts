const qtdItensDeveSerMostradoNaGrade = 'input[placeholder="Qtd Itens"]';
const checkboxDosItensDaGrade = "tbody:visible tr:visible  div:visible  label:visible";
const pesquisarField = "div.inputPesquisaTabela:visible .form-control:visible";
const table = " table:visible";
const linha = " tr:visible";
const bulkActionSelect = " select[id='inputGroupSelect04']:visible";
const realizarOperacaoLoteButton = " .input-group-append:visible";
const todosOsTD = " #table-ext-2:visible tbody:visible tr:visible td:visible";
const dataDeEntradaGrade = "app-tabela-padrao-paginada:visible tbody tr";
const selecionarTodos = ".m-0:visible .fa:visible";
const navegarProximaPaginaDaGrade = "app-tabela-padrao:visible div.row ul:visible li:visible a.page-link";

export default class TablePage {

  atualizarTabela() {
    cy.get("app-tabela-padrao-paginada button i").should("be.visible").click();
  }

  selecionarTodosItensDaGrade(tabela) {
    cy.get(tabela).within(() => {
      cy.get(checkboxDosItensDaGrade).click({ multiple: true });
    });   
  }
  
  selecionarItemDaGrade(texto, tela) {
    if (tela) {
      cy.get(tela)
      .contains(linha, texto)
      .first()
      .should('be.visible')
      .find("div:visible label:visible")
      .click();
      return;
    }
    
    cy.contains(linha, texto)
      .should('be.visible')
      .find("div:visible label:visible")
      .click();
  }

  selecionarBulkAction(texto, idBulkAction) {
    if (idBulkAction) {
      return cy.get(idBulkAction + " " + bulkActionSelect).last().select(texto);
    }

    cy.get(bulkActionSelect).last().select(texto);
  }

  digitarQtdItensDeveSerMostradoNaGrade(texto) {
    cy.intercept("GET", "*paginacao*").as("paginacao");
    
    cy.get(qtdItensDeveSerMostradoNaGrade)
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click()
      .clearThenType(texto + "{enter}");

    cy.wait("@paginacao");
  }

  digitarQtdItensDeveSerMostradoNaGradeSemRequisicao(valorQtd) {
    cy.get(qtdItensDeveSerMostradoNaGrade)
      .first()
      .scrollIntoView()
      .should('be.visible')
      .clearThenType(valorQtd + "{enter}");
  }

  getItemDaGrade(texto: string, modalElement?: string) {
    if (modalElement) {
      return cy.get(modalElement + ' table:visible tbody:visible').find('tr').find('td').contains(texto).closest('tr');
    } else {
      return this.getTable().find('tr').find('td div').contains(texto).closest('tr');
    }
  }

  getItensDaGrade(modalElement: string) {
    if (modalElement) {
      return cy
      .get(`${modalElement} tbody:visible`)
      .first()
      .then(($element) => {
        return $element.find('tr:visible');
      });
    }
    return cy
      .get(" table:visible").then(($linha) => {
        return $linha.find(" tbody:visible > tr:visible");
      });
  }

  getTable(NaoPaginada?) {
    if(NaoPaginada) {
      return cy.get(NaoPaginada + table).should('be.visible');
    } 
    return cy.get('app-tabela-padrao-paginada:visible' + table).should('be.visible');
  }
  
  validarSeGradeEstaVazia() {
    cy.get("app-tabela-padrao-paginada:visible tbody td")
      .should("contain.text", "Nenhum registro encontrado.");
  }

  validarSeGradeEstaVaziaESemMensagem(tableaId) {
    cy.get("tbody:visible td:visible").should("have.length", 0);
  }

  validarQuantidadeDeItemsNaGrade(quantidade, modal) {
    if (modal) {
      cy.get(modal + " tbody:visible tr:visible").should("have.length", quantidade);
    } else {
      cy.get(" tbody:visible tr:visible").should("have.length", quantidade);
    }
  }

  validarSeOItemEstaInativo(texto: string) {
    this.getItemDaGrade(texto).find(" td:visible").last().should("be.visible").and("contain.text", "Não");
  }

  validarSeOItemEstaAtivo(texto: string) {
    this.getItemDaGrade(texto).find(" td:visible ").last().should("be.visible").and("contain.text", "Sim");
  }

  digitarPesquisarField(texto: string) {
    cy.wait(100);
    cy.get(pesquisarField).clearThenType(texto);

    cy.wait(2000); //ESPERAR TABELA CARREGAR
  }

  limparPesquisarField() {
    cy.get(pesquisarField).clear();
  }

  digitarPesquisarFieldSemRequest(texto) {
    cy.get(pesquisarField).clearThenType(texto);
  }

  pesquisarEAbrirItemDaGrade(texto) {
    this.digitarPesquisarField(texto);
    this.clicarNoElementoDaGradeQueContemOTexto(texto);
  }

  clicarRealizarOperacaoLoteButton(idButton) {
    if (idButton) {
      return cy.get(idButton + " " + realizarOperacaoLoteButton).click();
    }

    cy.get(realizarOperacaoLoteButton).last().click();
  }

  clicarNoElementoDaGradeQueContemOTexto(texto: string, TabelaNaoPaginada?: string) {
    cy.wait(300); //ESPERAR TABELA RENDERIZAR
    if (TabelaNaoPaginada) {
      cy.get(TabelaNaoPaginada)
        .should("be.visible")
        .contains("tbody tr", texto)
        .dblclick({force:true});
      cy.wait(300); // aguardar modal renderizar
    } else {
      this.getTable()
        .should("be.visible")
        .contains("tbody tr", texto)
        .dblclick({force:true});
      cy.wait(300); // aguardar modal renderizar
    }
  }

  navegarParaProximaPaginaDaGrade() {
    cy.get(navegarProximaPaginaDaGrade).contains("Próxima").click();
  }
  navegarParaPaginaAnteriorDaGrade() {
    cy.get(navegarProximaPaginaDaGrade).contains("Anterior").click();
  }
  navegarParaUltimaPaginaDaGrade() {
    cy.get(navegarProximaPaginaDaGrade).contains("Última").click();
  }
  navegarParaPrimeiraPaginaDaGrade() {
    cy.get(navegarProximaPaginaDaGrade).contains("Primeira").click();
  }

  clicarSelecionarTodos() {
    cy.get(selecionarTodos).click();
  }

  getItensDeUmDeterminadoIndiceDoTd(indiceDoTd, idDaTabela) {
    if (idDaTabela) {
      return cy.get(idDaTabela + " " + todosOsTD + `:nth-child(${indiceDoTd})`);
    }

    return cy.get(todosOsTD + `:nth-child(${indiceDoTd})`);
  }

  getItensDeUmDeterminadoIndiceDoTr(indiceDoTr) {
    return cy.get(`.list-body:visible :nth-child(${indiceDoTr})`);
  }

  getDataDeEntadaGrade(linha) {
    return cy.get(dataDeEntradaGrade)
      .eq(linha)
      .find("td")
      .eq(4)
      .find("input[placeholder='Data de entrada']");
  }

  clicarBotaoExcluirItemDaTabela(item, modalElement) {
    if (modalElement) {
      this.getItemDaGrade(item, modalElement).find('em[title="Excluir"]:visible').click();
    } else {
      this.getItemDaGrade(item).find('em[title="Excluir"]:visible').click();
    }
  }
}
