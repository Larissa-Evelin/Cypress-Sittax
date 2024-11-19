import { TablePage, EmpresaPage, SwalPage, Toaster, RevendaPage, MenuLateralPage, EscritorioPage, HeaderPage, ContadorPage } from "../../page-objects";
import { usuarios, empresasParaAlterarDados } from "../../fixtures";

const tablePage = new TablePage();
const empresaPage = new EmpresaPage();
const swalPage = new SwalPage();
const toaster = new Toaster();
const revendaPage = new RevendaPage();
const menuLateralPage = new MenuLateralPage();
const escritorioPage = new EscritorioPage();
const headerPage = new HeaderPage();
const contadorPage = new ContadorPage();

const empresasParaTeste = empresasParaAlterarDados.empresas.splice(1, 2); //alterado add .empresas

before(() => {
  cy.login(usuarios.sistema.email, usuarios.sistema.senha);
  revendaPage.cadastrarRevenda(empresasParaAlterarDados.preRevenda);
  menuLateralPage.irParaCadastroEscritorio();
  escritorioPage.cadastrarEscritorio(empresasParaAlterarDados.preEscritorio);
  headerPage.abrirEscritorioHeader();
  contadorPage.irParaContador();
  contadorPage.clicarAdicionarContador();
  contadorPage.cadastrarContador(empresasParaAlterarDados.preContador);
  escritorioPage.clicarFecharBotao();
});

empresasParaTeste.forEach((empresaParaTestar) => {
  before(() => {
    empresaPage.irParaUrl();
  });

  describe("Testar entrar no cadastro da empresa e alterar todos os dados", () => {
    before(() => {
      empresaPage.cadastrarEmpresa(empresaParaTestar.cnpj, empresaParaTestar.escritorio);
      swalPage.clicarOk();
      tablePage.digitarPesquisarField(empresaParaTestar.cnpj);
    });

    beforeEach(() => {
      tablePage.clicarNoElementoDaGradeQueContemOTexto(empresaParaTestar.cnpj);
      cy.intercept("PUT", "**/atualizar-dados-empresa").as("salvarDadosDaEmpresa");
      cy.intercept("POST", "**/salvar-dados-ecac").as("salvarDadosDoEcac");
      cy.intercept("GET", "**/obter-empresa-paginacao*").as("obterEmpresaPaginacao");
    });

    if (empresaParaTestar.procuracaoDoEscritorio) {
      context(
        "Adicionar procuração do escritório " + empresaParaTestar.escritorio,
        () => {
          it("Adicionar escritório na empresa", () => {
            empresaPage.selecionarEscritorioModal(empresaParaTestar.escritorio);
          });

          it("Adicionar Usa Certificado Por Procuracao", () => {
            cy.intercept("GET", "*ativar-inativar-certificado-procuracao*").as("ativarInativarCertificadoProcuracao");

            empresaPage.clicarAbaConfiguracoes();
            empresaPage.clicarCertificadoPorProcuracaoCheckboxAbaConfiguracoes();

            cy.wait("@ativarInativarCertificadoProcuracao");
          });

          it("Mandar consultar o faturamento", () => {
            cy.intercept("GET", "*atualizar-faturamento*").as("atualizarFaturamento");

            empresaPage.clicarAbaFaturamento();
            empresaPage.clicarConsultarFaturamentoButtonAbaFaturamento();

            cy.wait("@atualizarFaturamento");
            swalPage
              .getTitulo()
              .should(
                "contain.text",
                "Solicitação de busca do faturamento realizada com sucesso, assim que o processo terminar você será notificado."
              );
            swalPage.clicarOk();
          });
        }
      );
    }

    context("Alteração dos dados", () => {
      it("Alterar dados da empresa", () => {
        empresaPage.digitarEmailFieldAbaGeral(
          empresaParaTestar.dadosQueDevemSerAlterados.email
        );

        if (empresaParaTestar.dadosQueDevemSerAlterados.emailApuracao) {
          empresaPage.digitarEmailApuracaoFieldAbaGeral(
            empresaParaTestar.dadosQueDevemSerAlterados.emailApuracao
          );
        }

        empresaPage.digitarInscricaoEstadualFieldAbaGeral(
          empresaParaTestar.dadosQueDevemSerAlterados.inscricaoEstadual
        );
        empresaPage.digitarInscricaoMunicipalFieldAbaGeral(
          empresaParaTestar.dadosQueDevemSerAlterados.inscricaoMunicipal
        );

        empresaPage.digitarNomeFantasiaFieldAbaGeral(
          empresaParaTestar.dadosQueDevemSerAlterados.nomeFantasia
        );

        empresaPage.clicarSalvarAbaGeral();

        cy.wait("@salvarDadosDaEmpresa");
      });

      it("Validar se os Dados da Empresa foram alterados", () => {
        empresaPage
          .getEmailFieldAbaGeral()
          .should(
            "have.value",
            empresaParaTestar.dadosQueDevemSerAlterados.email
          );
        empresaPage
          .getNomeFantasiaFieldAbaGeral()
          .should(
            "have.value",
            empresaParaTestar.dadosQueDevemSerAlterados.nomeFantasia
          );

        empresaPage
          .getInscricaoEstadualFieldAbaGeral()
          .should(
            "have.value",
            empresaParaTestar.dadosQueDevemSerAlterados.inscricaoEstadual
          );
        empresaPage
          .getInscricaoMunicipalFieldAbaGeral()
          .should(
            "have.value",
            empresaParaTestar.dadosQueDevemSerAlterados.inscricaoMunicipal
          );
      });

      it("Tentar cadastrar segundo e-mail para apuração -> Deve deixar", () => {
        if (empresaParaTestar.dadosQueDevemSerAlterados.emailApuracao) {
          empresaPage.digitarSegundoEmailApuracaoFieldAbaGeral(empresaParaTestar.dadosQueDevemSerAlterados.segundoEmailApuracao);
          empresaPage.clicarSalvarAbaGeral();
          cy.wait("@salvarDadosDaEmpresa");
          toaster.verificaMensagemDoToaster("Empresa atualizada"); //modificado
        }

      });
    });

    context("Alterar e validar Dados do e-CAC", () => {
      beforeEach(() => {
        empresaPage.clicarAbaDadosDoEcac();
        cy.intercept("GET", "**/ativar-inativar-regime-caixa**").as("ativarInativarRegimeDeCaixa");
      });

      it("Alteração nos dados do e-CAC", () => {
        if (empresaParaTestar.dadosQueDevemSerAlterados.diaParaEnviarEmail) {
          empresaPage.digitarDiaCalcularSelectAbaDadosDoEcac(empresaParaTestar.dadosQueDevemSerAlterados.diaParaCalcular);
          empresaPage.digitarDiaTransmissaoSelectAbaDadosDoEcac(empresaParaTestar.dadosQueDevemSerAlterados.diaParaTransmitir);
          empresaPage.digitarDiaEnviarApuracaoSelectAbaDadosDoEcac(empresaParaTestar.dadosQueDevemSerAlterados.diaParaEnviarEmail);
          empresaPage.clicarRegimeDeCaixaCheckboxAbaDadosDoEcac(); //modificado
        }

        cy.wait("@ativarInativarRegimeDeCaixa")
          .its("response.body")
          .should("have.property", "mensagem", "Alteração feita com sucesso.")
          .then(() => {
            if (swalPage.modalEstaAberto()) {
              swalPage.clicarOk();
            }
          });

        empresaPage.clicarSalvarButtonAbaDadosDoEcac().then(() => {
          empresaPage.validarMensagensDadosDoEcac(
            +empresaParaTestar.dadosQueDevemSerAlterados.diaParaTransmitir,
            +empresaParaTestar.dadosQueDevemSerAlterados.diaParaEnviarEmail
          );

          cy.wait("@salvarDadosDoEcac");
          toaster.verificaMensagemDoToaster("Dados alterados com sucesso!");
        });
      });

      it("Validar se os dados estão corretos", () => {
        empresaPage
          .getDiaCalcularSelectAbaDadosDoEcac()
          .should(
            "contain.value",
            empresaParaTestar.dadosQueDevemSerAlterados.diaParaCalcular
          );
        empresaPage
          .getDiaEnviarApuracaoSelectAbaDadosDoEcac()
          .should(
            "contain.value",
            empresaParaTestar.dadosQueDevemSerAlterados.diaParaEnviarEmail
          );
        empresaPage
          .getDiaTransmissaoSelectAbaDadosDoEcac()
          .should(
            "contain.value",
            empresaParaTestar.dadosQueDevemSerAlterados.diaParaTransmitir
          );
        empresaPage
          .getRegimeDeCaixaCheckBoxAbaDadosDoEcac()
          .should("be.checked");
      });
    });

    context("Alterar e validar valores fixos", () => {
      beforeEach(() => {
        empresaPage.clicarAbaDadosDoEcac();
        empresaPage.clicarAbaValoresFixos();

        cy.intercept("POST", "**/salvar-valores-fixos").as("salvarValoresFixos");
      });

      it("ICMS/ISS maior que R$ 295,50. -> DEVE DAR ERRO", () => {
        empresaPage.digitarValorFixoIcmsAbaValoresFixos("296");
        empresaPage.digitarValorFixoIssAbaValoresFixos("200");
        empresaPage.digitarValorFixoAliquotaAbaValoresFixos("222");
        empresaPage.clicarSalvarButtonAbaValoresFixos();

        cy.wait("@salvarValoresFixos");
        toaster.verificaMensagemDoToaster("Não foi possível realizar a alteração. Motivo: O valor máximo do ICMS é de R$ 295,50");

        empresaPage.digitarValorFixoIcmsAbaValoresFixos("10");
        empresaPage.digitarValorFixoIssAbaValoresFixos("500");
        empresaPage.clicarSalvarButtonAbaValoresFixos();

        cy.wait("@salvarValoresFixos");
        toaster.verificaMensagemDoToaster("Não foi possível realizar a alteração. Motivo: O valor máximo do ISS é de R$ 427,50");
      });

      it("Alterar valor fixo ICMS/ISS válidos", () => {
        empresaPage.digitarValorFixoIcmsAbaValoresFixos(
          empresaParaTestar.dadosQueDevemSerAlterados.valorFixoIcms
        );
        empresaPage.digitarValorFixoIssAbaValoresFixos(
          empresaParaTestar.dadosQueDevemSerAlterados.valorFixoIss
        );
        if (empresaParaTestar.dadosQueDevemSerAlterados.valorFixoAliquota) {

          empresaPage.digitarValorFixoAliquotaAbaValoresFixos(
            empresaParaTestar.dadosQueDevemSerAlterados.valorFixoAliquota
          );
          empresaPage.clicarSalvarButtonAbaValoresFixos();

        }

        cy.wait("@salvarValoresFixos");
        toaster.verificaMensagemDoToaster("Valores fixos foram salvos com sucesso");
      });
    });

    context("Alterar, remover e validar Configuração de Anexo de CFOP", () => {
      beforeEach(() => {
        empresaPage.clicarAbaConfiguracaodeAnexo();
      });

      it("Adicionar Anexo por CFOP", () => {
        empresaParaTestar.dadosQueDevemSerAlterados.anexoDeCfop.forEach(
          (anexoPorCfop) => {
            empresaPage.selecionarAnexoDeCfopAbaConfiguracaoDeAnexo(
              anexoPorCfop.anexo
            );

            anexoPorCfop.cfops.forEach((cfop) => {
              empresaPage.digitarCfopInputAbaConfiguracaoDeAnexo(cfop);
            });

            empresaPage.clicarAdicionarCfopButtonAbaConfiguracaoDeAnexo();
          }
        );
        empresaPage.clicarSalvarButtonAbaConfiguracaoDeAnexo();
        cy.wait("@salvarDadosDoEcac");
        toaster.verificaMensagemDoToaster("Dados alterados com sucesso!");
      });

      it("Validar se foram salvos", () => {
        empresaParaTestar.dadosQueDevemSerAlterados.anexoDeCfop.forEach(
          (anexoPorCfop) => {
            let anexoDoIndice = empresaPage
              .getFieldsetDasConfiguracoesCfop()
              .eq(
                empresaParaTestar.dadosQueDevemSerAlterados.anexoDeCfop.indexOf(
                  anexoPorCfop
                )
              );

            anexoPorCfop.cfops.forEach((cfop) => {
              anexoDoIndice.should("contain.text", cfop);
            });

            anexoDoIndice.should("contain.text", anexoPorCfop.anexo);
          }
        );
      });

      it("Tentar remover as configurações de ANEXO de CFOP", () => {
        empresaPage.clicarRemoverTodosAnexoPorCfopButton();
        empresaPage.clicarSalvarButtonAbaConfiguracaoDeAnexo();
        cy.wait("@salvarDadosDoEcac");
        toaster.verificaMensagemDoToaster("Dados alterados com sucesso!");
      });

      it("Validar se todas as configurações de ANEXO de CFOP foram removidas", () => {
        empresaPage.getFieldsetDasConfiguracoesCfop().should("have.length", 2);
      });
    });


    context("Clicar e Verificar os Inputs - Configurações de Anexo", () => {
      beforeEach(() => {
        empresaPage.clicarAbaConfiguracaodeAnexo();
      });

      it("Verificar os Inputs", () => {
        empresaPage.verificarSeOInputIcmsEstaAtivado();
        empresaPage.verificarSeOInputCestEstaDesativado();
        empresaPage.verificarSeOInputIssEstaAtivado();
        empresaPage.verificarSeOInputPisEConfinsEstaAtivado();
        empresaPage.verificarSeOInputIpiEstaAtivado();
      });

      it("Clicar nos inputs", () => {
        empresaPage.clicarNoInputTributaIcms();
        swalPage.clicarOk();
        empresaPage.clicarNoInputAvaliarCEST();
        swalPage.clicarOk();
        empresaPage.clicarNoInputTributaISS();
        swalPage.clicarOk();
        empresaPage.clicarNoInputTributaPisConfins();
        swalPage.clicarOk();
        empresaPage.clicarNoInputTributaIpi();
        swalPage.clicarOk();
      });

      it("Verificar os Inputs", () => {
        empresaPage.verificarSeOInputIcmsEstaDesativado();
        empresaPage.verificarSeOInputCestEstaAtivado();
        empresaPage.verificarSeOInputIssEstaDesativado();
        empresaPage.verificarSeOInputPisEConfinsEstaDesativado();
        empresaPage.verificarSeOInputIpiEstaDesativado();
      });

      it("Clicar nos inputs", () => {
        empresaPage.clicarNoInputTributaIcms();
        swalPage.clicarOk();
        empresaPage.clicarNoInputAvaliarCEST();
        swalPage.clicarOk();
        empresaPage.clicarNoInputTributaISS();
        swalPage.clicarOk();
        empresaPage.clicarNoInputTributaPisConfins();
        swalPage.clicarOk();
        empresaPage.clicarNoInputTributaIpi();
        swalPage.clicarOk();
      });
    });

    context("Clicar e Verificar inputs - Configurações", () => {
      beforeEach(() => {
        empresaPage.clicarFechar();
        tablePage.clicarNoElementoDaGradeQueContemOTexto(empresaParaTestar.cnpj);
        empresaPage.clicarAbaConfiguracoes();
      });

      it("Verificar inputs", () => {
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Acesso da empresa", false);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Fator R", false);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Certificado por procuracao", false);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Data de Entrada Automática", true);
        empresaPage.verificarDadosContabilista("Dados do Contabilista");
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Usa Crédito do DIFAL", true);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Usa Inscrição Estadual Para Gerar DIFAL", false);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Considera ICMS ST no valor dos produtos", true);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Considera valor do Frete na Nota", true);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Acréscimo CF-e", false);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Usa Desconto Condicional", true);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Usa Desconto Incondicional", true);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Usa Valor Deduções", false);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Importa notas pelo sistema SIEG", true);
      });

      it("Clicar inputs", () => {
        empresaPage.clicarSwitchDaTabela("Acesso da empresa");
        empresaPage.clicarSwitchDaTabela("Fator R");
        empresaPage.clicarSwitchDaTabela("Certificado por procuracao");
        empresaPage.clicarSwitchDaTabela("Data de Entrada Automática");
        empresaPage.selecionarContadorDadosContabilista(empresasParaAlterarDados.preContador.nome);
        empresaPage.clicarSwitchDaTabela("Usa Crédito do DIFAL");
        empresaPage.clicarSwitchDaTabela("Usa Inscrição Estadual Para Gerar DIFAL");
        empresaPage.clicarSwitchDaTabela("Considera ICMS ST no valor dos produtos");
        empresaPage.clicarSwitchDaTabela("Considera valor do Frete na Nota");
        empresaPage.clicarSwitchDaTabela("Acréscimo CF-e");
        empresaPage.clicarSwitchDaTabela("Usa Desconto Condicional");
        empresaPage.clicarSwitchDaTabela("Usa Desconto Incondicional");
        empresaPage.clicarSwitchDaTabela("Usa Valor Deduções");
        empresaPage.clicarSwitchDaTabela("Importa notas pelo sistema SIEG");
      });

      it("Verificar Inputs", () => {
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Acesso da empresa", true);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Fator R", true);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Certificado por procuracao", true);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Data de Entrada Automática", false);
        empresaPage.verificarDadosContabilista("Dados do Contabilista", empresasParaAlterarDados.preContador.nome);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Usa Crédito do DIFAL", false);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Usa Inscrição Estadual Para Gerar DIFAL", false); // apenas Minas Gerais deve usar
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Considera ICMS ST no valor dos produtos", false);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Considera valor do Frete na Nota", false);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Acréscimo CF-e", true);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Usa Desconto Condicional", false);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Usa Desconto Incondicional", false);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Usa Valor Deduções", true);
        empresaPage.verificarSeSwitchDaTabelaEstaAtivoOuInativo("Importa notas pelo sistema SIEG", false);
      });

      it("Clicar inputs", () => {
        empresaPage.clicarSwitchDaTabela("Acesso da empresa");
        empresaPage.clicarSwitchDaTabela("Fator R");
        empresaPage.clicarSwitchDaTabela("Certificado por procuracao");
        empresaPage.clicarSwitchDaTabela("Data de Entrada Automática");
        empresaPage.clicarSwitchDaTabela("Usa Crédito do DIFAL");
        empresaPage.clicarSwitchDaTabela("Usa Inscrição Estadual Para Gerar DIFAL");
        empresaPage.clicarSwitchDaTabela("Considera ICMS ST no valor dos produtos");
        empresaPage.clicarSwitchDaTabela("Considera valor do Frete na Nota");
        empresaPage.clicarSwitchDaTabela("Acréscimo CF-e");
        empresaPage.clicarSwitchDaTabela("Usa Desconto Condicional");
        empresaPage.clicarSwitchDaTabela("Usa Desconto Incondicional");
        empresaPage.clicarSwitchDaTabela("Usa Valor Deduções");
        empresaPage.clicarSwitchDaTabela("Importa notas pelo sistema SIEG");
      })
    });

    context("Adicionar, remover e validar anexos de serviços", () => {
      beforeEach(() => {
        empresaPage.clicarAbaConfiguracaodeAnexo();
      });

      it("Adicionar anexos de serviço", () => {
        empresaParaTestar.dadosQueDevemSerAlterados.anexoDeServico.forEach(
          (anexoDeServico) => {
            empresaPage.selecionarAnexoDeServicoAbaConfiguracaoDeAnexo(
              anexoDeServico.anexo
            );

            anexoDeServico.codigosDeServico.forEach((codigoDeServico) => {
              empresaPage.digitarCodigoServicoInputAbaConfiguracaoDeAnexo(
                codigoDeServico
              );
            });
            empresaPage.clicarAdicionarAnexoServicoButtonAbaConfiguracaoDeAnexo(
            );
          }
        );
        empresaPage.clicarSalvarButtonAbaConfiguracaoDeAnexo();
        cy.wait("@salvarDadosDoEcac");
        toaster.verificaMensagemDoToaster("Dados alterados com sucesso!");
      });

      it("Validar se todos os anexos foram inseridos", () => {
        empresaParaTestar.dadosQueDevemSerAlterados.anexoDeServico.forEach(
          (anexoDeServico) => {
            let anexoDoIndice = empresaPage
              .getFieldsetDasConfiguracoesAnexoServico()
              .eq(
                empresaParaTestar.dadosQueDevemSerAlterados.anexoDeServico.indexOf(
                  anexoDeServico
                )
              );

            anexoDeServico.codigosDeServico.forEach((codigoDeServico) => {
              anexoDoIndice.should("contain.text", codigoDeServico);
            });

            anexoDoIndice.should("contain.text", anexoDeServico.anexo);
          }
        );
      });

      it("Tentar remover as configurações de anexos de serviço", () => {
        empresaPage.clicarRemoverAnexoDeServicoButton();
        empresaPage.clicarSalvarButtonAbaConfiguracaoDeAnexo();
        cy.wait("@salvarDadosDoEcac");
        toaster.verificaMensagemDoToaster("Dados alterados com sucesso!");
      });

      it("Validar se todas as configurações de ANEXO de Serviço foram removidas", () => {
        empresaPage
          .getFieldsetDasConfiguracoesAnexoServico()
          .should("have.length", 1);
      });
    });

    context("Adicionar códigos de serviço", () => {
      beforeEach(() => {
        empresaPage.clicarAbaCodigosDeServico();
      });

      it("Validar se não tem nenhum código de serviço adicionado", () => {
        empresaPage.getCodigosAdicionadosAbaCodigosDeServico().should('have.length', 0)
      })

      it(`Adicionar os Códigos de Serviço`, () => {
        empresaParaTestar.dadosQueDevemSerAlterados.codigosDeServico.forEach(codigo => {
          empresaPage.digitarCodigoDeServicoAbaCodigosDeServico(codigo)
        });
        empresaPage.clicarSalvarAbaCodigosServicos();
      })

      it("Validar se o código de serviço foi adicionado", () => empresaPage.getCodigosAdicionadosAbaCodigosDeServico()
        .should('have.length', empresaParaTestar.dadosQueDevemSerAlterados.codigosDeServico.length));

      it(`Remover códigos de serviço`, () => {
        empresaParaTestar.dadosQueDevemSerAlterados.codigosDeServico.forEach(codigo => {
          empresaPage.clicarRemoverCodigoServicoAbaCodigosServicos(codigo)
          empresaPage.clicarSalvarAbaCodigosServicos();
        });
      })
    });

    context("Adicionar código de serviço ISS exterior", () => {
      beforeEach(() => {
        empresaPage.clicarAbaIssExterior();
      });
      it("Validar se não tem nenhum código de serviço adicionado ISS Exterior", () => {
        empresaPage.getCodigosAdicionadosAbaCodigosDeServico().should('have.length', 0)
      })

      it(`Adicionar os Códigos de Serviço ISS Exterior`, () => {
        empresaParaTestar.dadosQueDevemSerAlterados.codigosDeServico.forEach(codigo => {
          empresaPage.digitarCodigoDeServicoAbaCodigosDeServico(codigo)
        });
        empresaPage.clicarSalvarAbaCodigosServicosExterior();
      })

      it("Validar se o código de serviço ISS Exterior foi adicionado", () => empresaPage.getCodigosAdicionadosAbaCodigosDeServico()
        .should('have.length', empresaParaTestar.dadosQueDevemSerAlterados.codigosDeServico.length));

      it(`Remover códigos de serviço ISS Exterior`, () => {
        empresaParaTestar.dadosQueDevemSerAlterados.codigosDeServico.forEach(codigo => {
          empresaPage.clicarRemoverCodigoServicoAbaCodigosServicos(codigo)
          empresaPage.clicarSalvarAbaCodigosServicosExterior();
        });
      })
    });
  });
});
