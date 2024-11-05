import { EmpresaPage, TablePage, SwalPage, MenuLateralPage } from "../../page-objects";
import { usuarios, dadosEmpresaPorExcel as empresas } from "../../fixtures";

const empresaPage = new EmpresaPage();
const tablePage = new TablePage();
const swalPage = new SwalPage();
const menuLateral = new MenuLateralPage();

describe("Validar cadastro de empresas por Importação", () => {
    before(() => {
        menuLateral.irParaCadastroDeEmpresas();
    });

    context("Valida cadastro de empresa via importação", () => {
        it("Importar empresas por xlsx", () => {
            empresaPage.cadastrarEmpresaPorExcel(empresas[0].caminhoDoArquivo);
            swalPage.getMensagem().should('contain', "2 CNPJ(s) cadastrado(s) com sucesso");
            swalPage.clicarOk();
            empresaPage.clicarFechar();
        });

        it.skip("Importar empresas por xlsx novamente -> Deve gerar erro", () => {
            empresaPage.cadastrarEmpresaPorExcel(empresas[0].caminhoDoArquivo);
            swalPage.getTitulo().should('contain', "Houve um problema ao importar as empresas:");
            swalPage.clicarOk();
            empresaPage.clicarFechar();
        });
    });

    context("Validar dados da empresa cadastrada", () => {
        empresas.forEach(empresa => {
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