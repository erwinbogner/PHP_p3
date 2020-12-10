const linhaTabela = document.getElementsByClassName("linhaTabela");
const editarDados = document.getElementById("editarDados");
const excluirDados = document.getElementById("excluirDados");


let dadosAt = Array.from(linhaTabela); // Tranformando os dados em Array


///Recebendo os dados da linha clicada e remove a classe das não clicadas
function selLinha(linha, multiplos) {
    if (!multiplos) {

        var linhas = linha.parentElement.getElementsByTagName("tr");


        for (var i = 0; i < linhas.length; i++) {
            var linha_ = linhas[i];
            linha_.classList.remove("selecionado");
        }
    }

    linha.classList.toggle("selecionado");
}


/// Verificando se a linha foi clicada
for (let index = 0; index < dadosAt.length; index++) {
    const elemento = dadosAt[index];

    elemento.addEventListener('click', function () {

        selLinha(elemento, false);

    });
}


// /**
// Exemplo de como capturar os dados
// **/

editarDados.addEventListener("click", function () {
    var selecionados = tabela.getElementsByClassName("selecionado");

    console.log('clicado');

    //Verificar se está selecionado
    if (selecionados.length < 1) {
        alert("Selecione pelo menos uma linha!");
        return;
    }


    var dados = "";

    for (var i = 0; i < selecionados.length; i++) {

        var selecionado = selecionados[i];
        selecionado = selecionado.getElementsByTagName("td");
        dados += "ID: " + selecionado[0].innerHTML + " - Cliente: " + selecionado[1].innerHTML + " - Data: " + selecionado[2].innerHTML + "\n";

        // id.innerHTML = selecionado[0].innerHTML;

        //Estou setando o valor do value do input aqui - VB
        document.getElementById("inputId").value = parseInt(selecionado[0].innerHTML);

        inputEditar.innerHTML = selecionado[1].innerHTML;

        console.log(selecionado[0].innerHTML);
        console.log(selecionado[1].innerHTML);
    }

    $('#modalEditar').modal('show');

});


excluirDados.addEventListener("click", function () {
    var selecionados = tabela.getElementsByClassName("selecionado");

    console.log('clicado');

    //Verificar se está selecionado
    if (selecionados.length < 1) {
        alert("Selecione pelo menos uma linha!");
        return false;
    }


    var dados = "";

    for (var i = 0; i < selecionados.length; i++) {

        var selecionado = selecionados[i];
        selecionado = selecionado.getElementsByTagName("td");
        dados += "ID: " + selecionado[0].innerHTML + " - Cliente: " + selecionado[1].innerHTML + " - Data: " + selecionado[2].innerHTML + "\n";

        // id.innerHTML = selecionado[0].innerHTML;

        //Estou setando o valor do value do input aqui - VB
        document.getElementById("inputIdDel").value = parseInt(selecionado[0].innerHTML);

        inputExcluir.innerHTML = selecionado[1].innerHTML;

        console.log(selecionado[0].innerHTML);
        console.log(selecionado[1].innerHTML);
    }
    $('#modalExcluir').modal('show');
});