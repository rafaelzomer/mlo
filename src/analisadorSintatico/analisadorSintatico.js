import {tabelaParsing, tabelaCorrespondencia} from '../tabelaParsing';
import {palavraPorCodigo} from '../palavrasReservadas';
const VAZIO = 44;
const DIVISAO = 45;

function init(tokens) {
  this.tokens = tokens;
  this.posicao = 0;
  console.log('--2.', tabelaCorrespondencia);
  this.pilha.push(44);
  this.pilha.push(46);

  this.analisar();

}

function erro() {
  console.error('ERROR');
}

function analisar() {
  console.log('------------------------- analisar ------');
  var topo = this.pilha[this.pilha.length-1];
  // var topo = this.pilha.pop();
  console.log('topo', topo);

  console.log('OQUE PODIA SER: ')
  if (topo > DIVISAO)
  {
    for (var i = 0; i < 100; i++) {
      var kk = tabelaParsing[topo][i];
      if (kk)
      {
        console.log("1podiaser:", i, '/', palavraPorCodigo(i));
      }
    }
  }
  else
  {
    console.log("2podiaser:", topo, '/', palavraPorCodigo(topo));
  }

  var token = this.tokens[this.posicao++];
  console.log('token', token);

  if (!token)
  {
    console.warn('IXIE');
    return;
  }

  var valor = tabelaParsing[topo][token.codigo];
  console.log('valor', valor);
  // console.info('nolog', this.tokens.length ,'=', this.posicao);
  if (topo == token.codigo)
  {
    this.pilha.pop();
    console.warn('this.pilhak', this.pilha);
    this.analisar();
    return;
    // topo = this.pilha.pop();
    // token =
    // console.log('[topo', topo);
    // console.log('[token', token);
    // console.warn('[this.pilha1', this.pilha);
  }


  if (topo == VAZIO && this.tokens.length == this.posicao-1 ) {
    console.log('SUCCESS');
    return;
  }
  else if (this.pilha.length < 1) {
    console.log('VAZIA');
    return;
  }
  else if (topo == VAZIO) {
    console.log('acabou erro');
    return;
  }
  else if (topo > DIVISAO) {
    console.warn('t1', topo);
    var corresps = tabelaCorrespondencia[valor];
    if (corresps)
    {
      for (var i = corresps.length - 1; i >= 0; i--) {
        console.log(corresps[i], '/', palavraPorCodigo(corresps[i]));
        this.pilha.push(corresps[i]);
      }
    }

    // var top = this.pilha[this.pilha.length-1];
    //   console.log('pOPS', top);
    // if (top == token.codigo)
    // {
    //   this.pilha.pop();
    //   // this.analisar();
    //   // return;
    //   // this.pilha.pop();
    // }
    // console.log('->', token, );
    // topo = this.pilha.pop();
  }

  var top = this.pilha[this.pilha.length-1];
  console.log('pOPS', top);
  if (top == token.codigo)
  {
    this.pilha.pop();
    // this.analisar();
    // return;
    // this.pilha.pop();
  }

    // this.pilha.pop();
  // if (topo <= DIVISAO) {
    console.warn('this.pilha1', this.pilha);
    this.analisar();
  // }
  // else
  // {
  //   console.warn('this.pilha2', this.pilha);
  //   this.analisar();
  // }

    // if (token.codigo == topo)
    // {
    //   console.warn('t2');
    //   this.analisar();
    // }
    // else
    // {
    //   console.warn('t3');
    //   this.erro();
    // }
  // }
  // else {
  //   this.erro();
  // }

  // var valor = tabelaParsing[topo][token.codigo];
  // console.log('valor', valor);

  // var corresps = tabelaCorrespondencia[valor];
  // console.log('corresps', corresps);
  // if (corresps)
  // {
  //   for (var i = corresps.length - 1; i >= 0; i--) {
  //     this.pilha.push(corresps[i]);
  //   }
  // }

  // console.warn('pilha', this.pilha);
}

let analisadorSintatico = {
  init,
  analisar,
  erro,
  pilha: []
}

export default analisadorSintatico;