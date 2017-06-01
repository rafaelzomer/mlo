import indexCss from './css/index.css';
import tableCss from './css/table.css';
import {analisadorLexico} from './analisadorLexico';
import {analisadorSintatico} from './analisadorSintatico';

var arquivo = document.getElementById('arquivo');
var codigoTextArea = document.getElementById('codigo');
var compilarButton = document.getElementById('compilar');
var resultadoTable = document.getElementById('resultado');
var errosTable = document.getElementById('erros');

arquivo.addEventListener('change', function(e) {
  var file = arquivo.files[0];
  var textType = /text.*/;

  if (file.type.match(textType)) {
    var reader = new FileReader();
    reader.onload = function(e) {
      codigoTextArea.innerText = reader.result;
    }
    reader.readAsText(file);
  } else {
    alert("Seu browser não suporta arquivos locais");
  }
});

compilarButton.addEventListener('click', function(e) {
  var fita = codigoTextArea.value.trim().split('');
  analisadorLexico.init();
  analisadorLexico.analisar(false, fita, 0);
  var tokens = analisadorLexico.tokens;
  analisadorSintatico.init(tokens);
  resultadoTable.innerHTML = "";
  for (var i = 0; i < tokens.length; i++) {
    var tk = tokens[i];
    var row = resultadoTable.insertRow(i);

    var cell = row.insertCell(0);
    cell.innerHTML = tk.codigo;
    cell.setAttribute("data-label", "Código");

    cell = row.insertCell(1);
    cell.innerHTML = tk.token;
    cell.setAttribute("data-label", "Token");

    cell = row.insertCell(2);
    cell.innerHTML = tk.linha;
    cell.setAttribute("data-label", "Linha");

  }

  var erros = analisadorLexico.erros;
  errosTable.innerHTML = "";
  for (var i = 0; i < erros.length; i++) {
    var tk = erros[i];
    var row = errosTable.insertRow(i);

    var cell = row.insertCell(0);
    cell.innerHTML = tk.erro;
    cell.setAttribute("data-label", "erro");

    cell = row.insertCell(1);
    cell.innerHTML = tk.linha;
    cell.setAttribute("data-label", "Linha");
  }
});