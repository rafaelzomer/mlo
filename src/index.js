import indexCss from './css/index.css';
import tableCss from './css/table.css';
import {analisadorLexico} from './analisadorLexico';
import {analisadorSintatico} from './analisadorSintatico';
import swal from 'sweetalert';
import googleCss from 'sweetalert/dist/sweetalert.css';
import CodeMirror from 'codemirror';
import codeMirrorCss from 'codemirror/lib/codemirror.css';

var arquivo = document.getElementById('arquivo');
var botaoCompilar = document.getElementById('compilar');
var botaoSalvar = document.getElementById('salvar');
var resultadoTable = document.getElementById('resultado');
var errosTable = document.getElementById('erros');

var editorTexto = CodeMirror.fromTextArea(document.getElementById('codigo'), {
  lineNumbers: true,
});

arquivo.addEventListener('change', function(e) {
  var file = arquivo.files[0];

  var reader = new FileReader();
  reader.onload = function(e) {
    editorTexto.getDoc().setValue(reader.result);
  }
  reader.readAsText(file);
});

botaoCompilar.addEventListener('click', function(e) {
  var fita = editorTexto.getDoc().getValue().trim().split('');
  analisadorLexico.init();
  analisadorLexico.iniciar(fita);
  var tokens = analisadorLexico.tokens;
  analisadorSintatico.init({tokens});

  try
  {
    analisadorSintatico.iniciar();
    swal({
      title: "Sucesso",
      text: "Compilado com sucesso!",
      type: "success",
    });
  }
  catch(err) {
    let palavras = analisadorSintatico.esperava.map(item => item.palavra);
    let e = analisadorSintatico.encontrou;
    swal({
      title: "Erro!",
      text: '\nErro, token inválido: \n'+e.token
            +', linha: '+e.linha
            +'\n\nEsperava:\n'+ palavras.join('\n'),
      type: "error"
    });
  }
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