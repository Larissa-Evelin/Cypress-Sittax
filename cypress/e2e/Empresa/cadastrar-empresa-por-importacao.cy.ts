//ESTÁ FALTANDO A PARTE DE CHAMAR A ROTA DE DELETAR A INFORMÇÃO

import { EmpresaPage, TablePage, SwalPage, MenuLateralPage, RevendaPage, EscritorioPage } from "../../page-objects";
import { usuarios, dadosEmpresaPorExcel as empresas } from "../../fixtures";

const empresaPage = new EmpresaPage();
const tablePage = new TablePage();
const swalPage = new SwalPage();
const menuLateralPage = new MenuLateralPage();
const revendaPage = new RevendaPage();
const escritorioPage = new EscritorioPage();

describe("Validar cadastro de empresas por Importação", () => {
    before(() => {
        cy.login(usuarios.sistema.email, usuarios.sistema.senha);
        revendaPage.cadastrarRevenda(empresas.preRevenda);
        menuLateralPage.irParaCadastroEscritorio();
        escritorioPage.cadastrarEscritorio(empresas.preEscritorio);
        menuLateralPage.irParaCadastroDeEmpresas();
    });

    context("Valida cadastro de empresa via importação", () => {
        it("Importar empresas por xlsx", () => {
            empresaPage.cadastrarEmpresaPorExcel(empresas.arrayEmpresas[0].caminhoDoArquivo);
            swalPage.getMensagem().should('contain', "2 CNPJ(s) cadastrado(s) com sucesso");
            swalPage.clicarOk();
            empresaPage.clicarFechar();
        });

        it.skip("Importar empresas por xlsx novamente -> Deve gerar erro", () => {
            empresaPage.cadastrarEmpresaPorExcel(empresas.arrayEmpresas[0].caminhoDoArquivo);
            swalPage.getTitulo().should('contain', "Houve um problema ao importar as empresas:");
            swalPage.clicarOk();
            empresaPage.clicarFechar();
        });
    });

    context("Validar dados da empresa cadastrada", () => {
        empresas.arrayEmpresas.forEach(empresa => {
            it("Verificar se a empresa " + empresa.cnpj + " está na grade", () => {
                tablePage.digitarPesquisarField(empresa.cnpj);
                empresaPage.getItensGradeListaDeEmpresas().should('contain', empresa.cnpj);
            });

            it("Validar se os dados estão corretos " + empresa.cnpj, () => {
                tablePage.clicarNoElementoDaGradeQueContemOTexto(empresa.cnpj);
                empresaPage.validarDadosDaEmpresa(empresa);
            });

            it("Validar se a configuração 'certificado por procuração' está correto " + empresa.cnpj, () => {
                empresaPage.clicarAbaConfiguracoes();
                empresaPage.verificaStatusDoSwitchCertificadoPorProcuracao(empresa.certificadoPorProcuracao);
                empresaPage.clicarFechar();
            });
        });
    });
});