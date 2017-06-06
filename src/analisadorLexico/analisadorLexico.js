import {
  ehAspa,
  ehComentario,
  ehComposto,
  ehEOF,
  ehEspaco,
  ehLetra,
  ehNumero,
  ehPalavraReservada,
  ehQuebraLinha,
  ehSeparadorDecimal,
  ehSinal
} from '../comparadores';

const SINTAXE_LITERAL_MAX = 333;
const SINTAXE_INTEIRO_MIN = -100000000;
const SINTAXE_INTEIRO_MAX = 100000000;
const SINTAXE_FLOAT_MIN = -100000000;
const SINTAXE_FLOAT_MAX = 100000000;

function init() {
  this.token = '';
  this.tokens = [];
  this.erros = [];
  this.linha = 1;
}

function iniciar(fita) {
  this.analisar(false, fita, 0)
}

function analisar(anterior, fita, i) {
  var cabecoteAnterior = fita[i - 1];
  var cabecote = fita[i];
  var cabecoteProximo = fita[i + 1];

  if (!ehEOF(cabecote)) {
    this.token += cabecote;
  }

  if (ehQuebraLinha(cabecote))
  {
    this.linha++;
  }
  if (anterior == 'COMENTARIO_LINHA' && !ehQuebraLinha(cabecote) && !ehEOF(cabecote) ) {
    return this.analisar('COMENTARIO_LINHA', fita, ++i);
  }
  else if (anterior == 'COMENTARIO_BLOCO' && !(cabecoteAnterior == '*' && cabecote == '-')) {
    if (ehEOF(cabecote))
    {
        this.adicionarErro('Comentário de bloco (-*) "'+this.token+'" não fechado (*-)');
        return;
    }
    return this.analisar('COMENTARIO_BLOCO', fita, ++i);
  }
  else if (anterior == 'LITERAL' && !ehAspa(cabecote)) {
    if (ehEOF(cabecote)) {
      this.adicionarErro('Aspas do literal "' + this.token + '" não foram fechadas');
      return;
    }
    return this.analisar('LITERAL', fita, ++i);
  }
  else if (anterior == 'LITERAL' && ehAspa(cabecote)) {
    this.adicionarToken('RESEVIDENT');
  } else if (ehSinal(cabecote)) {
    if (cabecote == '-' && cabecoteProximo == '*') {
      return this.analisar('COMENTARIO_BLOCO', fita, ++i);
    } else if (cabecoteAnterior == '*' && cabecote == '-') {
      this.adicionarToken('COMENTARIO_BLOCO');
    } else if (cabecote == '-' && cabecoteProximo == '-') {
      return this.analisar('COMENTARIO_LINHA', fita, ++i);
    }
    else
    {
      if (ehComposto(cabecoteProximo))
      {
        return this.analisar('SINAL', fita, ++i);
      }
      else
      {
        this.adicionarToken('SINAL');
      }
    }
  } else if (anterior !== false && ehSinal(cabecoteProximo)) {
    if (anterior == 'RESEVIDENT' || anterior == 'FLOAT' || anterior == 'INTEIRO')
    {
      this.adicionarToken(anterior);
    }
  } else if (ehLetra(cabecote)) {
    if (ehSinal(cabecoteProximo))
    {
      this.adicionarToken('RESEVIDENT');
    }

    return this.analisar('RESEVIDENT', fita, ++i);
  } else if (ehAspa(cabecote)) {
    if (anterior !== 'LITERAL') {
      return this.analisar('LITERAL', fita, ++i);
    } else {
      this.adicionarToken('LITERAL');
    }
  } else if (ehNumero(cabecote)) {
    if (anterior == false || anterior == 'INTEIRO')
    {
      if (ehSinal(cabecoteProximo)) {
        this.adicionarToken('INTEIRO');
      }
      return this.analisar('INTEIRO', fita, ++i);
    }
    else if (anterior == 'FLOAT') {
      if (ehSinal(cabecoteProximo)) {
        this.adicionarToken('FLOAT');
      }
      return this.analisar('FLOAT', fita, ++i);
    }
    else if (anterior == 'RESEVIDENT')
    {
      if (ehSinal(cabecoteProximo)) {
        this.adicionarToken('RESEVIDENT');
      }
      return this.analisar('RESEVIDENT', fita, ++i);
    }
  } else if (ehSeparadorDecimal(cabecote)) {
    if (anterior == 'INTEIRO')
    {
      return this.analisar('FLOAT', fita, ++i);
    }
  } else {
    this.adicionarToken(anterior);
  }
  if (ehEOF(cabecote)) {
    this.adicionarToken('FIM');
    return;
  }
  return this.analisar(false, fita, ++i);
}


function adicionarErro(erro) {
  this.erros.push({
    erro: erro,
    linha: this.linha
  });
}

function adicionarToken(tipo) {
  if (tipo !== 'FIM')
  {
    if ((tipo == false && this.token == ' ') || this.token.trim() == '') {
      this.token = '';
      return;
    }
  }
  var codigo = 0;
  switch (tipo) {
    case 'LITERAL':
      codigo = ehPalavraReservada('literal');
      var tam = this.token.length - 2;
      if (tam > SINTAXE_LITERAL_MAX) {
        this.adicionarErro('O tamanho do literal (' + tam + ') ultrapassa o tamanho máximo específicado: ' + SINTAXE_LITERAL_MAX);
      }
      break;
    case 'INTEIRO':
      codigo = ehPalavraReservada('ninteiro');
      var i = parseInt(this.token);
      if (i < SINTAXE_INTEIRO_MIN) {
        this.adicionarErro('O tamanho do inteiro (' + i + ') ultrapassa o tamanho máximo negativo específicado: ' + SINTAXE_INTEIRO_MIN);
      }
      if (i > SINTAXE_INTEIRO_MAX) {
        this.adicionarErro('O tamanho do inteiro (' + i + ') ultrapassa o tamanho máximo positivo específicado: ' + SINTAXE_INTEIRO_MAX);
      }
      break;
    case 'FLOAT':
      codigo = ehPalavraReservada('nfloat');
      var i = parseFloat(this.token);
      if (i < SINTAXE_FLOAT_MIN) {
        this.adicionarErro('O tamanho do float (' + i + ') ultrapassa o tamanho máximo negativo específicado: ' + SINTAXE_FLOAT_MIN);
      }
      if (i > SINTAXE_FLOAT_MAX) {
        this.adicionarErro('O tamanho do float (' + i + ') ultrapassa o tamanho máximo positivo específicado: ' + SINTAXE_FLOAT_MAX);
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
      this.token = 'fim arquivo';
      break;
    case 'RESEVIDENT':
    default:
      codigo = ehPalavraReservada(this.token);
      if (!codigo)
        codigo = ehPalavraReservada('ident');
      break;
  }
  // não adiciona comentários a lista de tokens
  if (codigo !== 'COMENTARIO_BLOCO' && codigo !== 'COMENTARIO_LINHA')
  {
    let tk = this.token.replace(/(\r\n|\n|\r)/gm,"");
    this.tokens.push({
      linha: this.linha,
      codigo: codigo,
      token: tk
    });
  }
  this.token = '';
}

let analisadorLexico = {
  linha: 1,
  tokens: [],
  erros: [],
  init,
  iniciar,
  analisar,
  adicionarToken,
  adicionarErro,
}
export default analisadorLexico;