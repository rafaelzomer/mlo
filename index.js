var arquivo = document.getElementById('arquivo');
var codigoTextArea = document.getElementById('codigo');
var compilarButton = document.getElementById('compilar');
var resultadoTable = document.getElementById('resultado');

var tokens, token, linha, fita;

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
  token = '';
  fita = codigoTextArea.value.trim().split('');
  console.log('[fita]  ', fita);
  analisar(false, fita, 0);
  for (var i = 0; i < tokens.length; i++) {
    var tk = tokens[i];
    var row = resultadoTable.insertRow(i);

    var cell = row.insertCell(0);
    cell.innerHTML = tk.linha;
    cell.setAttribute("data-label", "Linha");

    cell = row.insertCell(1);
    cell.innerHTML = tk.token;
    cell.setAttribute("data-label", "Token");

    cell = row.insertCell(2);
    cell.innerHTML = tk.codigo;
    cell.setAttribute("data-label", "Código");
  }
});

function analisar(anterior, fita, i) {
  var cabecote = fita[i];
  console.log('[cabecote]  ', cabecote, ehAspa(cabecote), ehLetra(cabecote));
  console.log('[anterior]  ', anterior, !ehComentario(cabecote));
  if (ehEOF(cabecote))
    return;
  if (!ehEspaco(cabecote) || anterior == 'COMENTARIO_BLOCO')
  {
    if (!ehQuebraLinha(cabecote))
    {
      if (ehSinal(cabecote))
      {
        fimAnalisar(anterior, cabecote);
      }
      token += cabecote;
    }
    else
    {
      linha++;
    }
  }

  if (anterior == 'LITERAL' && !ehAspa(cabecote)) {
    return analisar('LITERAL', fita, ++i);
  }
  else if (anterior == 'COMENTARIO_LINHA' && !ehQuebraLinha(cabecote)) {
    return analisar('COMENTARIO_LINHA', fita, ++i);
  }
  else if (anterior == 'COMENTARIO_BLOCO' && cabecote !== '-') {
    return analisar('COMENTARIO_BLOCO', fita, ++i);
  }
  else if (ehLetra(cabecote)) {
    if (anterior == false || anterior == 'RESEVIDENT')
    {
      return analisar('RESEVIDENT', fita, ++i);
    }
    else if(anterior == 'LITERAL') {
      return analisar('LITERAL', fita, ++i);
    }
  } 
  else if (ehAspa(cabecote)) {
    console.log('CEI');
    if (anterior !== 'LITERAL') {
      return analisar('LITERAL', fita, ++i);
    }
    else
    {
      adicionarToken('LITERAL');
    }
  }
  else if (ehNumero(cabecote)) {
    if (anterior == false || anterior == 'INTEIRO')
    {
      return analisar('INTEIRO', fita, ++i);
    }
    else if (anterior == 'RESEVIDENT')
    {
      return analisar('RESEVIDENT', fita, ++i);
    }
  }
  else if (ehSinal(cabecote)) {
    console.warn('SIN', cabecote, token, '//', anterior, ehComposto(cabecote));

    if (ehComentario(cabecote) && (token == '--')) 
    {
      return analisar('COMENTARIO_LINHA', fita, ++i);
    }
    else if (ehComentario(cabecote) && (token == '-*' || cabecote == '-'))
    {
      if (anterior == 'COMENTARIO_BLOCO')
      {
        adicionarToken('COMENTARIO_BLOCO');
      }
      else
      {
        return analisar('COMENTARIO_BLOCO', fita, ++i);
      }
    }
    else if (!ehComposto(cabecote) || anterior == 'SINAL')
    {
      adicionarToken('SINAL');
    }
    else
    {
      return analisar('SINAL', fita, ++i);
    }
  }
  else
  {
    fimAnalisar(anterior, cabecote);
  }
  return analisar(false, fita, ++i);
}

function fimAnalisar(anterior, cabecote) {
  anterior && console.error('VRAY', anterior, cabecote);
  if (anterior == 'INTEIRO') {
    adicionarToken('INTEIRO');
  }
  if (anterior == 'COMENTARIO_LINHA')
  {
    adicionarToken('COMENTARIO_LINHA');
  }
  if (anterior == 'RESEVIDENT') {
    if (!ehLetra(cabecote))
    {
      if (ehPalavraReservada(token)) {
        adicionarToken('PALAVRA_RESERVADA');
      }
      else
      {
        adicionarToken('IDENTIFICADOR');
      }
    }
  }
}

function adicionarToken(tipo) {
  var codigo = 0;
  switch(tipo) {
    case 'LITERAL':
      codigo = ehPalavraReservada('literal');
      break;
    case 'INTEIRO':
      codigo = ehPalavraReservada('ninteiro');
      break;
    case 'FLOAT':
      codigo = ehPalavraReservada('nfloat');
      break;
    case 'IDENTIFICADOR':
      codigo = ehPalavraReservada('ident');
      break;
    case 'COMENTARIO_LINHA':
      codigo = 'COMENTARIO_LINHA';
      break;
    case 'COMENTARIO_BLOCO':
      codigo = 'COMENTARIO_BLOCO';
      break;
    case 'PALAVRA_RESERVADA':
    default:
      codigo = ehPalavraReservada(token);
      break;
  }
  console.info('ADD:', tipo, token);
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

var alfabeto = ["a","b","c","d","e","f","g","h","i","j", 
  "k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var numeros = ["0","1","2","3","4","5","6","7","8","9"];
var sinais = [",",";","(",")","{","}","[","]","+",
        "-","*","/","=","<",">","!","&","|"];
var compostos = ["<",">", ":", "-"];
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