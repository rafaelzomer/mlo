var numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
function ehNumero(valor) {
  for (var i = 0; i < numeros.length; i++) {
    if (valor == numeros[i])
      return true;
  }
  return false;
}
export default ehNumero;