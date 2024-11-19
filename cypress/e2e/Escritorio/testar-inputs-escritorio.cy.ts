import { EscritorioPage, TablePage, RevendaPage, MenuLateralPage } from "../../page-objects";
import { usuarios, escritorioParaTeste as escritorio} from "../../fixtures";

const escritorioPage = new EscritorioPage();
const tablePage = new TablePage();
const revendaPage = new RevendaPage();
const menuLateralPage = new MenuLateralPage();

before(() => {
    cy.login(usuarios.sistema.email, usuarios.sistema.senha);
    revendaPage.cadastrarRevenda(escritorio.preRevenda);
    menuLateralPage.irParaCadastroEscritorio();
    escritorioPage.irParaUrl();
    escritorioPage.cadastrarEscritorio(escritorio.preEscritorio)
    tablePage.pesquisarEAbrirItemDaGrade(escritorio.cnpj);
    escritorioPage.clicarAbaEmail();
});

describe(("Verificação dos inputs do escritório"), () => {
    context("Verificar se os dados iniciais estão corretos", () => {
        escritorio.titulosCheckboxEmail.forEach(tituloCheckbox => {
            it(`Verificar o checkbox ${tituloCheckbox} está ativo`, () => {
                escritorioPage.validarStatusDoCheckBoxAbaEmail(tituloCheckbox, true);
            })
        });
    });

    context("Inativar todos os checkbox", () => {
        escritorio.titulosCheckboxEmail.forEach(tituloCheckbox => {
            it(`Inativar checkbox ${tituloCheckbox}`, () => {
                escritorioPage.clicarCheckBoxAbaEmail(tituloCheckbox)
            })
        })
    })

    context("Verificar se todos os checkbox estão inativados", () => {
        before(() => {
            escritorioPage.clicarFechar();

            tablePage.clicarNoElementoDaGradeQueContemOTexto(escritorio.cnpj);
            escritorioPage.clicarAbaEmail();
        });

        escritorio.titulosCheckboxEmail.forEach(tituloCheckbox => {
            it(`Verificar se o checkbox ${tituloCheckbox} está inativo`, () => {
                escritorioPage.validarStatusDoCheckBoxAbaEmail(tituloCheckbox, false);
            });
        })
    });

    context("Ativar todos os checkbox", () => {
        escritorio.titulosCheckboxEmail.forEach(tituloCheckbox => {
            it(`Ativar checkbox ${tituloCheckbox}`, () => {
                escritorioPage.clicarCheckBoxAbaEmail(tituloCheckbox)
            })
        })
    })

    context("Verificar se todos os checkbox estão ativados", () => {
        before(() => {
            escritorioPage.clicarFechar();

            tablePage.clicarNoElementoDaGradeQueContemOTexto(escritorio.cnpj);
            escritorioPage.clicarAbaEmail();
        });

        escritorio.titulosCheckboxEmail.forEach(tituloCheckbox => {
            it(`Verificar se o checkbox ${tituloCheckbox} está ativado`, () => {
                escritorioPage.validarStatusDoCheckBoxAbaEmail(tituloCheckbox, true);
            });
        })
    });
});