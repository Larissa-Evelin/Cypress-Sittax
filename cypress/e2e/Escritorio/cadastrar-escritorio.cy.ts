//ESTÁ FALTANDO A PARTE DE CHAMAR A ROTA DE DELETAR A INFORMÇÃO

import { EscritorioPage, TablePage, Toaster, MenuLateralPage, RevendaPage } from "../../page-objects";
import { usuarios, dadosEscritorio as escritorio } from "../../fixtures";

const escritorioPage = new EscritorioPage();
const tablePage = new TablePage();
const toaster = new Toaster();
const menuLateralPage = new MenuLateralPage();
const revendaPage = new RevendaPage();

describe('Quando todas as informações obrigatórias forem preenchidas ao criar o cadastro de um escritório, o sistema deve salvar a escritório com sucesso', () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        revendaPage.cadastrarRevenda(escritorio.preRevenda);
        menuLateralPage.irParaCadastroEscritorio();
    });
    context('Cadastrar escritório', () => {
        it('Validar se o cadastro foi realizado com sucesso', () => {
            escritorioPage.cadastrarEscritorio(escritorio);
            toaster.verificaMensagemDoToaster("Escritório cadastrado!");
        })

        it(`Tentar cadastrar um escritório existente ${escritorio.razaoSocial} novamente -> DEVE DAR ERRO`, () => {
            escritorioPage.cadastrarEscritorio(escritorio);
            toaster.verificaMensagemDoToaster("CNPJ informado já existente na base de dados");
        });
      
        it("Procurar escritório na grade e abrir o modal do escritório " +
            escritorio.razaoSocial, () => {
            tablePage.digitarPesquisarField(escritorio.cnpj);
            tablePage.clicarNoElementoDaGradeQueContemOTexto(escritorio.cnpj);
            escritorioPage.validarDadosDoEscritorio(escritorio);
            cy.wait(600);
            escritorioPage.clicarFechar();
        });

    });
});


// it("Testar as checkbox das informações que devem ser enviadas no email do escritório " +
//     escritorio.razaoSocial, () => {
//     escritorioPage.clicarAbaEmail();
//     escritorioPage
//       .getTituloAbaEmail()
//       .should("have.text", "O que enviar no e-mail.");

//     escritorioPage
//       .getTodosCheckBoxAbaEmail()
//       .each((checkbox) => expect(checkbox[0].checked).to.be.equal(true));
//   }
// );

// it(`Validar se o escritório ${escritorio.razaoSocial} foi cadastrado com plano Grátis `, () => {
//     escritorioPage.clicarAbaPlano();
//     escritorioPage
//       .getQtdItensNaGradeResumoDaLicencaAbaPlano()
//       .should("contain.text", "Grátis");
//     escritorioPage
//       .getQtdServicoAdicionadoDoPrimeiroServicoAbaPlano()
//       .should("contain.text", "5");
//     escritorioPage
//       .getPrecoDoPrimeiroServicoAbaPlano()
//       .should("contain", "0,00");
//     escritorioPage
//       .getPrecoTotalPorMesAbaPlano()
//       .should("contain", "0,00 / Mês");

//     escritorioPage
//       .getGradeServicosAtivosAbaPlano()
//       .should("contain", "Grátis")
//       .should("contain", "Cnpj")
//       .should("contain", "0%")
//       .should("contain", "5")
//       .should("contain", "0,00")
//       .should("contain", "Sim");

//     escritorioPage.clicarFechar();
//   });

