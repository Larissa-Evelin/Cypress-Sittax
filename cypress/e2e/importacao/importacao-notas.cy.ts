import { HeaderPage, NotasFiscaisSaidaPage, TablePage, ImportacaoPage } from "../../page-objects";
import { dadosNotasImportacao as empresaParaTestar } from "../../fixtures";
//   import usuarios from '../../../../fixtures/03-Usuarios/usuarios.json';
  
  const headerPage = new HeaderPage();
  const notasFiscaisSaidaPage = new NotasFiscaisSaidaPage();
  const tablePage = new TablePage();
  const importacaoPage = new ImportacaoPage();
  
  
  describe("Testar importação de notas", () => {
    before(() => {
    //   cy.loginManual(usuarios.sistema.email, usuarios.sistema.senha);
      
      headerPage.selecionarEmpresa(empresaParaTestar.cnpjDaEmpresa);
      headerPage.selecionarPeriodo(empresaParaTestar.periodo.ano, empresaParaTestar.periodo.mes);
    });
    
    it("Verificar se a grade está vazia", () => {
      notasFiscaisSaidaPage.irParaUrl();
      tablePage.validarSeGradeEstaVazia();
    });
  
    context("Importar notas", () => {
      before(() => {
        cy.intercept("POST", "**/importar-arquivo").as("importarArquivo");
        importacaoPage.irParaUrl();
      });
  
      it("Importar arquivos", () => {
        empresaParaTestar.arquivos.forEach((arquivo) => {
          importacaoPage.importarNotaFiscal(arquivo.path);
          importacaoPage.clicarEnviarUltimoArquivoButton();
  
          cy.wait("@importarArquivo")
            .its("response.body")
            .then((body) => {
              expect(body).to.have.property("sucesso");
              expect(body.sucesso).to.true;
            });
        });
      });
    });
  
    context("Validar se a nota foi importada", () => {
      before(() => {
        cy.wait(2000); //AGUARDAR PROCESSAR A NOTA
        notasFiscaisSaidaPage.irParaUrl();
      });
  
      empresaParaTestar.arquivos.forEach((arquivo) => {
        it("Verificar se a nota " + arquivo.chaveAcesso, () => {
          tablePage
            .getItensDaGrade()
            .should("contain.text", arquivo.cnpj)
            .should("contain.text", arquivo.numero)
            .should("contain.text", arquivo.dataEmissao)
            .should("contain.text", arquivo.destinatario)
            .should("contain.text", arquivo.ValorTotal)
            .should("contain.text", arquivo.Status);
        });
      });
    });
  });
  