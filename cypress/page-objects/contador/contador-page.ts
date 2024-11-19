
interface IContador {
    nome: string,
    CPF: string,
    CRC: string,
    endereco: IEnderecoContador,
    telefone: string,
    email: string
}

interface IEnderecoContador {
    logradouro: string,
    bairro: string,
    numero: string,
    complemento: string,
    cep: string
}

export default class ContadorPage {
    irParaContador() {
        cy.contains("app-dados-do-escritorio:visible li a", /^Contador/).click();
    }

    clicarAdicionarContador() {
        cy.contains("app-dados-do-escritorio:visible button", "Cadastrar novo contador").click();
    }

    cadastrarContador(contador: IContador) {
        cy.get("app-modal-contador:visible").within(() => {
            cy.wait(300); //ESPERAR O MODAL CARREGAR
            cy.get("input[formcontrolname='nome']").type(contador.nome);
            cy.get("input[formcontrolname='cpf']").type(contador.CPF);
            cy.get("input[formcontrolname='crc']").type(contador.CRC);
            cy.get("input[formcontrolname='endereco']").type(contador.endereco.logradouro);
            cy.get("input[formcontrolname='bairro']").type(contador.endereco.bairro);
            cy.get("input[formcontrolname='numero']").type(contador.endereco.numero);
            cy.get("input[formcontrolname='complemento']").type(contador.endereco.complemento);
            cy.get("input[formcontrolname='cep']").type(contador.endereco.cep);
            cy.get("input[formcontrolname='fone']").type(contador.telefone);
            cy.get("input[formcontrolname='email']").type(contador.email);
            cy.contains("button", "Salvar").click();
        });
    }

    verificarContadorFoiCadastrado(contador: IContador) {
        cy.get("app-tabela-padrao-paginada:visible tbody tr")
            .should("contain", contador.nome)
            .and("contain", contador.CPF);
    }

    excluirContador() {
        cy.get("app-tabela-padrao-paginada:visible")
            .find("tbody tr:last-child td:last-child")
            .find("em[title='Excluir']")
            .click();
    }

    verificarContadorFoiExcluido(contador: IContador) {
        cy.get("app-tabela-padrao-paginada:visible tbody tr")
            .should("not.contain", contador.nome)
            .and("not.contain", contador.CPF);
    }
}