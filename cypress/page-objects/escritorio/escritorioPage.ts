import { TablePage, NavbarPage as MenuLateralPage} from "../../page-objects";

interface IEscritorio{
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    uf: string,
    municipio: string,
    telefone: string,
    email: string,
    revendaApelido: string
}

export default class EscritorioPage {

    //MODAL
private tituloDoModal = " .modalTitle:visible";
private checkboxAbaGeral = "app-dados-do-escritorio:visible input[type='checkbox']";
private cnpjField =
  " app-dados-do-escritorio:visible .input-group:visible .form-control:visible";
  private fieldsDadosEscritorio =
  " app-dados-do-escritorio:visible .form-group:visible";
private lupaButton = ' app-dados-do-escritorio:visible button[title="Clique para pesquisar o CNPJ"]:visible';
private razaoSocialField = ' app-dados-do-escritorio:visible input[placeholder="Nome"]:visible';
private fantasiaField = ' app-dados-do-escritorio:visible input[placeholder="Nome fantasia"]:visible';
private ufField = ' app-dados-do-escritorio:visible input[placeholder="UF"]:visible';
private ufFieldCpf = 'app-dados-do-escritorio:visible ngx-select[placeholder="UF"]';
private municipioField = ' app-dados-do-escritorio:visible input[placeholder="Município"]:visible';
private emailField = ' app-dados-do-escritorio:visible input[placeholder="e-mail"]:visible';
private telefoneField = ' app-dados-do-escritorio:visible input[placeholder="Telefone"]:visible';
private fecharButton =
  'app-dados-do-escritorio:visible button:visible';
private salvarButton = "Salvar";
private abaDadosDoEscritorio = ' app-dados-do-escritorio:visible app-modal:visible a.nav-link:visible ';
private switchs = ' label.switch:visible input:visible ';

//MODAL ABA EMAIL
private abaEmail = "E-mails";
private abaCertificado = "Certificado";
private tituloAbaEmail = "app-dados-do-escritorio:visible .col-md-12:visible h4";
private todosCheckBoxAbaEmail = "app-dados-do-escritorio:visible .ml-auto:visible .switch:visible input";

//MODAL GRUPO DE ESCRITÓRIOS
private modalGrupoDeEscritorios = "app-modal-grupo-de-escritorio:visible ";

//MODAL GRUPO DE EMPRESAS
private modalGrupoDeEmpresas = "app-modal-grupo-de-empresa:visible ";

//MODAL ABA PLANO
private abaPlano = "app-dados-do-escritorio:visible .nav-link:visible";
private alterarPlano = "app-plano:visible button";
private qtdItensNaGradeResumoDaLicencaAbaPlano =
  "app-dados-do-escritorio:visible app-plano:visible table:visible tbody:visible tr:visible";
private qtdServicoAdicionadoDoPrimeiroServicoAbaPlano = 
  "app-dados-do-escritorio:visible app-plano:visible table:visible tbody:visible tr:visible";
private precoDoPrimeiroServicoAbaPlano =
  "app-dados-do-escritorio:visible app-resumo-da-licenca:visible";
private precoTotalPorMesAbaPlano =
  "app-dados-do-escritorio:visible app-totais-da-licenca:visible";
private gradeServicosAtivosAbaPlano = "app-dados-do-escritorio:visible app-tabela-padrao:visible";

//MODAL ABA USUÁRIO
private abaUsuario = "Usuários";
private cadastrarNovoUsuarioButtonAbaUsuario = "Cadastrar novo usuário";
private gradeAbaUsuario =
  " app-dados-do-escritorio:visible app-modal:visible div.tab-content:visible table:visible";

private novoEscritorioButton = "Novo Escritório";
private pesquisarEscritorioField = 'input[placeholder="Pesquisar em filtrados"]:visible';
private table = ".list-body:visible";

//MODAL ABA REPLICAÇÕES

private abaReplicacoes = 'app-dados-do-escritorio:visible [role="tabpanel "] .nav-link:visible';
private dadosReplicar = 'app-replicacao ng-select[placeholder="Selecione o dado"]';
private diaReplicar = 'app-replicacao input[placeholder="Informe o dia"]';

//ABA CONFIGURAÇÕES
private tabelaSwitchsAbaConfiguracao =
  "app-dados-do-escritorio:visible table:visible tr:visible";


  irParaUrl() {
    new MenuLateralPage().irParaCadastroEscritorio();
  }

  clicarAbaEscritorios() {
    cy.contains("app-escritorio:visible a", "Escritórios").click();
  }

  cadastrarEscritorio(escritorio: IEscritorio) {
    this.clicarNovoEscritorio();
    cy.wait(600);
    this.digitarCnpjField(escritorio.cnpj);
    this.clicarLupa();
    this.digitarEmailField(escritorio.email);
    this.selecionarRevenda(escritorio.revendaApelido);  
    this.clicarSalvar();
    this.clicarFechar();
  }

  clicarAbaEscritoriosDeGrupo() {
    cy.contains("app-escritorio:visible a", "Escritórios de grupo").click();
    cy.wait(300); //ESPERAR TABELA CARREGAR
  }

  clicarCheckBoxAbaEmail(titulo) {
    cy.get('app-dados-do-escritorio:visible app-modal').contains(titulo).parent().find('span').click();
  }

  clicarNovoEscritorio() {
    cy.contains(this.novoEscritorioButton).click();
  }

  clicarAtivarInativar() {
    cy.get(this.checkboxAbaGeral).parent().find("span").first().click();
  }

  getCheckBoxPropsCnpjCpf() {
    return cy.get(this.checkboxAbaGeral).invoke('prop', 'checked');
  }

  digitarCnpjField(texto: string) {
    cy.get(this.cnpjField).clearThenType(texto);
  }

  digitarCpfField(texto) {
    cy.get(this.cnpjField).clearThenType(texto);
  }

  digitarNomeField(texto) {
    cy.contains(this.fieldsDadosEscritorio, "Nome").find("input[placeholder='Nome']:visible").clearThenType(texto);
  }

  digitarUfField(texto) {
    cy.contains(this.fieldsDadosEscritorio, "UF").find("ngx-select[placeholder='UF']:visible").click().clearThenType(texto+"{enter}");
  }

  digitarFantasiaField(texto) {
    cy.contains(this.fieldsDadosEscritorio, "Fantasia")
      .find("input[placeholder='Nome fantasia']:visible")
      .clearThenType(texto);
  }

  digitarMunicipioField(texto) {
    cy.contains(this.fieldsDadosEscritorio, "Município")
      .find("input[placeholder='Município']:visible")
      .clearThenType(texto);
  }

  digitarEmailField(texto) {
    if(texto) {
      cy.contains(this.fieldsDadosEscritorio, "E-mail")
        .find("input[placeholder='e-mail']:visible")
        .clearThenType(texto);
    }
  }

  digitarTelefoneField(texto) {
    if(texto.length > 0) {
      cy.contains(this.fieldsDadosEscritorio, "Telefone")
        .find("input[placeholder='Telefone']:visible")
        .clearThenType(texto);
    }
  }

  selecionarRevenda(texto) {
    cy.contains(this.fieldsDadosEscritorio, "Revenda")
    .find("ngx-select[placeholder='Revenda']:visible")
    .click()
    .type(texto + "{enter}");
  }

  clicarLupa() {
    cy.get(this.lupaButton).click();
  }

  clicarFechar() {
    cy.get("body").type("{esc}");
  }

  clicarFecharBotao() {
    cy.wait(300); // aguardar modal carregar
    cy.get(this.fecharButton)
      .should('be.visible')
      .contains('Fechar')
      .scrollTo('bottom', { ensureScrollable: false }) //rola a tela pra baixo se o modal for maior que a viewport
      .click();
    cy.wait(300); // aguardar modal fechar
  }

  clicarSalvar() {
    cy.get('app-dados-do-escritorio:visible button:visible').contains(this.salvarButton).click();
  }

  clicarAbaEmail() {
    cy.get('app-dados-do-escritorio:visible').contains(this.abaEmail).click();
  }

  clicarAbaCertificado() {
    cy.get('app-dados-do-escritorio:visible').contains(this.abaCertificado).click();
  }

  clicarAbaPlano() {
    cy.get(this.abaPlano).contains("Plano").click();
  }

  clicarAlterarPlano() {
    cy.get(this.alterarPlano).contains("Alterar plano").click();
  }

  clicarAbaUsuario() {
    cy.get('app-modal:visible a.nav-link:visible').contains(this.abaUsuario).click();
  }

  clicarReloadDaTabela() {
    cy.get('.header-notificacoes-reload:visible').click();
  }

  clicarCadastrarNovoUsuarioButtonAbaUsuario() {
    cy.get(' app-dados-do-escritorio:visible').contains(this.cadastrarNovoUsuarioButtonAbaUsuario).click();
  }

  clicarAbaDadosDoEscritorio() {
    cy.get(this.abaDadosDoEscritorio)
      .should('be.visible')
      .contains('Dados do Escritório')
      .click();
    cy.get(this.abaDadosDoEscritorio)
      .should('be.visible')
      .contains('Dados')
      .click();
  }

  clicarAbaGrupoDeEscritorios() {
    cy.get(this.abaDadosDoEscritorio)
      .should('be.visible')
      .contains('Grupo de escritórios')
      .click();
  }

  clicarAbaGrupoDeEmpresas() {
    cy.get(this.abaDadosDoEscritorio)
      .should('be.visible')
      .contains('Grupo de empresas')
      .click();
  }

  clicarAbaFinanceiro() {
    cy.get(this.abaDadosDoEscritorio)
      .should("be.visible")
      .contains('Financeiro')
      .click();
  }

  clicarAbaAgendarBloqueio() {
    this.clicarAbaFinanceiro();

    cy.get(this.abaDadosDoEscritorio)
      .should("be.visible")
      .contains('Agendar Bloqueio')
      .click();
  }

  ativarInadimplencia(data) {
      cy.contains("label", "Inadimplência").parent().find("span").click();
      cy.contains("label", "Inadimplência").parent().find("input[type='checkbox']").should("be.checked"); 
      cy.get("dados-dados-financeiro input[placeholder='Data']").click().clearThenType(data + "{enter}");

      this.clicarSalvar();
  }

  inativarInadimplencia() {
      cy.contains("label", "Inadimplência").parent().find("span").click();
      cy.contains("label", "Inadimplência").parent().find("input[type='checkbox']").should("not.be.checked");

      this.clicarSalvar();
  }

  agendarBloqueio(data) {
    cy.get("dados-dados-financeiro input[placeholder='Data']").click().clearThenType(data + "{enter}");
    this.clicarSalvar();
  }

//   clicarNoInputDas() {
//     cy.get(spanDas).click();
//   }
//   clicarNoInputExtrato() {
//     cy.get(spanExtrato).click();
//   }
//   clicarNoInputFaturamento() {
//     cy.get(spanFaturamento).click();
//   }
//   clicarNoInputCertidoes() {
//     cy.get(spanCertidoes).click();
//   }
//   clicarNoInputConferencia() {
//     cy.get(spanConferencia).click();
//   }
//   clicarNoInputConferenciaDifal() {
//     cy.get(spanConferenciaDifal).click();
//   }
//   clicarNoInputQuebraDeSequencia() {
//     cy.get(spanQuebraDeSequencia).click();
//   }
//   clicarNoInputGuiaDifal() {
//     cy.get(spanGuiaDifal).click();
//   }

  clicarNoInputQuebreDeSequenciaConfg() {
    cy.get(this.tabelaSwitchsAbaConfiguracao).contains("Quebra de sequência").get(this.switchs).click();
  }
  clicarNoInputDataDeEntradaAutomatica() {
    cy.get(this.tabelaSwitchsAbaConfiguracao).contains("Data de Entrada Automática").get(this.switchs).click();
  }
  clicarNoInputNotificarErrosDoCertificado() {
    cy.get(this.tabelaSwitchsAbaConfiguracao).contains("Notificar Erros do Certificado").get(this.switchs).click();
  }
  clicarNoInputPesquisarEmpresaPorRazaoSocial() {
    cy.get(this.tabelaSwitchsAbaConfiguracao).contains("Pesquisar Empresa por Razão Social").get(this.switchs).click();
  }
  clicarNoInputValidarNotasFiscais() {
    cy.get(this.tabelaSwitchsAbaConfiguracao).contains("Validar Notas Fiscais").get(this.switchs).click();
  }

  digitarPesquisarField(texto) {
    cy.get(this.pesquisarEscritorioField).should("be.visible")
      .click()
      .clearThenType(texto);
  }

  getGradeAbaUsuario() {
    return cy.get(this.gradeAbaUsuario).should('be.visible');
  }

  getFecharButton() {
    return cy.get(this.fecharButton);
  }

  getGradeServicosAtivosAbaPlano() {
    return cy.get(this.gradeServicosAtivosAbaPlano);
  }

  getPrecoTotalPorMesAbaPlano() {
    return cy.get(this.precoTotalPorMesAbaPlano);
  }

  getPrecoDoPrimeiroServicoAbaPlano() {
    return cy.get(this.precoDoPrimeiroServicoAbaPlano);
  }

  getQtdServicoAdicionadoDoPrimeiroServicoAbaPlano() {
    return cy.get(this.qtdServicoAdicionadoDoPrimeiroServicoAbaPlano);
  }

  getQtdItensNaGradeResumoDaLicencaAbaPlano() {
    return cy.get(this.qtdItensNaGradeResumoDaLicencaAbaPlano);
  }

  getTituloAbaEmail() {
    return cy.get(this.tituloAbaEmail);
  }

  getTodosCheckBoxAbaEmail() {
    return cy.get(this.todosCheckBoxAbaEmail);
  }

  getTable() {
    return cy.get(this.table);
  }

  getTituloModal() {
    return cy.get(this.tituloDoModal);
  }

  getRazaoSocialField() {
    return cy.get(this.razaoSocialField);
  }

  getFantasiaField() {
    return cy.get(this.fantasiaField);
  }

  getUfField() {      
    return cy.get(this.ufField); 
  }

  getUfFieldCpf() {
    return cy.get(this.ufFieldCpf).find("span span");
  }

  getMunicipioField() {
    return cy.get(this.municipioField);
  }

  getEmailField() {
    return cy.get(this.emailField);
  }

  getTelefoneField() {
    return cy.get(this.telefoneField);
  }

  getSenhaGerada() {
    return cy.get(".swal2-title").first().find("span").invoke("text");
  }

  clicarGerarSenha(usuario) {
    cy.wait(300); //ESPERAR CARREGAR TABELA
    new TablePage().getItemDaGrade(usuario).find("em[title='Gerar senha de primeiro acesso.']").should("be.visible").click();
  }

  clicarReplicacoes() {
    cy.get(this.abaReplicacoes).contains('Replicações').click();
  }

  digitarNoInputGrupoDeEscritorios(texto, placeholder) {
    cy.get(this.modalGrupoDeEscritorios + `input[placeholder='${placeholder}']:visible`).click().type(texto);
  }

  digitarNoInputGrupoDeEmpresas(texto, placeholder) {
    cy.get(this.modalGrupoDeEmpresas + `input[placeholder='${placeholder}']:visible`).click().clearThenType(texto);
  }

  clicarNoItemInputGrupoDeEmpresas(item, placeholder) {
    cy.get(this.modalGrupoDeEmpresas + `input[placeholder='${placeholder}']:visible`).click();
    cy.get(this.modalGrupoDeEmpresas + "span").should('be.visible').contains(item).click();
  }

  clicarSwitchModalGrupoDeEmpresas() {
    cy.get(this.modalGrupoDeEmpresas + `input[type='checkbox']`).click({force:true});
  }

  clicarSalvaModalGrupoDeEmpresas() {
    cy.get(this.modalGrupoDeEmpresas).contains(this.salvarButton).click();
  }
  
  clicarSalvaModalGrupoDeEscritorios() {
    cy.get(this.modalGrupoDeEscritorios).contains(this.salvarButton).click();
    cy.wait(300); // aguardar fechar modal
  }

  clicarRemoverGrupoEscritorio(grupoEscritorio) {
    new TablePage().getItemDaGrade(grupoEscritorio).within(() => {
      cy.get("em[title='Remover']").click();
    });
  }

  clicarPesquisarCNPJ() {
    cy.get(this.modalGrupoDeEscritorios + "button[title='Clique para pesquisar o CNPJ']:visible").click();
    cy.wait(300); // aguardar fechar modal
  }
  
  digitarDiaReplicar(texto) {
    cy.get(this.diaReplicar).clearThenType(texto);
  }

  digitarDadosReplicar(texto) {
    cy.get(this.dadosReplicar).clearThenType(texto + "{enter}");
  }

  clicarNoBotaoAdicionarEscritorioAoGrupo() {
    cy.contains("app-dados-do-escritorio:visible button:visible", "Adicionar escritório ao grupo").click();
    cy.wait(300); // Aguardar modal abrir
  }
  clicarNoBotaoAdicionarGrupoDeEmpresas() {
    cy.contains("app-dados-do-escritorio:visible button:visible", "Adicionar grupo de empresas").click();
    cy.wait(300); // Aguardar modal abrir
  }

  validarStatusDoCheckBoxAbaEmail(titulo, deveEstarAtivo) {
    if (deveEstarAtivo) {
      cy.get('#dados-do-escritorio:visible tbody th').contains(titulo).parent().find('input').should('be.checked');
    }
    else {
      cy.get('#dados-do-escritorio:visible tbody th').contains(titulo).parent().find('input').should('not.be.checked');
    }
  }

  validarVisualizacaoDownloadCertificado() {
    cy.get("app-dados-do-escritorio:visible")
      .find("table")
      .first()
      .find("tr th")
      .each(($th) => {
          cy.wrap($th).should("not.contain.text", "Download");
      });
  }

  setDataInadimplenciaBloqueioDias(dias) {
    const data = new Date();
    data.setDate(data.getDate() + dias); //ADICIONA DIAS AO DIA DE HOJE
    return data.toLocaleDateString('pt-BR'); //"DD-MM-YYYY";
  }

  validarDadosDoEscritorio(escritorio: IEscritorio){
    this.getTituloModal().contains("Dados do Escritório");
    this.getRazaoSocialField().should("have.value", escritorio.razaoSocial);
    this.getFantasiaField().should("have.value", escritorio.nomeFantasia);
    this.getUfField().should("have.value", escritorio.uf);
    this.getMunicipioField().should("have.value", escritorio.municipio);
    this.getEmailField().should("have.value", escritorio.email);
  }
}

