import 'cypress-real-events/support';

const menuLateralMinimizado: string = ".brand-logo-collapsed > .img-fluid";
const menuInternoMinimizado: string = "sidebar-nav sidebar-subnav ng-star-inserted";

const sideBar: string = ".sidebar";
const navbarLateral: string = "app-sidebar:visible nav.sidebar:visible ul.sidebar-nav:visible";
const navbarLateralMinimizada: string = "app-sidebar:visible ul.sidebar-nav:visible";
const subMenusFloating: string = "app-sidebar:visible ul.sidebar-nav.sidebar-subnav";

//Menu Cadastros
const menuCadastroButton: string = "Cadastros";
const menuCadastroEmpresa: string = "Empresa";
const menuCadastroEscritorio: string = "Escritório";
const menuCadastroUsuario: string = "Usuário"
const menuCadastroRevenda: string = "Revenda";

//Regras Tributárias
const menuRegrasTributariasButton: string = "Regras Tributárias";
const menuExcecaoPisCofins: string = "Exceção PIS/COFINS";
const menuExcecaoDIFAL: string = "Exceção DIFAL";
const menuExcecaoICMS: string = "Exceção ICMS";
const menuDataEmissaoCompetencia: string = "Data Emissão/Competência";
const menuExcecaoDoItem: string = "Exceção do Item";
const menuTipoItemPorCFOP: string = "Tipo do Item por CFOP";
const menuExcecaoPorCFOP: string = "Exceção por CFOP";

//Menu Importacao
const menuImportacaoButton: string = "Importação";
const menuDocumentosFiscais: string = "Documentos Fiscais";

//Menu Apuracao
const menuApuracaoButton: string = "Apuração";
const menuApuracaoGerarApuracao: string = "Gerar apuração";
const menuApuracaoGerarApuracaoEmLote: string = "Gerar apuração em lote";

//Menu Documentos Fiscais
const menuDocumentosFiscaisButton: string = "Documentos Fiscais";
const menuNotaFiscalDeEntrada: string = "Nota Fiscal de Entrada";
const menuNotaFiscalDeSaida: string = "Nota Fiscal de Saída";

//Menu DIFAL
const menuDifal: string = "DIFAL";
const calculoDifal: string = "Cálculo";
const formulaDifal: string = "Fórmula";

//Menu Configuração
const menuConfiguracao: string = "Configuração";
const editorDeTour: string = "Editor de Tour";

export default class MenuLateralPage {

    abrirMenuLateral() {
        cy.get("app-root:visible").should('be.visible').invoke("attr", "class").then((value)=>{
            if (value === "layout-fixed aside-collapsed") {
                cy.get(menuLateralMinimizado).click();
            }
        })
    }

    usarHoverSobreOMenu(nomeDoMenu) {
        cy.get(navbarLateralMinimizada).get(`a[title="${nomeDoMenu}"]`).realHover();
    }

    abrirMenuInterno(valorMenuExterno, valorMenuInterno) {
        cy.get(sideBar).get(`a[title="${valorMenuExterno}"]`).click().next().invoke("attr", "class").then((value)=>{
            if (value === menuInternoMinimizado) {
                cy.get(sideBar).get(`a[title="${valorMenuExterno}"]`).click();
                cy.get(sideBar).contains(valorMenuInterno).click();
            } else {
                cy.get(sideBar).contains(valorMenuInterno).click();
            }
        })
    }

    abrirMenu(valorMenuExterno) {
        cy.get(sideBar).get(`a[title="${valorMenuExterno}"]`).next().invoke("attr", "class").then((value)=>{
            if (value === menuInternoMinimizado) {
                cy.get(sideBar).get(`a[title="${valorMenuExterno}"]`).click();
            }
        })
    }

    irParaCadastroDeEmpresas() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuCadastroButton, menuCadastroEmpresa);
    }

    irParaCadastroEscritorio() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuCadastroButton, menuCadastroEscritorio);
    }

    irParaCadastroUsuario() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuCadastroButton, menuCadastroUsuario);
    }

    irParaCadastroRevenda() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuCadastroButton, menuCadastroRevenda);
    }

    irParaRegrasTributariasExcecaoPisCofins() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuRegrasTributariasButton, menuExcecaoPisCofins);
    }

    irParaRegrasTributariasExcecaoICMS() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuRegrasTributariasButton, menuExcecaoICMS);
    }

    irParaRegrasTributariasExcecaoDIFAL() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuRegrasTributariasButton, menuExcecaoDIFAL);
    }

    irParaRegrasDataEmissaoCompetencia() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuRegrasTributariasButton, menuDataEmissaoCompetencia);
    }

     irParaRegrasTributariasExcecaoDoItem() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuRegrasTributariasButton, menuExcecaoDoItem);
    }

    irParaRegrasTipoItemPorCFOP() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuRegrasTributariasButton, menuTipoItemPorCFOP);
    }

    irParaRegrasExcecaoPorCFOP() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuRegrasTributariasButton, menuExcecaoPorCFOP);
    }

    irParaImportacaoDocumentosFiscais() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuImportacaoButton, menuDocumentosFiscais);
    }

    irParaGerarApuracao() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuApuracaoButton, menuApuracaoGerarApuracao);
    }

    irParaGerarApuracaoEmLote() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuApuracaoButton, menuApuracaoGerarApuracaoEmLote);
    }

    irParaDocumentosFiscaisNotaFiscalDeEntrada() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuDocumentosFiscaisButton, menuNotaFiscalDeEntrada);
    }

    irParaDocumentosFiscaisNotaFiscalDeSaida() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuDocumentosFiscaisButton, menuNotaFiscalDeSaida);
    }

    irParaDifalCalculo() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuDifal, calculoDifal);
    }

    irParaDifalFormula() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuDifal, formulaDifal);
    }

    irParaEditorDeTour() {
        this.abrirMenuLateral();
        this.abrirMenuInterno(menuConfiguracao, editorDeTour);
    }
}