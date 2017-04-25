var arquivo = document.getElementById('arquivo');
var codigoTextArea = document.getElementById('codigo');
var compilarButton = document.getElementById('compilar');
var resultadoTable = document.getElementById('resultado');
var errosTable = document.getElementById('erros');

var tokens, token, linha, fita, erros;
var SINTAXE_LITERAL_MAX = 333;
var SINTAXE_INTEIRO_MIN = -100000000;
var SINTAXE_INTEIRO_MAX = 100000000;
var SINTAXE_FLOAT_MIN = -100000000;
var SINTAXE_FLOAT_MAX = 100000000;

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
  linha = 1;
  tokens = [];
  erros = [];
  token = '';
  fita = codigoTextArea.value.trim().split('');
  analisar(false, fita, 0);
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

function analisar(anterior, fita, i) {
  var cabecoteAnterior = fita[i - 1];
  var cabecote = fita[i];
  var cabecoteProximo = fita[i + 1];


  if (!ehEOF(cabecote)) {
    token += cabecote;
  }

  if (anterior == 'COMENTARIO_LINHA' && !ehQuebraLinha(cabecote) && !ehEOF(cabecote) ) {
    return analisar('COMENTARIO_LINHA', fita, ++i);
  }
  else if (anterior == 'COMENTARIO_BLOCO' && !(cabecoteAnterior == '*' && cabecote == '-')) {
    if (ehEOF(cabecote))
    {
        adicionarErro('Comentário de bloco (-*) "'+token+'" não fechado (*-)');
        return;
    }
    return analisar('COMENTARIO_BLOCO', fita, ++i);
  }
  else if (anterior == 'LITERAL' && !ehAspa(cabecote)) {
    if (ehEOF(cabecote)) {
      adicionarErro('Aspas do literal "' + token + '" não foram fechadas');
      return;
    }
    return analisar('LITERAL', fita, ++i);
  } else if (ehSinal(cabecote)) {
    if (cabecote == '-' && cabecoteProximo == '*') {
      return analisar('COMENTARIO_BLOCO', fita, ++i);
    } else if (cabecoteAnterior == '*' && cabecote == '-') {
      adicionarToken('COMENTARIO_BLOCO');
    } else if (cabecote == '-' && cabecoteProximo == '-') {
      return analisar('COMENTARIO_LINHA', fita, ++i);
    }
    else
    {
      if (ehSinal(cabecoteProximo))
      {
        return analisar('SINAL', fita, ++i);
      }
      else
      {
        adicionarToken('SINAL');
      }
    }
  } else if (anterior !== false && ehSinal(cabecoteProximo)) {
    if (anterior == 'RESEVIDENT' || anterior == 'FLOAT' || anterior == 'INTEIRO')
    {
      adicionarToken(anterior);
    }
  } else if (ehLetra(cabecote)) {
    return analisar('RESEVIDENT', fita, ++i);
  } else if (ehAspa(cabecote)) {
    if (anterior !== 'LITERAL') {
      return analisar('LITERAL', fita, ++i);
    } else {
      adicionarToken('LITERAL');
    }
  } else if (ehNumero(cabecote)) {
    if (anterior == false || anterior == 'INTEIRO')
    {
      if (ehSinal(cabecoteProximo)) {
        adicionarToken('INTEIRO');
      }
      return analisar('INTEIRO', fita, ++i);
    }
    else if (anterior == 'FLOAT') {
      if (ehSinal(cabecoteProximo)) {
        adicionarToken('FLOAT');
      }
      return analisar('FLOAT', fita, ++i);
    }
    else if (anterior == 'RESEVIDENT')
    {
      if (ehSinal(cabecoteProximo)) {
        adicionarToken('RESEVIDENT');
      }
      return analisar('RESEVIDENT', fita, ++i);
    }
  } else if (ehSeparadorDecimal(cabecote)) {
    if (anterior == 'INTEIRO')
    {
      return analisar('FLOAT', fita, ++i);
    }
  } else {
    adicionarToken(anterior);
  }
  if (ehEOF(cabecote)) {
    adicionarToken('FIM');
    return;
  }
  return analisar(false, fita, ++i);
}

function adicionarErro(erro) {
  erros.push({
    erro: erro,
    linha: linha
  });
}

function adicionarToken(tipo) {
  if (tipo !== 'FIM')
  {
    if ((tipo == false && token == ' ') || token.trim() == '') {
      token = '';
      return;
    }
  }
  var codigo = 0;
  switch (tipo) {
    case 'LITERAL':
      codigo = ehPalavraReservada('literal');
      var tam = token.length - 2;
      if (tam > SINTAXE_LITERAL_MAX) {
        adicionarErro('O tamanho do literal (' + tam + ') ultrapassa o tamanho máximo específicado: ' + SINTAXE_LITERAL_MAX);
      }
      break;
    case 'INTEIRO':
      codigo = ehPalavraReservada('ninteiro');
      var i = parseInt(token);
      if (i < SINTAXE_INTEIRO_MIN) {
        adicionarErro('O tamanho do inteiro (' + i + ') ultrapassa o tamanho máximo negativo específicado: ' + SINTAXE_INTEIRO_MIN);
      }
      if (i > SINTAXE_INTEIRO_MAX) {
        adicionarErro('O tamanho do inteiro (' + i + ') ultrapassa o tamanho máximo positivo específicado: ' + SINTAXE_INTEIRO_MAX);
      }
      break;
    case 'FLOAT':
      codigo = ehPalavraReservada('nfloat');
      var i = parseFloat(token);
      if (i < SINTAXE_FLOAT_MIN) {
        adicionarErro('O tamanho do float (' + i + ') ultrapassa o tamanho máximo negativo específicado: ' + SINTAXE_FLOAT_MIN);
      }
      if (i > SINTAXE_FLOAT_MAX) {
        adicionarErro('O tamanho do float (' + i + ') ultrapassa o tamanho máximo positivo específicado: ' + SINTAXE_FLOAT_MAX);
      }
      break;
    case 'COMENTARIO_LINHA':
      codigo = 'COMENTARIO_LINHA';
      break;
    case 'COMENTARIO_BLOCO':
      codigo = 'COMENTARIO_BLOCO';
      break;
    case 'FIM':
      codigo = 44;
      token = 'fim arquivo';
      break;
    case 'RESEVIDENT':
    default:
      codigo = ehPalavraReservada(token);
      if (!codigo)
        codigo = ehPalavraReservada('ident');
      break;
  }
  tokens.push({
    linha: linha,
    codigo: codigo,
    token: token
  });
  token = '';
}

function ehEOF(valor) {
  return typeof valor === 'undefined';
}

function ehAspa(valor) {
  return valor === '"';
}

function ehEspaco(valor) {
  return valor === ' ';
}

function ehQuebraLinha(valor) {
  return valor === '\n';
}

function ehSinal(valor) {
  for (var i = 0; i < sinais.length; i++) {
    if (valor == sinais[i])
      return true;
  }
  return false;
}

function ehLetra(valor) {
  for (var i = 0; i < alfabeto.length; i++) {
    if (valor == alfabeto[i])
      return true;
  }
  return false;
}

function ehNumero(valor) {
  for (var i = 0; i < numeros.length; i++) {
    if (valor == numeros[i])
      return true;
  }
  return false;
}

function ehPalavraReservada(valor) {
  for (var i = 0; i < palavrasReservada.length; i++) {
    if (valor == palavrasReservada[i])
      return i;
  }
  return 0;
}

function ehComposto(valor) {
  for (var i = 0; i < compostos.length; i++) {
    if (valor == compostos[i])
      return true;
  }
  return false;
}

function ehComentario(valor) {
  return valor === '-' || valor === '*';
}

function ehSeparadorDecimal(valor) {
  return valor === '.';
}

var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "_"
];
var numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var sinais = [",", ";", ":", "(", ")", "{", "}", "[", "]", "+",
  "-", "*", "/", "=", "<", ">", "!", "&", "|"
];
var compostos = ["<", ">", ":", "-"];
var palavrasReservada = [];
palavrasReservada[1] = 'write';
palavrasReservada[2] = 'while';
palavrasReservada[3] = 'var';
palavrasReservada[4] = 'then';
palavrasReservada[5] = 'string';
palavrasReservada[6] = 'senao';
palavrasReservada[7] = 'read';
palavrasReservada[8] = 'procedure';
palavrasReservada[9] = 'or';
palavrasReservada[10] = 'of';
palavrasReservada[11] = 'not';
palavrasReservada[12] = 'ninteiro';
palavrasReservada[13] = 'nfloat';
palavrasReservada[14] = 'literal';
palavrasReservada[15] = 'integer';
palavrasReservada[16] = 'if';
palavrasReservada[17] = 'ident';
palavrasReservada[18] = 'î';
palavrasReservada[19] = 'float';
palavrasReservada[20] = 'fim';
palavrasReservada[21] = 'end';
palavrasReservada[22] = 'do';
palavrasReservada[23] = 'case';
palavrasReservada[24] = 'call';
palavrasReservada[25] = 'begin';
palavrasReservada[26] = 'and';
palavrasReservada[27] = '>='
palavrasReservada[28] = '>'
palavrasReservada[29] = '=';
palavrasReservada[30] = '<>';
palavrasReservada[31] = '<=';
palavrasReservada[32] = '<';
palavrasReservada[33] = '+';
palavrasReservada[34] = '}';
palavrasReservada[35] = '{';
palavrasReservada[36] = ';';
palavrasReservada[37] = ':=';
palavrasReservada[38] = ':';
palavrasReservada[39] = '/';
palavrasReservada[40] = ',';
palavrasReservada[41] = '*';
palavrasReservada[42] = ')';
palavrasReservada[43] = '(';
palavrasReservada[44] = '$';
palavrasReservada[45] = '-';