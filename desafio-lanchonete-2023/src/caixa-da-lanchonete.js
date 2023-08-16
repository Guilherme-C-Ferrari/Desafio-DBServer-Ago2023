class CaixaDaLanchonete {

    // Método usado para calcular o valo da compra
    calcularValorDaCompra(metodoDePagamento, itens) {

        let codigoDoItem = ""; // Armazena o código de cada item
        let qntDoItem = ""; // Armazena a quantidade de cada item
        let mensagemFinal = ""; // Armazena a mensagem final que será mostrada
        let auxiliar = ""; // Variável auxiliar
        let valorFinal = 0; // Armazena o preço final calculado
        let i = 0; // index 1
        let j = 0; // index 2
        let condicional = false; // Booleano usado para testar condições

        // Estrutura que checa se há itens no carrinho
        if (itens == "") {
            mensagemFinal = "Não há itens no carrinho de compra!";
            condicional = true;
        }

        // Loop que passa pelos itens individualmente testando condições e calculando os preços dos itens
        while (i < itens.length && condicional == false) {
            codigoDoItem = "";
            qntDoItem = "";
            auxiliar = "";

            // Abaixo, o array itens na posição autal é dividido entre o codigo do item e a quantidade de itens pedido daquele tipo
            auxiliar = itens[i].split(",");
            codigoDoItem = auxiliar[0];
            qntDoItem = auxiliar[1];

            // Estrutura que checa se itens extras podem ser pedidos
            if (codigoDoItem == "chantily" || codigoDoItem == "queijo") {
                j = 0;
                condicional = true;

                switch (codigoDoItem) {
                    case "chantily":
                        while (j < itens.length && condicional == true) {
                            auxiliar = itens[j].split(",");

                            if (auxiliar[0] == "cafe") {
                                condicional = false
                                mensagemFinal = "";
                            }
                            else {
                                mensagemFinal = "Item extra não pode ser pedido sem o principal";
                                condicional = true;
                            }
                            j++;
                        }

                        break;
                    case "queijo":
                        while (j < itens.length && condicional == true) {
                            auxiliar = itens[j].split(",");

                            if (auxiliar[0] == "sanduiche") {
                                condicional = false
                                mensagemFinal = "";
                            }
                            else {
                                mensagemFinal = "Item extra não pode ser pedido sem o principal";
                                condicional = true;
                            }
                            j++;
                        }
                        break;
                }
            }

            // Estrutura que checa se os itens são válidos
            if (this.checarCardapio(codigoDoItem) == false && condicional == false) {
                mensagemFinal = "Item inválido!";
                condicional = true;
            }

            // Estrutura que checa se as quantidades são válidas
            if (qntDoItem <= 0 && condicional == false) {
                mensagemFinal = "Quantidade inválida!";
                condicional = true;
            }

            // Estrutura que calcula o preço do item multiplica por sua quantidade e soma ao valor final total
            if (condicional == false) {
                valorFinal += this.checarCardapio(codigoDoItem) * Number(qntDoItem);
            }

            i++;
        }

        // Estrutura que calcula o valor final a partir das formas de pagamento e checa se a forma de pagamento é válida
        if (condicional == false) {
            switch (metodoDePagamento) {
                case "dinheiro":
                    valorFinal *= 0.95
                    valorFinal = valorFinal.toFixed(2);
                    mensagemFinal = "R$ ";
                    mensagemFinal = mensagemFinal.concat(valorFinal.toString());
                    mensagemFinal = mensagemFinal.replace(".",",");
                    break;
                case "debito":
                    valorFinal = valorFinal.toFixed(2);
                    mensagemFinal = "R$ ";
                    mensagemFinal = mensagemFinal.concat(valorFinal.toString());
                    mensagemFinal = mensagemFinal.replace(".",",");
                    break;
                case "credito":
                    valorFinal *= 1.03
                    valorFinal = valorFinal.toFixed(2);
                    mensagemFinal = "R$ ";
                    mensagemFinal = mensagemFinal.concat(valorFinal.toString());
                    mensagemFinal = mensagemFinal.replace(".",",");
                    break;
                default:
                    mensagemFinal = "Forma de pagamento inválida!";
            }
        }
        return mensagemFinal;
    }

    // Método usado para checar se os itens selecionados existem no cardápio e para conferir os preços dos itens
    checarCardapio(codigoDoItem) {
        switch (codigoDoItem) {
            case "cafe":
                return 3.00;
                break;
            case "chantily":
                return 1.50;
                break;
            case "suco":
                return 6.20;
                break;
            case "sanduiche":
                return 6.50;
                break;
            case "queijo":
                return 2;
                break;
            case "salgado":
                return 7.25;
                break;
            case "combo1":
                return 9.50;
                break;
            case "combo2":
                return 7.50;
                break;
            default:
                return false;
        }
    }
}

export { CaixaDaLanchonete };