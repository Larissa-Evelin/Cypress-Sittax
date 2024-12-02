import { MenuLateralPage, PeriodoPage, SwalPage, TablePage } from "../";
import { dadosFaturamento } from "../../fixtures"

//MODAL
const tituloDoModal = " .modalTitle";
const fecharButton = " app-modal-da-empresa:visible button:visible";
const modalBody = " app-modal-da-empresa:visible div.modal-body:visible"

// MODAL DA EMPRESA ABA GERAL
const botaoExcluirEmpresa = 'app-dados-da-empresa:visible button';
const inputInativarEmpresa = 'app-dados-da-empresa:visible input[type="checkbox"]';
const usaNfeCheckBoxAbaGeral = 'app-modal-da-empresa:visible app-dados-da-empresa:visible .form-group:visible';
const emailFieldAbaGeral = 'app-modal-da-empresa:visible input[placeholder="E-mail"]:visible';
const emailFieldApuracaoAbaGeral = 'app-modal-da-empresa:visible input[placeholder="E-mail para envio da apuração"]:visible'
const razaoSocialFieldAbaGeral = 'app-modal-da-empresa:visible input[placeholder="Razão Social"]:visible';
const nomeFantasiaFieldAbaGeral = 'app-modal-da-empresa:visible input[placeholder="Nome Fantasia"]:visible';
const ufFieldAbaGeral = 'app-modal-da-empresa:visible input[placeholder="UF"]';
const municipioFieldAbaGeral = 'app-modal-da-empresa:visible input[placeholder="Município"]:visible';
const inscricaoEstadualFieldAbaGeral =
    'app-modal-da-empresa:visible input[placeholder="Inscrição Estadual"]';
const codigoAtividadePrincipalFieldAbaGeral = 'app-modal-da-empresa:visible input[placeholder="Código"]:visible';
const atividadePrincipalDescricaoAbaGeral = 'app-modal-da-empresa:visible input[placeholder="Descrição"]:visible';
const cnpjFieldAbaGeral = "app-modal-da-empresa:visible .input-group > .form-control:visible";
const lupaButtonAbaGeral = 'app-modal-da-empresa:visible button[title="Clique para pesquisar o CNPJ"]:visible';
const inscricaoMunicipalFieldAbaGeral =
    'app-modal-da-empresa:visible input[placeholder="Inscrição Municipal"]';
const salvarButtonAbaGeral = "app-modal-da-empresa:visible button:visible";
const itensGradeListaDeEmpresas = "app-empresa:visible table:visible tr:visible";
const selectEscritorio = "app-dados-da-empresa:visible ngx-select[placeholder='Escritório']";
const selectGrupoEscritorio = "app-dados-da-empresa:visible ngx-select[placeholder='Escritório do Grupo']";

//MODAL DA EMPRESA ABA CONFIGURACOES
const abaConfiguracoes = "Configurações";
const tabelaDeConfiguracoesEmpresa = 'app-modal:visible table:visible tr:visible'
const certificadoPorProcuracaoCheckboxAbaConfiguracoes =
    "app-modal-da-empresa:visible :nth-child(3) > .table-active > .w-50 > .switch > span";

//MODAL DA EMPRESA ABA NOTAS
const abaNotasAbaGeral = 'Notas';
const consultaNfseCheckBoxAbaNotas = ':nth-child(5) > .table-active > .ml-auto > .switch > span';

//MODAL DA EMPRESA ABA DADOS DA PREFEITURA
const abaDadosDaPrefeitura = "Dados da Prefeitura";
const usuarioInputDadosDaPrefeitura =
    'app-modal-da-empresa:visible input[placeholder="Usuário da prefeitura"]';
const senhaInputDadosDaPrefeitura = 'app-modal-da-empresa:visible input[placeholder="Senha da prefeitura"]';
const salvarButtonAbaDadosDaPrefeitura = "Salvar";

const novaEmpresaButton = "Nova Empresa";
const botaoReloadDaTabela = 'i[title="Recarregar dados"]';
const pesquisaField = 'input[placeholder="Pesquisar em filtrados"]';
const pesquisaFieldModal = ' input[placeholder="Pesquisar em filtrados"]';
const table = ".list-body";

//MODAL DA EMPRESA ABA INTEGRACAO CONTABIL/FISCAL
const tableModalEmpresa = "app-modal-da-empresa:visible table:visible tbody:visible tr:visible";

//MODAL DA EMPRESA ABA DADOS DO E-CAC
const abaDadosDoEcac = "Dados do E-CAC";
const diaCalcularSelectAbaDadosDoEcac = 'app-dados-do-ecac .tab-content select';
const diaTransmissaoSelectAbaDadosDoEcac = 'app-dados-do-ecac .tab-content select';
const diaEnviarApuracaoSelectAbaDadosDoEcac = 'app-dados-do-ecac .tab-content select';
const salvarButtonAbaDadosDoEcac = "app-modal-da-empresa:visible .col-md-6 > .btn";
const regimeDeCaixaCheckboxAbaDadosDoEcac = "app-modal-da-empresa:visible .switch > input";

//MODAL DA EMPRESA ABA VALORES FIXOS
const abaValoresFixos = "Valores Fixos";
const valorFixoIcmsAbaValoresFixos = 'app-modal-da-empresa:visible input[placeholder="Valor Fixo do ICMS"]';
const valorFixoIssAbaValoresFixos = 'app-modal-da-empresa:visible input[placeholder="Valor Fixo de ISS"]';
const valorFixoAliquotaAbaValoresFixos = 'app-modal-da-empresa:visible input[placeholder="Alíquota Fixa ISS"]'
const salvarButtonAbaValoresFixos = "app-modal-da-empresa:visible .col-md-4 > .btn";

//MODAL DA EMPRESA ABA Configuração de Anexo
const abaConfiguracaodeAnexo = "Configuração de Anexo";
const selectAnexoDeCFOPAbaConfiguracaoDeAnexo =
    "app-modal-da-empresa:visible div.ngx-select.dropdown:visible";
const selectAnexoDeServicoAbaConfiguracaoDeAnexo =
    "app-modal-da-empresa:visible div.ngx-select.dropdown:visible";
const menuSelectAnexoDeCFOPAbaConfiguracaoDeAnexo =
    "app-modal-de-configuracao-de-anexo:visible ul[role=menu]:visible a:visible";
const menuSelectAnexoDeServicoAbaConfiguracaoDeAnexo =
    "app-modal-de-configuracao-de-anexo:visible ul[role=menu]:visible a:visible";
const digitarCfopInputAbaConfiguracaoDeAnexo =
    'input[placeholder="Digite um CFOP"]';
const codigoServicoInputAbaConfiguracaoDeAnexo =
    'input[placeholder="Digite um código de serviço"]';
const adicionarCfopInputAbaConfiguracaoDeAnexo =
    'input[placeholder="Adicione um CFOP"]';
const adicionarCodigoServicoInputAbaConfiguracaoDeAnexo =
    'input[placeholder="Digite um código"]';
const adicionarCfopButtonAbaConfiguracaoDeAnexo =
    "app-modal-de-configuracao-de-anexo:visible button:visible i:visible.fas.fa-plus";
const adicionarAnexoDeServicoButtonAbaConfiguracaoDeAnexo =
    "app-modal-de-configuracao-de-anexo:visible button:visible i:visible.fas.fa-plus";
const salvarButtonAbaConfiguracaoDeAnexo = "app-modal-da-empresa:visible .mt-3 > .btn";
const fieldsetDasConfiguracoesCfop =
    " app-modal-de-configuracao-de-anexo:visible fieldset:visible div.form-group.row.mb.ng-star-inserted:visible ";
const fieldsetDasConfiguracoesAnexoServico =
    "app-modal-da-empresa:visible app-modal-de-configuracao-de-anexo > :nth-child(2) > div";
const removerAnexoPorCfopButton =
    "app-modal-da-empresa:visible button.btn.btn-danger.ng-star-inserted:visible i";
const removerAnexoDeServicoButton =
    "app-modal-da-empresa:visible button.btn.btn-danger.ng-star-inserted:visible i";
const inputTributaICMS =
    "app-modal-da-empresa:visible :nth-child(3) > .row > :nth-child(1) > .ml-auto > .switch > input"
const inputAvaliarCEST =
    "app-modal-da-empresa:visible :nth-child(2) > .ml-auto > .switch > input"
const inputTributaISS =
    "app-modal-da-empresa:visible :nth-child(3) > .ml-auto > .switch > input"
const inputTributaPisConfins =
    "app-modal-da-empresa:visible :nth-child(4) > .ml-auto > .switch > input"
const inputTributaIpi =
    "app-modal-da-empresa:visible :nth-child(5) > .ml-auto > .switch > input"
const itensGradeModalEmpresa =
    "app-modal-da-empresa:visible tr:visible"
const fatorRSpan =
    "app-modal-da-empresa:visible :nth-child(2) > .table-active > .w-50 > .switch > span"
const certificadoPorProcuracaoSpan =
    "app-modal-da-empresa:visible :nth-child(3) > .table-active > .w-50 > .switch > span"
const dataDeEntradaAutomaticaSpan =
    "app-modal-da-empresa:visible :nth-child(4) > .table-active > .w-50 > .switch > span"
const usaCreditoDoDifalSpan =
    "app-modal-da-empresa:visible :nth-child(6) > .table-active > .w-50 > .switch > span"
const spanTributaICMS =
    "app-modal-da-empresa:visible :nth-child(3) > .row > :nth-child(1) > .ml-auto > .switch > span"
const spanAvaliarCEST =
    "app-modal-da-empresa:visible :nth-child(2) > .ml-auto > .switch > span"
const spanTributaISS =
    "app-modal-da-empresa:visible :nth-child(3) > .ml-auto > .switch > span"
const spanTributaPisConfins =
    "app-modal-da-empresa:visible :nth-child(4) > .ml-auto > .switch > span"
const spanTributaIpi =
    "app-modal-da-empresa:visible :nth-child(5) > .ml-auto > .switch > span"

//ABA CADASTRAR EMPRESA POR CERTIFICADO
const abaCadastrarPorCertificado = "Cadastrar Por Certificado";
const importarCertificadoButtonAbaCadastrarPorCertificado = "#file-input";
const enviarTodosButtonAbaCadastrarPorCertificado = "Enviar todos";

//ABA CADASTRAR EMPRESA POR EXCEL
const abaCadastrarPorExcel = "Cadastrar Por Excel";
const importarExcelButtonAbaCadastrarPorExcel = "#file-input";
const enviarTodosButtonAbaCadastrarPorExcel = "Enviar todos";

//ABA FATURAMENTO
const abaFaturamento = "Faturamento";
const consultarFaturamentoButtonAbaFaturamento = "Atualizar Faturamento";
const itensDaGradeAbaFaturamento =
    "app-modal-da-empresa:visible div.modal-body:visible table:visible td:visible";
const caixaCnpjFaturamento = 'app-modal-da-empresa:visible app-faturamento-da-empresa > :nth-child(2) > .col-xl-12 > [role="tabpanel"] > .nav > .ng-star-inserted > .';
const botaoAdicionarFaturamento = "app-modal-da-empresa:visible button:visible"
const botaoDeSalvarOValorDigitado = "app-modal-da-empresa:visible .modalFooter > .btn";
const botaoDeremoverFaturamento = "app-modal-da-empresa:visible .modalFooter > .btn-labeled";
const valorFaturamentoInputNaAbaFaturamento = "app-modal-da-empresa:visible :nth-child(2) > .form-group > .form-control";


//ABA CAIXA/LOCACAO/OUTROS
const abaCaixaLocacaoOutros = "Locação/Outras";
const adicionarReceitaButtonAbaCaixaLocacaoOutros = 'Adicionar Receita';
const removerReceitaCaixaLocaoOutros = "app-caixa-locacao-outros table";
const selectUfCaixaLocacaoOutros = "app-modal-adicionar-caixa-locacao-outros ngx-select[placeholder='UF']";

//ABA CÓDIGOS DE SERVIÇO
const abaCodigosDeServico = "Códigos de Serviço";
const abaCodigosDeServicoExterior = "NFSE Exterior ISS";
const codigoDeServicoAbaCodigosDeServico = 'input[placeholder="Código de serviço"]';
const salvarButtonAbaCodigoServico = "app-modal-da-empresa:visible .mt-3 > .btn";
const codigosAdicionadosTagAbaCodigosServicos = 'app-servicos-iss-retido tag';

//ABA SUGESTÃO TIPO NOTA
const sugestaoTipoNota = "Sugestão Tipo Nota";
const modalAdicionarSugestaoTipoNota = "app-modal-adicionar-sugestao-tipo-nota:visible ";

//ABA FATOR R
const abaFatorR = "Fator R";
const botaoAdicionarFolha = "Adicionar Folha"
const opcaoRemover = "app-modal-da-empresa:visible .ml-4"
const inputValorNaFolha = "app-modal-da-empresa:visible sittax-input-field input[placeholder='Informe o valor da folha']"

//MODAL FATOR R
const botaoSalvarModalNovaFolhaPagamento = "#modal-folha-pagamento:visible .modalFooter:visible button:visible"

//MODAL CAIXA/LOCACAO/OUTROS
const periodoInputAbaCaixaLocacaoOutros = "input[placeholder='Selecionar Período']";
const selectTipoCaixaLocacaoOutros = "ngx-select[placeholder='Selecione o tipo']";
const valorInputAbaCaixaLocacaoOutros = "app-modal-da-empresa:visible :nth-child(3) > .form-group > .form-control";
const salvarButtonAbaCaixaLocacaoOutros = "app-modal-da-empresa:visible .modalFooter > .btn";

interface IEmpresaCertificado {
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    uf: string,
    municipio: string,
    telefone: string,
    email: string,
    atividadePrincipalCodigo: string,
    atividadePrincipalDescricao: string,
    regimeTributario: string,
    inscricaoEstadual: string,
    dataAbertura: string,
    // caminhoDoArquivo: string
}

interface IData {
    ano: string
    mes: string
}

interface IDadosDeclaracao {
    periodo: string,
    valorComppetencia: string,
    valorTotal: string,
}

export default class EmpresaPage {

    private periodoPage = new PeriodoPage();
    private tablePage = new TablePage();
    private swalPage = new SwalPage();


    validarMensagensDadosDoEcac = (diaParaTransmitir: number, diaParaEnviarEmail: number) => {
        var date = new Date();
        let diaHoje = date.getDate();

        if (diaHoje > diaParaTransmitir && diaHoje > diaParaEnviarEmail) {
            this.swalPage.getMensagem().invoke("text").then(($text) => {
                expect($text.replace(/\u00a0/g, ' ').trim()).to.eq("Os dias informado nos campos [Dia para transmitir a apuração] e [Dia para envio ao cliente] são menores que o da data atual. O procedimento só será realizado no próximo mês.");
            });
            this.swalPage.clicarOk();

        } else if (diaHoje > diaParaTransmitir) {
            this.swalPage.getMensagem().invoke("text").then(($text) => {
                expect($text.replace(/\u00a0/g, ' ').trim()).to.eq("O dia informado no campo [Dia para transmitir a apuração] é menor que o da data atual. O procedimento só será realizado no próximo mês.");
            });
            this.swalPage.clicarOk();

        } else if (diaHoje > diaParaEnviarEmail) {
            this.swalPage.getMensagem().invoke("text").then(($text) => {
                expect($text.replace(/\u00a0/g, ' ').trim()).to.eq("O dia informada no campo [Dia para enviar a apuração] é menor que o da data atual. O procedimento só será realizado no próximo mês.");
            });
            this.swalPage.clicarOk();
        }
    };



    cadastrarEmpresa(cnpj: string, escritorio?: string) {
        cy.intercept("POST", "**/cadastrar-empresa").as("cadastrarEmpresa");

        this.clicarNovaEmpresa();
        this.digitarCnpjdAbaGeral(cnpj);
        this.clicarLupaAbaGeral();

        if (escritorio) {
            this.selecionarEscritorioModal(escritorio);
        }

        this.clicarSalvarAbaGeral();
        cy.wait("@cadastrarEmpresa");
    }

    checkOsValoresDaDeclaracao(declaracao: IDadosDeclaracao) {
        this.tablePage.getItemDaGrade(declaracao.periodo).find("td").eq(0).invoke("text").then(($texto: string) => {
            const textoFormatado = $texto.replace(/\u00a0/g, ' ').trim();
            expect(textoFormatado).to.eq(declaracao.periodo);
        });

        this.tablePage.getItemDaGrade(declaracao.periodo).find("td").eq(1).invoke("text").then(($texto: string) => {
            const textoFormatado = $texto.replace(/\u00a0/g, ' ').trim();
            expect(textoFormatado).to.eq(declaracao.valorComppetencia);
        });

        this.tablePage.getItemDaGrade(declaracao.periodo).find("td").eq(4).invoke("text").then(($texto: string) => {
            const textoFormatado = $texto.replace(/\u00a0/g, ' ').trim();
            expect(textoFormatado).to.eq(declaracao.valorTotal);
        });
    }


    cadastrarEmpresaPorExcel(caminhoDoCertificado: string) {
        cy.intercept("POST", "**/upload/CadastrarEmpresaPorExcel").as("uploadExcel");
        this.clicarNovaEmpresa();
        this.clicarAbaCadastrarPorExcel();
        this.importarEmpresasAbaCadastrarPorExcel(caminhoDoCertificado);
        this.clicarEnviarTodosButtonAbaCadastrarPorExcel();
        cy.wait("@uploadExcel");
    }

    importarEmpresasAbaCadastrarPorExcel(arquivo: string) {
        cy.fixture(arquivo, "base64").then((data) => {
            cy.get(importarExcelButtonAbaCadastrarPorExcel).attachFile({
                filePath: arquivo,
                fileContent: data,
                fileName: arquivo,
                encoding: "base64",
                mimeType: "application/octet-stream",
            });
        });
    }


    cadastrarEmpresaPorCertificado(caminhoDoCertificado: string) {
        cy.intercept("POST", "**/certificado").as("uploadCertificado");
        this.clicarNovaEmpresa();
        this.clicarAbaCadastrarPorCertificado();
        this.importarCertificadoAbaCadastrarPorCertificado(caminhoDoCertificado);
        this.clicarEnviarTodosButtonAbaCadastrarPorCertificado();
    }

    validarDadosDaEmpresa(empresa: IEmpresaCertificado) {
        this.getRazaoSocialFieldAbaGeral().should("have.value", empresa.razaoSocial);
        this.getNomeFantasiaFieldAbaGeral().should("have.value", empresa.nomeFantasia);
        this.getUfFieldAbaGeral().should("have.value", empresa.uf);
        this.getMunicipioFieldAbaGeral().should("have.value", empresa.municipio);
        this.getInscricaoEstadualFieldAbaGeral().should("have.value", empresa.inscricaoEstadual);
        this.getCodigoAtividadePrincipalFieldAbaGeral().should("have.value", empresa.atividadePrincipalCodigo);
        this.getAtividadePrincipalDescricaoAbaGeral().should("have.value", empresa.atividadePrincipalDescricao.toUpperCase());
    }

    irParaUrl() {
        cy.intercept("GET", "*listar-empresas-paginacao*").as("paginacao");

        new MenuLateralPage().irParaCadastroDeEmpresas();
        cy.wait("@paginacao");
    }

    aguardarExibirQtdEspecificaDeItemsNaGrade(quantidadeEspecifica: string) {
        cy.get(tableModalEmpresa)
            .should('be.visible')
            .should('have.length', quantidadeEspecifica);
    }

    selecionarTipoCaixaLocacaoOutros(texto: string) {
        cy.wait(500); // aguardar dados dropdown carregar 
        cy.get(selectTipoCaixaLocacaoOutros).should("be.visible").click().type(texto + "{enter}");
    }

    selecionarUfCte(uf: string) {
        cy.get(selectUfCaixaLocacaoOutros).click().clearThenType(uf);
    }

    abrirSelecionarOpcaoDropdown(placeholder: string, opcao: string) {
        cy.get(modalAdicionarSugestaoTipoNota + `ngx-select[placeholder="${placeholder}"]:visible`)
            .click()
            .type(opcao + "{enter}");
    }

    clicarBotaoAdicionarItemSugestaoTipoNota() {
        cy.get(modalAdicionarSugestaoTipoNota + "button:visible").contains("Adicionar item").click();
    }

    clicarBotaoSalvarSugestaoTipoNota() {
        cy.get(modalAdicionarSugestaoTipoNota + "button:visible").contains("Salvar").click();
        cy.wait(300); // aguarda modal fechar
    }

      selecionarAnexoDeCfopAbaConfiguracaoDeAnexo(texto) {
        cy.get(selectAnexoDeCFOPAbaConfiguracaoDeAnexo)
          .filter((index, element) => {
            return element.textContent?.trim() === "Anexo";
          })
          .first().click()
          .wait(200); // aguarda abrir dropdown

        cy.get(menuSelectAnexoDeCFOPAbaConfiguracaoDeAnexo).contains(texto).click();
      }

      selecionarAnexoDeServicoAbaConfiguracaoDeAnexo(texto) {
        cy.get(selectAnexoDeServicoAbaConfiguracaoDeAnexo)
          .filter((index, element) => {
            return element.textContent?.trim() === "Anexo";
          })
          .last().click()
          .wait(200); // aguarda abrir dropdown

        cy.get(menuSelectAnexoDeServicoAbaConfiguracaoDeAnexo).contains(texto).click();
      }

    selecionarEscritorioModal(escritorio: string) {
        cy.wait(300);
        this.getSelectEscritorio().click().clearThenType(escritorio + "{enter}");
    }

    selecionarGrupoEscritorioModal(escritorio: string) {
        cy.get(selectGrupoEscritorio).click().type(escritorio + "{enter}");
    }

    selecionarPeriodoAbaCaixaLocacaoOutros(ano: string, mes: string) {

        cy.get("app-modal-adicionar-caixa-locacao-outros:visible").within(() => {
            cy.get(periodoInputAbaCaixaLocacaoOutros).click();
        });
        this.periodoPage.selecionarPeriodo(ano, mes);
    }

    selecionarPeriodoFolha(data: IData) {

        cy.get("sittax-input-field:visible input[placeholder='Selecionar Período']").click();
        this.periodoPage.selecionarPeriodo(data.ano, data.mes);
    }

    digitarValorInputAbaCaixaLocacaoOutros(texto: string) {
        cy.get(valorInputAbaCaixaLocacaoOutros)
            .click()
            .clearThenType(texto);
    }

    digitarCfopInputAbaConfiguracaoDeAnexo(texto: string) {
        cy.get("body").then(($body) => {
            if ($body.find(digitarCfopInputAbaConfiguracaoDeAnexo).length > 0) {
                cy.get(digitarCfopInputAbaConfiguracaoDeAnexo)
                    .last()
                    .type(texto + "{enter}");
            } else {
                cy.get(adicionarCfopInputAbaConfiguracaoDeAnexo)
                    .last()
                    .type(texto + "{enter}");
            }
        });
    }

    digitarCodigoServicoInputAbaConfiguracaoDeAnexo(texto: string) {
        cy.get("body").then(($body) => {
            if ($body.find(codigoServicoInputAbaConfiguracaoDeAnexo).length > 0) {
                cy.get(codigoServicoInputAbaConfiguracaoDeAnexo)
                    .last()
                    .click()
                    .wait(100) //aguardar click selecionar o input
                    .type(texto + "{enter}");
            } else {
                cy.get(adicionarCodigoServicoInputAbaConfiguracaoDeAnexo)
                    .last()
                    .click()
                    .wait(100) //aguardar click selecionar o input
                    .type(texto + "{enter}");
            }
        });
    }

    digitarCodigoDeServicoAbaCodigosDeServico(texto: string) {
        cy.get(codigoDeServicoAbaCodigosDeServico)
            .click()
            .wait(100) //aguardar click selecionar o input
            .type(texto + '{enter}');
    }

    digitarValorFixoIcmsAbaValoresFixos(texto: string) {
        cy.get(valorFixoIcmsAbaValoresFixos)
            .click()
            .clearThenType(texto);
    }

    digitarValorFixoIssAbaValoresFixos(texto: string) {
        cy.get(valorFixoIssAbaValoresFixos)
            .click()
            .clearThenType(texto);
    }

    digitarValorFixoAliquotaAbaValoresFixos(texto: string) {
        cy.get(valorFixoAliquotaAbaValoresFixos)
            .click()
            .clearThenType(texto);
    }

    digitarPesquisaField(texto: string) {
        cy.get(pesquisaField)
            .click()
            .clearThenType(texto);
    }

    digitarPesquisaFieldModal(texto: string) {
        cy.get(modalBody + pesquisaFieldModal)
            .should('be.visible')
            .click()
            .clearThenType(texto);
    }

    digitarCnpjdAbaGeral(cnpj: string) {
        cy.get(cnpjFieldAbaGeral)
            .click()
            .wait(100) //aguardar click selecionar o input
            .type(cnpj);
    }

    digitarEmailFieldAbaGeral(texto: string) {
        this.getEmailFieldAbaGeral()
            .click()
            .clearThenType(texto);
    }

    digitarEmailApuracaoFieldAbaGeral(texto: string) {
        this.getEmailApuracaoFieldAbaGeral()
            .click()
            .clearThenType(texto);
    }

    digitarSegundoEmailApuracaoFieldAbaGeral(texto: string) {
        this.getEmailApuracaoFieldAbaGeral()
            .click()
            .type("," + texto); //SEPARAÇÃO DEVE SER FEITA COM ' , ' OU ' ; '
    }

    digitarNomeFantasiaFieldAbaGeral(texto: string) {
        this.getNomeFantasiaFieldAbaGeral()
            .click()
            .clearThenType(texto + "{enter}");
    }

    digitarInscricaoEstadualFieldAbaGeral(texto: string) {
        this.getInscricaoEstadualFieldAbaGeral()
            .click()
            .clearThenType(texto);
    }

    digitarInscricaoMunicipalFieldAbaGeral(texto: string) {
        this.getInscricaoMunicipalFieldAbaGeral()
            .click()
            .clearThenType(texto);
    }

    digitarUsuarioInputDadosDaPrefeitura(texto: string) {
        this.getUsuarioInputDadosDaPrefeitura().wait(100)
            .click()
            .clearThenType(texto);
    }

    digitarSenhaInputDadosDaPrefeitura(texto: string) {
        this.getSenhaInputDadosDaPrefeitura()
            .click()
            .clearThenType(texto);
    }

    digitarDiaCalcularSelectAbaDadosDoEcac(texto: string) {
        cy.log(texto);
        this.getDiaCalcularSelectAbaDadosDoEcac().select(texto);
    }

    digitarDiaEnviarApuracaoSelectAbaDadosDoEcac(texto: string) {
        this.getDiaEnviarApuracaoSelectAbaDadosDoEcac().select(texto);
    }

    digitarDiaTransmissaoSelectAbaDadosDoEcac(texto: string) {
        this.getDiaTransmissaoSelectAbaDadosDoEcac().select(texto);
    }

    digitarValorDoFaturamentoNoInput(text: string) {
        this.getValorFaturamento()
            .click()
            .clearThenType(text);
    }
    digitarValorDoFatorRNoInput(text: string) {
        cy.get(inputValorNaFolha).should('be.visible')
            .click()
            .clearThenType(text);
    }

    importarCertificadoAbaCadastrarPorCertificado(arquivo: string) {
        cy.fixture(arquivo, "base64").then((data) => {
            cy.get(importarCertificadoButtonAbaCadastrarPorCertificado).attachFile({
                filePath: arquivo,
                fileContent: data,
                fileName: arquivo,
                encoding: "base64",
                mimeType: "application/octet-stream",
            });
        });
    }

    //   importarEmpresasAbaCadastrarPorExcel(arquivo) {
    //     cy.fixture(arquivo, "base64").then((data) => {
    //       cy.get(importarExcelButtonAbaCadastrarPorExcel).attachFile({
    //         filePath: arquivo,
    //         fileContent: data,
    //         fileName: arquivo,
    //         encoding: "base64",
    //         mimeType: "application/octet-stream",
    //       });
    //     });
    //   }

    clicarConsultaNfseCheckBoxAbaNotas() {
        cy.get(consultaNfseCheckBoxAbaNotas).click();
    }

    clicarAbaNotasAbaGeral() {
        cy.contains(abaNotasAbaGeral).click();
    }

    clicarInativarEmpresa() {
        cy.get(inputInativarEmpresa).first().parent().find("span").click();
    }

    confirmarInativarEmpresa(cnpj: string) {
        cy.get("#swal2-input").clearThenType(cnpj);
    }

    clicarExcluirEmpresa() {
        cy.contains(botaoExcluirEmpresa, "Excluir").click();
    }

    confirmarExcluirEmpresa(cnpj: string) {
        cy.get("#swal2-input").clearThenType(cnpj);
    }

    clicarUsaNfeCheckBoxAbaGeral() {
        cy.contains(usaNfeCheckBoxAbaGeral, 'Usa NFe').find('input[type="checkbox"]').click({ force: true });
    }

    clicarSalvarButtonAbaCaixaLocacaoOutros() {
        cy.get(salvarButtonAbaCaixaLocacaoOutros).last().click();
    }

    clicarAdicionarReceitaButtonAbaCaixaLocacaoOutros() {
        cy.contains(adicionarReceitaButtonAbaCaixaLocacaoOutros).click();
        cy.wait(200); // delay para renderizacao do modal
    }

    removerReceitaCaixaLocacaoOutros() {
        cy.get(removerReceitaCaixaLocaoOutros).find("em").click();
    }

    clicarAbaCaixaLocacaoOutros() {
        cy.get('app-modal-da-empresa:visible').within(() => {
            cy.contains(abaCaixaLocacaoOutros).click();
        });
    }

    clicarAbaConfiguracoes() {
        cy.get('app-modal-da-empresa:visible').contains(abaConfiguracoes).click();
    }

    habilitarFatorR() {
        cy.contains("th.coluna-nome-configuracoes", "Fator R")
            .parent()
            .find("input[type='checkbox']")
            .should("not.be.checked")
            .parent()
            .find("span")
            .click();

        cy.contains("th.coluna-nome-configuracoes", "Fator R")
            .parent()
            .find("input[type='checkbox']")
            .should("be.checked");
    }

    desabilitarFatorR() {
        cy.contains("th.coluna-nome-configuracoes", "Fator R")
            .parent()
            .find("input[type='checkbox']")
            .should("be.checked")
            .parent()
            .find("span")
            .click();

        cy.contains("th.coluna-nome-configuracoes", "Fator R")
            .parent()
            .find("input[type='checkbox']")
            .should("not.be.checked");
    }

    verificaStatusDoSwitchCertificadoPorProcuracao(certificadoPorApuracaoAtivado: boolean) {
        if (certificadoPorApuracaoAtivado) {
            cy.get(tabelaDeConfiguracoesEmpresa)
                .should('be.visible')
                .contains('Certificado por procuração')
                .siblings(" td:visible ")
                .find("input[type='checkbox']")
                .should("be.checked");
        } else {
            cy.get(tabelaDeConfiguracoesEmpresa)
                .should('be.visible')
                .contains('Certificado por procuração')
                .siblings("td:visible")
                .find("input[type='checkbox']")
                .should("not.be.checked");
        }
    }

    clicarConsultarFaturamentoButtonAbaFaturamento() {
        cy.get('app-modal-da-empresa:visible').contains(consultarFaturamentoButtonAbaFaturamento).click();
    }

    clicarAbaFaturamento() {
        cy.get('app-modal-da-empresa:visible').last().contains(abaFaturamento).click();
    }

    clicarEnviarTodosButtonAbaCadastrarPorCertificado() {
        cy.contains(enviarTodosButtonAbaCadastrarPorCertificado).click();
    }

    clicarEnviarTodosButtonAbaCadastrarPorExcel() {
        cy.contains(enviarTodosButtonAbaCadastrarPorExcel).click();
    }

    clicarAbaCadastrarPorCertificado() {
        cy.get('app-modal-da-empresa:visible').contains(abaCadastrarPorCertificado).click();
    }

    clicarAbaCadastrarPorExcel() {
        cy.get('app-modal-da-empresa:visible').contains(abaCadastrarPorExcel).click();
    }

    clicarReloadDaTabela() {
        cy.get(botaoReloadDaTabela).click();
    }

    clicarRemoverFiltroAtivo() {
        cy.get("div[title='Ativo IGUAL Sim']").parent().find("delete-icon > span").click();
    }

    clicarRemoverTodosAnexoPorCfopButton() {
        cy.get(removerAnexoPorCfopButton).each($elements => {
            cy.wrap($elements).click();
        });
    }

    clicarRemoverAnexoDeServicoButton() {
        cy.get(removerAnexoDeServicoButton).each($elements => {
            cy.wrap($elements).click();
        });
    }

    clicarRemoverTodosCodigoTagInputButton() {
        cy.get("app-modal-adicionar-integracao-contabil:visible delete-icon:visible")
            .then($elements => {
                const reversedElements = [...$elements].reverse();
                reversedElements.forEach(element => {
                    cy.wrap(element).click();
                });
            });
        cy.wait(300); // aguardar a ultima exclusão
    }

    clicarRemoverCodigoServicoAbaCodigosServicos(codigo: string) {
        cy.get(`div[title="${codigo}"]`).next().click()
    }

    clicarSalvarButtonAbaConfiguracaoDeAnexo() {
        cy.get(salvarButtonAbaConfiguracaoDeAnexo).click();
    }

    clicarAdicionarCfopButtonAbaConfiguracaoDeAnexo() {
        cy.get(adicionarCfopButtonAbaConfiguracaoDeAnexo).first().click();
    }

    clicarAdicionarAnexoServicoButtonAbaConfiguracaoDeAnexo() {
        cy.get(adicionarAnexoDeServicoButtonAbaConfiguracaoDeAnexo).last().click();
    }

    clicarAbaCodigosDeServico() {
        cy.get('app-modal-da-empresa:visible').contains(abaCodigosDeServico).click();
    }

    clicarAbaIssExterior() {
        this.clicarAbaCodigosDeServico();
        cy.get('app-modal-da-empresa:visible').contains(abaCodigosDeServicoExterior).click();
    }

    clicarAbaConfiguracaodeAnexo() {
        cy.get('app-modal-da-empresa:visible').contains(abaConfiguracaodeAnexo).click();
    }

    clicarSalvarButtonAbaValoresFixos() {
        cy.get(salvarButtonAbaValoresFixos).click();
    }

    clicarAbaValoresFixos() {
        cy.get('app-modal-da-empresa:visible').contains(abaValoresFixos).click();
    }

    clicarNovaEmpresa() {
        cy.contains(novaEmpresaButton).should('be.visible').click();
    }

    clicarLupaAbaGeral() {
        cy.get(lupaButtonAbaGeral).click();
    }

    clicarFechar() {
        cy.wait(600); // aguardar modal carregar
        cy.get("app-modal-da-empresa div.modal-footer").last().scrollIntoView();
        cy.get(fecharButton)
            .should('be.visible')
            .contains('Fechar')
            .click();
        cy.wait(300); // aguardar modal fechar
    }

    clicarSalvarAbaGeral() {
        cy.get(salvarButtonAbaGeral).contains('Salvar').should('be.visible').click();
    }

    clicarSalvarAbaCodigosServicos() {
        cy.intercept("POST", "**/adicionar-codigo").as("adicionarCodigosServico");

        cy.get(salvarButtonAbaCodigoServico).click();

        cy.wait("@adicionarCodigosServico")
            .its("response.body")
            .then((body) => {
                expect(body).to.have.property("sucesso");
                expect(body.sucesso).to.true;
            });
    }

    clicarSalvarAbaCodigosServicosExterior() {
        cy.intercept("POST", "**/adicionar-codigo-exterior").as("adicionarCodigosServicoExterior");

        cy.get(salvarButtonAbaCodigoServico).click();

        cy.wait("@adicionarCodigosServicoExterior")
            .its("response.body")
            .then((body) => {
                expect(body).to.have.property("sucesso");
                expect(body.sucesso).to.true;
            });
    }

    clicarAbaDadosDaPrefeitura() {
        cy.get('app-modal-da-empresa:visible').contains(abaDadosDaPrefeitura).click();
    }

    clicarSalvarAbaDadosDaPrefeitura() {
        cy.get('app-modal-da-empresa:visible').contains(salvarButtonAbaDadosDaPrefeitura).click();
    }

    clicarAbaDadosDoEcac() {
        cy.get('app-modal-da-empresa:visible').contains(abaDadosDoEcac).click();
    }

    clicarSalvarButtonAbaDadosDoEcac() {
        return cy.get(salvarButtonAbaDadosDoEcac).click();
    }

    clicarRegimeDeCaixaCheckboxAbaDadosDoEcac() {
        cy.get("app-modal-da-empresa:visible .switch > span").click();
    }

    clicarCertificadoPorProcuracaoCheckboxAbaConfiguracoes() {
        cy.get(certificadoPorProcuracaoCheckboxAbaConfiguracoes).click();
    }

    clicarNaCaixaCnpjFaturamento() {
        cy.get(caixaCnpjFaturamento).click();
    }
    clicarNoBotaoAdicionarFaturamento() {
        cy.get(botaoAdicionarFaturamento).contains("Adicionar").click();
    }
    clicarNoBotaoDeSalvarFaturamento() {
        cy.get(botaoDeSalvarOValorDigitado)
            .should('be.visible')
            .last()
            .click();
    }
    clicarNoBotaoDeRemoverFaturamento() {
        cy.get(botaoDeremoverFaturamento).click();
    }

    clicarAbaFatorR() {
        cy.get('app-modal-da-empresa:visible').contains(abaFatorR).click();
    }
    clicarAbaSugestaoTipoNota() {
        cy.get('app-modal-da-empresa:visible').contains(sugestaoTipoNota).click();
    }
    clicarBotaoAdicionarSugestaoTipoNota() {
        cy.contains("app-sugestao-tipo-nota:visible button:visible", "Adicionar").click();
        cy.wait(300); //agaurdar modal abrir
    }
    digitarNoInputSugestaoTipoNota(labelInput, texto) {
        cy.contains(modalAdicionarSugestaoTipoNota + ".form-group", labelInput).find('input:visible').type(texto);
    }

    clicarNoBotaoAdicionarFolha() {
        cy.contains(botaoAdicionarFolha).click();
    }
    clicarNoInputDeValorDaFolha(valor) {
        cy.get(inputValorNaFolha)
            .should('be.visible')
            .click()
            .clearThenType(valor);
    }
    clicarBotaoSalvarModalFolhaPagamento() {
        cy.get(botaoSalvarModalNovaFolhaPagamento).should('be.visible').contains(/Salvar/i).click();
    }
    clicarNaOpcaoRemover() {
        cy.get(opcaoRemover).should('be.visible').click();
    }

    clicarNoInputTributaIcms() {
        cy.get(spanTributaICMS).click();
    }
    clicarNoInputAvaliarCEST() {
        cy.get(spanAvaliarCEST).click();
    }
    clicarNoInputTributaISS() {
        cy.get(spanTributaISS).click();
    }
    clicarNoInputTributaPisConfins() {
        cy.get(spanTributaPisConfins).click();
    }
    clicarNoInputTributaIpi() {
        cy.get(spanTributaIpi).click();
    }
    clicarNoInputFatorR() {
        cy.get(fatorRSpan).click();
    }
    clicarNoInputCertificadoPorProcuracao() {
        cy.get(certificadoPorProcuracaoSpan).click();
    }
    clicarNoInputDataDeEntradaAutomatica() {
        cy.get(dataDeEntradaAutomaticaSpan).click();
    }
    clicarNoInputUsaCreditoDoDifal() {
        cy.get(usaCreditoDoDifalSpan).click();
    }
    getCodigosAdicionadosAbaCodigosDeServico() {
        return cy.get(codigosAdicionadosTagAbaCodigosServicos);
    }

    getSelectEscritorio() {
        return cy.get(selectEscritorio);
    }

    getItensGradeFaturamento() {
        let totalDeElementos = 0;

        cy.get(itensDaGradeAbaFaturamento)
            .should('be.visible')
            .then(($element) => {
                totalDeElementos = $element.length;
            });

        if (totalDeElementos > 0) {
            return cy.get(itensDaGradeAbaFaturamento);
        } else {
            throw new Error("AVISO: Elemento Item não foi encontrado! 'Nenhum registro encontrado.'");
        }
    }

    getFieldsetDasConfiguracoesCfop() {
        return cy.get(fieldsetDasConfiguracoesCfop);
    }

    getFieldsetDasConfiguracoesAnexoServico() {
        return cy.get(fieldsetDasConfiguracoesAnexoServico);
    }

    getRegimeDeCaixaCheckBoxAbaDadosDoEcac() {
        return cy.get(regimeDeCaixaCheckboxAbaDadosDoEcac);
    }

    getEmailFieldAbaGeral() {
        return cy.get(emailFieldAbaGeral);
    }

    getEmailApuracaoFieldAbaGeral() {
        return cy.get(emailFieldApuracaoAbaGeral);
    }

    getSenhaInputDadosDaPrefeitura() {
        return cy.get(senhaInputDadosDaPrefeitura);
    }

    getUsuarioInputDadosDaPrefeitura() {
        return cy.get(usuarioInputDadosDaPrefeitura);
    }

    getInscricaoMunicipalFieldAbaGeral() {
        return cy.get(inscricaoMunicipalFieldAbaGeral);
    }

    getItensGradeListaDeEmpresas() {
        return cy.get(itensGradeListaDeEmpresas);
    }

    getTable() {
        return cy.get(table);
    }

    getTituloDoModal() {
        return cy.get(tituloDoModal);
    }

    getRazaoSocialFieldAbaGeral() {
        return cy.get(razaoSocialFieldAbaGeral);
    }

    getNomeFantasiaFieldAbaGeral() {
        return cy.get(nomeFantasiaFieldAbaGeral);
    }

    getUfFieldAbaGeral() {
        return cy.get(ufFieldAbaGeral);
    }

    getMunicipioFieldAbaGeral() {
        return cy.get(municipioFieldAbaGeral);
    }

    getInscricaoEstadualFieldAbaGeral() {
        return cy.get(inscricaoEstadualFieldAbaGeral);
    }

    getCodigoAtividadePrincipalFieldAbaGeral() {
        return cy.get(codigoAtividadePrincipalFieldAbaGeral);
    }

    getAtividadePrincipalDescricaoAbaGeral() {
        return cy.get(atividadePrincipalDescricaoAbaGeral);
    }

    getDiaCalcularSelectAbaDadosDoEcac() {
        return cy.get(diaCalcularSelectAbaDadosDoEcac).eq(0);
    }

    getDiaTransmissaoSelectAbaDadosDoEcac() {
        return cy.get(diaTransmissaoSelectAbaDadosDoEcac).eq(1);
    }

    getDiaEnviarApuracaoSelectAbaDadosDoEcac() {
        return cy.get(diaEnviarApuracaoSelectAbaDadosDoEcac).eq(2);
    }

    getValorFaturamento() {
        return cy.get(valorFaturamentoInputNaAbaFaturamento).should('be.visible');
    }

    verificarSeAbaDadosDaPrefeituraExiste() {
        cy.contains(abaDadosDaPrefeitura).should('not.exist');
    }
    verificarSeOInputIcmsEstaAtivado() {
        cy.get(inputTributaICMS).should('be.checked')
    }
    verificarSeOInputCestEstaAtivado() {
        cy.get(inputAvaliarCEST).should('be.checked')
    }
    verificarSeOInputIssEstaAtivado() {
        cy.get(inputTributaISS).should('be.checked')
    }
    verificarSeOInputPisEConfinsEstaAtivado() {
        cy.get(inputTributaPisConfins).should('be.checked')
    }
    verificarSeOInputIpiEstaAtivado() {
        cy.get(inputTributaIpi).should('be.checked')
    }
    verificarSeOInputCestEstaDesativado() {
        cy.get(inputAvaliarCEST).should('not.be.checked')
    }
    verificarSeOInputIcmsEstaDesativado() {
        cy.get(inputTributaICMS).should('not.be.checked')
    }
    verificarSeOInputIssEstaDesativado() {
        cy.get(inputTributaISS).should('not.be.checked')
    }
    verificarSeOInputPisEConfinsEstaDesativado() {
        cy.get(inputTributaPisConfins).should('not.be.checked')
    }
    verificarSeOInputIpiEstaDesativado() {
        cy.get(inputTributaIpi).should('not.be.checked')
    }

    verificarSeSwitchDaTabelaEstaAtivoOuInativo(textoLinha: string, checked: boolean) {
        cy.get(itensGradeModalEmpresa).each(element => {
            if (Cypress.$(element).text().includes(textoLinha)) {
                if (checked) {
                    cy.wrap(element).find('input[type="checkbox"]').should('be.checked');
                } else {
                    cy.wrap(element).find('input[type="checkbox"]').should('not.be.checked');
                }
            }
        });
    }

    verificarDadosContabilista(texto: string, contador?: string) {
        if (!contador) {
            cy.get(itensGradeModalEmpresa).each(element => {
                if (Cypress.$(element).text().includes(texto)) {
                    cy.wrap(element).find('ng-select .ng-placeholder').should("have.text", 'Selecione o contador');
                }
            });
        } else {
            cy.get(itensGradeModalEmpresa).each(element => {
                if (Cypress.$(element).text().includes(texto)) {
                    cy.wrap(element).find('ng-select span.ng-value-label').invoke('text').then(($text) => {
                        expect($text.trim()).to.eq(contador);
                    });
                }
            });
        }
    }

    selecionarContadorDadosContabilista(texto: string) {
        cy.get('ng-select[placeholder="Selecione o contador"]').type(texto + '{enter}');
    }

    clicarSwitchDaTabela(textoLinha: string) {
        cy.get(itensGradeModalEmpresa).each(element => {
            if (Cypress.$(element).text().includes(textoLinha)) {
                cy.wrap(element)
                    .find('input[type="checkbox"]')
                    .parent()
                    .find("span")
                    .click();
            }
        });
    }
}

