import {palavrasReservadas} from '../palavrasReservadas';
function ehPalavraReservada(valor) {
  for (var i = 0; i < palavrasReservadas.length; i++) {
    if (valor.trim().toLowerCase() == palavrasReservadas[i])
      return i;
  }
  return 0;
}
export default ehPalavraReservada;