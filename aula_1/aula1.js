// Dar bons nomes de variáveis
var n1 = 10;
var n2 = 20;

console.log(n1 + n2);
// Como devs, o que mais fazemos é LER código.
// Contexto é extremamente importante.

const userFirstInputNumber = 10;
const userSecondInputNumber = 20;

console.log(userFirstInputNumber + userSecondInputNumber);


// ==============================

var inputDoUsuario;

// No Browser
// - string
// - element do DOM (Campo de busca do google)
const inputUsuario = document.querySelector('input').value;
const $inputUsuario = document.querySelector('input');

// Booleanos
// <input value="" />
document.querySelector('input').hasAttribute('value'); // true | false
// has, is - pra ver se é booleano
if (hasSomething || isAnything) { } else { }

// Typescript
/* var arr: boolean;
var isArray: boolean;

if(arr) {} */