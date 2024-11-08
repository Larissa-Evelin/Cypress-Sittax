
// interface IUsuario {
//     usuario: string,
//     senha: string
// }

// export default class PerfisDeAcessoPage {
//     loginEPegarQtdEscritorios(perfil: IUsuario) {
//         let token;
//         let quantidadeEscritorios;

//        return cy.login(perfil.usuario, perfil.senha)
//         .then(() => {
//             token = Cypress.env("token");
//             cy.request({
//                 method: "GET",
//                 url: `${Cypress.config().apiUrl}api/escritorio/lista-escritorios-para-selecionar`,
//                 headers: {
//                 Authorization: `Bearer ${token}`
//                 }
//             }).then(($res) => {
//                return quantidadeEscritorios = $res.body.escritorios.length;
//             });
//         });
//     }

//     loginEPegarQtdEmpresas(perfil) {
//         let token;
//         let quantidadeEmpresas;

//         return cy.login(perfil.usuario, perfil.senha)
//         .then(() => {
//             token = Cypress.env("token");
//             cy.request({
//                 method: "GET",
//                 url: `${Cypress.config().apiUrl}api/empresa/listar-todas-empresas-administrador-selecao`,
//                 headers: {
//                 Authorization: `Bearer ${token}`
//                 }
//             }).then(($res) => {
//                return quantidadeEmpresas = $res.body.empresas.length;
//             });
//         });
//     }

//     compararEmpresasComRegistros(quantidadeDeEmpresas) {
//         cy.get("app-tabela-padrao:visible strong").parent().first().invoke("text").then(($text) => {
//         const match = $text.match(/\d+/);
//             const numeroDeRegistros = parseInt(match[0], 10);
//             expect(quantidadeDeEmpresas).to.be.at.least(numeroDeRegistros);
//         });
//     }

//     verificarEscritoriosAdmin(quantidadeEscritorios) {
//         cy.get("#selectHeaderEscritorios").click();
//         cy.get("#selectHeaderEscritorios div[role='option']").should("be.visible").then(($quantidade) => {
//             expect($quantidade.length).to.be.at.least(quantidadeEscritorios);
//         });
//     }

//     selecionarEscritorioHeader(escritorio) {
//         cy.get("#selectHeaderEscritorios").click();
//         cy.contains(escritorio).click();
//     }

//     verificarEscritoriosHeader(quantidadeEscritorios) {
//         cy.get("#selectHeaderEscritorios").click();
//         cy.get("#selectHeaderEscritorios div[role='option']")
//             .should("have.length", quantidadeEscritorios)
//             .and("contain", "SITTAX SISTEMA DE INTELIGENCIA TRIBUTARIA LTDA")
//             .and("contain", "Sittax G Empresas");
//     }

//     verificarEscritoriosRevendaHeader(quantidadeEscritorios, revenda) {
//         cy.get("#selectHeaderEscritorios").click().find("small").invoke("text").then(($text) => {
//             var texto = $text.replace(/\s+/g, ' ').trim();
//             expect(texto).to.eq(quantidadeEscritorios);
//         })

//         cy.get("#selectHeaderEscritorios div[role='option']").should("contain", revenda);
//     }

//     irParaCadastroUsuario() {
//         cy.contains("app-dados-do-escritorio:visible li", "Usuários").click();
//         cy.contains("button", "Cadastrar novo usuário").click();
//     }

//     cadastrarEscritorio(escritorio) {
//         cy.contains("app-escritorio:visible button", "Novo Escritório").click();
//         cy.wait(300)//ESPERAR MODAL ABRIR
//         cy.get("app-dados-do-escritorio:visible").within(() => {
//             cy.get("input[placeholder='CNPJ']").type(escritorio.cadastroEscritorio.cnpj);
//             cy.get("button[title='Clique para pesquisar o CNPJ']").click();
//             cy.get("input[placeholder='e-mail']").clearThenType(escritorio.cadastroEscritorio.email);

//             if(escritorio.cadastroEscritorio.revenda){
//                 cy.get("ngx-select[placeholder='Revenda']").click().type(escritorio.cadastroEscritorio.revenda + "{enter}");
//             }

//             cy.contains("button", "Salvar").click();
//         });
//     }

//     verificarUsuario(usuario) {
//         cy.get("app-tabela-padrao-paginada:visible tbody tr").should("contain", usuario);
//     }

//     verificarEscritorioFoiCadastrado(razaoSocial) {
//         cy.get("app-tabela-padrao-paginada:visible tbody tr").should("contain", razaoSocial);
//     }
// }