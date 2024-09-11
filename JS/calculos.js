"use strict";

var input = document.getElementById('input'), // input/output button
  number = document.querySelectorAll('.numbers div'), // botão dos números
  operator = document.querySelectorAll('.operators div'), // botão dos operadores
  result = document.getElementById('result'), //botão de igual
  clear = document.getElementById('clear'), // botão de limpar
  resultDisplayed = false; // para ver que resultados são apresentados

// adicionar manipuladores de cliques aos botões numéricos
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // armazenando a string de entrada atual e o seu último carácter em variáveis - usadas mais tarde
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // se o resultado não for apresentado, continua a adicionar
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // se o resultado é atualmente apresentado e o utilizador pressionou um operador
      // precisamos de continuar a adicionar à string para a próxima operação
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // se o resultado é atualmente apresentado e o utilizador pressionou um número
      // temos de limpar a input string e adicionar a nova entrada para iniciar a nova operação
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// adicionar manipuladores de cliques aos botões numéricos
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // armazenando a string de entrada atual e o seu último carácter em variáveis - usadas mais tarde
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // se o último caráctere introduzido for um operador, substitui-o pelo carácter atualmente pressionado
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // se a primeira tecla pressionada for um operador, não faz nada
      console.log("enter a number first");
    } else {
     // caso contrário, basta adicionar o operador pressionado ao input
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// ao clicar no botão “igual”.
result.addEventListener("click", function() {

  // esta é a string que vamos processar, por exemplo -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // formando um conjunto de números. por exemplo, para a string acima será: numbers = [“10”, “26”, “33”, “56”, “34”, “23”]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // formando um array (lista) de operadores. para a string acima será: operators = [“+”, “+”, “-”, “*”, “/”]
  // primeiro substituímos todos os números e pontos por uma string vazia e depois dividimos
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // agora estamos a percorrer o array e a fazer uma operação de cada vez.
  // primeiro dividir, depois multiplicar, depois subtração e depois adição
  // à medida que nos movemos, estamos a alterando os números originais e a array de operadores
  // o último elemento restante no array será o resultado
  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // a utilização de parseFloat é necessária, caso contrário resultará na concatenação de strings :)
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // visualização da saída

  resultDisplayed = true; // sinalizar se o resultado é apresentado
});

// limpar o input ao pressionar o botão clear
clear.addEventListener("click", function() {
  input.innerHTML = "";
})