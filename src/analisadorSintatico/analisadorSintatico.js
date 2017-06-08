import {tabelaParsing, tabelaCorrespondencia} from '../tabelaParsing';
import {palavraPorCodigo} from '../palavrasReservadas';
const FINAL = 44;
const VAZIO = 18;
const DIVISAO = 45;

function init({tokens, debug}) {
  this.tokens = tokens;
  this.debug = debug;
}

function iniciar() {
  this.posicao = 0;
  this.antigoTopo = -1;
  this.stack = 0;
  this.esperava = [];
  this.encontrou = false;
  this.pilha = [];
  this.pilha.push(44);
  this.pilha.push(46);
  this.analisar()
}

function analisar() {
  if (this.stack > 3)
  {
    //Se o topo começar a se repetir muito, retorna um erro de estouro de pilha;
    throw 'Stack Overflow';
    return;
  }
  this.debug && console.log('[', this.stack ,']', '------------------------- analisar ------');
  this.esperava = [];
  var topo = this.pilha[this.pilha.length-1];
  if (topo == this.antigoTopo) {
    this.stack++;
  }
  this.antigoTopo = topo;
  this.debug && console.log('t1-Topo: ', topo);

  if (topo > DIVISAO)
  {
    this.debug && console.log('O que poderia ser: ')
    for (var i = 0; i < 100; i++) {
      var simbolo = tabelaParsing[topo][i];
      if (simbolo)
      {
        this.esperava.push({
          simbolo: simbolo,
          palavra: palavraPorCodigo(i)
        });
        this.debug && console.log(i, '/', palavraPorCodigo(i));
      }
    }
  }
  else
  {
    this.esperava.push({
      simbolo: topo,
      palavra: palavraPorCodigo(topo)
    });
    this.debug && console.log("poderia ser: ", topo, '-', palavraPorCodigo(topo));
  }

  if (topo == FINAL && this.pilha.length <= 1 ) {
    this.debug && console.log('Sucesso');
    return true;
  }

  var token = this.tokens[this.posicao];
  this.debug && console.log('t1-Token: ', this.posicao, token);
  if (this.tokens[this.posicao-1] !== this.encontrou)
  {
    this.encontrou = token;
  }

  var valor = tabelaParsing[topo][token.codigo];
  this.debug && console.log('t1-Valor: ', valor);

  if (topo == VAZIO)
  {
    this.pilha.pop();
  }
  if (topo == token.codigo)
  {
    this.pilha.pop();
    this.debug && console.warn('t1-Pilha: ', this.pilha);
    this.posicao++;
    this.analisar();
    return;
  }

  // if (!valor)
  // {
  //   this.debug && console.warn('NA-Pilha: ', this.pilha);
  //   this.analisar();
  //   return;
  // }

  if (topo > DIVISAO) {
    this.debug && console.warn('t1', topo);
    var corresps = tabelaCorrespondencia[valor];
    if (corresps)
    {
      this.pilha.pop();
      for (var i = corresps.length - 1; i >= 0; i--) {
        this.debug && console.log('Adiciona na pilha: ', corresps[i], '-', palavraPorCodigo(corresps[i]));
        this.pilha.push(corresps[i]);
      }
    }
  }
  this.debug && console.warn('t2-Pilha: ', this.pilha);
  this.analisar();
}

let analisadorSintatico = {
  init,
  analisar,
  iniciar,
  pilha: []
}

export default analisadorSintatico;